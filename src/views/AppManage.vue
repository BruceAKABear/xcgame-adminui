<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-header">
      <el-button size="small" type="primary">新增应用</el-button>
      <div>
        <el-radio-group v-model="pageParam.type" size="small">
          <el-radio-button label="1">资讯</el-radio-button>
          <el-radio-button label="2">壁纸</el-radio-button>
          <el-radio-button label="3">游戏</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table
      :data="appPageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="应用ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appName"
        label="应用名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="应用类型"
        width="180">
        <template slot-scope="scope">
          {{ scope.type == 1 ? '小程序' : 'H5' }}
        </template>
      </el-table-column>
      <el-table-column
        label="显示类型"
        width="180">
        <template slot-scope="scope">
          {{ scope.showType == 1 ? '资讯' : '游戏' }}
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
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { page } from '@/api/ApplicationInfo'

export default {
  name: 'AppManage',
  data () {
    return {
      appPageData: {},
      queryType: '',
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        type: ''
      }
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.appPageData = res.data
        console.log(res)
      })
    },
    conditionPage (type) {
      console.log('分页类型', type)
      this.pageParam.type = type
      this.doPageQuery()
    }
  },
  created () {
    this.doPageQuery()
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
