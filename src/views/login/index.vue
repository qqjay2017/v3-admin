<template>
  <div class="login">
    <div class="login-card">
      <h3 class="login-title">管理后台账户登录</h3>
      <LoginForm/>
      <div class="more-login">
        <div class="type" @click="loginByGitee">
          <i class="iconfont icon-gitee"></i>
        </div>
      </div>
    </div>

  </div>
  <LoginParticles />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm.vue'
import qs from 'qs'
import LoginParticles from '@/views/login/LoginParticles.vue'
import { giteeRedirectUri } from '@/utils/constance'

export default defineComponent({
  name: 'Login',
  components: {
    LoginParticles,
    LoginForm
  },
  setup () {
    const comLoginStyle = computed(() => {
      const min = 1
      const max = 7
      const randomNum = Math.floor(Math.random() * (max - min)) + min
      return {
        backgroundImage: `url(${require('../../assets/images/login-bg' +
          randomNum + '.jpeg')})`
      }
    })

    const loginByGitee = () => {
      const oauthParameters = {
        scope: 'user_info',
        client_id: process.env.VUE_APP_GITEE_CLIENT_ID,
        redirect_uri: giteeRedirectUri,
        response_type: 'code'
      }
      const reloadUrl = 'https://gitee.com/oauth/authorize' + '?' + qs.stringify(oauthParameters)
      window.location.replace(reloadUrl)
    }
    return {

      loginByGitee
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &-logo {
    width: 32px;
  }

  &-title {
    color: #fff;
  }

  &-card {
    position: relative;
    z-index: 998;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 4px;
  }

  .more-login {
    position: relative;
    z-index: 998;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 300px;

    .type {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, .4);
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfont {
        font-size: 20px;
        color: #fff;
      }

      &:hover {
        background-color: #dedede;

        .iconfont {
          color: #000;
        }
      }
    }
  }
}

</style>

<style lang="scss">
#login-particles {
  width: 100%;
  height: 100%;
}
</style>
