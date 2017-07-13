# [curriculum-vitae](http://www.honeymorning.com)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![TravisTest](https://travis-ci.org/TaylorPzreal/curriculum-vitae.svg?branch=master)](https://travis-ci.org/TaylorPzreal/curriculum-vitae.svg?branch=master) [![GitHub version](https://badge.fury.io/gh/TaylorPzreal%2Fcurriculum-vitae.svg)](https://badge.fury.io/gh/TaylorPzreal%2Fcurriculum-vitae) [![dependencies](https://david-dm.org/TaylorPzreal%2Fcurriculum-vitae/status.svg)](https://david-dm.org/TaylorPzreal%2Fcurriculum-vitae) 
    个人简历(Curriculum Vitae)
    使用最新技术(Angular4.x + @angular/material2 + Sass + Webpack3.x)构建完美产品; 
    应用亮点技术有e2e, unit-testing, code coverage, 回归测试

## 使用指南
```
git clone git@github.com:TaylorPzreal/curriculum-vitae.git -b master

cd curriculum-vitae

yarn install // My development is node@^7.9.0 npm@^4.2.0

yarn start // 启动本地开发项目

yarn start:browser // 启动本地开发项目, 并自动打开浏览器

yarn build // 打包生产项目

yarn test // 进行单元测试

```
### 端到端测试(End To End Testing) 插件[Protractor](http://www.protractortest.org)
```
yarn global add protractor OR npm i -g protractor
```
添加配置文件 [protractor.conf.js](./protractor.conf.js)
添加e2e文件夹 [e2e](./e2e)

```
yarn start //启动项目服务
protractor protractor.conf.js // 启动e2e testing
```


## 一. 目的
- 追求唯美，可视化，简洁，大方的主题
- 力求代码模块化，通俗易懂，逻辑清晰，实践应用设计模式，继承，工具库
---
## 二. <font color=#07689f> 产品０到１</font>
记录一次产品由无到有的开发过程．

### 1. 产品需求
目前还未看见我希望能体现到的技术的个人简历网站,
需要打造一个唯美,简洁,特色,让人眼前一亮的个人简历(Curriculum Vitae)网站,
并且开源.

### 2. 可行性分析
- 技术可行
- 需求可行
- 资源可行

### 3. 产品需求清单
1. 建立一个3D的个人形象,标示出拥有的各个技能及位置
2. 添加履历小窗口
3. 运用可视化工具(D3, Echarts等)展示相关信息
4. 加入深度学习,AI智能,计算机视觉
5. PWA实践
6. 后期可以翻译成双语(英汉)
7. 可拖拽自定义布局
8. 自定义一个下雨的基于angular4的插件(用上[rollup.js](https://rollupjs.org/))
9. 主题可选择甚至自定义

### 4. 框架
* 基于Angular4.x + @angular/material2
* Karma + jasmine + coverage + protractor + Google Font
* Webpack2.x + Rollup
* d3.js, three.js, lodash, moment, font-awesome, 可拖拽插件(Dragula)
* Koa2.x(OR Express) + Mongodb + Redis

### 5. 开发规划 2017-04-13
- 第一周: 实现前端框架的搭建并做好布局 至2017-04-22
- 第二周: 实现前端基本页面的功能开发 至2017-04-29
- 第三周: 接入Github登录 至2017-05-06
- 第四周: 实现基本后端框架的搭建 至2017-05-13
- 第五周: 实现后端基本功能接口开发 至2017-05-20
- 第六周: 前后端跑通 至2017-05-27
- 第七周: 实现前端复杂功能开发 至2017-06-03
- 第八周: 做收尾工作并发布1.0版本 至2017-06-10

### 6. 功能模块划分
1. 用户模块: 登录, 注册, 找回密码
2. 自定义首页模块(展示基本定义内容)
3. 个人中心模块: 个人信息管理(修改个人信息), 首页管理(自己配置首页样式及内容), 博客管理(统一设置分类, 增删改查), 反馈(向管理员反馈问题)
4. 管理中心模块: 用户管理, 权限管理, 首页管理(可以自己配置新的首页模块), 博客管理(不符合要求的敏感的要进行删除), 反馈管理(对用户反馈进行处理), SEO管理(可视化查看网站浏览量,用户信息等)
5. 博客模块