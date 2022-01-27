# ICAN-UI 节能宝

## 注意

凡是以这个模板开发的项目, 都需要从这个项目的 `master` 分支分发出去, 改动文件规则请看规则

如果安装 `yarn` or `npm i` 缓慢, 请先更换为中国镜像. 这里推荐用自带 `CMD` or `PowerShell` 否则有权限问题

```
npm set registry https://registry.npm.taobao.org
npm set disturl https://npm.taobao.org/dist
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
```

`Mac OS` 系统等 `Linux` 系统需要加 `sudo` 前缀以提高权限

## 上手开发

> 推荐使用 `git bash`

- 克隆项目代码
- 预装好 `node.js 12+` 安装包
- 安装项目的依赖 `yarn` (需要预装，命令：`npm i -g yarn`)
- 拷贝 `cp .env .env.local`
- 修改开发环境代理 ip 配置 文件在 `.env.local`
- 确认安装依赖无错，即可运行 `yarn serve`
- 提交使用 `yarn cz` 尽量使用命令提交, 冲突等等可不用

## 规范命名

- `views/` 文件夹下全部使用小写：`com.company.project.ui`。但如果是两个单词还是使用变量使用首字母小写的驼峰命名法（Mixed Case）：`studentName`。
- 除了 `views/` 其他使用驼峰命名法（Camel Case）：`VelocityResponseWriter`。
- `views/` 文件夹下 `Components` 代表确实意义的用大写表示文件夹。
- `*.vue|ts|js|css|scss` 等文件使用小写命名，但如果是两个单词还是用使用驼峰命名法（Camel Case）：`VelocityResponseWriter`。
- `ts interface` 类型名称使用驼峰命名法（Camel Case）：`VelocityResponseWriter`。
- 变量名使用变量使用首字母小写的驼峰命名法（Mixed Case）：`studentName`。
- 全局常量使用大写: `MAX_PARAMETER_COUNT = 100`。

## 部署说明

- 确认 gitlab-ci 有正常运行
- 部署正式站，切换到 master 分支 运行 ./master 进行合并分支，不需要 git pull, 然后 git push -f
- 测试没问题后，切换到 deploy-master 运行 git reset --hard origin/master 以进行部署，git push -f 完成部署
- 测试站同理

## Git 管理必读

https://juejin.im/post/5aa7e8a6f265da239f070d82

## Git 提交必须

https://zhuanlan.zhihu.com/p/51894196

## 产品设计图获取

https://www.yuque.com
私有画板图

## 快捷入口

具体配置: `./src/const/env.ts#L57`

## 具体见 Wiki
