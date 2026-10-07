#!/bin/bash
# Chạy 1 lần trong thư mục project. Tạo 2 nhánh tính năng và gộp --no-ff để có Merge Node.
set -e
git init -b main
git add .gitignore .env.example package.json package-lock.json README.md
git commit -m "chore: khoi tao project, .gitignore, package.json"

git checkout -b feature/database
git add config.js db.js models/ services/
git commit -m "feat(db): ket noi 2 tai khoan Atlas (read/write), model Book, tinh VAT"

git checkout main
git checkout -b feature/session
git add session.js
git commit -m "feat(session): luu session tap trung tren MongoDB Atlas"

git checkout main
git merge --no-ff feature/database -m "Merge branch 'feature/database' into main"
git merge --no-ff feature/session  -m "Merge branch 'feature/session' into main"

git add server.js views/ git-flow.sh
git commit -m "feat: routes, giao dien Handlebars, footer ho ten/MSSV/VAT"

git log --graph --oneline --all
