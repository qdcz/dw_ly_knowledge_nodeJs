const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const logFilePath = 'app.log';
const compressedLogFilePath = 'app.log.gz';

// 创建可读流
const logStream = fs.createReadStream(logFilePath);
const compressStream = zlib.createGzip();

// 创建可写流
const compressedLogStream = fs.createWriteStream(compressedLogFilePath);

// 管道连接，实现数据压缩
logStream.pipe(compressStream).pipe(compressedLogStream);

// 处理压缩完成事件
compressedLogStream.on('finish', () => {
  console.log('日志文件压缩完成。');
});
