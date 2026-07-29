# Supra Android applications launcher

This example uses the Supra App Launcher SDK to start and switch Android applications while keeping a fixed 64-pixel applet header visible. Only one Android application is rendered at a time. **Stop all** removes launcher rendering without terminating the Supra daemon runtime.

- [Single-file applet](singlefile-applet/index.html)
- [CLI applet](cli-applet/)

## Applications

| Application | Android package ID | APK page |
|---|---|---|
| Angry Birds Classic | `com.rovio.angrybirds` | [Download page](https://apkpure.net/angry-birds-classic/com.rovio.angrybirds/download) |
| Angry Birds Transformers | `com.rovio.angrybirdstransformers` | [Download page](https://apkpure.net/angry-birds-transformers/com.rovio.angrybirdstransformers/download) |

APKPure is a third-party source, not signageOS or Rovio. Confirm that you may use the APK and verify its publisher signature, checksum, version, and device compatibility before uploading it. Prefer an APK obtained directly from its publisher when available.

## Prepare the applet

The single-file variant includes `supra-app-launcher-sdk.js`. To update it, build the SDK from the [`signageos/applet/supra-app-launcher`](https://gitlab.com/signageos/applet/supra-app-launcher) repository and replace the file with `dist-sdk/supra-app-launcher-sdk.js`. The CLI variant declares `@signageos/supra-app-launcher` as a package dependency and Webpack bundles it into `index.js`; it does not load a separate SDK URL at runtime.

For the single-file variant, upload the `singlefile-applet` directory as an applet. For the CLI variant, make the `@signageos/supra-app-launcher` package available at the local path configured in `package.json`, run `npm install` and `npm run build` in `cli-applet`, then upload its generated `dist` directory. Upload the selected variant in the same Box organization as the Supra Server device. The SDK uses the device's `sos.config` Supra connection and authentication properties.

## Upload and install APKs

1. Open the target organization in [signageOS Box](https://box.signageos.io/).
2. Open **Packages**, upload each APK, and wait for processing to finish.
3. Copy the generated package URI. It is derived from the organization, package checksum, and package base URL; do not use the APK download-page URL.
4. Open the Linux device running Supra Server.
5. Run the `install-android-app` custom script on that server device with the package URI.
6. Repeat for both APKs and confirm that package IDs `com.rovio.angrybirds` and `com.rovio.angrybirdstransformers` are installed.
7. Assign this example applet to the player device connected to that Supra Server.

## Public Supra documentation

- [Supra overview](https://docs.signageos.io/supra/)
- [How Supra works](https://docs.signageos.io/supra/basics/how-supra-works/)
- [Supra Server management](https://docs.signageos.io/supra/basics/supra-server-management/)
