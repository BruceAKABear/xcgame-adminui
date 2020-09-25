<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-header">
      <el-button size="small" type="primary" @click="dialogFormVisible=true">新增游戏</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="pageData.records"
      height="550"
      border
      style="width: 100%"
      size="small"
    >
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="id"
        label="游戏ID">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="appId"
        label="APPID">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="appSecret"
        label="APPSecret">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="gameName"
        label="游戏名">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="gameCompany"
        label="游戏所属公司">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="gameH5Url"
        label="游戏入口地址">
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="payCallbackUrl"
        label="支付回调URL">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="新增时间"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleEdit( scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel( scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="pageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="pageData.total">
      </el-pagination>
    </div>

    <!--新增弹框-->
    <el-dialog title="新增游戏" :visible.sync="dialogFormVisible" @close="unShowAndClear(1,'addGameForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="gameFormData" :rules="rules" ref="addGameForm">
        <el-form-item label="游戏名称" prop="gameName">
          <el-input v-model="gameFormData.gameName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属游戏公司" prop="gameCompany">
          <el-input v-model="gameFormData.gameCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏访问地址" prop="gameH5Url">
          <el-input v-model="gameFormData.gameH5Url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付回调URL" prop="payCallbackUrl">
          <el-input v-model="gameFormData.payCallbackUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏描述" prop="payCallbackUrl">
          <el-input v-model="gameFormData.gameDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏头像" prop="payCallbackUrl">
          <el-upload
            class="upload-demo"
            :action="imageUploadUrl"
            name="file"
            :limit="1"
            :headers="uploadHeader"
            :on-remove="handleRemovePic"
            :file-list="picList"
            :on-success="successUpload"
            list-type="picture"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">一次只能上传一张照片图片，图片大小不能超过1MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(1,'addGameForm')">取 消</el-button>
        <el-button type="primary" @click="saveGame('addGameForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改弹框-->
    <el-dialog title="新增游戏" :visible.sync="updataDialogFormVisible" @close="unShowAndClear(2,'addGameForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateGameFormData" :rules="rules"
               ref="updateGameForm">
        <el-form-item label="游戏名称" prop="gameName">
          <el-input v-model="updateGameFormData.gameName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="APPID" prop="appId">
          <el-input v-model="updateGameFormData.appId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="APPSercet" prop="appSecret">
          <el-input v-model="updateGameFormData.appSecret" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属游戏公司" prop="gameCompany">
          <el-input v-model="updateGameFormData.gameCompany" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏访问地址" prop="gameH5Url">
          <el-input v-model="updateGameFormData.gameH5Url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付回调URL" prop="payCallbackUrl">
          <el-input v-model="updateGameFormData.payCallbackUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏描述" prop="payCallbackUrl">
          <el-input v-model="updateGameFormData.gameDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏头像" prop="payCallbackUrl">
          <el-upload
            class="upload-demo"
            :action="imageUploadUrl"
            name="file"
            :limit="1"
            :headers="uploadHeader"
            :on-remove="handleRemovePic"
            :file-list="picList"
            :on-success="successUpload"
            list-type="picture"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
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
import { page, addOrUpdate, deleteById } from '@/api/Game'
import { getToken } from '@/utils/TokenUtil'

export default {
  name: 'GameManage',
  data () {
    return {
      pageQueryParam: {
        pageNumber: 1,
        pageSize: 10
      },
      pageData: {},
      dialogFormVisible: false,
      updataDialogFormVisible: false,
      gameFormData: {},
      updateGameFormData: {},
      rules: {
        gameName: [
          {
            required: true,
            message: '请输入游戏名',
            trigger: 'blur'
          }
        ],
        gameCompany: [
          {
            required: true,
            message: '请输入游戏公司名',
            trigger: 'blur'
          }
        ],
        gameH5Url: [
          {
            required: true,
            message: '请输入游戏地址',
            trigger: 'blur'
          }
        ],
        payCallbackUrl: [
          {
            required: true,
            message: '请输入游戏支付回调地址',
            trigger: 'blur'
          }
        ]
      },
      imageUploadUrl: 'http://127.0.0.1:8222/image/upload',
      uploadHeader: {
        token: '123'
      },
      picList: []
    }
  },
  methods: {
    handleRemovePic (file, fileList) {
      this.picList = fileList
    },
    setToken () {
      this.uploadHeader.token = getToken()
    },
    successUpload (response, file, fileList) {
      this.picList.push({ url: response.data })
    },
    beforeUpload (file) {
      console.log('文件信息', file)
      const isPic = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isPic) {
        this.$message.error('只能上传图片')
      }
      if (!isLt1M) {
        this.$message.error('图片大小必须在1MB以内')
      }
      return isPic && isLt1M
    },
    doPageQuery () {
      page(this.pageQueryParam).then(res => {
        this.pageData = res.data
        console.log(res.data)
      })
    },
    saveGame (formName) {
      // addGameForm
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.gameFormData.headPic = this.picList[0].url
          // 新增请求
          addOrUpdate(this.gameFormData).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            // 隐藏
            this.dialogFormVisible = false
            this.picList = []
            // 再次请求列表
            this.doPageQuery()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateGame (formName) {
      this.$confirm('游戏信息必须保证正确, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 新增请求
            this.updateGameFormData.headPic = this.picList[0].url
            addOrUpdate(this.updateGameFormData).then(res => {
              this.$message.success('修改成功')
              // 清空
              this.$refs[formName].resetFields()
              // 隐藏
              this.updataDialogFormVisible = false
              this.picList = []
              // 再次请求列表
              this.doPageQuery()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    },
    handleEdit (row) {
      this.updateGameFormData = row
      this.updataDialogFormVisible = true
      this.picList = [{ url: row.headPic }]
    },
    unShowAndClear (type, fromId) {
      this.picList = []
      if (type === 1) {
        this.dialogFormVisible = false
        this.$refs[fromId].resetFields()
      } else {
        this.updataDialogFormVisible = false
      }
    },
    handleDel (rowData) {
      this.$confirm('游戏基本信息非常重要, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(rowData)
        // 调用删除
        deleteById({ id: rowData.id }).then(res => {
          this.$message.success('删除成功')
          // 重新查询数据
          this.doPageQuery()
        })
      })
    },
    pageNumberChange (res) {
      this.pageParam.pageNumber = res
      this.doPageQuery()
    }
  },
  created () {
    this.doPageQuery()
    this.setToken()
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
