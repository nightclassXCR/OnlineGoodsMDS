<template>
  <div>
    <el-card>
      <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center;">
        <el-input
          v-model="searchUsername"
          placeholder="搜索用户名"
          clearable
          style="width: 200px;"
          @clear="getList"
          @keyup.enter.native="getList"
        />
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button type="success" @click="openAddDialog">新增用户</el-button>
      </div>

      <el-table :data="userList" style="margin-top: 20px;" border>
        <el-table-column label="ID" prop="id" width="60" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDeleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: right; margin-top: 20px;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
          :page-size="pageSize"
          :current-page="pageNum"
          @current-change="handlePageChange"
          :page-sizes="[5, 10, 20]"
          @size-change="handlePageSizeChange"
        />
      </div>
    </el-card>

    <!-- 用户新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑用户' : '新增用户'">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" :placeholder="form.id ? '留空表示不修改密码' : ''" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, addUser, updateUser, deleteUser as apiDeleteUser } from '../api/user'

const searchUsername = ref('')
const userList = ref([])

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const form = ref({})

function getList() {
  getUserList(searchUsername.value, pageNum.value, pageSize.value).then(res => {
    if (res.data.code === 200) {
      userList.value = res.data.data.list || []
      total.value = res.data.data.total || 0
    } else {
      ElMessage.error('获取用户列表失败')
    }
  }).catch(() => {
    ElMessage.error('获取用户列表失败')
  })
}

function handlePageChange(newPage) {
  pageNum.value = newPage
  getList()
}

function handlePageSizeChange(newSize) {
  pageSize.value = newSize
  pageNum.value = 1
  getList()
}

function openAddDialog() {
  form.value = { role: 'user' }
  dialogVisible.value = true
}

function editUser(user) {
  form.value = { ...user, password: '' } // 密码不回显
  dialogVisible.value = true
}

function submitForm() {
  if (form.value.id) {
    // 编辑
    const payload = { ...form.value }
    if (!payload.password) {
      delete payload.password // 不修改密码时不传
    }
    updateUser(payload).then(res => {
      if (res.data.code === 200) {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        getList()
      } else {
        ElMessage.error('修改失败')
      }
    }).catch(() => ElMessage.error('修改失败'))
  } else {
    // 新增
    addUser(form.value).then(res => {
      if (res.data.code === 200) {
        ElMessage.success('新增成功')
        dialogVisible.value = false
        getList()
      } else {
        ElMessage.error('新增失败')
      }
    }).catch(() => ElMessage.error('新增失败'))
  }
}

function handleDeleteUser(id) {
  ElMessageBox.confirm('确认删除该用户？', '提示')
    .then(() => {
      apiDeleteUser(id).then(res => {
        if (res.data.code === 200) {
          ElMessage.success('删除成功')
          getList()
        } else {
          ElMessage.error('删除失败')
        }
      }).catch(() => ElMessage.error('删除失败'))
    })
}

onMounted(() => {
  getList()
})
</script>
