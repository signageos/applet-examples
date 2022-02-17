import { api } from '@signageos/sdk';
import { appletUid, appletVersion, deviceUid } from "./general";
import Timing from "@signageos/sdk/dist/RestApi/Timing/Timing";

export async function cleanTimings() {
	const timings = await api.timing.getList({ deviceUid });
	await Promise.all(timings.map(async (timing) => {
		await api.timing.delete(timing.uid);
	}));
}

export async function setupPlayerTiming(uidApplet?: string, versionApplet?: string) {
	const assignedSince = new Date();
	const applet = uidApplet === undefined ? appletUid : uidApplet;
	const version = versionApplet === undefined ? appletVersion : versionApplet;
	const timing = await api.timing.create({
		appletUid: applet,
		appletVersion: version,
		deviceUid,
		endsAt: new Date('2050-01-01T00:00:00.000Z'),
		startsAt: new Date('2000-01-01T00:00:00.000Z'),
		finishEvent: {
			type: 'DURATION',
			data: null,
		},
		position: 1,
		configuration: {
			sosMonitoring: true,
		},
	});
	return { assignedSince, timing };
}

export async function getTiming(): Promise<Timing> {
	const timing = await api.timing.getList({deviceUid});
	return timing[0];
}
