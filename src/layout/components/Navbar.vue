<template>
  <div class="navbar">
    <Hambuger @toggleClick="toggleSidebar" :is-active="opened"/>
    <Breadcrumb/>
    <div class="right-menu">
      <template v-if="!isMobile">
        <div @click="openShowSetting" class="setting right-menu-item hover-effect">
          <i class="el-icon-s-tools"></i>
        </div>
        <ScreenFull id="screefull" class="right-menu-item hover-effect"/>
        <ElTooltip content="global size" effect="dark" placement="bottom">
          <SizeSelect class="right-menu-item hover-effect"/>
        </ElTooltip>
      </template>
      <ElDropdown trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <img v-if="userInfo.avatar_url" :src="userInfo.avatar_url" class="user-avatar">
          <span class="user-name">{{userInfo.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElTooltip } from 'element-plus'
import Hambuger from './Hambuger/index.vue'
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import { getNamespace, Modules, useStore } from '@/store'
import { AppModuleMutations } from '@/store/modules/app'
import { UserModuleAction } from '@/store/modules/user'
import { useRoute } from 'vue-router'
import qs from 'qs'

export default defineComponent({
  name: 'Navbar',
  components: { SizeSelect, ScreenFull, Breadcrumb, Hambuger, ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem },
  emits: ['showSetting'],
  setup (_, { emit }) {
    const store = useStore()
    const route = useRoute()
    const opened = computed(() => store.state.app.sidebar.opened)
    const toggleSidebar = () => {
      store.commit(getNamespace(Modules.App, AppModuleMutations.toggleSidebar))
    }
    const openShowSetting = () => {
      emit('showSetting', true)
    }

    const logout = () => {
      store.dispatch(getNamespace(Modules.User, UserModuleAction.logout)).then(() => {
        let url = ''
        url += location.origin
        url += `#/login?redirect=${route.path}`

        const queryStr = qs.stringify(route.query)
        if (queryStr) {
          url = url + '&' + queryStr
        }
        window.location.replace(url)
        window.location.reload()
      })
    }

    const handleCommand = (command: string) => {
      switch (command) {
        case 'logout':
          logout()
          break
      }
    }

    const isMobile = computed(() => {
      return store.state.app.device === 'mobile'
    })

    const userInfo = computed(() => {
      return store.state.user.userInfo
    })

    return {
      opened,
      toggleSidebar,
      openShowSetting,
      handleCommand,
      isMobile,
      userInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, .08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;

    .setting {
      font-size: 26px;
    }

    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
    }
    .avatar-wrapper {
      display: flex;
      align-items: center;
      margin-top: 5px;
      position: relative;
      .user-name {
        padding:0 6px
      }
      .user-avatar {
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 10px;
      }
    }

  }
}
</style>
