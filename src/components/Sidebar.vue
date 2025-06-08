<template> 
  <div class="sidebar">
    <ul>
      <li 
        v-for="item in menuItems" 
        :key="item.path" 
        @click="go(item.path)"
        :class="{ active: isActive(item.path) }"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const role = user ? user.role : null;
    console.log(role)
    const items = [
      { label: '商品管理', path: '/home/product' },
      { label: '订单管理', path: '/home/order' },
      { label: '图表分析', path: '/home/chart' }
    ];
    // 如果是管理员，追加“用户管理”
    if (role === 'admin') {
      items.push({ label: '用户管理', path: '/home/user' });
    }
    return {
      menuItems: items
    };
  },
  methods: {
    go(path) {
      this.$router.push(path)
    },
    isActive(path) {
    // 判断当前路由路径是否和传入path相同
    return this.$route.path === path
  }
  }
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #eef2f3, #d9e2ec);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  border-right: 1px solid #ccc;
  transition: all 0.3s ease;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 14px 20px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.sidebar li:hover {
  background-color: #cfd8dc;
  color: #000;
}

.sidebar li.active {
  background-color: #90caf9;
  font-weight: bold;
  color: #0d47a1;
  border-left: 4px solid #1976d2;
}
</style>
