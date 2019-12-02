const pako = require('pako');
const clipboard = require('clipboardy');
const str = clipboard.readSync().replace(/[^A-Za-z0-9\/\+\-\=]/g, '');
const program = require('commander');
const pkg = require('./package.json');
program.version(pkg.version)
    .option('-c, --clipboard', 'Output to clipboard')
    .option('-f, --format', 'Format output')
    .parse(process.argv);

module.exports = function() {
    const b = Buffer.from(str, 'base64');
    let source = null;
    try {
        source = pako.ungzip(b, {to: 'string'});
    } catch (e) {
        console.error('');
    }
    
    if (program.clipboard) {
        clipboard.writeSync(source);
    } else {
        console.log(source);
    }
};