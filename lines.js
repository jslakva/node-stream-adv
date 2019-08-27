const through = require('through2');
const split = require('split2');

let i = 0;

function conv(buf, enc, cb) {
    this.push(i % 2 ? buf.toString().toUpperCase() : buf.toString().toLowerCase());
    i++;
    this.push('\n');
    cb();
}

const stream = through(conv);

process.stdin.pipe(split()).pipe(stream).pipe(process.stdout);