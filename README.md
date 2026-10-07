# Quản lý Sách — Điện toán đám mây (giữa kì)

Node.js/Express + Handlebars + MongoDB Atlas (2 tài khoản least-privilege) + session lưu trên Atlas.

## Chạy local
1. `Copy-Item .env.example .env` (PowerShell) hoặc `cp .env.example .env`, rồi điền SESSION_SECRET và 2 chuỗi kết nối
2. `npm install && npm start`  → http://localhost:3000

## Cá nhân hóa (MSSV 23IT173)
- Tiền tố mã sản phẩm: 3 số cuối MSSV = `173`
- VAT = (chữ số cuối + 4)% = 7%

## Biến môi trường (đặt trên Render > Environment)
`MSSV`, `HO_TEN`, `SESSION_SECRET`, `MONGO_URI_READ`, `MONGO_URI_WRITE`, `NODE_ENV=production`

## Phân quyền Atlas
- `read_23IT173`: built-in role **read** trên DB_23IT173
- `write_23IT173`: custom role — INSERT trên `books`; FIND/INSERT/UPDATE/REMOVE trên `sessions`
