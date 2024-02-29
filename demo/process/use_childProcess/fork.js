const { fork } = require('child_process');

const child = fork('./child.js', ['command001', 'command002:6666']);

child.on('message', (message) => {
  console.log(`父进程收到消息：${message}`);
});

child.send({ hello: 'world' });

// 当子进程退出时
child.on('exit', (code, signal) => {
  console.log(`子进程退出，退出码：${code}，信号：${signal}`);
});
