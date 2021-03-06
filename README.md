# vue3 element admin template

## Feature

create project use / vue-cli@4 / vue@3 / typescript@4 /  element-plus@1 /  vue-i18n@9  and vuex@4 vue-router@4  

[preview online](https://my-vue-starter-1258857408.cos-website.ap-guangzhou.myqcloud.com)

## 已实现

1. 全局i18n覆盖



## TODO

1. 动态css加载问题

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
- [github action](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)


## 项目搭建文档

> https://www.yuque.com/brolly/hgg6ly/cxt9fq

## TODO

1. 命令行下载模板创建项目
2. 命令行创建标准页面

## 知识点 

- [vue3 路由缓存](https://next.router.vuejs.org/guide/migration/index.html#router-view-keep-alive-and-transition)
- [扩展 RouteMeta 来定义meta类型](https://next.router.vuejs.org/zh/guide/advanced/meta.html)
- [router matched](https://next.router.vuejs.org/zh/api/#matched)
- [config.globalProperties](https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties)
- [参数的动态路由正则匹配]( https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0)

## 代码提交规范

[说明文档](https://github.com/qqjay2017/react_typescript_webpack_test)

```sh
yarn add @commitlint/cli @commitlint/config-conventional -D
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

```



## 部署

#### 腾讯云部署

> scp -r  .dist/* root@101.32.10.202:/home/html


####  腾讯云cloudBase

```
步骤一：安装云开发 CloudBase CLI

npm install -g @cloudbase/cli


#步骤二：一键部署

tcb init --without-template

tcb framework:deploy

```

tcb login --apiKeyId {{secrets.secretId}}  --apiKey  {{secrets.secretKey}}


#### docker部署

```json
{
    "docker:build": "docker build . -t vue3-element-admin",
    "docker:run": "docker run -d -p 7000:7000 vue3-element-admin"
}
```



#### 动态key

```ts
// 定义state
const state: ISettingsState = {
  theme: variables.theme,
  tagsView: true,
  originalStyle: '',
  sidebarLogo: true
}

// 动态key的情况下 根据不同的key 约束对应value
// http://www.voidcn.com/article/p-wtmkdcie-byz.html
type ValueOf<T> = T[keyof T];
interface ISettings { // 约束payload类型
  key: keyof ISettingsState; // 约束为ISettingsState中key
  value: ValueOf<ISettingsState>; // 约束为ISettingsState中value的类型
}
// 定义mutations
const mutations: MutationTree<ISettingsState> = {
  CHANGE_SETTING(state, { key, value }: ISettings) {
    if (key in state) {
      (state[key] as ValueOf<ISettingsState>) = value
    }
  }
}


```

#### 支持markdown

```sh
yarn add html-loader@1 markdown-loader -D
```