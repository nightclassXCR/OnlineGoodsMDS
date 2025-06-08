import axios from 'axios'

const BASE_URL = 'http://localhost:8080'  // 根据实际后端地址修改

// 获取商品列表（分页搜索）
export function getProductList(name = '', pageNum = 1, pageSize = 10) {
  return axios.get(`${BASE_URL}/product/search`, {
    params: { name, pageNum, pageSize }
  })
}

// 添加商品（含上传）
export function addProduct(formData) {
 return axios.post(`${BASE_URL}/product/upload`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data' // ✅ Axios 里可以加
  }
})
}

// 更新商品
export function updateProduct(data) {
  return axios.post(`${BASE_URL}/product/update`, data,{
     headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除商品
export function deleteProduct(id) {
  return axios.post(`${BASE_URL}/product/delete`, null, {
    params: { id }
  })
}

// 获取热销商品排行榜，limit是返回商品数量
export function getTopSellingProducts(limit = 5) {
  return axios.get(`${BASE_URL}/product/getTopSellingProducts`, {
    params: { limit }
  })
}
// 根据商品ID查询商品详情
export function getProductById(id) {
  return axios.post(`${BASE_URL}/product/findById`, null, {
    params: { id }
  })
}

// 根据分类查询商品列表
export function getProductsByCategory(category) {
  return axios.post(`${BASE_URL}/product/findByCategory`, null, {
    params: { category }
  })
}

// 分页查询所有商品（不带搜索）
export function getProductsByPage(pageNum = 1, pageSize = 10) {
  return axios.get(`${BASE_URL}/product/selectByPage`, {
    params: { pageNum, pageSize }
  })
}

// 查询商品总数
export function getProductCount() {
  return axios.get(`${BASE_URL}/product/countAll`)
}
