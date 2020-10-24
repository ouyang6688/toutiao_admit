<template>
  <el-container class="layout-container">

    <el-aside class="layout-aside" width="150px"><Aside class="aside-menu"></Aside></el-aside>

    <el-container>
      <el-header class="layout-header">
        <Hearder></Hearder>
      </el-header>

      <el-main class="mian">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Aside from "@/views/layout/components/aside";
import Hearder from '@/views/layout/components/header'

export default {
  name: "layoutindex",
  components:{
    Aside,
    Hearder
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
}
.layout-aside{
  background-color: lightpink;
  .aside-menu{
    height: 100%;
  }
}
.layout-header{
  padding: 0;
}

</style>