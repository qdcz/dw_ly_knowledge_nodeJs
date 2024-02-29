// 来自外部调用的命令行参数
console.log('命令行参数:', process.argv);

process.stdin.on('data', (data) => {
    console.log(`父进程发送的数据：${data}`);
});

// 向父进程发送数据
process.stdout.write('Hello, parent process!\n');

// 当子进程退出时
process.on('exit', (code, signal) => {
    console.log(`子进程退出，退出码：${code}，信号：${signal}`);
});

process.exit(0) // 表示正常退出   1表示异常退出

/**
    2：表示某些配置错误，如配置文件不存在或格式错误。
    3：表示权限问题，如无权限访问文件或资源。
    4：表示输入错误，如参数错误或无效输入。
    5：表示网络错误，如连接超时或网络不可达。
    6：表示系统资源不足，如内存耗尽或文件描述符用尽。
    7：表示操作系统错误，如系统调用失败或操作系统不支持。
    8：表示外部依赖错误，如调用外部 API 失败或依赖库未安装
 */