const crypto = require('crypto');

const pass = process.argv[2];

const dec = crypto.createDecipher('aes256', pass);

process.stdin.pipe(dec).pipe(process.stdout);
