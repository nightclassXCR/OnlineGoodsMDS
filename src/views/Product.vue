<template>
  <div>
    <el-card>
    <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center;">
      <el-input
        v-model="searchName"
        placeholder="搜索商品名称"
        clearable
        style="width: 200px;"
        @clear="getList"
        @keyup.enter.native="getList"
      />
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button type="success" @click="openAddDialog">新增商品</el-button>
    </div>
      <el-table :data="productList" style="margin-top: 20px" border>
      <el-table-column label="id" prop = "id"/> 
        <el-table-column label="图片" width="120">
         <template #default="{ row }">
            <img
                v-if="row && row.image"
                :src="getImageUrl(row.image)"
                alt="商品图片"
                style="width: 80px; height: 80px; object-fit: cover"
    />
            <span v-else>无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name" />
        <el-table-column label="类别" prop="category" />
        <el-table-column label="价格" prop="price" />
        <el-table-column label="库存" prop="stock" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editProduct(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="DeleteProduct(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
            <!-- 分页组件 -->
      <div style="text-align: right; margin-top: 20px;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="total"
          :page-size="pageSize"
          :current-page="pageNum"
          @current-change="handlePageChange"
          :page-sizes="[5, 10, 20, 50]"
          @size-change="handlePageSizeChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑商品对话框 -->
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑商品' : '新增商品'">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="类别"><el-input v-model="form.category" /></el-form-item>
        <el-form-item label="价格"><el-input v-model="form.price" type="number" /></el-form-item>
        <el-form-item label="库存"><el-input v-model="form.stock" type="number" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" /></el-form-item>
     <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            drag
            action=""  
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleFileChange"
            :before-upload="() => false"
            list-type="picture"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
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
import { getProductList, addProduct, updateProduct, deleteProduct } from '../api/product'

const productList = ref([])
const searchName = ref('')

// 分页相关
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const form = ref({})
const formRef = ref(null)

const selectedFile = ref(null)
const previewImage = ref('')

const fileList = ref([])  // 用于 el-upload 组件显示文件


function getList() {
  getProductList(searchName.value, pageNum.value, pageSize.value).then(res => {
    if (res.data.code === 200) {
      productList.value = res.data.data.list || []
      total.value = res.data.data.total || 0  // 总条数
    } else {
      ElMessage.error('获取商品列表失败')
    }
  }).catch(() => {
    ElMessage.error('获取商品列表失败')
  })
}

function handleSearch() {
  pageNum.value = 1
  getList()
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

function getImageUrl(path) {
  if (!path) return ''
  return `http://localhost:8080${path}`
}


function handleFileChange(file) {
  selectedFile.value = file.raw
  previewImage.value = URL.createObjectURL(file.raw)
}

function openAddDialog() {
  form.value = {}
  dialogVisible.value = true
}

function editProduct(row) {
  console.log('row.id:', row.id);  // 看看这里的id是不是数组
  form.value = { ...row }
  dialogVisible.value = true

}

function submitForm() {
  console.log('form.value:', form.value)
  const formData = new FormData()
  formData.append('name', form.value.name) 
  formData.append('description', form.value.description) 
  formData.append('price', form.value.price)
  formData.append('category', form.value.category)
  formData.append('stock', form.value.stock)
 
  if (selectedFile.value) {
    formData.append('file', selectedFile.value)
  }

  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }

  if (form.value.id) {
    formData.append('id', form.value.id)
    updateProduct(formData).then(res => {
      if (res.data.code === 200) {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        getList()
        selectedFile.value = null
        previewImage.value = ''
      } else {
        ElMessage.error('修改失败')
      }
    })
  } else {
    addProduct(formData).then(res => {
      if (res.data.code === 200) {
        ElMessage.success('新增成功')
        dialogVisible.value = false
        getList()
        selectedFile.value = null
        previewImage.value = ''
      } else {
        ElMessage.error('新增失败')
      }
    }).catch(() => {
      ElMessage.error('新增失败')
    })
  }
}

function DeleteProduct(id) {
  ElMessageBox.confirm('确认删除该商品？', '提示')
    .then(() => {
      deleteProduct(id).then(res => {
        if (res.data.code === 200) {
          ElMessage.success('删除成功')
          getList()
          

        } else {
          ElMessage.error('删除失败')
        }
      }).catch(() => {
        ElMessage.error('删除失败')
      })
    }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>
