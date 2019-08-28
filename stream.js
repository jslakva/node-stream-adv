const through = require('through2');
const streams = require('stream');
const tr = require('through2-reduce');

const testStream = through(function t(chunk, _, cb){
    this.push(chunk.toString().toUpperCase());
    cb();
});

// wordifies object stream makes it possible to pipe to regular string/buffer stream
const testObjStream = through.obj(function tobj(chunk, _, cb){
    this.push(chunk.word);
    cb();
});

// counts number of words starting with each letter
function reduxFunction(prev, cur){
    if (cur.word[0] in prev)
        prev[cur.word[0]]++;
    else
        prev[cur.word[0]] = 1;
    return prev;
}

const testReduxStream = tr({objectMode: true}, reduxFunction, {});

const objToString = through.obj(function(chunk, _, cb){
    this.push(JSON.stringify(chunk) + '\n');
    cb();
});

class SourceStream extends streams.Readable {
    constructor(opt) {
        super(opt);
        this._words = ['Apple', 'Banana', 'Cider', 'Dry wine', 'Eggplant', 'Grapefruit', 'Honey', 'Aragula', 'Brie', 'Duck', 'Grape'];
    }

    _read() {
        if (!this._words.length) {
            this.push(null);
        } else {
            //let word = this._words.shift();
            this.push(this._words.shift());
        }
    }
}

class SourceObjStream extends SourceStream {
    constructor(opt) {
        if (opt !== undefined) {
            opt.objectMode = true;
        } else {
            opt = {objectMode: true};
        }
        super(opt);
    }

    _read() {
        if(!this._words.length){
            this.push(null);
        } else {
            let word = this._words.shift();
            this.push({word:word, remainder: this._words.length, num: word.length});
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const s = new SourceObjStream();

//s.pipe(testObjStream).pipe(testStream).pipe(process.stdout);

s.pipe(testReduxStream).pipe(objToString).pipe(process.stdout);