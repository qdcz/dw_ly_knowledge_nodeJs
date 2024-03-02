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

const data = "我是签名的数据";

const sign = crypto.createSign("sha256");
sign.update(data);
const signature = sign.sign(privateKey, "base64");

console.log("签名:", signature);


const verify = crypto.createVerify("sha256");
verify.update(data);
const isValid = verify.verify(publicKey, signature, "base64");

console.log("验证结果:", isValid);