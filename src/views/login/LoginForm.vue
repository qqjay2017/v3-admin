<template>
  <div class="login-form">
    <el-form
      :model="model"
      ref="loginFormRef"
      :rules="loginRules">
      <el-form-item prop="username">
        <el-input :placeholder="t('component.login.accountMsg')"
                  v-model="model.username"
                  prefix-icon="iconfont icon-wode"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :placeholder="t('component.login.passwordMsg')"
                  v-model="model.password"
                  show-password
                  prefix-icon="iconfont icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="handleLogin">
          {{t('component.login.login')}}
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getNamespace, Modules, useStore } from '@/store'
import { UserModuleAction } from '@/store/modules/user'
import { LocationQuery, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LoginForm',

  setup () {
    const { t } = useI18n()

    const loginFormRef = ref()

    const loginRules = {
      username: [{ required: true, message: t('component.login.accountMsg'), trigger: 'blur' }],
      password: [{ required: true, message: t('component.login.passwordMsg'), trigger: 'blur' }]
    }

    const model = reactive({
      username: '',
      password: ''
    })

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const getOtherQuery = (query:LocationQuery) => {
      return Object.keys(query).reduce<Record<string, any>>((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

    const handleLogin = () => {
      loginFormRef.value.validate((valid:boolean) => {
        console.log(valid)
        if (valid) {
          store.dispatch(getNamespace(Modules.User, UserModuleAction.login), model)
            .then(res => {
              const redirect = route.query.redirect as string
              const otherQuery = getOtherQuery(route.query)
              router.push({ path: redirect || '/', query: otherQuery })
            })
        } else {
          ElMessage.error(t('component.login.loginErrMsg'))
        }
      })
    }
    return {
      model,
      handleLogin,
      loginRules,
      loginFormRef,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.login-form {
  width: 300px;

  .login-button {
    width: 100%;
  }
}

</style>
