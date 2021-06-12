import i18n from '@/locales'

export interface IObject {
  [prop: string]: string
}
// 主题色的渐变色设计 https://juejin.cn/post/6844903960218697741
// color-mod css颜色函数
// https://www.w3cplus.com/css4/color-mod.html
export const formula: IObject = {
  'shade-1': 'color(primary shade(10%))',
  'light-1': 'color(primary tint(10%))',
  'light-2': 'color(primary tint(20%))',
  'light-3': 'color(primary tint(30%))',
  'light-4': 'color(primary tint(40%))',
  'light-5': 'color(primary tint(50%))',
  'light-6': 'color(primary tint(60%))',
  'light-7': 'color(primary tint(70%))',
  'light-8': 'color(primary tint(80%))',
  'light-9': 'color(primary tint(90%))'
}

export const giteeRedirectUri = location.origin + '/#/login-gitee'
