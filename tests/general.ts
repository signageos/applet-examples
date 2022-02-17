const _deviceUid = process.env.SOS_DEVICE_UID;
if (!_deviceUid) {
	throw new Error(`Environment variable SOS_DEVICE_UID is required`);
}
export const deviceUid = _deviceUid;

// Default appletUid is the one which is uploaded to sos
const _appletUid = process.env.SOS_APPLET_UID;
if (!_appletUid) {
	throw new Error(`Environment variable SOS_APPLET_UID is required`);
}
export const appletUid = _appletUid;

const _appletVersion = process.env.SOS_APPLET_VERSION;
if (!_appletVersion) {
	throw new Error(`Environment variable SOS_APPLET_UID is required`);
}
export const appletVersion = _appletVersion;
