import axios from 'axios'

const BASE_URL = 'http://localhost:8080'  // 根据实际后端地址修改

// 查询所有订单
export function findAllOrders() {
  return axios.post(`${BASE_URL}/order/findAll`)
}

// 根据订单ID查询订单
export function findOrderById(id) {
  return axios.post(`${BASE_URL}/order/findById`, null, {
    params: { id }
  })
}

// 新增订单
export function addOrder(order) {
  return axios.post(`${BASE_URL}/order/add`, order)
}

// 更新订单
export function updateOrder(order) {
  return axios.post(`${BASE_URL}/order/update`, order)
}

// 删除订单
export function deleteOrder(id) {
  return axios.post(`${BASE_URL}/order/delete`, null, {
    params: { id }
  })
}

// 根据用户ID查询订单（分页）
export function findOrdersByUserId(userId, pageNum = 1, pageSize = 10) {
  return axios.get(`${BASE_URL}/order/findByUserId`, {
    params: { userId, pageNum, pageSize }
  })
}

// 根据订单状态查询订单
export function findOrdersByStatus(status, pageNum = 1, pageSize = 10) {
  return axios.get(`${BASE_URL}/order/findByStatus`, {
    params: { status, pageNum, pageSize }
  })
}

// 订单搜索（按关键字、分页）
export function searchOrders(keyword = '', pageNum = 1, pageSize = 10) {
  return axios.get(`${BASE_URL}/order/search`, {
    params: { keyword, pageNum, pageSize }
  })
}
