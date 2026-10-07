// Đa luồng kết nối: 2 connection độc lập, 2 tài khoản khác nhau
const mongoose = require('mongoose');

let readConn, writeConn;

async function connectAll() {
  const { MONGO_URI_READ, MONGO_URI_WRITE } = process.env;
  if (!MONGO_URI_READ || !MONGO_URI_WRITE) {
    throw new Error('Thiếu MONGO_URI_READ hoặc MONGO_URI_WRITE (cấu hình trong biến môi trường).');
  }
  [readConn, writeConn] = await Promise.all([
    mongoose.createConnection(MONGO_URI_READ).asPromise(),
    mongoose.createConnection(MONGO_URI_WRITE).asPromise(),
  ]);
  console.log('✔ Đã kết nối Atlas bằng 2 tài khoản (READ + WRITE)');
}

const getReadConn = () => readConn;
const getWriteConn = () => writeConn;

module.exports = { connectAll, getReadConn, getWriteConn };
