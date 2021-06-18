
export default function useMarkdown () {
  const dir = require.context('@/markdown', true, /\.md$/)
  const files = dir.keys().map(k => {
    const pathArr = k.split('/').filter(a => a && a !== '.')
    const fileName = pathArr[pathArr.length - 1]

    return {
      originPath: k,
      pathArr,
      fileName
    }
  })
  console.log(files)
  return {
    files
  }
}
