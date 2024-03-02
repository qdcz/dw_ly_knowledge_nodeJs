const crypto = require("crypto");
const data = "Hello, world!";
const hash = crypto.createHash("sha1").update(data).digest("hex");
// console.log("SHA-256 哈希值:", hash);

// console.log("getHashes:", crypto.getHashes());

const fs = require("fs");
const filename = "../process/index.js";
const hash1 = crypto.createHash("sha1");
const fsStream = fs.createReadStream(filename);

// fsStream.on("readable", () => {
//     // 哈希流只会生成一个元素。
//     const data = fsStream.read();
//     if (data) {
//         hash1.update(data);
//     } else {
//         // 数据接收完毕后，输出hash值
//         console.log(`${hash1.digest("hex")} ${filename}`);
//     }
// });

const { Writable } = require("stream");
const write = Writable();
write._write = function (data, enc, next) {
    // 将流中的数据写入底层
    process.stdout.write(hash1.digest("hex") + "\n");
    // 写入完成时，调用`next()`方法通知流传入下一个数据
    process.nextTick(next);
};
// fsStream.pipe(hash1).pipe(process.stdout); // 输出通常会是乱码
fsStream.pipe(hash1).pipe(write);  // 正常输出hash值