const fs = require('fs');

let fileName = process.argv[2];

fs.createReadStream(fileName).pipe(process.stdout);
