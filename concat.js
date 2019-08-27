const concat = require('concat-stream');

const cstream = concat(data=>{
    console.log( data.toString().split('').reverse().join('') );

});

process.stdin.pipe(cstream);
