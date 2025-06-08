<template>
  <el-card>
    <v-chart class="chart" :option="option" autoresize />
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopSellingProducts } from '../api/product'
import VChart from 'vue-echarts'

const option = ref({
  title: { text: '热销商品前五', left: 'center' },
  tooltip: {},
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value' },
  series: [{ name: '销量', type: 'bar', data: [] }]
})

const loadChart = () => {
  getTopSellingProducts().then(res => {
    const data = res.data.data
    option.value.xAxis.data = data.map(item => item.name)
    option.value.series[0].data = data.map(item => item.salesVolume)
  })
}

onMounted(() => loadChart())
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>
