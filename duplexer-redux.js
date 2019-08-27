//const stream = require('stream');
const duplexer = require('duplexer2');
const t2r = require('through2-reduce');
const through = require('through2');


//module.exports = function (counter) {
    //let cnts = {};
    function cnt(prev, curr){
        if(curr.country in prev)
            prev[curr.country]++;
        else
            prev[curr.country] = 1;
        return prev;
    }
    let cntr = t2r.obj(cnt, {});

    cntr.write({"short":"OH","name":"Ohio","country":"US"});
    cntr.write({"short":"OH","name":"Ohio","country":"US"});
    cntr.end();

    //cntr.pipe(through((obj, _, cb)=>{this.push(new Buffer(obj.toString())); cb();})).pipe(process.stdout);

  //  return duplexer(cntr, counter);


/*
    counter.on("data", function (obj) {
        if (typeof cnts[obj.country] === 'undefined')
            cnts[obj.country] = 0;
        cnts[obj.country]++;
        console.log(obj);
    });
    counter.on("end", function () {
        counter.setCounts(cnts);
    });

    return duplexer();

    //return counter;

 */
//};