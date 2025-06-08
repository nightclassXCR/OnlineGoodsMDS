import axios from 'axios'

const BASE_URL = 'http://localhost:8080'  // 请根据实际情况修改

// 获取热销商品排行榜，limit是返回商品数量
export function getTopSellingProducts(limit = 5) {
  return axios.get(`${BASE_URL}/product/getTopSellingProducts`, {
    params: { limit }
  })
}