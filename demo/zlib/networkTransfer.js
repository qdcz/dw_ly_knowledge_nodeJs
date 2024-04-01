const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

// 创建HTTP服务器
http.createServer((req, res) => {
  const filePath = 'big-file.txt';
  const fileStream = fs.createReadStream(filePath);

  // 对数据进行压缩并发送给客户端
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Encoding': 'gzip' // 指定压缩算法
  });
  fileStream.pipe(zlib.createGzip()).pipe(res);

}).listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});

// 客户端解压缩数据
const http = require('http');
const zlib = require('zlib');

http.get('http://localhost:3000/', (res) => {
  const unzipStream = zlib.createGunzip();
  res.pipe(unzipStream);
  
  unzipStream.on('data', (chunk) => {
    console.log(chunk.toString());
  });
});
