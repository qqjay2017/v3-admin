<template>
  <div class="login-form">
    <el-form>
      <el-form-item name="username">
        <el-input placeholder="请输入登录账户"
                  v-model="model.username"
                  prefix-icon="iconfont icon-wode"></el-input>
      </el-form-item>
      <el-form-item name="password">
      <el-input placeholder="请输入密码"
                v-model="model.password"
                show-password
                prefix-icon="iconfont icon-lock"></el-input>
      </el-form-item>
      <el-form-item name="password">
        <el-button type="primary" class="login-button">
          登录
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'

export default defineComponent({
  name: 'LoginForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  setup () {
    const model = reactive({
      username: '',
      password: ''
    })
    return {
      model
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
