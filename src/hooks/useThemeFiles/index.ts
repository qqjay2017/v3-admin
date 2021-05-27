import { useFetch } from '../useFetch'
import pkgJson from 'element-plus/package.json'

// 获取element-plus版本
const version = pkgJson.version
export function useThemeFiles () {
  const getThemeChalkStyle = async () => {
    return await useFetch<string>(`//unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`)
  }
  return {
    getThemeChalkStyle
  }
}
