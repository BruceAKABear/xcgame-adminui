<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>后台</el-breadcrumb-item>
      <el-breadcrumb-item>仪表板</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="basic-info-box">
      <el-card body-style="padding:10px">
        <div class="basic-item">
          <span>游戏数量</span>
          <span>20</span>
        </div>
      </el-card>
      <el-card body-style="padding:10px">
        <div class="basic-item">
          <span>应用数量</span>
          <span>20</span>
        </div>
      </el-card>
      <el-card body-style="padding:10px">
        <div class="basic-item">
          <span>当日创角</span>
          <span>20</span>
        </div>
      </el-card>
      <el-card body-style="padding:10px">
        <div class="basic-item">
          <span>总用户数</span>
          <span>20</span>
        </div>
      </el-card>
      <el-card body-style="padding:10px">
        <div class="basic-item">
          <span>总金额</span>
          <span>20</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoard'
}
</script>

<style lang="scss" scoped>

.basic-info-box {
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 180px;

    .basic-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 20px;
      font-weight: bold;

    }
  }
}

</style>
