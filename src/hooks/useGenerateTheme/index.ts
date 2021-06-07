import { getNamespace, Modules, RootState, useStore } from '@/store'
import { App, computed } from 'vue'
import { generateColors } from '@/utils/theme/color'
import { writeNewStyle } from '@/utils/theme/writeNewStyle'
import { useThemeFiles } from '@/hooks/useThemeFiles'
import { getStyleTemplate } from '@/utils/theme/getStyleTemplate'
import { SettingsModuleMutations } from '@/store/modules/settings'
import { Store } from 'vuex'

export default function useGenerateTheme (store?: Store<RootState>) {
  if (!store) {
    store = useStore()
  }
  const defaultTheme = computed(() => store?.state.settings.theme || '')
  // 获取element-ui 主题文件内容 通过axios获取的 作为变量替换模板
  const originalStyle = computed(() => store?.state.settings.originalStyle || '')
  // 生成主题
  // 了解element ui 设计 https://juejin.cn/post/6844903960218697741
  const generateTheme = (color: string) => {
    const colors = Object.assign({
      primary: defaultTheme.value
    }, generateColors(color))
    // 写入新的css样式
    /**
     * colors
     light-1: "rgb(83, 168, 255)"
     light-2: "rgb(102, 177, 255)"
     light-3: "rgb(121, 187, 255)"
     light-4: "rgb(140, 197, 255)"
     light-5: "rgb(160, 207, 255)"
     light-6: "rgb(179, 216, 255)"
     light-7: "rgb(198, 226, 255)"
     light-8: "rgb(217, 236, 255)"
     light-9: "rgb(236, 245, 255)"
     primary: "#409EFF"
     shade-1: "rgb(58, 142, 230)"
     */
    writeNewStyle(originalStyle.value, colors)
  }

  // 第一步 远程获取element-ui 主题文件作为模板 然后进行变量替换 替换成我们所选主题色

  const { getThemeChalkStyle } = useThemeFiles()

  if (!originalStyle.value) {
    getThemeChalkStyle().then(
      data => {
        // data是主题文件的css内容
        data = data.replace('fonts/element-icons.woff', '/fonts/element-icons.woff')
        data = data.replace('fonts/element-icons.ttf', '/fonts/element-icons.ttf')
        const styleValue = getStyleTemplate(data as string)
        store && store.commit(getNamespace(Modules.Settings, SettingsModuleMutations.CHANGE_SETTING), {
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
