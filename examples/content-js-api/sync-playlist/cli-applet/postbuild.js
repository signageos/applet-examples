// Transpile the emitted bundle down to ES5 for old device browsers.
//
// Why this exists: some LG / webOS TVs ship a Chromium too old to parse modern
// JavaScript syntax (optional chaining `?.`, nullish coalescing `??`, ...). The
// signageOS runtime that the build injects into the final bundle is added as a raw
// asset, so it bypasses webpack's babel-loader and can still contain such syntax.
// A single Chromium-38-era device then throws `SyntaxError: Unexpected token '?'`
// and the applet never runs. Re-running Babel over the finished bundle guarantees
// the whole file (our code + injected runtime) is ES5-safe.

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const bundlePath = path.join(__dirname, 'dist', 'index.js');
const source = fs.readFileSync(bundlePath, 'utf8');
const result = babel.transformSync(source, {
	presets: [require.resolve('@babel/preset-env')],
	compact: true,
	comments: false,
	babelrc: false,
	configFile: false,
});
fs.writeFileSync(bundlePath, result.code);
console.log('postbuild: transpiled dist/index.js to ES5');
