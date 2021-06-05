<template>
  <div class="login-form">
    <el-form
      :model="model"
      ref="loginFormRef"
      :rules="loginRules">
      <el-form-item prop="username">
        <el-input placeholder="请输入登录账户"
                  v-model="model.username"
                  prefix-icon="iconfont icon-wode"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码"
                  v-model="model.password"
                  show-password
                  prefix-icon="iconfont icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import { getNamespace, Modules, useStore } from '@/store'
import { UserModuleAction } from '@/store/modules/user'
import { LocationQuery, useRoute, useRouter } from 'vue-router'

const loginRules = {
  username: [{ required: true, message: '请输入登录账户', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

export default defineComponent({
  name: 'LoginForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  setup () {
    const loginFormRef = ref()
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
          ElMessage.error('请输入登录账户和密码!')
        }
      })
    }
    return {
      model,
      handleLogin,
      loginRules,
      loginFormRef
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
