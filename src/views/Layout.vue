<template>
  <el-container>
    <el-aside :width="collapse?'64px':'200px'">
      <!--菜单头-->
      <el-header>
        <el-image
          style="width: 50px; height: 40px"
          :src="url"
          fit="scale-down"></el-image>
        <div style="margin-left: 10px" v-if="!collapse">
          <span>熙辰游戏</span>
        </div>
      </el-header>
      <!--菜单-->
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
      >

        <el-menu-item index="dashBoard" @click="savePath('dashBoard')">
          <i class="el-icon-menu"></i>
          <span slot="title">仪表台</span>
        </el-menu-item>
        <el-menu-item index="appManage" @click="savePath('appManage')">
          <i class="el-icon-mobile"></i>
          <span slot="title">应用管理</span>
        </el-menu-item>
        <el-menu-item index="gameManage" @click="savePath('gameManage')">
          <i class="el-icon-menu"></i>
          <span slot="title">游戏管理</span>
        </el-menu-item>
        <el-submenu index="conMana">
          <template slot="title">
            <i class="el-icon-document-copy"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="contentManage" @click="savePath('contentManage')">
            <i class="el-icon-folder"></i>
            <span slot="title">内容组管理</span>
          </el-menu-item>
          <el-menu-item index="contentItemManage" @click="savePath('contentItemManage')">
            <i class="el-icon-s-order"></i>
            <span slot="title">内容条目管理</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="dataManage" @click="savePath('dataManage')">
          <i class="el-icon-data-line"></i>
          <span slot="title">数据管理</span>
        </el-menu-item>
        <el-menu-item index="orderManage" @click="savePath('orderManage')">
          <i class="el-icon-document-copy"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="customerManage" @click="savePath('customerManage')">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="customerService">
          <template slot="title">
            <i class="el-icon-headset"></i>
            <span>客服管理</span>
          </template>
          <el-menu-item index="serviceTemplate" @click="savePath('serviceTemplate')">
            <i class="el-icon-postcard"></i>
            <span slot="title">客服模板</span>
          </el-menu-item>
          <el-menu-item index="feedBack" @click="savePath('feedBack')">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">客户反馈</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="sysconfig">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="employeeManage" @click="savePath('employeeManage')">
            <i class="el-icon-user-solid"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="main-header-box">
        <!--缩小-->
        <i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'" style="font-size: 20px;cursor: pointer"
           @click="collapse=!collapse"></i>
        <div class="user-info-box">
          <el-avatar size="medium"
                     src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
          <el-dropdown trigger="click" @command="doLogout">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-school" command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      activePath: 'dashBoard',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      collapse: false
    }
  },
  methods: {
    savePath (pathName) {
      this.activePath = pathName
      // 存session
      window.sessionStorage.setItem('activePath', pathName)
    },
    doLogout (command) {
      // 清空session
      window.sessionStorage.clear()
      // 重定向到登录页
      this.$router.push('/login')
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-aside {
    background-color: #545c64;

    .el-header {
      font-size: 22px;
      font-weight: bold;
      color: #FFFFFF;
      background-color: #545c64;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: solid 1px #FFFFFF;
    }

    .el-menu-vertical {
      border-right: 0;
    }
  }

  .main-header-box {
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info-box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .el-dropdown {
        margin-left: 5px;
        margin-right: 10px;
      }

    }
  }

  .el-main {
    background-color: #eeeeee;
    padding: 10px;

    .el-card {
      height: 99%;
    }
  }
}

</style>
