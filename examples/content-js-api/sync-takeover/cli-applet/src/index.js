import sos from '@signageos/front-applet';

// Synced takeover menuboard: a normal HTML menuboard runs on every screen, and on a shared
// schedule the whole group is "taken over" together by a full-screen visual, then returns to the
// menu together. Two sync barriers (`sos.sync.wait`) keep the group aligned: one to ENTER the
// takeover, one to LEAVE it. See https://developers.signageos.io/sdk/sos/sync
//
// The takeover here is a simple synced number + colour (like the `sync-demo` example) so the sync
// is obvious. A real promo video/image can be dropped in later.
//
// Timing model: act the instant a barrier releases. The server releases all peers together, so the
// skew is bounded by the network (sub-100ms), not by the devices' clocks (which are not tightly
// synced). Do NOT schedule against wall-clock time here — it would amplify clock drift.
//
// Config (all optional):
//   sync_group       - group id; screens with the same id take over together
//   sync_server      - sync server URI; empty = signageOS default server
//   sync_engine      - "sync-server" (default) or "p2p-local"
//   interval_ms      - how long the menuboard shows between takeovers (default 15000)
//   takeover_ms      - how long each takeover shows (default 6000)
//   menuboard_items  - JSON array of { name, price } rows; falls back to a demo menu
//   wait_timeout_ms  - barrier wait timeout in ms; on timeout the loop retries instead of dying (default 15000)

// Dark, muted takeover colours — solid but easy on the eyes for a full-screen fill.
const COLORS = ['#4a2b2b', '#2b4a38', '#2b394a', '#3d2b4a', '#4a422b', '#2b2b4a', '#2b4a4a', '#4a2b40'];

const DEFAULT_MENU = [
	{ name: 'Espresso', price: '$3.0' },
	{ name: 'Flat White', price: '$4.2' },
	{ name: 'Cold Brew', price: '$4.5' },
	{ name: 'Croissant', price: '$3.8' },
	{ name: 'Avocado Toast', price: '$7.5' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The initial connect+joinGroup can fail transiently (e.g. a flaky native sync service on the
// device) with no auto-retry from the platform. Left unguarded, a single failure here rejects the
// whole startup chain and the screen is stuck on "connecting…" forever. Retry indefinitely so a
// transient failure recovers instead of stranding the device.
async function connectAndJoinGroup({ engine, uri, groupName }) {
	while (true) {
		try {
			await sos.sync.connect({ engine, uri });
			await sos.sync.joinGroup({ groupName });
			return;
		} catch (error) {
			console.error('sync connect/joinGroup failed, retrying:', error && error.message);
			try {
				await sos.sync.close();
			} catch (closeError) {
				// best-effort cleanup before retry
			}
			await sleep(1000);
		}
	}
}

function parseJson(raw, fallback) {
	try {
		return raw ? JSON.parse(raw) : fallback;
	} catch (error) {
		console.error('Invalid config JSON, using default:', error);
		return fallback;
	}
}

// Fill the menuboard with the configured rows.
function renderMenuboard(items) {
	const rows = document.getElementById('menu-rows');
	rows.innerHTML = '';
	for (const item of items) {
		const row = document.createElement('div');
		row.className = 'menu-row';
		row.innerHTML = '<span class="name"></span><span class="price"></span>';
		row.querySelector('.name').textContent = item.name;
		row.querySelector('.price').textContent = item.price;
		rows.appendChild(row);
	}
}

// Show the current time (HH:MM) in the menuboard corner.
function startClock() {
	const clock = document.getElementById('clock');
	const tick = () => {
		const d = new Date();
		const hh = ('0' + d.getHours()).slice(-2);
		const mm = ('0' + d.getMinutes()).slice(-2);
		clock.textContent = hh + ':' + mm;
	};
	tick();
	setInterval(tick, 15000);
}

sos.onReady().then(async function () {
	const takeoverLayer = document.getElementById('takeover');
	const takeoverNum = document.getElementById('takeover-num');

	const syncGroup = sos.config.sync_group || undefined;
	const syncServer = sos.config.sync_server || undefined;
	const syncEngine = sos.config.sync_engine || 'sync-server';
	const intervalMs = Number(sos.config.interval_ms) || 15000;
	const takeoverMs = Number(sos.config.takeover_ms) || 6000;
	const waitTimeoutMs = Number(sos.config.wait_timeout_ms) || 15000;
	const menu = parseJson(sos.config.menuboard_items, DEFAULT_MENU);

	renderMenuboard(menu);
	startClock();

	// Join the sync group. Screens sharing the same group take over together.
	await connectAndJoinGroup({ engine: syncEngine, uri: syncServer, groupName: syncGroup });

	let index = 0;
	while (true) {
		try {
			// 1) Menuboard runs for a while (timed locally; the enter-barrier re-aligns the group).
			await sleep(intervalMs);

			// 2) Enter together: everyone waits at the barrier, then is released with the master's index.
			const agreed = await sos.sync.wait(index, syncGroup, waitTimeoutMs);
			const shownIndex = typeof agreed === 'number' ? agreed : index;

			// 3) Show the takeover (same colour + number on every screen, at the same moment).
			takeoverLayer.style.backgroundColor = COLORS[shownIndex % COLORS.length];
			takeoverNum.textContent = String(shownIndex);
			takeoverLayer.style.visibility = 'visible';
			await sleep(takeoverMs);

			// 4) Leave together: a second barrier so every screen returns to the menuboard at once.
			await sos.sync.wait('end', syncGroup, waitTimeoutMs);
			takeoverLayer.style.visibility = 'hidden';

			index = shownIndex + 1;
		} catch (error) {
			// If the loop ever throws it must recover, otherwise this screen would stay connected but
			// never reach the barrier again and would stall the whole group. Hide, pause, retry.
			console.error('takeover cycle failed, retrying:', error && error.message);
			takeoverLayer.style.visibility = 'hidden';
			await sleep(500);
		}
	}
});
