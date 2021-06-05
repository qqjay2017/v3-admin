
// 写入新的css样式
import { IObject } from '@/utils/constance'

export function writeNewStyle (originalStyle = '', colors:IObject) {
  Object.keys(colors).forEach(key => {
    const reg = new RegExp('(:|\\s+)' + key, 'g')
    originalStyle = originalStyle.replace(reg, '$1' + colors[key])
  })
  const chalkStyle = document.getElementById('chalk-theme-style')
  // originalStyle 实现变量替换
  if (!chalkStyle) {
    const style = document.createElement('style')
    style.innerText = originalStyle
    style.id = 'chalk-theme-style'
    document.head.appendChild(style)
  } else {
    (chalkStyle as HTMLElement).innerText = originalStyle
  }
}
