import 'dayjs/locale/zh-cn'
import ElementPlus from 'element-plus'
import { App } from 'vue'
import { TranslateResult, Path } from 'vue-i18n'
import { isMobile } from '@/utils/navigator.isMobile'

// $ELEMENT size属性类型
export type Size = 'default' | 'medium' | 'small' | 'mini'

interface ElementOptions {
  size:Size,
  i18n:(key: Path)=>TranslateResult
}
export default (app:App<HTMLElement>, options:ElementOptions) :void => {
  app.use(ElementPlus, {
    size: isMobile() ? 'mini' : options.size || 'small',
    i18n: options.i18n
  })

  app.config.globalProperties.$ELEMENT = {
    size: isMobile() ? 'mini' : options.size || 'small',
    i18n: options.i18n

  }
}
