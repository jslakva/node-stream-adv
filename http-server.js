const http = require('http');
const through = require('through2');
const uppercaser = through(function(buf, _, next){
    this.push(buf.toString().toUpperCase());
    next();
});

const port = Number(process.argv[2]);

const server = http.createServer((req, res)=>{
   if(req.method === 'POST')
       req.pipe(uppercaser).pipe(res);
});
server.listen(port);
