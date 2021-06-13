<template>
  <div class="login">
    <div class="login-tool-wrap">
      <LangSelect />
    </div>
    <div class="login-card">
      <LoginForm/>
      <div class="or-wrap">
        <div class="or-line"></div>
        <span>or</span>
        <div class="or-line"></div>
      </div>
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
import { defineComponent } from 'vue'
import LoginForm from '@/views/login/LoginForm.vue'
import qs from 'qs'
import LoginParticles from '@/views/login/LoginParticles.vue'
import { giteeRedirectUri } from '@/utils/constance'
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Login',
  components: {
    LangSelect,
    LoginParticles,
    LoginForm
  },
  setup () {
    const { t } = useI18n()
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
      t,
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
    .or-wrap {
      display: flex;
      font-size: 16px;
      align-items: center;
      color: #fff;
      margin-bottom: 16px;
      .or-line {
        width: 40px;
        height: 1px;
        background-color: #fff;
      }
      span {
        padding: 0 8px;
      }

    }
  }
  &-tool-wrap {
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 20;
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
