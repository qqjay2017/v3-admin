<template>
  <el-card
    class="card"
    shadow="never"
    style="border-radius: 8px;"
  >
    <div>
      <span>依赖信息</span>
      <div style="float: right">
        部署时间:{{ updateTime }}
      </div>
    </div>

    <div class="bottom-btn">
      <a
        v-for="i in docList"
        :key="i.url"
        target="_blank"
        :href="i.url"
      >
        <el-button type="primary">
         {{i.label}}
        </el-button>
      </a>

    </div>
    <table class="table">
      <tr>
        <td>@vue/cli版本</td>
        <td>{{ devDependencies["@vue/cli-service"] }}</td>
        <td>vue版本</td>
        <td>{{ dependencies["vue"] }}</td>
      </tr>
      <tr>
        <td>vue-router版本</td>
        <td>{{ dependencies["vue-router"] }}</td>
        <td>vuex版本</td>
        <td>{{ dependencies["vuex"] }}</td>
      </tr>

      <tr>
        <td>husky版本</td>
        <td>{{ devDependencies["husky"] }}</td>
        <td>normalize版本</td>
        <td>{{ dependencies["normalize.css"] }}</td>
      </tr>
      <tr>
        <td>eslint版本</td>
        <td>{{ devDependencies["eslint"] }}</td>
        <td>sass版本</td>
        <td>{{ devDependencies["sass"] }}</td>
      </tr>
      <tr>
        <td>dayjs版本</td>
        <td>{{ dependencies["dayjs"] }}</td>
        <td>typescript版本</td>
        <td>{{ devDependencies["typescript"] }}</td>

      </tr>
    </table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { dependencies, devDependencies } from '../../../package.json'

const docList = [
  {
    url: 'https://github.com/vuejs/vue-next',
    label: 'vue3.x'
  },
  {
    url: 'https://element-plus.gitee.io/#/zh-CN',
    label: 'element-plus'
  },

  {
    url: 'https://github.com/intlify/vue-i18n-next',
    label: 'vue-i18n-next'
  },
  {
    url: 'https://next.router.vuejs.org/zh/index.html',
    label: 'vue-router4.x'
  },
  {
    url: 'https://next.vuex.vuejs.org/',
    label: 'vuex4.x'
  },
  {
    url: 'https://commitlint.js.org/#/guides-local-setup?id=install-husky',
    label: 'commitlint'
  }

]
export default defineComponent({
  name: 'DependsTable',
  setup () {
    const state = reactive({
      updateTime: process.env.VUE_APP_UPDATE_TIME
    })
    return {
      dependencies,
      devDependencies,
      docList,
      ...toRefs(state)
    }
  }
})

</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;
  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;
    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}
.bottom-btn {
  button {
    margin: 16px 10px 15px 0;
  }
}
</style>
