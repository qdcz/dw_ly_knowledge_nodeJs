const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

const plaintext = "Hello, world!";
const encryptedData = crypto.publicEncrypt(
    publicKey,
    Buffer.from(plaintext, "utf8")
);
const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);

console.log("加密后的数据:", encryptedData.toString("base64"));
console.log("解密后的数据:", decryptedData.toString("utf8"));