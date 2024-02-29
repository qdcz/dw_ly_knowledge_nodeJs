const os = require('os');
const { fork } = require('child_process');

const numCPUs = os.cpus().length;
const childProcesses = [];

// 创建子进程
for (let i = 0; i < numCPUs; i++) {
    const childProcess = fork('./worker.js');

    // 监听子进程退出事件
    childProcess.on('exit', (code, signal) => {
        console.log(`子进程 ${childProcess.pid} 已退出，退出码：${code}，信号：${signal}`);
        // 移除已经退出的子进程
        const index = childProcesses.indexOf(childProcess);
        if (index !== -1) {
            childProcesses.splice(index, 1);
            // 自动重启子进程
            restartChildProcess();
        }
    });

    childProcesses.push(childProcess);
}

// 监听主进程退出事件
process.on('exit', () => {
    console.log("主进程退出事件")
    // 关闭所有子进程
    for (const childProcess of childProcesses) {
        childProcess.kill();
    }
});

process.on('SIGINT', () => {
    console.log('收到 SIGINT 信号，准备退出...');
    // 关闭所有子进程
    for (const childProcess of childProcesses) {
        childProcess.kill();
    }
    // 退出主进程
    process.exit();
});

// 自动重启子进程函数
function restartChildProcess() {
    const newChildProcess = fork('./worker.js');
    childProcesses.push(newChildProcess);
    console.log(`重启子进程 ${newChildProcess.pid}`);
}
