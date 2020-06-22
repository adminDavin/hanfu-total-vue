<template>
  <div>
    <!-- 头部 -->
    <div class="head">
      <div class="img">
        <img style="width:100%" src="../../assets/images/head-log.png" alt />
      </div>
      <div class="center box">
        <h1>管理中心</h1>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/">账户管理</el-menu-item>
          <el-menu-item index="/store">小程序商城</el-menu-item>
          <el-menu-item index="/web">网站(web/h5)</el-menu-item>
          <el-menu-item index="/uni-app">uni-app商城</el-menu-item>
          <el-menu-item index="/set">设置</el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 内容部分 -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./miain.less";
</style>
