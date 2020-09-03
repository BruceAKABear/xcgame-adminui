<template>
  <el-container>
    <el-aside width="200px">
      <!--菜单头-->
      <el-header>
        <div>
          <span>熙辰游戏</span>
        </div>
      </el-header>
      <!--菜单-->
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
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
        <el-menu-item index="contentManage" @click="savePath('contentManage')">
          <i class="el-icon-document-copy"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="dataManage" @click="savePath('dataManage')">
          <i class="el-icon-data-line"></i>
          <span slot="title">数据管理</span>
        </el-menu-item>
        <el-menu-item index="systemManage" @click="savePath('systemManage')">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <i class="el-icon-s-fold"></i>
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
      activePath: 'dashBoard'
    }
  },
  methods: {
    savePath (pathName) {
      this.activePath = pathName
      // 存session
      window.sessionStorage.setItem('activePath', pathName)
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
  }

  .el-main {
    background-color: #eeeeee;
    padding: 10px;

    .el-header {
      background-color: white;
    }

    .el-card {
      height: 99%;
    }
  }
}

</style>
