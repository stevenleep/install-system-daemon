const path = require('path');

// Get the current working directory
const cwd = process.cwd();

// Get the path to the current working directory relative to the project root
const relativeCwd = path.relative(__dirname, cwd);
const root = path.resolve(__dirname, relativeCwd);

const static = path.resolve(root, 'static');
const staticEntryHtml = path.resolve(static, 'index.html');
const lib = path.resolve(root, 'lib');

module.exports = {
    root,
    cwd,
    relativeCwd,
    static,
    staticEntryHtml,
    lib
}