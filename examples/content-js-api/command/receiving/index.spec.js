
const sos = require('@signageos/sdk');
const should = require('should');

describe('Command.Receiving', () => {

	it('should count number of commands dispatched to device',
		async () => {
			const currentTiming = await sos.timing.create({
				deviceUid: sos.CURRENT_DEVICE_UID,
				appletUid: sos.CURRENT_APPLET_UID,
				appletVersion: sos.CURRENT_APPLET_VERSION,
				startsAt: sos.now(),
				endsAt: sos.now(),
				configuration: {
					sosMonitoring: true,
				},
				position: 1,
				finishEvent: {
					type: sos.timing.DURATION,
					data: null,
				},
			});

			try {
				await currentTiming.onLoaded();

				await sos.waitUntil(async () => {
					const consoleLogs = await currentTiming.console.log.getAll();
					should(consoleLogs).containEql('sOS is ready');
				});

				await sos.timingCommand.create({
					deviceUid: sos.CURRENT_DEVICE_UID,
					appletUid: sos.CURRENT_APPLET_UID,
					commandPayload: {
						type: 'CountIt',
					},
				});
				await sos.waitUntil(async () => {
					const document = await currentTiming.html.getDOMDocument();
					const contentElement = document.getElementById('index');
					should(contentElement.innerHTML).startWith('Calls count: 1');
				});
			} finally {
				await currentTiming.delete();
			}
		}
	);
});
