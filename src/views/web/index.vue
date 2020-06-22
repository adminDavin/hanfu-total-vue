<template>
  <!-- -----------------------------------网站（web/h5）--------------------------------------------------------------------------- -->
  <div class="typepage">
    <el-card class="box-card">
      <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
        <el-radio-button class="p13" label="1">网站（web/h5）管理</el-radio-button>
        <el-radio-button class="p13" label="2">回收站</el-radio-button>
        <el-radio-button class="p13" label="3">注册审核</el-radio-button>
      </el-radio-group>
    </el-card>
    <!-- ------------------------------网站（web/h5）管理--------------------------------- -->
    <el-card v-if="criteria==1" class="box-card">
      <hfmanage @fatherMethod="webletList" :tableData="tableData" labelName="网站"></hfmanage>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="2"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- --------------------------------回收站-------------------------------------- -->
    <el-card v-if="criteria==2" class="box-card">
      <hfrecycle @recyclebin="recyclebin" :tableData='tableData2' labelName="网站名称"></hfrecycle>

      <el-pagination
        background
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page.sync="currentPage3"
        :page-size="2"
        layout="prev, pager, next, jumper"
        :total="total2"
      ></el-pagination>

    </el-card>

    <!-- -------------------------------注册审核------------------------------------- -->
    <el-card v-if="criteria==3" class="box-card">
      <hfaudit></hfaudit>
    </el-card>
  </div>
</template>

<script>
import hfmanage from '@/components/hf-manage.vue'
import hfrecycle from '@/components/hf-recycle.vue'
import hfaudit from '@/components/hf-audit.vue'
import store from '@/service/store.js'
export default {
  components: { hfmanage, hfrecycle, hfaudit },
  name: '',
  data () {
    return {
      radiobutton: '1',
      criteria: 1,
      currentPage3: 1,
      pageNum: 1,
      pageNum2: 1,
      pageNum3: 1,
      total: 1,
      total2: 1,
      total3: 1,
      tableData: [],
      tableData2: []
    }
  },
  methods: {
    Tabs (e) {
      console.log(e)
      this.criteria = e
      if (e === '1') {
        this.webletList()
      } else if (e === '2') {
        this.recyclebin()
      } else {

      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.webletList()
    },
    handleSizeChange2 (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange2 (val) {
      console.log(`当前页: ${val}`)
      this.pageNum2 = val
      this.recyclebin()
    },
    webletList () {
      const params = {
        isDeleted: 0,
        type: 'Web',
        pageNum: this.pageNum,
        pageSize: 2
      }
      store.AppletList(params, res => {
        console.log('web列表', res.data.data)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    recyclebin () {
      const params = {
        isDeleted: 1,
        type: 'Web',
        pageNum: this.pageNum2,
        pageSize: 2
      }
      store.AppletList(params, res => {
        console.log('web回收站列表', res.data.data)
        this.tableData2 = res.data.data.list
        this.total2 = res.data.data.total
      })
    }
  },
  created () {
    this.webletList()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
