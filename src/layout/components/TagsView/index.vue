<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <!-- 一个个tag view就是router-link -->
      <router-link
        class="tags-view-item"
        :class="{
          active: isActive(tag)
        }"
        v-for="(tag, index) in visitedTags"
        :key="index"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
      >
        {{ tag.meta.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { RouteLocationNormalizedLoaded, RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { tagsViewStore } from '@/store/modules/tagsView'

export default defineComponent({
  name: 'TagsView',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const visitedTags = computed(() => tagsViewStore.visitedViews)
    // 添加tag
    const addTags = () => {
      const { name } = route

      if (name) {
        tagsViewStore.ADD_VISITED_VIEW({
          fullPath: route.fullPath,
          hash: route.hash,
          matched: route.matched,
          meta: route.meta,
          name: route.name,
          params: route.params,
          path: route.path,
          query: route.query,
          redirectedFrom: route.redirectedFrom
        })
      }
    }
    // 路径发生变化追加tags view
    watch(() => route.path, () => {
      addTags()
    })

    // 最近当前router到tags view
    onMounted(() => {
      addTags()
    })

    // 是否是当前应该激活的tag
    const isActive = (tag: RouteRecordRaw) => {
      return tag.path === route.path
    }

    // 关闭当前右键的tag路由
    const closeSelectedTag = (view: RouteLocationNormalizedLoaded) => {
      tagsViewStore.DEL_VISITED_VIEW(view)
    }

    return {
      visitedTags,
      isActive,
      closeSelectedTag
    }
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-container {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(.6);
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
