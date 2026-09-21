import sos from '@signageos/front-applet';

// Sync visualiser: every device in the same `sync_group` advances a shared step counter
// in lockstep. On each tick all screens flip the background colour and the big number
// together, so synchronisation is obvious at a glance. The wall-clock line shows each
// device's own time (to eyeball clock alignment / residual skew).
//
// Timing model: flip the instant the barrier releases. The server releases every peer together
// and each device acts immediately, so skew is bounded by network fan-out (typically sub-100ms).
// NOTE: an alternative is to agree on an absolute switch time and schedule against each device's
// own wall clock — but that only helps when device clocks are tightly NTP-synced. On these TVs the
// clocks differ by ~1s, so clock-scheduled switching AMPLIFIES that skew; barrier-release is tighter.
//
// Config (all optional):
//   sync_group       - group id; screens with the same id tick together
//   sync_server      - sync server URI; empty = signageOS default server
//   sync_engine      - "sync-server" (default) or "p2p-local"
//   tick_ms          - dwell time on each step in ms (default 1000)
//   wait_timeout_ms  - barrier wait timeout in ms; on timeout the tick retries instead of dying (default 15000)

const COLORS = ['#e5484d', '#f76808', '#f9d34f', '#30a46c', '#0091ff', '#8e4ec6', '#e93d82', '#12a594'];
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

function pad(n, width) {
	let s = String(n);
	while (s.length < width) s = '0' + s;
	return s;
}
function nowTimecode() {
	const d = new Date();
	return pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2) + '.' + pad(d.getMilliseconds(), 3);
}

sos.onReady().then(async function () {
	const bandEl = document.getElementById('band');
	const stepEl = document.getElementById('step');
	const clockEl = document.getElementById('clock');
	const metaEl = document.getElementById('meta');
	const groupEl = document.getElementById('group');

	const syncGroup = sos.config.sync_group || undefined;
	const syncServer = sos.config.sync_server || undefined;
	const syncEngine = sos.config.sync_engine || 'sync-server';
	const tickMs = Number(sos.config.tick_ms) || 1000;
	const waitTimeoutMs = Number(sos.config.wait_timeout_ms) || 15000;

	// Free-running local clock (independent of sync) so skew between screens is visible.
	setInterval(() => { clockEl.textContent = nowTimecode(); }, 40);

	groupEl.textContent = 'group: ' + (syncGroup || '(default)') + '  ·  connecting…';
	await connectAndJoinGroup({ engine: syncEngine, uri: syncServer, groupName: syncGroup });
	groupEl.textContent = 'group: ' + (syncGroup || '(default)');

	sos.sync.onStatus((status) => {
		const peers = status && status.connectedPeers ? status.connectedPeers.length : '?';
		const role = status && status.isMaster ? 'MASTER' : 'follower';
		metaEl.textContent = role + '  ·  peers: ' + peers;
	});

	let step = 0;
	while (true) {
		try {
			// Barrier: all peers block here; the server releases everyone together and returns the
			// MASTER's step. Flip immediately on release, so skew is bounded by network fan-out
			// (sub-100ms) and never by the devices' (unreliable) clocks. The explicit timeout makes
			// a network hiccup retry instead of blocking forever.
			const agreed = await sos.sync.wait(step, syncGroup, waitTimeoutMs);
			const s = typeof agreed === 'number' ? agreed : step;

			// Sharp colour change only in the top band + the big number (background stays dark-gray).
			const color = COLORS[s % COLORS.length];
			bandEl.style.backgroundColor = color;
			stepEl.style.color = color;
			stepEl.textContent = String(s);

			step = s + 1;
			await sleep(tickMs);
		} catch (error) {
			// Self-heal: a barrier timeout / peer drop must NOT kill the loop. If the loop died,
			// this device would stay a connected-but-never-arriving "zombie" peer and stall the
			// whole group. Log, pause briefly, and retry the barrier so it rejoins and re-syncs.
			console.error('sync tick failed, retrying:', error && error.message);
			await sleep(500);
		}
	}
});
