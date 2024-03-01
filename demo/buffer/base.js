// 使用 Buffer.alloc() 创建新的 Buffer，指定大小为 10，并初始化内容为 0
const bufAlloc = Buffer.alloc(10);
console.log('Buffer.alloc():', bufAlloc);

// 创建一个包含 ASCII 编码的字符串的 Buffer
const buffer = Buffer.from('Hello, world!', 'utf-8');
console.log('Buffer 对象:', buffer);

const str = buffer.toString('utf-8');
console.log('转换后的字符串:', str);

// 修改 Buffer 中的内容
buffer[0] = 72; // ASCII 编码中 72 对应的字符是 'H'
console.log('修改后的 Buffer 对象:', buffer);

// 将 Buffer 对象转换为十六进制字符串
const hex = buffer.toString('hex');
console.log('转换为十六进制字符串:', hex);

// 使用 Buffer.allocUnsafe() 创建新的 Buffer，指定大小为 10，但不对内容进行初始化
const bufAllocUnsafe = Buffer.allocUnsafe(10);
console.log('Buffer.allocUnsafe():', bufAllocUnsafe);


const autobuf = Buffer.alloc(10);

// 使用 fill() 方法向 Buffer 中填充数据，填充值为 ASCII 码值为 65（即字符 'A'）
autobuf.fill(65);
console.log('fill() 后的 Buffer:', autobuf);

// 使用 write() 方法向 Buffer 中写入数据，写入的数据为字符串 'Hello'，从偏移量为 1 的位置开始写入
autobuf.write('Hello', 1);
console.log('write() 后的 Buffer:', autobuf);

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);
console.log('uint32array:', uint32array);

const buf1 = Buffer.from("Hello");
const json = JSON.stringify(buf1);
console.log(json); // 输出：{"type":"Buffer","data":[72,101,108,108,111]}