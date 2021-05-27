import { getNamespace, Modules, useStore } from '@/store'
import { computed } from 'vue'
import { generateColors } from '@/utils/theme/color'
import { writeNewStyle } from '@/utils/theme/writeNewStyle'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/theme/getStyleTemplate'
import { SettingsModuleMutations } from '@/store/modules/settings'

export default function useGenerateTheme () {
  const store = useStore()
  const defaultTheme = computed(() => store.state.settings.theme)
  // 获取element-ui 主题文件内容 通过axios获取的 作为变量替换模板
  const originalStyle = computed(() => store.state.settings.originalStyle)
  // 生成主题
  // 了解element ui 设计 https://juejin.cn/post/6844903960218697741
  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    }, generateColors(color))
    // 写入新的css样式
    writeNewStyle(originalStyle.value, colors)
  }

  // 第一步 远程获取element-ui 主题文件作为模板 然后进行变量替换 替换成我们所选主题色

  const { getThemeChalkStyle } = useThemeFiles()

  if (!originalStyle.value) {
    getThemeChalkStyle().then(
      data => {
        data = data.replace('fonts/element-icons.woff', '/fonts/element-icons.woff')
        data = data.replace('fonts/element-icons.ttf', '/fonts/element-icons.ttf')
        const styleValue = getStyleTemplate(data as string)
        store.commit(getNamespace(Modules.Settings, SettingsModuleMutations.CHANGE_SETTING), {
          key: 'originalStyle',
          value: styleValue
        })
        generateTheme(defaultTheme.value)
      }
    )
  } else {
    generateTheme(defaultTheme.value)
  }
  return {
    generateTheme
  }
}
