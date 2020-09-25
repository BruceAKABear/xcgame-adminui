<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-header">
      <el-button size="small" type="primary" @click="addDialogFormVisible=true">新增应用</el-button>
      <div>
        <el-radio-group v-model="pageParam.type" size="small" @change="conditionPage">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">资讯应用</el-radio-button>
          <el-radio-button label="2">壁纸应用</el-radio-button>
          <el-radio-button label="3">游戏应用</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="mini"
      :data="appPageData.records"
      height="550"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="id"
        label="应用ID">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="appName"
        label="应用名称">
      </el-table-column>
      <el-table-column
        align="center"
        label="应用类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 1 ? 'success' : 'warning'">{{
              scope.row.type === 1 ? '小程序' : 'H5'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        label="H5应用访问地址">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? '-' : 'https://mini.xichengame.net/?sourceType=h5&&sourceAppId=' + scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        label="小程序APPID">
        <template slot-scope="scope">
          {{ scope.row.type === 1 ? scope.row.appId : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
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
        align="center"
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="updateTime"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column
        width="260"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.type===1" size="mini" type="primary"
                     v-clipboard:copy="'https://mini.xichengame.net/?sourceType=h5&&sourceAppId=' + scope.row.id "
                     v-clipboard:success="copySuccess" v-clipboard:error="copyError"
          >复制访问地址
          </el-button>
          <el-button
            type="warning"
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

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="appPageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="appPageData.total">
      </el-pagination>
    </div>

    <!--新增弹框-->
    <el-dialog title="新增应用" :visible.sync="addDialogFormVisible" @close="unShowAndClear(1,'addAppForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addAppFormData" :rules="rules" ref="addAppForm">
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="addAppFormData.appName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="type">
          <el-select v-model="addAppFormData.type" placeholder="请选择应用类型">
            <el-option label="小程序" value="1"></el-option>
            <el-option label="H5" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--动态显示小程序的信息-->
        <div v-if="addAppFormData.type==1">
          <el-form-item label="小程序APPID" prop="appId">
            <el-input v-model="addAppFormData.appId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小程序原始ID" prop="appOriId">
            <el-input v-model="addAppFormData.appOriId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小程序密钥" prop="appSecret">
            <el-input v-model="addAppFormData.appSecret" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="MsgToken" prop="messageToken">
            <el-input v-model="addAppFormData.messageToken" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="EncodingKey" prop="encodingKey">
            <el-input v-model="addAppFormData.encodingKey" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="应用显示类型" prop="showType">
          <el-select v-model="addAppFormData.showType" placeholder="请选择显示类型">
            <el-option label="资讯" :value="1" v-if="addAppFormData.type==1"></el-option>
            <el-option label="壁纸" :value="2" v-if="addAppFormData.type==1"></el-option>
            <el-option label="游戏" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联内容组" prop="contentId" v-if="addAppFormData.showType==1||addAppFormData.showType==2">
          <el-select v-model="addAppFormData.contentId" placeholder="请选关联内容">
            <el-option :label="content.title" :value="content.id" v-for="content in contentList"
                       :key="content.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联游戏" prop="gameId" v-if="addAppFormData.showType==3">
          <el-select v-model="addAppFormData.gameId" placeholder="请选关联游戏">
            <el-option :label="game.gameName" :value="game.id" v-for="game in gameList" :key="game.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(1,'addAppForm')">取 消</el-button>
        <el-button type="primary" @click="saveApp('addAppForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改弹框-->
    <el-dialog title="修改应用" :visible.sync="updataDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateAppFormData" :rules="rules"
               ref="updateAppForm">
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="updateAppFormData.appName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="type">
          <el-select v-model="updateAppFormData.type" placeholder="请选择应用类型" :disabled="true">
            <el-option label="小程序" :value="1"></el-option>
            <el-option label="H5" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--动态显示小程序的信息-->
        <div v-if="updateAppFormData.type==1">
          <el-form-item label="小程序APPID" prop="appId">
            <el-input v-model="updateAppFormData.appId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小程序原始ID" prop="appOriId">
            <el-input v-model="updateAppFormData.appOriId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小程序密钥">
            <el-input v-model="updateAppFormData.appSecret" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="MsgToken" prop="messageToken">
            <el-input v-model="updateAppFormData.messageToken" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="EncodingKey" prop="encodingKey">
            <el-input v-model="updateAppFormData.encodingKey" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="应用显示类型" prop="showType">
          <el-select v-model="updateAppFormData.showType" placeholder="请选择显示类型" :disabled="updateAppFormData.type===2">
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
            <el-option label="游戏" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联内容" prop="contentId" v-if="updateAppFormData.showType==1||updateAppFormData.showType==2">
          <el-select v-model="updateAppFormData.contentId" placeholder="请选关联内容">
            <el-option :label="content.title" :value="content.id" v-for="content in contentList"
                       :key="content.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联游戏" prop="gameId" v-if="updateAppFormData.showType==3">
          <el-select v-model="updateAppFormData.gameId" placeholder="请选关联游戏">
            <el-option :label="game.gameName" :value="game.id" v-for="game in gameList" :key="game.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(2,'updateAppForm')">取 消</el-button>
        <el-button type="primary" @click="updateApp('updateAppForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addOrUpdate, deleteById, queryAppList } from '@/api/ApplicationInfo'
import { queryGameList } from '@/api/Game'
import { queryContentList } from '@/api/Content'

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
      },
      addDialogFormVisible: false,
      updataDialogFormVisible: false,
      addAppFormData: {},
      updateAppFormData: {},
      rules: {
        appName: [
          {
            required: true,
            message: '请输入应用名',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择应用类型',
            trigger: 'change'
          }
        ],
        appId: [
          {
            required: true,
            message: '请填写小程序APPID',
            trigger: 'change'
          }
        ],
        appSecret: [
          {
            required: true,
            message: '请填写小程序密钥',
            trigger: 'change'
          }
        ],
        messageToken: [
          {
            required: true,
            message: '请填写小程序MessageToken',
            trigger: 'change'
          }
        ],
        encodingKey: [
          {
            required: true,
            message: '请填写小程序EncodingKey',
            trigger: 'change'
          }
        ],
        appOriId: [
          {
            required: true,
            message: '请填写小程序原始ID',
            trigger: 'change'
          }
        ],
        showType: [
          {
            required: true,
            message: '请选择应用显示类型',
            trigger: 'change'
          }
        ],
        contentId: [
          {
            required: true,
            message: '请选关联内容',
            trigger: 'change'
          }
        ],
        gameId: [
          {
            required: true,
            message: '请选关联游戏',
            trigger: 'change'
          }
        ],
        miniId: [
          {
            required: true,
            message: '请选关联小程序',
            trigger: 'change'
          }
        ]
      },
      gameList: [],
      contentList: [],
      appList: []
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.appPageData = res.data
        console.log(res)
      })
    },
    doQueryAppList () {
      queryAppList().then(res => {
        this.appList = res.data
      })
    },
    conditionPage (type) {
      this.doPageQuery()
    },
    saveApp (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 逻辑上去删除一下不必要的数据
          const type = this.addAppFormData.type
          const showType = this.addAppFormData.showType
          if (type === 2) {
            // 显示游戏，将所有的非游戏内容删除
            this.addAppFormData.appId = ''
            this.addAppFormData.appSecret = ''
            this.addAppFormData.appOriId = ''
          }
          if (showType === 1 || showType === 2) {
            this.addAppFormData.gameId = ''
          } else {
            this.contentId = ''
          }

          // 新增请求
          addOrUpdate(this.addAppFormData).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            // 隐藏
            this.addDialogFormVisible = false
            // 再次请求列表
            this.doPageQuery()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateApp (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 逻辑上去删除一下不必要的数据
          const type = this.updateAppFormData.type
          const showType = this.updateAppFormData.showType
          if (type === 2) {
            // 显示游戏，将所有的非游戏内容删除
            this.updateAppFormData.appId = ''
            this.updateAppFormData.appSecret = ''
            this.updateAppFormData.appOriId = ''
          }
          if (showType === 3) {
            this.updateAppFormData.contentId = ''
          } else {
            this.updateAppFormData.gameId = ''
          }

          // 新增请求
          addOrUpdate(this.updateAppFormData).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            // 隐藏
            this.updataDialogFormVisible = false
            // 再次请求列表
            this.doPageQuery()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    unShowAndClear (type, fromId) {
      // 1 是新增类型，才去清空
      if (type === 1) {
        this.addDialogFormVisible = false
        this.$refs[fromId].resetFields()
      } else {
        this.updataDialogFormVisible = false
      }
    },
    handleDel (rowData) {
      this.$confirm('应用信息非常重要, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除
        deleteById({ id: rowData.id }).then(res => {
          this.$message.success('删除成功')
          // 重新查询数据
          this.doPageQuery()
        })
      })
    },
    handleEdit (row) {
      this.updateAppFormData = row
      this.updataDialogFormVisible = true
    },
    doQueryGameList () {
      queryGameList({}).then(res => {
        this.gameList = res.data
      })
    },
    doQueryContentList () {
      queryContentList({}).then(res => {
        this.contentList = res.data
      })
    },
    pageNumberChange (res) {
      this.pageParam.pageNumber = res
      this.doPageQuery()
    },
    copySuccess () {
      this.$message.success('访问地址复制成功')
    },
    copyError () {
      this.$message.error('访问地址复制失败')
    }
  },
  created () {
    this.doPageQuery()
    // 查询所有游戏集合
    this.doQueryGameList()
    this.doQueryContentList()
    this.doQueryAppList()
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
