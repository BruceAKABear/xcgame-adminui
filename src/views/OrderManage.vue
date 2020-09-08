<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-header">
      <el-button size="small" type="primary" @click="addDialogFormVisible=true">新增应用</el-button>
      <div>
        <el-radio-group v-model="pageParam.type" size="small" @change="conditionPage">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">资讯</el-radio-button>
          <el-radio-button label="2">壁纸</el-radio-button>
          <el-radio-button label="3">游戏</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--表格-->
    <el-table
      size="small"
      :data="orderPageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appName"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        label="商品价格">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 1 ? 'success' : 'warning'">{{
              scope.row.type === 1 ? '小程序' : 'H5'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? scope.row.appId : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="小程序原始">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? scope.row.appOriId : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="显示类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.showType===1?'success':scope.row.showType===2?'warning':'danger'">
            <i
              :class="scope.row.showType===1?'el-icon-tickets':scope.row.showType===2?'el-icon-picture-outline':'el-icon-coordinate'">
              {{ scope.row.showType === 1 ? '资讯' : scope.row.showType === 2 ? '壁纸' : '游戏' }}
            </i>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrderManage',
  data () {
    return {
      orderPageData: {},
      pageParam: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  margin-top: 35px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

</style>
