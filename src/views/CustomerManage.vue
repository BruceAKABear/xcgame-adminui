<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
        <el-select v-model="pageParam.appId" placeholder="请选择应用" size="small" clearable
                   style="width: 180px;margin-left: 10px">
          <el-option
            v-for="app in appList"
            :key="app.id"
            :label="app.appName"
            :value="app.id">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" @click=" doPageQuery" style="margin-left: 10px">查询</el-button>
      </div>
    </div>
    <el-table
      size="small"
      :data="customerPageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="手机号">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber ? scope.row.phoneNumber : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="openId"
        align="center"
        label="OpenId">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="nickName"
        align="center"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        align="center"
        label="所属应用APPID">
        <template slot-scope="scope">
          {{ scope.row.appId ? scope.row.appId : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="appName"
        label="所属应用">
      </el-table-column>
      <el-table-column
        prop="appName"
        label="所属游戏">
      </el-table-column>
      <el-table-column
        align="center"
        label="注册类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.regType===1?'success':'warning'">
            <i
              :class="scope.row.regType===1?'el-icon-tickets':'el-icon-picture-outline'">
              {{ scope.row.regType === 1 ? '小程序' : 'H5' }}
            </i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        width="180">
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { page } from '@/api/Customer'
import { queryGameList } from '@/api/Game'
import { queryAppList } from '@/api/ApplicationInfo'

export default {
  name: 'CustomerManage',
  data () {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        appId: '',
        gameId: ''
      },
      customerPageData: {},
      gameList: [],
      appList: []
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.customerPageData = res.data
      })
    },
    doQueryGameList () {
      queryGameList().then(res => {
        this.gameList = res.data
      })
    },
    doQueryAppList () {
      queryAppList().then(res => {
        this.appList = res.data
      })
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
