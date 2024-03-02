const crypto = require("crypto");

// 创建 ECDH 密钥交换对象，指定椭圆曲线类型
const ecdh = crypto.createECDH("secp256k1");

// 生成密钥对
const publicKey = ecdh.generateKeys();
const privateKey = ecdh.getPrivateKey();

console.log("公钥:", publicKey.toString("hex"));
console.log("私钥:", privateKey.toString("hex"));