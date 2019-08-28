const duplexer = require('duplexer2');
const t2r = require('through2-reduce');
const through = require('through2');
const stream = require('stream');


module.exports = function (counter) {

    function cnt(prev, curr) {
        if (curr.country in prev)
            prev[curr.country]++;
        else
            prev[curr.country] = 1;
        return prev;
    }

    let cntr = t2r({objectMode: true}, cnt, {});
    cntr.on("data", function (chunk) {
        counter.setCounts(chunk);
    });

    return duplexer({objectMode: true}, cntr, counter);
}

    /*

const objToString = through.obj(function(chunk, _, cb){
    this.push(JSON.stringify(chunk) + '\n');
    cb();
});

class SourceObjStream extends stream.Readable {
    constructor(opt) {
        if (opt !== undefined) {
            opt.objectMode = true;
        } else {
            opt = {objectMode: true};
        }
        super(opt);

        this._countries = [
            {"short":"OH","name":"Ohio","country":"US"},
            {"name":"West Lothian","country":"GB","region":"Scotland"},
            {"short":"NSW","name":"New South Wales","country":"AU"}
        ];
    }

    _read() {
        if(!this._countries.length){
            this.push(null);
        } else {
            let country = this._countries.shift();
            this.push(country);
        }
    }

    setCounts(obj){
        console.log(JSON.stringify(obj));
    }
}*/

//counter = new SourceObjStream();
//s.pipe(objToString).pipe(process.stdout);

//counter.pipe(cntr);//.pipe(objToString).pipe(process.stdout);


//let d = duplexer(cntr, counter);

//d.pipe(objToString).pipe(process.stdout);

//d.pipe(objToString);



//    return d;
//}