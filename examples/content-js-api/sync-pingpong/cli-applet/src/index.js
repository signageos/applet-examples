import sos from '@signageos/front-applet';

// Sync ping-pong: the whole row of screens acts as ONE wide field. A ball travels across the full
// field and back, bouncing, and each screen draws only its own slice - so the ball appears to cross
// seamlessly from one TV to the next. Every screen computes the ball position from the SAME shared
// animation clock, which is what keeps them aligned.
//
// Shared clock: a sync barrier (`sos.sync.wait`) releases every screen together at the start of each
// cycle (shared t=0); from there each screen animates with its own monotonic frame clock
// (requestAnimationFrame), which does not drift over a few seconds. Re-syncing every cycle keeps the
// screens aligned within the barrier's sub-100ms skew. Device wall clocks are NOT used - they are
// not reliably synced.
//
// Screen layout: set `screen_index` (0 = leftmost) and `screen_count` on each TV so the field is
// ordered left to right. Assumes all screens share the same resolution and are mounted edge to edge.
//
// Config:
//   screen_index     - 0-based position of this screen in the row (default 0)
//   screen_count     - total number of screens in the row (default 1)
//   cycle_ms         - time for one full round trip across the field and back (default 10000)
//   hop_count        - number of bounces during one cycle (default 10)
//   sync_group       - group id; screens with the same id animate together
//   sync_server      - sync server URI; empty = signageOS default server
//   sync_engine      - "sync-server" (default) or "p2p-local"
//   wait_timeout_ms  - barrier wait timeout in ms; on timeout the loop retries (default 15000)

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

sos.onReady().then(async function () {
	const ball = document.getElementById('ball');
	const shadow = document.getElementById('shadow');

	const screenIndex = Number(sos.config.screen_index) || 0;
	const screenCount = Number(sos.config.screen_count) || 1;
	const cycleMs = Number(sos.config.cycle_ms) || 10000;
	const hopCount = Number(sos.config.hop_count) || 10;
	const syncGroup = sos.config.sync_group || undefined;
	const syncServer = sos.config.sync_server || undefined;
	const syncEngine = sos.config.sync_engine || 'sync-server';
	const waitTimeoutMs = Number(sos.config.wait_timeout_ms) || 15000;

	// Geometry (assumes every screen is the same size).
	const W = document.documentElement.clientWidth;
	const H = document.documentElement.clientHeight;
	const R = Math.round(H * 0.09); // ball radius
	const fieldW = screenCount * W; // full field width, across all screens
	const hopHeight = Math.round(H * 0.5); // peak hop height above the floor
	const floorY = H - R - Math.round(H * 0.04); // ball centre when resting on the floor

	ball.style.width = 2 * R + 'px';
	ball.style.height = 2 * R + 'px';
	shadow.style.height = Math.round(R * 0.5) + 'px';

	// Draw the ball + its shadow for a given field position. Anything outside this screen's slice is
	// simply positioned off-screen and clipped (body has overflow:hidden), so the ball is continuous
	// across the seam between two TVs.
	function render(fieldX, centerY, arc) {
		const localX = fieldX - screenIndex * W;
		if (localX < -R || localX > W + R) {
			ball.style.display = 'none';
			shadow.style.display = 'none';
			return;
		}
		ball.style.display = 'block';
		ball.style.transform = 'translate(' + (localX - R) + 'px, ' + (centerY - R) + 'px)';

		// Shadow shrinks and fades as the ball rises.
		const shadowW = Math.round(2 * R * (1 - 0.45 * arc));
		shadow.style.display = 'block';
		shadow.style.width = shadowW + 'px';
		shadow.style.opacity = String(0.35 * (1 - 0.7 * arc));
		shadow.style.transform = 'translate(' + (localX - shadowW / 2) + 'px, ' + (floorY + R - Math.round(R * 0.25)) + 'px)';
	}

	// Animate one full round trip, driven by the monotonic frame clock. Resolves at the end of the
	// cycle, with the ball back at its start position (left edge, on the floor) so the next barrier
	// re-sync is seamless.
	function animateCycle() {
		return new Promise((resolve) => {
			let startTs = null;
			function frame(ts) {
				if (startTs === null) {
					startTs = ts;
				}
				const elapsed = ts - startTs;
				const frac = Math.min(1, elapsed / cycleMs);

				// Horizontal: constant-speed round trip (triangle wave) across the whole field.
				const tri = frac < 0.5 ? frac * 2 : (1 - frac) * 2;
				const fieldX = R + tri * (fieldW - 2 * R);

				// Vertical: repeated hops (half-sine arcs); ends on the floor when hop_count is whole.
				const arc = Math.abs(Math.sin(Math.PI * frac * hopCount));
				const centerY = floorY - arc * hopHeight;

				render(fieldX, centerY, arc);

				if (elapsed >= cycleMs) {
					resolve();
					return;
				}
				requestAnimationFrame(frame);
			}
			requestAnimationFrame(frame);
		});
	}

	await connectAndJoinGroup({ engine: syncEngine, uri: syncServer, groupName: syncGroup });

	while (true) {
		try {
			// Barrier: every screen starts the cycle together (shared t=0), then animates locally.
			await sos.sync.wait('pingpong', syncGroup, waitTimeoutMs);
			await animateCycle();
		} catch (error) {
			// Never let the loop die, or this screen would stay a connected-but-idle peer that stalls
			// the group. Log, pause, and retry the barrier.
			console.error('ping-pong cycle failed, retrying:', error && error.message);
			await sleep(500);
		}
	}
});
