#!/usr/bin/env node

/**
 * Checks that the inline scripts of Marketplace-eligible single-file applets
 * parse as ES5.
 *
 * Single-file applets are served to the device verbatim — nothing transpiles
 * them — so any ES6+ syntax (async/await, arrow functions, template literals,
 * let/const, spread, destructuring) is a parse error on older signage
 * webviews, and the whole script silently fails to run.
 *
 * Only applets whose `marketplace.json` has `"eligible": true` are checked:
 * those are the ones published to the Solution Hub, so they have to run on the
 * full range of supported devices. Use `--all` to check every single-file
 * applet regardless.
 *
 * Usage: node tools/check-es5.js [options] [path...]
 *
 *   path         File or directory to search. Defaults to `examples/`.
 *   --all        Check every single-file applet, ignoring marketplace.json.
 *   -v           Also list the files that pass.
 *   -h           Show this help.
 *
 * Exits non-zero when any checked file contains non-ES5 syntax.
 */

const fs = require('fs');
const path = require('path');

let acorn;
try {
	acorn = require('acorn');
} catch (error) {
	console.error('Cannot find the "acorn" parser. Run `npm install` first.');
	process.exit(2);
}

const ECMA_VERSION = 5;
const ROOT = path.resolve(__dirname, '..');
const DEFAULT_ROOT = path.join(ROOT, 'examples');
const MANIFEST = 'marketplace.json';
const APPLET_DIR = 'singlefile-applet';

// Script types the browser executes as classic JavaScript. Anything else
// (application/json, text/x-template, …) is data, not code.
const JS_TYPES = ['application/ecmascript', 'application/javascript', 'text/javascript'];

function usage(exitCode) {
	console.log('Usage: node tools/check-es5.js [--all] [-v] [-h] [path...]');
	console.log();
	console.log('Checks that inline scripts in single-file applets parse as ES' + ECMA_VERSION + '.');
	console.log('By default only applets whose ' + MANIFEST + ' has "eligible": true are');
	console.log('checked, searching under examples/.');
	console.log();
	console.log('  --all  Check every single-file applet, ignoring ' + MANIFEST);
	console.log('  -v     Also list the files that pass');
	console.log('  -h     Show this help');
	process.exit(exitCode);
}

/** Repo-relative path when the file lives inside the repo, absolute otherwise. */
function displayPath(file) {
	const relative = path.relative(ROOT, file);
	return relative.indexOf('..') === 0 ? file : relative;
}

function subdirectories(dir) {
	return fs.readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && entry.name !== 'node_modules');
}

function appletHtmlFiles(appletDir) {
	const dir = path.join(appletDir, APPLET_DIR);
	if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
		return [];
	}
	return fs.readdirSync(dir)
		.filter((name) => name.endsWith('.html'))
		.map((name) => path.join(dir, name));
}

/**
 * Walk for applets that declare `"eligible": true` in their marketplace.json.
 * Also records what was skipped, so the summary can say what is not covered.
 */
function collectEligible(dir, acc) {
	const manifestPath = path.join(dir, MANIFEST);

	if (fs.existsSync(manifestPath)) {
		let manifest;
		try {
			manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
		} catch (error) {
			// Never skip an applet silently because its manifest is unreadable —
			// that would quietly drop it out of the check.
			console.error('Cannot parse ' + displayPath(manifestPath) + ': ' + error.message);
			process.exit(2);
		}

		if (manifest.eligible === true) {
			const files = appletHtmlFiles(dir);
			if (files.length) {
				acc.files.push.apply(acc.files, files);
			} else {
				acc.noApplet.push(dir);
			}
		} else {
			acc.notEligible.push(dir);
		}
	}

	for (const entry of subdirectories(dir)) {
		collectEligible(path.join(dir, entry.name), acc);
	}
	return acc;
}

/** Walk for every `singlefile-applet/*.html`, used by --all. */
function collectAll(dir, found) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== 'node_modules') {
				collectAll(full, found);
			}
		} else if (entry.isFile() && entry.name.endsWith('.html') && path.basename(dir) === APPLET_DIR) {
			found.push(full);
		}
	}
	return found;
}

function resolveTargets(args, all) {
	const roots = args.length ? args.map((arg) => path.resolve(ROOT, arg)) : [DEFAULT_ROOT];
	const acc = { files: [], notEligible: [], noApplet: [], explicit: 0 };

	for (const root of roots) {
		if (!fs.existsSync(root)) {
			console.error('No such file or directory: ' + root);
			process.exit(2);
		}
		if (!fs.statSync(root).isDirectory()) {
			// An explicitly named file is checked as given, filter or not.
			acc.files.push(root);
			acc.explicit++;
		} else if (all) {
			collectAll(root, acc.files);
		} else {
			collectEligible(root, acc);
		}
	}

	acc.files = acc.files.filter((file, index) => acc.files.indexOf(file) === index).sort();
	return acc;
}

/**
 * Extract the executable inline scripts of an HTML file, each with the offset
 * at which its body starts, so parse errors can be reported against the HTML.
 */
function inlineScripts(html) {
	const scripts = [];
	const tag = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
	let match;

	while ((match = tag.exec(html)) !== null) {
		const attributes = match[1] || '';
		// External scripts are not ours to check.
		if (/\bsrc\s*=/i.test(attributes)) {
			continue;
		}
		const typeMatch = attributes.match(/\btype\s*=\s*["']?([^"'\s>]+)/i);
		const type = typeMatch ? typeMatch[1].toLowerCase() : '';
		if (type && JS_TYPES.indexOf(type) === -1) {
			// `type="module"` is ES6 by definition; anything else is data.
			if (type === 'module') {
				scripts.push({ body: match[2], start: match.index, module: true });
			}
			continue;
		}
		scripts.push({ body: match[2], start: match.index + match[0].indexOf('>') + 1 });
	}
	return scripts;
}

/** 1-based line and column of an absolute offset within `text`. */
function positionAt(text, offset) {
	const before = text.slice(0, offset);
	const line = before.split('\n').length;
	return { line: line, column: offset - (before.lastIndexOf('\n') + 1) };
}

function checkFile(file) {
	const html = fs.readFileSync(file, 'utf8');
	const problems = [];

	for (const script of inlineScripts(html)) {
		if (script.module) {
			const at = positionAt(html, script.start);
			problems.push({ line: at.line, column: at.column + 1, message: '<script type="module"> is ES6 by definition' });
			continue;
		}
		try {
			acorn.parse(script.body, { ecmaVersion: ECMA_VERSION, locations: true });
		} catch (error) {
			// acorn reports a position inside the script body; translate it to
			// the surrounding HTML file so the output is clickable.
			const at = positionAt(html, script.start + (error.pos || 0));
			problems.push({
				line: at.line,
				column: at.column + 1,
				message: String(error.message).replace(/\s*\(\d+:\d+\)\s*$/, ''),
			});
		}
	}

	return { file: file, problems: problems, lines: html.split('\n') };
}

const args = process.argv.slice(2);
if (args.indexOf('-h') !== -1 || args.indexOf('--help') !== -1) {
	usage(0);
}
const all = args.indexOf('--all') !== -1;
const verbose = args.indexOf('-v') !== -1 || args.indexOf('--verbose') !== -1;
const found = resolveTargets(args.filter((arg) => arg.charAt(0) !== '-'), all);

for (const dir of found.noApplet) {
	console.log('  note  ' + displayPath(dir) + ' is Marketplace-eligible but has no ' + APPLET_DIR + '/');
}

if (!found.files.length) {
	if (all) {
		console.error('No single-file applets found.');
	} else {
		console.error('No Marketplace-eligible single-file applets found — every applet in the');
		console.error('search path has ' + MANIFEST + ' missing or not "eligible": true. Use --all');
		console.error('to check them anyway.');
	}
	process.exit(2);
}

const failed = [];
const passed = [];

for (const target of found.files) {
	const result = checkFile(target);
	const relative = displayPath(target);

	if (!result.problems.length) {
		passed.push(relative);
		if (verbose) {
			console.log('  ok    ' + relative);
		}
		continue;
	}

	failed.push(relative);
	for (const problem of result.problems) {
		const source = result.lines[problem.line - 1] || '';
		console.log('  FAIL  ' + relative + ':' + problem.line + ':' + problem.column);
		console.log('        ' + problem.message);
		console.log('        | ' + source.replace(/\t/g, '    ').trimEnd());
	}
}

// Only claim "Marketplace-eligible" when the filter actually selected everything
// that was checked — explicitly named files bypass it.
const filtered = !all && !found.explicit;

console.log();
console.log(
	found.files.length + (filtered ? ' Marketplace-eligible' : '') + ' single-file applet(s)' +
	' checked against ES' + ECMA_VERSION + ': ' +
	passed.length + ' ok, ' + failed.length + ' with non-ES' + ECMA_VERSION + ' syntax.'
);
if (!all && found.notEligible.length) {
	console.log(found.notEligible.length + ' applet(s) skipped: ' + MANIFEST + ' is not "eligible": true.');
}

if (failed.length) {
	console.log();
	console.log('Inline applet scripts are shipped to the device untranspiled, so the');
	console.log('whole script fails to parse on older webviews. Rewrite the reported');
	console.log('syntax in ES' + ECMA_VERSION + ' (var, function, string concatenation, .then()).');
	process.exit(1);
}
