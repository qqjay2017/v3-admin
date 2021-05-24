/* eslint-disable */
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


// typings.d.ts or router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    hidden?: boolean
    // 每个路由都必须声明
    icon?: string
    title?: string
  }
}
