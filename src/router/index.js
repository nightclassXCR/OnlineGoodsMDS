import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Product from '../views/Product.vue'
import Order from '../views/Order.vue'
import Chart from '../views/Chart.vue'
import User from '../views/User.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/home', 
    component: Home,
    children: [
      { path: '', redirect: '/home/product' },
      { path: 'product', component: Product },
      { path: 'order', component: Order },
      { path: 'chart', component: Chart },
      { path: 'user', component: User }
    ]
   },
  { path: '/register', component: Register }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router