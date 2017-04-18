# [curriculum-vitae](http://www.honeymorning.com)
    个人简历(Curriculum Vitae)
    使用最新技术(Angular4.x + Bootstrap4.x + Sass + Webpack2.x)构建完美产品, 应用亮点技术有e2e, unit-testing.

## 使用指南
```
git clone git@github.com:TaylorPzreal/curriculum-vitae.git -b master

cd curriculum-vitae

yarn install // My development is node@^7.9.0 npm@^4.2.0

yarn start // 启动本地开发项目

yarn start:browser // 启动本地开发项目, 并自动打开浏览器

yarn build // 打包生产项目

yarn test // 进行单元测试

yarn run e2e // 进行端到端测试

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

### 4. 框架
* 基于Angular4.x + MaterialDesign(OR Bootstrap4.x)
* Webpack2.x + Rollup
* d3.js, three.js, lodash, moment, font-awesome, 可拖拽插件(Dragula)
* Koa2.x(OR Express) + Mongodb + Redis

### 5. 开发规划 2017-04-13
- 第一周: 实现前端基本框架的搭建 至2017-04-22
- 第二周: 实现前端基本页面的功能开发 至2017-04-29
- 第三周: 接入Github登录 至2017-05-06
- 第四周: 实现基本后端框架的搭建 至2017-05-13
- 第五周: 实现后端基本功能接口开发 至2017-05-20
- 第六周: 前后端跑通 至2017-05-27
- 第七周: 实现前端复杂功能开发 至2017-06-03
- 第八周: 做收尾工作并发布1.0版本 至2017-06-10
