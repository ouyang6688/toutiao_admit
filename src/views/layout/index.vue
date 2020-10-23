<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px">侧边导航栏</el-aside>
      <el-container>
        <el-header>顶部导航栏</el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "layoutindex"
}
</script>

<style scoped lang="less">

</style>