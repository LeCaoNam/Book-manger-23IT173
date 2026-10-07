const MSSV = (process.env.MSSV || '').trim();
const HO_TEN = (process.env.HO_TEN || 'Lê Cao Nam').trim();

if (!/\d{3}$/.test(MSSV)) {
  throw new Error('Thiếu hoặc sai MSSV. Hãy đặt biến môi trường MSSV (3 ký tự cuối phải là chữ số).');
}

const TIEN_TO = MSSV.slice(-3);               // 3 số cuối MSSV -> tiền tố mã sản phẩm
const VAT = Number(MSSV.slice(-1)) + 4;       // VAT (%) = chữ số cuối + 4

module.exports = { MSSV, HO_TEN, TIEN_TO, VAT };
