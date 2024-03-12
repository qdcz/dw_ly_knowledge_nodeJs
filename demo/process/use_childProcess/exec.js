const { exec } = require('child_process');

// 执行命令 node child.js arg1 arg2
exec('node ./child.js command001 command002:6666', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


// 进入到指定目录执行命令
const targetDirectory = '/path/to/your/target/directory';
const command = 'npm run build';
exec(command, { cwd: targetDirectory }, (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错： ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});