#!/bin/zsh sh

echo '======= start deploy ======'

# 确保脚本抛出遇到的错误
# set -e

# 生成静态文件
# npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist
echo '======= cd ======'

# 如果是发布到自定义域名

# git init
# git add -A
# git commit -m 'deploy'


# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f https://github.com/adodo0829/blogs.git master:gh-pages

# 返回上一次的目录
# cd -