<template>
  <el-card>
    <!-- 顶部工具栏：搜索 + 筛选 + 新增按钮 -->
    <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center;">
      <el-input v-model="searchKeyword" placeholder="搜索订单…" clearable style="width: 200px;" @clear="loadOrders" />
      <el-select v-model="selectedStatus" placeholder="选择状态" clearable style="width: 150px;" @change="loadOrders">
        <el-option label="未支付" value="未支付" />
        <el-option label="已支付" value="已支付" />
        <el-option label="已发货" value="已发货" />
        <el-option label="已完成" value="已完成" />
      </el-select>
      <el-button type="primary" @click="loadOrders">搜索</el-button>
      <el-button type="success" @click="openAddDialog">新增订单</el-button>
    </div>

    <!-- 订单表格 -->
    <el-table :data="orders" border style="width: 100%;">
      <el-table-column prop="id" label="订单ID" width="80" />
      <el-table-column prop="user_id" label="用户ID" />
      <el-table-column prop="product_id" label="商品ID" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="total_price" label="总价" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="order_time" label="下单时间" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
      style="margin-top: 20px; text-align: right;"
    />

    <!-- 添加/编辑订单对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="form">
        <el-form-item label="用户ID">
          <el-input v-model="form.user_id" />
        </el-form-item>
        <el-form-item label="商品ID">
          <el-input v-model="form.product_id" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.quantity" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="form.total_price" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { findAllOrders ,findOrderById,addOrder,updateOrder,deleteOrder,findOrdersByUserId,findOrdersByStatus,searchOrders } from '../api/order'

// 表格数据与分页状态
const orders = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 搜索与筛选字段
const searchKeyword = ref('')
const selectedStatus = ref('')

// 对话框状态与表单
const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = ref({})

// // 加载订单数据（搜索优先，其次状态筛选）
// const loadOrders = async () => {
//   let res
//   if (searchKeyword.value) {
//     res = await searchOrders(searchKeyword.value, currentPage.value, pageSize.value)
//   } else if (selectedStatus.value) {
//     res = await findOrdersByStatus(selectedStatus.value, currentPage.value, pageSize.value)
//   } else {
//     res = await searchOrders('', currentPage.value, pageSize.value) // 默认全部
//   }
//   orders.value = res.data.data.records || res.data.data
//   total.value = res.data.data.total || res.data.data.length || 0
// }

const loadOrders = async () => {
  let res
  try {
    if (searchKeyword.value) {
      res = await searchOrders(searchKeyword.value, currentPage.value, pageSize.value)
    } else if (selectedStatus.value) {
      res = await findOrdersByStatus(selectedStatus.value, currentPage.value, pageSize.value)
    } else {
      res = await searchOrders('', currentPage.value, pageSize.value)
    }
    
    // 调试接口返回
    console.log('订单接口返回:', res)

    // 先取到分页数据节点
    const data = res.data && res.data.data
    if (data && Array.isArray(data.records)) {
      orders.value = data.records
      total.value = data.total || data.records.length
    } else if (Array.isArray(data)) {
      // 如果接口直接返回数组
      orders.value = data
      total.value = data.length
    } else {
      // 容错，防止赋值错误导致 includes 报错
      orders.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('加载订单出错:', error)
    orders.value = []
    total.value = 0
  }
}
// 切换页码
const handlePageChange = (page) => {
  currentPage.value = page
  loadOrders()
}

// 打开新增订单对话框
const openAddDialog = () => {
  form.value = {}
  dialogTitle.value = '新增订单'
  dialogVisible.value = true
}

// 打开编辑订单对话框
const openEditDialog = (row) => {
  form.value = { ...row }
  dialogTitle.value = '编辑订单'
  dialogVisible.value = true
}

// 保存订单
const handleSave = async () => {
  if (form.value.id) {
    await updateOrder(form.value)
  } else {
    await addOrder(form.value)
  }
  dialogVisible.value = false
  loadOrders()
}

// 删除订单
const handleDelete = async (id) => {
  if (confirm('确定删除该订单？')) {
    await deleteOrder(id)
    loadOrders()
  }
}

// 页面初始化
onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.el-button {
  margin-right: 10px;
}
</style>