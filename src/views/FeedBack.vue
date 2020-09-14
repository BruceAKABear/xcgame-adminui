<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>客服模板</el-breadcrumb-item>
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
        <el-select v-model="pageParam.appId" placeholder="请选择小程序" size="small" clearable
                   style="width: 180px;margin-left: 10px">
          <el-option
            v-for="app in appList"
            :key="app.id"
            :label="app.appName"
            :value="app.appId">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" @click=" doPageQuery" style="margin-left: 10px">查询</el-button>
      </div>
    </div>
    <el-table
      size="small"
      :data="feedbackPageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="消息ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="miniName"
        align="center"
        label="所属小程序">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="userOpenId"
        align="center"
        label="用户openId">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="nickName"
        align="center"
        label="消息类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.msgType==='text'?'success':'warning'">
            {{ scope.row.msgType === 'text' ? '文本' : '照片' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="content"
        label="文本内容">
      </el-table-column>
      <el-table-column
        align="center"
        label="是否回复">
        <template slot-scope="scope">
          <el-tag :type="scope.row.answered?'success':'warning'">
            {{ scope.row.answered ? '已回复' : '未回复' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
        width="180">
      </el-table-column>

      <el-table-column
        width="180"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { queryGameList } from '@/api/Game'
import { queryAppList } from '@/api/ApplicationInfo'
import { page } from '@/api/feedback'

export default {
  name: 'FeedBack',
  data () {
    return {
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        appId: '',
        gameId: ''
      },
      feedbackPageData: {},
      gameList: [],
      appList: []
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        console.log('-==--==-', res.data)
        this.feedbackPageData = res.data
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
