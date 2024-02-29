let process = require('node:process');

process.title = 'I am A master process';  // 给进程指定名称

console.log("当前进程的环境变量", process.env)

console.log(`
    当前node版本:${process.version}
    当前CPU的架构:${process.arch}
    当前进程运行的操作系统平台:${process.platform}
    当前进程的内存使用情况，单位bytes:
        heapUsed(V8内存使用量):${process.memoryUsage().heapUsed}
        heapTotal(V8内存量):${process.memoryUsage().heapTotal}
        external(绑定到 V8 管理的 JavaScript 对象的 C++ 对象的内存使用量):${process.memoryUsage().external}
        arrayBuffers(为 ArrayBuffer 和 SharedArrayBuffer 分配的内存，包括所有 Node.js Buffer):${process.memoryUsage().arrayBuffers}
        rss(常驻集大小，是进程在主内存设备（即总分配内存的子集）中占用的空间量，包括所有 C++ 和 JavaScript 对象和代码):${process.memoryUsage().rss}
    当前进程工作目录:${process.cwd()}
    当前进程id:${process.pid}
    当前进程对应的父进程:${process.ppid}
    当前进程已运行时间:${process.uptime()}
    当前进程高分辨时间:${process.hrtime()}
    当前进程的名称 :${process.title}
    Node.js 进程的可执行文件的绝对路径名:${process.execPath}
`);



/**
 * 如果是携带命令启动 node index.js name=cxy,sex=gg
 */

console.log(`
    获取启动该进程传入的参数:${process.argv}
    =>Node的execPath（一般用不到）:${process.argv[0]}
    =>被执行的JS文件路径（一般用不到）:${process.argv[1]}
    =>真实传入命令的参数:${process.argv[2]}   ${process.argv[3]}   ${process.argv[4]}
    =>真实传入命令的参数:${process.execArgv}
`)