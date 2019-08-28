const combine = require('stream-combiner');
const split = require('split2');
const through = require('through2');
const tredux = require('through2-reduce');
const zlib = require('zlib');


module.exports = function () {

    function grouper(prev, cur) {

        if (cur.type === 'genre') {
            this.type = cur.name;
            if (! (this.type in prev))
                prev[this.type] = [];
        }

        if (cur.type === 'book') {
            prev[this.type].push(cur.name);
        }

        return prev;
    }

    const groupStream = tredux({objectMode: true}, grouper, {});

    function groupsToJSON(chunk, _, cb) {
        let genre;
        for (genre in chunk) {
            let genreObj = {
                name: genre,
                books: chunk[genre]
            };
            this.push(JSON.stringify(genreObj) + '\n');
        }

        cb();
    }

    const jsonStream = through({objectMode: true}, groupsToJSON);

    const gzip = zlib.createGzip();

    let result = combine(
        split(JSON.parse),
        groupStream,
        jsonStream,
        gzip
        //process.stdout
        // read newline-separated json,
        // group books into genres,
        // then gzip the output
    );

    return result;
};