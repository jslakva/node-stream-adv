const trumpet = require('trumpet');
const through = require('through2');

const uppercaser = through(function(buf, _, next){
    this.push(buf.toString().toUpperCase());
    next();
});

const tr = trumpet();

process.stdin.pipe(tr);
tr.pipe(process.stdout);

const selector = tr.select('.loud');
selector.createReadStream().pipe(uppercaser).pipe(selector.createWriteStream());

//process.stdin.pipe(trumpet().select('.loud').createStream().pipe(uppercaser)).pipe(process.stdout);
