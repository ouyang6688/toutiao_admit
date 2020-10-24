<template>
<div>
  <el-header class="header-container">
    <div>
      <i class="el-icon-s-operation"></i>
      <span>&nbsp;&nbsp;Vue_头条后台管理平台</span>
    </div>
    <div style="color: pink">
      <span>Nhao</span>
      <i class="el-icon-share"></i>
    </div>
    <div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img :src="user.photo" alt="toutiao" class="avatar">
          <span class="el-dropdown-link">
          {{user.name}}
          <i class="el-icon-s-custom"></i>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <I class="el-icon-s-tools"></I>
            设置
          </el-dropdown-item>
          <el-dropdown-item @click.native="onlogout">
            <i class="el-icon-refresh"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>

</div>
</template>

<script>
import {getUserProfile} from '@/api/user'

export default {
  name: "header1",
  data(){
    return {
      user:{}   //当前用户信息
    }
  },
  created() {
    //项目初始化，请求user信息
    this.getUser()
  },
  methods:{
    getUser(){
      getUserProfile().then(res=>{
        this.user=res.data.data
        console.log(this.user)
      })
    },
    onlogout(){
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.header-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.avatar-wrap{
  display: flex;
  align-items: center;
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>