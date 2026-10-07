const mongoose = require('mongoose');
const { getReadConn, getWriteConn } = require('../db');

const schema = new mongoose.Schema(
  {
    maSP: { type: String, required: true },
    tenSach: { type: String, required: true },
    tacGia: { type: String, default: '' },
    gia: { type: Number, required: true },        // giá gốc
    vat: { type: Number, required: true },        // % VAT đã áp dụng
    giaSauThue: { type: Number, required: true }, // giá sau thuế
    createdAt: { type: Date, default: Date.now },
  },
  { autoIndex: false, autoCreate: false, collection: 'books' }
);


const BookRead = () => getReadConn().model('Book', schema);
const BookWrite = () => getWriteConn().model('Book', schema);

module.exports = { BookRead, BookWrite };
