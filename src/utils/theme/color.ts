import { formula, IObject } from '@/utils/constance'
import color from 'css-color-function'
export function generateColors (primary: string):IObject {
  const colors:IObject = {}
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value) // 转换成rgba颜色值
  })
  return colors
}
