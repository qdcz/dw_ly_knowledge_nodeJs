const { spawn } = require('child_process');

// 启动一个子进程，并执行命令（传参） node child.js arg1 arg2
const childProcess = spawn('node', ['./child.js', 'command001', 'command002:6666']);

// 监听子进程的标准输出流
childProcess.stdout.on('data', (data) => {
    console.log(`子进程输出：${data}`);
});

// 向子进程发送数据
childProcess.stdin.write('Hello, child process!\n');

// 当子进程的标准输出流关闭时
childProcess.stdout.on('close', () => {
    console.log('子进程的标准输出流已关闭');
});

// 当子进程退出时
childProcess.on('exit', (code, signal) => {
    console.log(`子进程退出，退出码：${code}，信号：${signal}`);
});
