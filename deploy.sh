#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建no
npm run build

# cd 到构建输出的目录下 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
git push -f git@gitee.com:deep-brez/deep-brez.git master

cd -