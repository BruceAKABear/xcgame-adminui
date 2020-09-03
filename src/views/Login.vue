<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="../assets/inner-login.png" height="295" width="363"/>
      </div>
      <div class="login-right">
        <div class="login-header">
          <span>熙辰游戏 | 后台系统</span>
        </div>
        <div class="login-input-box">
          <el-input size="large" v-model="phoneNumber" placeholder="手机号码" prefix-icon="el-icon-mobile"></el-input>
          <el-input style="margin-top: 20px" ref="userNameInput" size="large" v-model="passWord"
                    placeholder="密码" prefix-icon="el-icon-lock"></el-input>
          <el-button type="primary" @click="doLogin">
            立即登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/admin'
import { setToken } from '@/utils/TokenUtil'

export default {
  name: 'Login',
  data () {
    return {
      backgroundImage: '~@/assets/login-back.jpg',
      phoneNumber: '',
      passWord: ''
    }
  },
  methods: {
    doLogin () {
      if (this.phoneNumber === '' || this.passWord === '') {
        this.$message.error('用户名密码不能为空')
      } else {
        // 执行登录逻辑
        login({
          phoneNumber: this.phoneNumber,
          passWord: this.passWord
        }).then(res => {
          setToken(res.data)
          this.$message.success('登录成功')
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login-back.jpg") center center fixed no-repeat;
  background-size: cover;

  .login-box {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 1018px;
    height: 480px;
    border-radius: 20px;

    .login-left {
      background-color: mediumblue;
      border-radius: 20px 0 0 20px;
      width: 540px;
      height: 480px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-right {
      width: 492px;
      height: 480px;
      font-size: 28px;
      font-weight: 400;
      color: #A7ACFE;
      text-align: center;

      .login-header {
        margin-top: 60px;
      }

      .login-input-box {
        margin-top: 60px;
        padding-left: 20px;
        padding-right: 20px;

        .el-input {
          width: 350px
        }

        .el-button {
          margin-top: 60px;
          height: 48px;
          width: 350px;
          font-size: 14px;
        }
      }
    }

  }
}

</style>
