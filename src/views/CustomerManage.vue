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
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      :data="customerPageData.records"
      height="550"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        label="微信openId">
        <template slot-scope="scope">
          <span>{{ scope.row.openId ? scope.row.openId : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        label="微信昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName ? scope.row.nickName : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="appName"
        label="所属应用">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gameName"
        label="所属游戏">
      </el-table-column>
      <el-table-column
        align="center"
        label="是否关注公众号">
        <template slot-scope="scope">
          <el-tag :type="scope.row.subscribe?'success':'warning'">
            <i
              :class="scope.row.subscribe?'el-icon-star-on':'el-icon-star-off'">
              {{ scope.row.subscribe ? '已关注' : '未关注' }}
            </i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间"
        width="180">
      </el-table-column>
    </el-table>

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="customerPageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="customerPageData.total">
      </el-pagination>
    </div>
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
