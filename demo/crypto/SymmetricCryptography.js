const crypto = require("crypto");

const algorithm = "aes-128-cbc"; // 加密解密的类型
// 加密解密的密钥：密钥必须是 8/16/32 位，
// 如果加密算法是 128，则对应的密钥是 16 位，
// 如果加密算法是 256，则对应的密钥是 32 位；
const key = "abcdefg123456789";
const iv = Buffer.alloc(16, 0); // 使用零向量作为初始向量
const cipher = crypto.createCipheriv(algorithm, key, iv);


/**
 * key 和 iv 两个参数都必须是 'utf8' 编码的字符串、Buffer、 TypedArray 或 DataView。
 * key 可以是 secret 类型的 KeyObject。 如果密码不需要初始化向量，则 iv 可以为 null。
 */
let encryptedData = cipher.update("我就是要加密的内容", "utf8", "hex");
encryptedData += cipher.final("hex");

console.log("加密后的数据:", encryptedData);