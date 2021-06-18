<template>
    <div class="document">
      <ul class="file-list">
        <li @click="showReadme()" :style="getLiStyle('_readme_')">readme</li>
        <li v-for="i in files" :key="i.originPath" @click="showMarkdown(i.originPath)"
            :style="getLiStyle(i.originPath)"
        >
          {{i.fileName}}
        </li>
      </ul>
      <div class="html-wrap markdown-body" v-html="htmlStr"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import useMarkdown from '@/views/document/useMarkdown'
import path from 'path'
import hljs from 'highlight.js'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Document',
  setup () {
    const { files } = useMarkdown()
    const store = useStore()
    const curKey = ref('')
    const htmlStr = ref('')

    const setHtml = (html:string) => {
      htmlStr.value = html
      highlightCode()
    }

    const showMarkdown = (originPath:string, baseUrl = '@/markdown/') => {
      curKey.value = originPath
      const html = require('@/markdown/' + path.join(originPath))
      setHtml(html)
    }

    const highlightCode = () => {
      nextTick(() => {
        const preEl = document.querySelectorAll('code')
        preEl.forEach((el) => {
          if (el.classList && el.classList.length) {
            const language = el.classList[0].split('-')[1]
            if (language) {
              el.innerHTML = hljs.highlight(el.innerText, {
                language
              }).value
            }
          }
        })
      })
    }
    const showReadme = () => {
      curKey.value = '_readme_'
      const html = require('../../../README.md')
      setHtml(html)
    }

    const theme = computed(() => {
      return store.state.settings.theme
    })
    const getLiStyle = (path:string) => {
      if (curKey.value && curKey.value === path) {
        return {
          backgroundColor: theme.value,
          color: '#fff'
        }
      } else {
        return {
          backgroundColor: '#fff'

        }
      }
    }

    onMounted(() => {
      showReadme()
    })

    return {
      files,
      htmlStr,
      curKey,
      showMarkdown,
      showReadme,
      getLiStyle,
      theme
    }
  }
})
</script>

<style lang="scss">
.markdown-body {
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
@import "../../styles/variables";
@import "~github-markdown-css/github-markdown.css";
@import "~highlight.js/styles/github.css";
.document {
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
  .file-list {
    position: sticky;
    left: 0;
    top:84px;
    margin: 0;
    padding:0;
    width: 20%;
    max-width: 180px;
    height: 100%;
    li {
      cursor: pointer;
      line-height: 18px;
      font-size: 14px;
      padding:8px 12px;
    }
  }
  .html-wrap {
    padding:16px;
    width: 88%;
    height: 100%;
    overflow: auto;
  }

}

@media (max-width: 792px){
  .document{
    .html-wrap{
      padding:8px;
    }
  }}

</style>
