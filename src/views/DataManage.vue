<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-header">
      <span>条件查询</span>
      <div class="app-header-content-box">
        <!--游戏类型-->
        <el-select v-model="pageParam.gameId" placeholder="请选择游戏" size="small" clearable style="width: 180px">
          <el-option
            v-for="game in gameList"
            :key="game.id"
            :label="game.gameName"
            :value="game.id">
          </el-option>
        </el-select>
        <!--应用选择-->
        <el-select v-model="pageParam.appId" placeholder="请选择应用" size="small" style="width: 180px;margin-left: 10px">
          <el-option
            v-for="app in appList"
            :key="app.id"
            :label="app.appName"
            :value="app.id">
          </el-option>
        </el-select>
        <!--时间选择-->
        <el-date-picker
          v-model="pageParam.timeBet"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          clearable
          value-format="timestamp"
          style="margin-left: 10px"
        >
        </el-date-picker>
        <el-button size="small" type="primary" @click=" doPageQuery" style="margin-left: 10px">查询
        </el-button>
      </div>
    </div>

    <!--表格-->
    <el-table
      :data="dataPageData.records"
      height="600"
      border
      style="width: 100%"
      size="small"
    >
      <el-table-column
        prop="id"
        label="日期"
        align="center"
        width="180">
      </el-table-column>
      <!--当日用户-->
      <el-table-column label="当日用户" align="center">
        <el-table-column
          prop="id"
          label="用户数"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="创角用户数"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="创角10级数"
        >
        </el-table-column>
      </el-table-column>
      <!--总用户-->
      <el-table-column label="总用户" align="center">
        <el-table-column
          prop="id"
          label="用户数"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="创角用户数"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="创角10级数"
        >
        </el-table-column>
      </el-table-column>
      <!--留存率-->
      <el-table-column label="创角留存率" align="center">
        <el-table-column
          prop="id"
          label="次日"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="三日"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="七日"
        >
        </el-table-column>
      </el-table-column>

      <!--充值信息-->
      <el-table-column label="充值(金额单位：元)" align="center">
        <el-table-column
          prop="id"
          label="新增人数">
        </el-table-column>
        <el-table-column
          prop="id"
          label="新增金额">
        </el-table-column>
      </el-table-column>
      <!--ARPU-->
      <el-table-column label="ARPU(金额单位：元)" align="center">
        <el-table-column
          prop="id"
          label="总充值人数">
        </el-table-column>
        <el-table-column
          prop="id"
          label="付费率">
        </el-table-column>
        <el-table-column
          prop="id"
          label="总金额">
        </el-table-column>
      </el-table-column>
    </el-table>

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="dataPageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="dataPageData.total">
      </el-pagination>
    </div>

  </div>

</template>

<script>
import { queryGameList } from '@/api/Game'
import { queryAppList } from '@/api/ApplicationInfo'
import { page } from '@/api/DataManage'

export default {
  name: 'DataManage',
  data () {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        gameId: ''
      },
      gameList: [],
      appList: [],
      dataPageData: {}
    }
  },
  methods: {
    doQueryGameList () {
      queryGameList().then(res => {
        this.gameList = res.data
      })
    },
    doQueryAppList () {
      queryAppList().then(res => {
        this.appList = res.data
      })
    },
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.dataPageData = res.data
      })
    },
    pageNumberChange (res) {
      this.pageParam.pageNumber = res
      this.doPageQuery()
    }
  },
  created () {
    this.doPageQuery()
    this.doQueryGameList()
    this.doQueryAppList()
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  margin-top: 35px;

  span {
    color: #909399;
    font-size: 15px;
    font-weight: bold;
  }

  .app-header-content-box {
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
  }
}

</style>
