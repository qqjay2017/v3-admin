// import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import {
  locale,
  ElButton
} from 'element-plus'
import { App } from 'vue'
// $ELEMENT size属性类型
export type Size = 'default' | 'medium' | 'small' | 'mini'

interface ElementOptions {
  size:Size
}
export default (app:App, options:ElementOptions) :void => {
  locale(lang)
  // 按需导入组件列表
  const components = [
    ElButton
  ]

  components.forEach(component => {
    app.component(component.name, component)
  })

  app.config.globalProperties.$ELEMENT = {
    size: options.size || 'small'
  }
}
