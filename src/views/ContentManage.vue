<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-header">
      <el-button size="small" type="primary" @click="addDialogFormVisible=true">新增内容</el-button>
      <div>
        <el-radio-group v-model="pageParam.type" size="small" @change="doPageQuery">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">资讯</el-radio-button>
          <el-radio-button label="2">壁纸</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table
      :data="contentPageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="内容ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="内容标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="内容类型"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 1 ? 'success' : 'warning'">{{
              scope.row.type === 1 ? '资讯' : '壁纸'
            }}
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
      <el-table-column
        label="操作"
      width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { page } from '@/api/Content'

export default {
  name: 'ContentManage',
  data () {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        type: ''
      },
      contentPageData: {}
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.contentPageData = res.data
      })
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
