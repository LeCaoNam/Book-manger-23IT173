require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const { MSSV, HO_TEN, TIEN_TO, VAT } = require('./config');
const { connectAll } = require('./db');
const { BookRead, BookWrite } = require('./models/book');
const { kiemTraMaSP, tinhGiaSauThue } = require('./services/pricing');
const createSession = require('./session');

const app = express();
app.set('trust proxy', 1); // cần cho cookie secure phía sau proxy của Render

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: { money: (v) => Number(v).toLocaleString('vi-VN') },
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.get('/health', (req, res) => res.send('ok'));
app.use(createSession());

// Dữ liệu dùng chung cho footer + flash message (lưu trong session trên Atlas)
app.use((req, res, next) => {
  res.locals.sv = { hoTen: HO_TEN, mssv: MSSV, vat: VAT };
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  req.session.soLanTruyCap = (req.session.soLanTruyCap || 0) + 1;
  res.locals.soLanTruyCap = req.session.soLanTruyCap;
  next();
});

// Xem danh sách -> dùng tài khoản ĐỌC
app.get('/', async (req, res) => {
  try {
    const books = await BookRead().find().sort({ createdAt: -1 }).lean();
    res.render('index', { books });
  } catch (e) {
    console.error(e);
    res.status(500).render('index', { books: [], error: 'Không đọc được dữ liệu.' });
  }
});

app.get('/add', (req, res) => res.render('add', { tienTo: TIEN_TO, values: {} }));

// Thêm mới -> dùng tài khoản GHI
app.post('/add', async (req, res) => {
  const { maSP = '', tenSach = '', tacGia = '' } = req.body;
  const gia = Number(req.body.gia);
  const values = { maSP, tenSach, tacGia, gia: req.body.gia };
  const loi = (msg) => res.status(400).render('add', { tienTo: TIEN_TO, values, error: msg });

  if (!kiemTraMaSP(maSP.trim())) return loi(`Mã sản phẩm phải bắt đầu bằng "${TIEN_TO}" (3 số cuối MSSV).`);
  if (!tenSach.trim()) return loi('Tên sách không được để trống.');
  if (!Number.isFinite(gia) || gia < 0) return loi('Giá không hợp lệ.');

  try {
    await BookWrite().create({
      maSP: maSP.trim(), tenSach: tenSach.trim(), tacGia: tacGia.trim(),
      gia, vat: VAT, giaSauThue: tinhGiaSauThue(gia),
    });
    req.session.flash = { type: 'ok', msg: 'Đã thêm sách thành công!' };
    res.redirect('/');
  } catch (e) {
    console.error(e);
    loi('Lỗi khi ghi dữ liệu xuống Atlas.');
  }
});

const PORT = process.env.PORT || 3000;
connectAll()
  .then(() => app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`)))
  .catch((e) => { console.error(e); process.exit(1); });
