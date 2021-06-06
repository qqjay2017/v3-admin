<template>
  <div class="login-gitee">
    <h1>
      {{ comTip }}
    </h1>
    <SvgIcon :icon-class="comIconClass" class-name="login-gitee-icon"></SvgIcon>
    <DianMo ref="dianmoRef">

    </DianMo>
    <h3 v-if="errResponse">{{ errResponse }}</h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { giteeRedirectUri } from '@/utils/constance'
import { getNamespace, Modules, useStore } from '@/store'
import { UserModuleAction } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import DianMo from '@/views/login/DianMo.vue'

export default defineComponent({
  name: 'LoginGitee',
  components: { DianMo, SvgIcon },
  setup () {
    const status = ref<boolean>()
    const errResponse = ref('')

    const store = useStore()
    const router = useRouter()
    const dianmoRef = ref()
    const comTip = computed(() => {
      if (status.value === false) {
        return 'gitee用户校验失败,5s将会返回登录页...'
      } else if (status.value === true) {
        return 'gitee用户校验成功,正在返回首页'
      } else {
        return 'gitee用户校验中...'
      }
    })

    const comIconClass = computed(() => {
      if (status.value === false) {
        return 'unlink'
      } else if (status.value === true) {
        return 'qifei'
      } else {
        return 'jiazaizhong'
      }
    })

    const matchGithubCode = () => {
      //
      const { href, hash, search } = location
      if (search && search.length) {
        const parseSearch = qs.parse(search)
        if (parseSearch && parseSearch['?code']) {
          return parseSearch['?code'] as string
        } else {
          return backLoginPage()
        }
      } else {
        return backLoginPage()
      }
    }

    const getTokenByCode = (code: string) => {
      const data = {
        client_id: process.env.VUE_APP_GITEE_CLIENT_ID,
        client_secret: process.env.VUE_APP_GITEE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: giteeRedirectUri
      }

      axios('https://gitee.com/oauth/token',
        {
          method: 'POST',
          data
        }
      ).then(res => {
        // eslint-disable-next-line camelcase
        const { access_token, refresh_token, expires_in, created_at } = res.data
        store.dispatch(getNamespace(Modules.User, UserModuleAction.otherLogin), {
          token: access_token,
          type: 'gitee'
        }).then(() => {
          location.replace(location.origin + '/#/')
        })
      }).catch((err) => {
        errResponse.value = err.request.response
        backLoginPage()
      }).finally(() => {
        dianmoRef.value && dianmoRef.value.start && dianmoRef.value.start()
      })
    }

    const backLoginPage = () => {
      status.value = false
      setTimeout(() => {
        window.location.href = location.origin + '/#login'
      }, 5000)
    }

    const code = matchGithubCode()
    if (code && code.length) {
      getTokenByCode(code)
    }

    onMounted(() => {
      dianmoRef.value && dianmoRef.value.start && dianmoRef.value.start()
    })

    return {
      comTip,
      errResponse,
      comIconClass,
      dianmoRef
    }
  }
})
</script>

<style lang="scss">
.login-gitee {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  .login-gitee-icon {
    width: 350px;
    height: 350px;
  }
}
</style>
