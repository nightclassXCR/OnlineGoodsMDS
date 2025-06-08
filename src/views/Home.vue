<template>
  <div class="home">
    <header class="home-header">
      <h2>后台商品管理系统</h2>
      <button class="logout-btn" @click="logout">退出登录</button>
    </header>

    <div class="home-container">
      <Sidebar />
      <div class="home-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  methods: {
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
  font-family: 'Segoe UI', sans-serif;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(to right, #1976d2, #42a5f5);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background-color: #fff;
  color: #1976d2;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #e3f2fd;
}

.home-container {
  flex: 1;
  display: flex;
}

.home-content {
  flex: 1;
  padding: 24px;
  background-color: #ffffff;
  border-top-left-radius: 12px;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.05);
  margin-left: -1px;
  overflow-y: auto;
}
</style>
