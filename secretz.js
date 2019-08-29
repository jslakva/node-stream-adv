const crypto = require('crypto');
const tar = require('tar');
const zlib = require('zlib');
const thr = require('through2');

const cipherName = process.argv[2];
const cipherPass = process.argv[3];

//const gunzipStream = zlib.createGunzip();
const decryptStream = crypto.createDecipher(cipherName, cipherPass);
const tarParser = new tar.Parse();

function parseTarFile(entry){
    if (entry.type === 'File') {
        let md5 = crypto.createHash('md5', {encoding: 'hex'});
        let filenameadder = thr(function(c, _, cb){
            this.push(c.toString()+' '+entry.path+'\n');
        });
        entry.pipe(md5).pipe(filenameadder).pipe(process.stdout);
        //process.stdout.write('----');
    }
    entry.resume();
}

tarParser.on('entry', parseTarFile);

process.stdin.pipe(decryptStream).pipe(tarParser);

