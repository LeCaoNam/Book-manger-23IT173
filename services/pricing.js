const { TIEN_TO, VAT } = require('../config');

// Bộ lọc: mã SP phải bắt đầu bằng 3 số cuối MSSV
function kiemTraMaSP(maSP) {
  return typeof maSP === 'string' && maSP.startsWith(TIEN_TO) && maSP.length > TIEN_TO.length;
}

// Giá sau thuế = giá * (1 + VAT/100), làm tròn 2 chữ số thập phân
function tinhGiaSauThue(gia) {
  return Math.round(gia * (100 + VAT)) / 100;
}

module.exports = { kiemTraMaSP, tinhGiaSauThue };
