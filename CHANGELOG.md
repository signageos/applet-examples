# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Supra Android apps screens example using a separate Supra screen (stream) for each Android app
- Supra Android apps launcher example using one launcher screen that switches Android app rendered objects
- Vue3 (@vue/cli) example project `examples/framework-examples/vue-example/vue3-cli-applet` 
- Vue3 (vite) example project `examples/framework-examples/vue-example/vue3-vite-applet` 
- Synced playlist master example project `examples/content-js-api/sync-playlist`
- Synced takeover menuboard master example project `examples/content-js-api/sync-takeover`
- Sync barrier demo example projects `examples/content-js-api/sync-demo` and `examples/content-js-api/sync-pingpong`

### Changed
- udpated `examples/framework-examples/vue-example/cli-applet` startup script
- Solution Hub applets moved to applets-collection; examples restored to pre-marketplace versions

### Removed
- `check-es5` tool, moved to `applets-collection`

## [Unreleased]
### Added
- new Benchmark test for mixed playback of 4k and FHD videos
- new Video and Image and HTML example
- added Capabilities examples
- new sensors demo with SMIL
- added E2E tests for checksum, video playback and filesystem
- added script to build all exampples

### Changed
- updated packages to latest versions
- migrated to webpack 5
