<template>
  <div class="typepage">
    <el-card class="box-card">
       <el-radio-group v-model="radiobutton" @change="Tabs" size="medium">
          <el-radio-button class="p13" label="1">小程序商城管理</el-radio-button>
          <el-radio-button class="p13" label="2">回收站</el-radio-button>
          <el-radio-button class="p13" label="3">注册审核</el-radio-button>
        </el-radio-group>
    </el-card>
    <!-- ------------------------------小程序商城管理--------------------------------- -->

    <el-card v-if="criteria==1" class="box-card">
      <hfmanage  @fatherMethod="AppletList" labelName="小程序" :tableData="tableData"></hfmanage>
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
      <hfrecycle  @recyclebin="recyclebin" labelName="小程序名称" :tableData="tableData2"></hfrecycle>

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
      <el-pagination
      background
      @size-change="handleSizeChange3"
      @current-change="handleCurrentChange3"
      :current-page.sync="currentPage3"
      :page-size="2"
      layout="prev, pager, next, jumper"
      :total="total3"
    ></el-pagination>
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
      currentPage3: 1,
      pageNum: 1,
      pageNum2: 1,
      pageNum3: 1,
      total: 100,
      total2: 100,
      total3: 100,
      tableData: [],
      tableData2: [],
      radiobutton: '1',
      criteria: 1 // 判断显示那个表格
    }
  },
  methods: {
    Tabs (e) {
      this.criteria = e
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.AppletList()
    },
    handleSizeChange2 (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange2 (val) {
      console.log(`当前页: ${val}`)
      this.pageNum2 = val
      this.recyclebin()
    },
    AppletList () {
      const params = {
        isDeleted: 0,
        type: 'Applet',
        pageNum: this.pageNum,
        pageSize: 2
      }
      store.AppletList(params, (res) => {
        console.log('小程序列表', res.data.data)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    recyclebin () {
      const params = {
        isDeleted: 1,
        type: 'Applet',
        pageNum: this.pageNum2,
        pageSize: 2
      }
      store.AppletList(params, (res) => {
        console.log('回收站列表', res.data.data)
        this.tableData2 = res.data.data.list
        this.total2 = res.data.data.total
      })
    }
  },
  created () {
    this.AppletList()
    this.recyclebin()
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
