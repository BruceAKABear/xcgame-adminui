<template>
  <div >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>后台</el-breadcrumb-item>
      <el-breadcrumb-item>仪表板</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="basic-info-box">
      <el-card body-style="padding:5px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover"
                    style="width: 100px; height: 100px"></el-image>
          <div class="count-item-content">
            <span>游戏数量</span>
            <span class="count-number">{{ countObj.gameCount }}</span>
          </div>
        </div>
      </el-card>

      <el-card body-style="padding:5px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover"
                    style="width: 100px; height: 100px"></el-image>
          <div class="count-item-content">
            <span>应用数量</span>
            <span class="count-number">{{ countObj.appCount }}</span>
          </div>
        </div>
      </el-card>

      <el-card body-style="padding:5px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover"
                    style="width: 100px; height: 100px"></el-image>
          <div class="count-item-content">
            <span>当日创角</span>
            <span class="count-number">{{ countObj.createToday }}</span>
          </div>
        </div>
      </el-card>

      <el-card body-style="padding:5px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover"
                    style="width: 100px; height: 100px"></el-image>
          <div class="count-item-content">
            <span>总用户数</span>
            <span class="count-number">{{ countObj.totalUserCount }}</span>
          </div>
        </div>
      </el-card>

      <el-card body-style="padding:5px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" fit="cover"
                    style="width: 100px; height: 100px"></el-image>
          <div class="count-item-content">
            <span>总金额</span>
            <span class="count-number">{{ countObj.totalMoneyCount }}</span>
          </div>
        </div>
      </el-card>

    </div>
  </div>
</template>

<script>
import { queryCount } from '@/api/DashBoard'

export default {
  name: 'DashBoard',
  data () {
    return {
      countObj: {}
    }
  },
  methods: {
    doQueryCount () {
      queryCount({}).then(res => {
        this.countObj = res.data
      })
    }
  },
  created () {
    this.doQueryCount()
  }
}
</script>

<style lang="scss" scoped>

.basic-info-box {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  .count-item {
    display: flex;
    align-items: center;

    .count-item-content {
      padding-left: 30px;
      font-size: 18px;
      font-weight: bold;
      color: #909399;
      display: flex;
      flex-direction: column;
      text-align: center;

      .count-number {
        margin-top: 8px;
        font-size: 22px;
        color: black;
      }

    }
  }

}

</style>
