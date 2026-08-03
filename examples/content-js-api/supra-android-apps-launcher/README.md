# Supra Android apps launcher

This example uses the Supra App Launcher SDK to start one Supra screen containing the Supra App Launcher UI. Android apps run behind that launcher, and selecting an app switches the rendered app object attached to the single screen. Previously selected apps keep running in the background. **Stop all** hides the active rendered object without terminating its Android app runtime.

Use this variant when one long-lived Supra screen should switch between Android apps while preserving their background runtimes. To create and manage a separate Supra screen (stream) for each Android app, see [Supra Android apps screens](../supra-android-apps-screens/).

- [CLI applet](cli-applet/)

## Applications

| Application | Android package ID | APK page |
|---|---|---|
| Angry Birds Classic | `com.rovio.angrybirds` | [Download page](https://apkpure.net/angry-birds-classic/com.rovio.angrybirds/download) |
| Bad Piggies | `com.rovio.BadPiggies` | [Download page](https://apkpure.net/bad-piggies/com.rovio.BadPiggies/download) |

APKPure is a third-party source, not signageOS or Rovio. Confirm that you may use the APK and verify its publisher signature, checksum, version, and device compatibility before uploading it. Prefer an APK obtained directly from its publisher when available.

## Configure applications

Without application configuration, the applet offers Angry Birds Classic and Bad Piggies. The first application in the list starts automatically after the applet becomes ready.

To replace the defaults, set at least `appId.1` in the applet's `sos.config`. Add consecutively numbered keys for any additional applications; the applet has no fixed application-count limit:

| Configuration key | Example value |
|---|---|
| `appId.1` | `com.example.first` |
| `appId.2` | `com.example.second` |
| `appId.3` | `com.example.third` |

The configured list completely replaces the built-in Angry Birds and Bad Piggies list. `appId.1` is always the application started by default. Number keys consecutively because loading stops at the first missing key.

## Prepare the applet

The CLI applet declares `@signageos/supra-app-launcher` as a package dependency and Webpack bundles it into `index.js`; it does not load a separate SDK URL at runtime.

Run `npm install` and `npm run build` in `cli-applet`, then upload its generated `dist` directory in the same Box organization as the Supra Server device. The published `@signageos/supra-app-launcher` package is installed from the version configured in `package.json`. The SDK uses the device's `sos.config` Supra connection and authentication properties.

## Upload and install APKs

1. Open the target organization in [signageOS Box](https://box.signageos.io/).
2. Open **Packages**, upload each APK, and wait for processing to finish.
3. Copy the generated package URI. It is derived from the organization, package checksum, and package base URL; do not use the APK download-page URL.
4. Open the Linux device running Supra Server.
5. Run the `install-android-app` custom script on that server device with the package URI.
6. Repeat for both APKs and confirm that package IDs `com.rovio.angrybirds` and `com.rovio.BadPiggies` are installed.
7. Assign this example applet to the player device connected to that Supra Server.

## Public Supra documentation

- [Supra overview](https://docs.signageos.io/supra/)
- [How Supra works](https://docs.signageos.io/supra/basics/how-supra-works/)
- [Supra Server management](https://docs.signageos.io/supra/basics/supra-server-management/)
