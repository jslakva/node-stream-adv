const through = require('through2');

function conv(buf, enc, cb) {
    this.push(buf.toString().toUpperCase());
    cb();
}

const stream = through(conv);

process.stdin.pipe(stream).pipe(process.stdout);
