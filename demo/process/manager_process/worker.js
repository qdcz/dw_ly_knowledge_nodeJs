// worker.js

// 打印子进程的 PID
console.log(`子进程 PID: ${process.pid}`);

// 定时向主进程发送消息
setInterval(() => {
    process.send({ message: 'Hello from worker!' });
}, 1000);

// 监听主进程发送的消息
process.on('message', (msg) => {
    console.log(`子进程收到消息：${JSON.stringify(msg)}`);
    if (msg === 'exit') {
        // 如果接收到主进程发送的 'exit' 消息，则退出子进程
        process.exit(0);
    }
});

// 捕获未捕获的异常
process.on('uncaughtException', (err) => {
    console.error(`子进程发生了未捕获的异常：${err}`);
    // 在发生异常时，也可以选择退出子进程
    // process.exit(1);
});


process.on('exit', () => {
    console.log("子进程退出事件",process.pid)
    // 关闭所有子进程
    for (const childProcess of childProcesses) {
        childProcess.kill();
    }
});