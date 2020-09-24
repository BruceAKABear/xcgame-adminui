<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-header">
      <span>条件查询</span>
      <div class="app-header-content-box">
        <!--游戏类型-->
        <el-select v-model="pageParam.appId" placeholder="请选应用" size="small" clearable style="width: 180px">
          <el-option
            v-for="app in appList"
            :key="app.id"
            :label="app.appName"
            :value="app.id">
          </el-option>
        </el-select>
        <!--游戏类型-->
        <el-select v-model="pageParam.gameId" placeholder="请选择游戏" size="small" clearable
                   style="width: 180px;margin-left: 10px">
          <el-option
            v-for="game in gameList"
            :key="game.id"
            :label="game.gameName"
            :value="game.id">
          </el-option>
        </el-select>
        <!--应用选择-->
        <el-select v-model="pageParam.orderFrom" clearable placeholder="订单来源" size="small"
                   style="width: 180px;margin-left: 10px">
          <el-option :value="1 " label="小程序"></el-option>
          <el-option :value="2" label="H5"></el-option>
        </el-select>
        <el-button size="small" type="primary" @click=" doPageQuery" style="margin-left: 10px">查询
        </el-button>
      </div>
    </div>
    <!--表格-->
    <el-table
      size="small"
      :data="orderPageData.records"
      height="550"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appName"
        label="应用名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="gameName"
        label="游戏名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="totalFee"
        align="center"
        label="商品价格(单位：分)">
      </el-table-column>
      <el-table-column
        align="center"
        label="订单来源">
        <template slot-scope="scope">
          <el-tag :type="scope.row.orderFrom===1?'success':'warning'">
            {{ scope.row.orderFrom === 1 ? '小程序' : 'H5' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.orderState===2?'success':scope.row.orderState===1?'warning':'danger'">
            <i
              :class="scope.row.orderState===2?'el-icon-check':scope.row.orderState===1?'el-icon-minus':'el-icon-minus'">
              {{ scope.row.orderState === 2 ? '支付成功' : scope.row.orderState === 1 ? '未支付' : '支付失败' }}
            </i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="支付回调状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.orderState===2?'success':scope.row.orderState===1?'warning':'danger'">
            <i
              :class="scope.row.orderState===2?'el-icon-check':scope.row.orderState===1?'el-icon-minus':'el-icon-minus'">
              {{ scope.row.orderState === 2 ? '回调成功' : '回调失败' }}
            </i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="updateTime"
        label="更新时间">
      </el-table-column>
    </el-table>

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="orderPageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="orderPageData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryGameList } from '@/api/Game'
import { page } from '@/api/order'
import { queryAppList } from '@/api/ApplicationInfo'

export default {
  name: 'OrderManage',
  data () {
    return {
      orderPageData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      gameList: [],
      appList: []
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
        this.orderPageData = res.data
      })
    },
    pageNumberChange (res) {
      this.pageParam.pageNumber = res
      this.doPageQuery()
    }
  },
  created () {
    this.doQueryAppList()
    this.doQueryGameList()
    this.doPageQuery()
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
