const Readable = require("stream").Readable;

// Stream 实现
class MyReadable extends Readable {
    constructor(dataSource, options) {
        super(options);
        this.dataSource = dataSource;
    }
    // 实现自定义的数据生成逻辑
    // 生成的数据可以通过 push 方法发送给消费者
    _read() {
        const data = this.dataSource.makeData();
        // setTimeout(() => {
        this.push(data);
        // }, 1);
    }
    // 自定义的状态处理逻辑
    _readableState() {}

    // 自定义的清理逻辑
    _destroy(err, callback) {
        callback(err);
    }
    // 自定义的数据推送逻辑
    push(chunk, encoding) {
        super.push(chunk, encoding);
    }
}

// 模拟资源池
const dataSource = {
    data: new Array(1000).fill(0).map((i, index) => (i = "流动数据" + index)),
    // 每次读取时 pop 一个数据
    makeData() {
        if (!dataSource.data.length) return null;
        return dataSource.data.pop();
    },
};

const myReadable = new MyReadable(dataSource);

myReadable.setEncoding("utf8");
myReadable.on("data", (chunk) => {
    console.log("data:", chunk);
});

let once = false;
myReadable.on("readable", (chunk) => {
    console.log(
        "_readableState.buffer.length",
        myReadable._readableState.buffer.length
    );
    if (once) return;
    once = true;
    let a = myReadable.read();
    console.log("只限制了可读取一次", a);
});
