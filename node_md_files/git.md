## git cli

### first
1. 注册内网 gitLab 账户
2. 项目管理员拉我进项目
3. 有了权限后，git clone ‘url’ 项目到本地(拉取代码到本地)
4. 自己创建新的项目分支 git branch ‘分支名’
开始编码吧…

### second
1. git clone 默认是下载了所有分支的代码
2. git branch -r 查看项目所有分支
3. git branch -a 查看项目所有远程分支
4. git checkout ‘分支名’ 切换分支
5. git branch 打印出来所有的分支，以及当前所在分支
6. git log 查看提交记录，退出 英文状态下 `Q`
7. git reflog 可查看修改记录（包括 git reset 的回退记录）
git reset --hard {commit id} 回退版本
git stash //代码放进暂存区(未被 commit 的代码)
git stash apply 还原
git stash drop 清除最近一次的 stash 记录
git stash pop 还原并清除最近一次 stash
git stash list 查看暂存列表
git stash clear 清空所有 stash 的记录
git remote -v 显示所有远程仓库
git remote add url 添加一个远程仓库
git remote rm name # 删除远程仓库
git remote rename old_name new_name # 修改仓库名

1. git add . 添加文件到本地仓库
2. git rm <删除被跟踪的文件名>
3. git rm --cache <删除被跟踪的文件名但是缓存在当前文件>
git commit - m ‘XX’
git push 提交到本地仓库及远程仓库
git merge --abort 回滚到合并之前
git config user.name 查看
git config user.email 查看
git config --global user.name"XX" 修改 git 用户名
git config --global user.email “XX” 修改 git 邮箱地址
git reflog 查看历史变更记录
git reset --hard HEAD@{n} 回退到引用位置
git revert -n {commitHashId} // 回退某一个 commit, 会生成一个新的版本，反转覆盖掉原来的提交代码
获取远程标签
git fetch --tags // 拉取远程标签
git tag // 查看标签
git fetch origin tag 2.4.10 // 用于精确的拉取指定的某个版本，适合运维同学部署指定版本
git tag 2.4.10 //简单方法 1
git tag -a 2.4.10 -m ‘voc-web version 2.4.10’ // 带备注的（常用）
git push origin --tags
git tag -d 2.4.10 //删除了本地的 2.4.10 标签
git push origin :refs/tags/2.4.10 //删除了远程的 2.4.10 标签
npm cache verify 清除 npm 缓存
npm set registry http://registry.npm.taobao.org 修改 下载仓库为淘宝镜像
