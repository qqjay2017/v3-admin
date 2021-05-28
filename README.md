## 必备文档

- [vue@3英文文档](https://v3.vuejs.org/guide/introduction.html)
- [vue@3中文文档](https://v3.cn.vuejs.org/api/)
- [vue-router@4英文文档](https://next.router.vuejs.org/)
- [vue-router@4中文文档](https://next.router.vuejs.org/zh/index.html)
- [vuex@4英文文档](https://next.vuex.vuejs.org/)
- [tailwindcss英文文档](https://tailwindcss.com/)
- [better-scroll](https://better-scroll.github.io/docs/zh-CN/guide/)
- [commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-husky)
- [element-plus](https://element-plus.gitee.io/#/zh-CN/component/installation)
- [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
- [css-color-function](https://www.npmjs.com/package/css-color-function)


## 项目文档

> https://www.yuque.com/brolly/hgg6ly/cxt9fq

## 知识点 

- [vue3 路由缓存](https://next.router.vuejs.org/guide/migration/index.html#router-view-keep-alive-and-transition)
- [扩展 RouteMeta 来定义meta类型](https://next.router.vuejs.org/zh/guide/advanced/meta.html)
- [router matched](https://next.router.vuejs.org/zh/api/#matched)
- [config.globalProperties](https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties)
- [参数的动态路由正则匹配]( https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0)

## commitlint



```sh
yarn add @commitlint/cli @commitlint/config-conventional -D
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

```

## 部署

> scp -r  .dist/* root@101.32.10.202:/home/html


## 云原生部署

```
步骤一：安装云开发 CloudBase CLI
CloudBase CLI 集成了 CloudBase Framework) 的能力，全局安装 CloudBase CLI 请运行以下命令：

npm install -g @cloudbase/cli
#步骤二：一键部署
在项目根目录运行以下命令部署 Vue CLI 创建的应用，在部署之前可以先 开通环境

cloudbase init --without-template
cloudbase framework:deploy
```