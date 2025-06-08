import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

// 登录
export function login(data) {
  return axios.post(`${BASE_URL}/user/login`, data)
  
}

// 新增注册接口调用
export function register(data) {
  return axios.post(`${BASE_URL}/user/register`, data)
}

// 获取用户列表（带分页和搜索）
export function getUserList(username = '', pageNum = 1, pageSize = 10) {
  return axios.post(`${BASE_URL}/user/list`, {
    params: { username, pageNum, pageSize }
  })
}

// 添加新用户
export function addUser(data) {
  return axios.post(`${BASE_URL}/user/add`, data)
}

// 修改用户
export function updateUser(data) {
  return axios.put(`${BASE_URL}/user/update`, data)
}

// 删除用户
export function deleteUser(id) {
  return axios.delete(`${BASE_URL}/user/delete/${id}`)
}
