const spawn = require('child_process');
const duplexer = require('duplexer2');

module.exports = function (cmd, args) {
    const proc = spawn.spawn(cmd, args);
    return duplexer(proc.stdin, proc.stdout);
};

