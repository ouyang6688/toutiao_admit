<template>
  <div class="login-container">
    <el-form class="login-from" ref="loginform" :model="user" :rules="fromRules">
      <div class="login-logo"></div>

      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号："></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码："></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>

      <el-form-item prop="agree">
        <el-button class="login-btn" type="primary" :loading="loginloading" @click="onLogin">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary">注册</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {login} from "@/api/user";

export default {
  name: "loginindex",
  data() {
    return {
      user: {
        mobile: '13922222222',
        code: '246810',
        agree: false
      },
      loginloading:false, //登录的loading状态

      fromRules:{   //表单验证
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }

    }
  },
  methods: {
    onLogin() {
      // 获取表单数据（根据接口要求绑定数据）
      // const user=this.user
      //登录中
      this.loginloading=true

      // 表单验证
      this.$refs['loginform'].validate((valid) => {
        if (!valid) {
          return
        }
        // 验证通过，提交登录
        login(this.user).then(res=>{  // 登录成功
          console.log(res)

          //在登录成功以后将用户信息存储到本地存储
          window.localStorage.setItem('user',JSON.stringify(res.data.data))

          this.loginloading=false
          //成功的提示
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
            center: true
          });
          this.$router.push('/')
        }).catch(err=>{
          console.log('登录失败', err)
          this.loginloading=false
          this.$message.error({
            showClose: true,
            message:'登录失败，手机号或验证码错误',
            center: true
          });
        })
      });

    }
  }

}
</script>

<style scoped lang="less">
.login-container{
  position: fixed;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;  //改变flex水平排列方向
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-from{
    .login-logo{
      width: 300px;
      height: 57px;
      background: url("./logo_index.png") no-repeat;
      margin-bottom: 20px;
    }
    background-color: antiquewhite;
    padding: 20px 60px 30px 60px;
    min-width: 300px;
    border-radius:30px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>