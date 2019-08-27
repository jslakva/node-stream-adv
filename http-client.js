const http = require('http');
const request = require('request');

const url = 'http://localhost:8099/';

//const r = request.post(url);
//process.stdin.pipe(r);
//r.pipe(process.stdout);
process.stdin.pipe(request.post(url)).pipe(process.stdout);