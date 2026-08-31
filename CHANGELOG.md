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

### Changed
- udpated `examples/framework-examples/vue-example/cli-applet` startup script

### Fixed
- video wall single-file applets (`videowall`, `videowall-2screens`, `videowall-4screens`) now restart the whole sync group from the first video when a screen joins, instead of letting the late screen sit out a loop

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