<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">后台商品管理系统登录</h2>
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button type="primary" @click="goToRegister">注册</el-button>
        </el-form-item>        
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '../api/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const formRef = ref(null)

const onLogin = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await login(form.value)
        if (res.data.code === 200) {
          ElMessage.success('登录成功')
          localStorage.setItem('user', JSON.stringify(res.data.data))
          router.push('/home/product')
        } else {
          ElMessage.error(res.data.message)
        }
      } catch (e) {
        ElMessage.error('服务器异常')
      }
    }
  })
}

const goToRegister = () => {
  router.push('/register')
}

</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #74ebd5, #acb6e5); /* 渐变背景 */
}

.login-card {
  width: 420px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
}

.login-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
}

.el-input {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.el-button {
  width: 48%;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s;
}

.el-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

