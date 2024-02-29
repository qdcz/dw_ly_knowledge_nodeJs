const cluster = require('cluster');
const os = require('os');

// 主进程代码
if (cluster.isMaster) {
    console.log(`主进程 PID: ${process.pid}`);

    // 存储子进程列表
    const workers = [];

    // 根据 CPU 核数创建子进程
    for (let i = 0; i < os.cpus().length; i++) {
        const worker = cluster.fork();
        workers.push(worker);

        // 监听子进程消息事件
        worker.on('message', (message) => {
            console.log(`收到来自子进程 ${worker.process.pid} 的消息：${message}`);
        });
    }

    // 主进程向子进程发送命令行参数
    workers.forEach((worker, index) => {
        worker.send({ command: `command${index + 1}` });
    });

    // 监听主进程退出事件
    process.on('exit', () => {
        console.log('主进程退出，关闭所有子进程...');
        workers.forEach((worker) => {
            worker.kill();
        });
    });

    process.on('SIGINT', () => {
        console.log('收到 SIGINT 信号，准备退出...');
        workers.forEach((worker) => {
            worker.kill();
        });
        // 退出主进程
        process.exit();
    });

    // 监听子进程退出事件
    cluster.on('exit', (worker, code, signal) => {
        console.log(`子进程 ${worker.process.pid} 已退出，退出码：${code}，信号：${signal}`);
        if (code !== 0) {
            console.log(`子进程 ${worker.process.pid} 异常退出，重启子进程...`);
            const newWorker = cluster.fork();
            workers.push(newWorker);
            // 移除已退出的子进程
            const index = workers.indexOf(worker);
            if (index !== -1) {
                workers.splice(index, 1);
            }
        }
    });
}
// 子进程代码
else {
    console.log(`子进程 PID: ${process.pid}`);

    // 监听主进程发送的消息
    process.on('message', (message) => {
        console.log(`子进程收到命令行参数：${JSON.stringify(message)}`);
        if (message === 'exit') {
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

    // 模拟子进程工作
    setInterval(() => {
        console.log(`子进程 ${process.pid} 正在工作...`);
    }, 2000);
}
