<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">用户注册</h2>
      <el-form :model="form" label-width="80px" @submit.prevent="handleRegister">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="选择角色">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="success" @click="goToLogin">去登录</el-button>
        </el-form-item>
      </el-form>
      <p v-if="errorMsg" class="msg error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="msg success">{{ successMsg }}</p>
    </el-card>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/user'

const router = useRouter()
const form = ref({
  username: '',
  password: '',
  role: 'user'
})
const errorMsg = ref('')
const successMsg = ref('')

const handleRegister = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const res = await register(form.value)
    if (res.data.code === 200) {
      successMsg.value = '注册成功，3 秒后跳转到登录页...'
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      errorMsg.value = res.data.message || '注册失败'
    }
  } catch (err) {
    errorMsg.value = '网络错误'
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #74ebd5, #acb6e5); /* 渐变背景 */
}

.register-card {
  width: 420px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
}

.register-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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

.msg {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
.msg.error {
  color: red;
}
.msg.success {
  color: green;
}
</style>
