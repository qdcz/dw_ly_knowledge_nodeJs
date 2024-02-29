const { execFile } = require('child_process');

// 执行命令 node child.js arg1 arg2
execFile('node', ['./child.js', 'command001', 'command002:6666'], (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
