<template>
    <div class="document">
      <ul class="file-list">
        <li @click="showReadme()">readme</li>
        <li v-for="i in files" :key="i.originPath" @click="showMarkdown(i.originPath)">
          {{i.fileName}}
        </li>
      </ul>
      <div class="html-wrap markdown-body" v-html="htmlStr"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useMarkdown from '@/views/document/useMarkdown'
import path from 'path'
export default defineComponent({
  name: 'Document',
  setup () {
    const { files } = useMarkdown()
    const curKey = ref('')
    const htmlStr = ref('')

    const showMarkdown = (originPath:string, baseUrl = '@/markdown/') => {
      curKey.value = originPath
      const html = require('@/markdown/' + path.join(originPath))
      htmlStr.value = html
    }
    const showReadme = () => {
      curKey.value = '_readme_'
      const html = require('../../../README.md')
      htmlStr.value = html
    }
    return {
      files,
      htmlStr,
      curKey,
      showMarkdown,
      showReadme
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

      &:nth-child(2n) {
          background-color: $theme;
        color:#fff;
      }
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
