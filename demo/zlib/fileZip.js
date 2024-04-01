const zlib = require("zlib");
const fs = require("fs");

// 压缩文件
const input = fs.createReadStream("big-file.txt");
const output = fs.createWriteStream("big-file.txt.gz");
input.pipe(zlib.createGzip()).pipe(output);

// 解压缩文件
// const inputGzip = fs.createReadStream("big-file.txt.gz");
// const outputUnzip = fs.createWriteStream("big-file-unzipped.txt");
// inputGzip.pipe(zlib.createGunzip()).pipe(outputUnzip);
