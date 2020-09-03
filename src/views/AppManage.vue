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
        label="应用类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 1 ? 'success' : 'warning'">{{
              scope.row.type === 1 ? '小程序' : 'H5'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
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
      <el-table-column
        label="操作">
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
        </div>

        <el-form-item label="应用显示类型" prop="showType">
          <el-select v-model="addAppFormData.showType" placeholder="请选择显示类型">
            <el-option label="资讯" value="1"></el-option>
            <el-option label="壁纸" value="2"></el-option>
            <el-option label="游戏" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联内容" prop="contentId" v-if="addAppFormData.showType==1||addAppFormData.showType==2">
          <el-select v-model="addAppFormData.contentId" placeholder="请选关联内容">
            <el-option :label="content.title" :value="content.id" v-for="content in contentList"
                       :key="content.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联游戏" prop="contentId" v-if="addAppFormData.showType==3">
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
    <el-dialog title="新增游戏" :visible.sync="updataDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateAppFormData" :rules="rules"
               ref="updateGameForm">
        <el-form-item label="应用名称" prop="appName">
          <el-input v-model="updateAppFormData.appName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="type">
          <el-select v-model="updateAppFormData.type" placeholder="请选择应用类型">
            <el-option label="小程序" value="1"></el-option>
            <el-option label="H5" value="2"></el-option>
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
          <el-form-item label="小程序密钥" prop="appSecret">
            <el-input v-model="updateAppFormData.appSecret" autocomplete="off"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="应用显示类型" prop="showType">
          <el-select v-model="updateAppFormData.showType" placeholder="请选择显示类型">
            <el-option label="资讯" value="1"></el-option>
            <el-option label="壁纸" value="2"></el-option>
            <el-option label="游戏" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联内容" prop="contentId" v-if="updateAppFormData.showType==1||updateAppFormData.showType==2">
          <el-select v-model="updateAppFormData.contentId" placeholder="请选关联内容">
            <el-option :label="content.title" :value="content.id" v-for="content in contentList"
                       :key="content.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联游戏" prop="contentId" v-if="updateAppFormData.showType==3">
          <el-select v-model="updateAppFormData.gameId" placeholder="请选关联游戏">
            <el-option :label="game.gameName" :value="game.id" v-for="game in gameList" :key="game.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(2,'updateGameForm')">取 消</el-button>
        <el-button type="primary" @click="updateGame('updateGameForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addOrUpdate, deleteById } from '@/api/ApplicationInfo'
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
        ]
      },
      gameList: [],
      contentList: []
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
      this.pageParam.type = type
      this.doPageQuery()
    },
    saveApp (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
      console.log('应用修改数据', row)
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
    }
  },
  created () {
    this.doPageQuery()
    // 查询所有游戏集合
    this.doQueryGameList()
    this.doQueryContentList()
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
