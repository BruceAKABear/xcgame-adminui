<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容条目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-header">
      <el-button size="small" type="primary" @click="addDialogFormVisible=true">新增条目</el-button>
      <div>
        <el-radio-group v-model="pageParam.type" size="small" @change="doPageQuery">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">资讯</el-radio-button>
          <el-radio-button label="2">壁纸</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      :data="contentPageData.records"
      height="600"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="descrip"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        label="类型"
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
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
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

    <!--分頁-->
    <div style="margin-top: 10px;display: flex;justify-content: center" v-if="contentPageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="contentPageData.total">
      </el-pagination>
    </div>
    <!--新增弹框-->
    <el-dialog title="新增条目" :visible.sync="addDialogFormVisible" @close="unShowAndClear(1,'addForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addFormData" :rules="rules"
               ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addFormData.type" placeholder="请选择类型">
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addFormData.descrip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主图">
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
            <div slot="tip" class="el-upload__tip">只能上传一个图片，同时只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" style="height: 550px">
          <quill-editor v-model="addFormData.content" ref="myQuillEditor" style="height: 400px;">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(1,'addForm')">取 消</el-button>
        <el-button type="primary" @click="saveForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改弹框-->
    <el-dialog title="修改内容" :visible.sync="updataDialogFormVisible" @close="unShowAndClear(2,'updateForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateFormData" :rules="rules"
               ref="updateForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="updateFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="updateFormData.type" placeholder="请选择类型">
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="updateFormData.descrip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主图">
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
        <el-form-item label="内容" style="height: 550px">
          <quill-editor v-model="updateFormData.content" ref="myQuillEditor" style="height: 500px;">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(2,'updateForm')">取 消</el-button>
        <el-button type="primary" @click="updateContent('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { addOrUpdate, deleteById, page } from '@/api/ContentItem'
import { getToken } from '@/utils/TokenUtil'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'ContentItemManage',
  data () {
    return {
      imageUploadUrl: 'http://127.0.0.1:8222/image/upload',
      addFormData: {},
      updateFormData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        type: ''
      },
      addDialogFormVisible: false,
      updataDialogFormVisible: false,
      contentPageData: {},
      addContentFormData: {},
      updateContentFormData: {},
      rules: {
        title: [
          {
            required: true,
            message: '请输入内容标题',
            trigger: 'blur'
          }
        ],
        headPic: [
          {
            required: true,
            message: '请上传主图',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择内容类型',
            trigger: 'change'
          }
        ],
        infoTitle: [
          {
            required: true,
            message: '请输入资讯标题',
            trigger: 'blur'
          }
        ],
        abstract: [
          {
            required: true,
            message: '请输入资讯简介',
            trigger: 'blur'
          }
        ],
        infoDetails: [
          {
            required: true,
            message: '请输入资讯详情',
            trigger: 'blur'
          }
        ],
        remarks: [
          {
            required: true,
            message: '请输入内容备注',
            trigger: 'blur'
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
      picList: [],
      uploadHeader: {
        token: '123'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.contentPageData = res.data
      })
    },
    handleDel (rowData) {
      deleteById({ id: rowData.id }).then(res => {
        this.$message.success('删除成功')
        // 重新查询数据
        this.doPageQuery()
      })
    },
    handleEdit (row) {
      this.updateFormData = row
      this.updataDialogFormVisible = true
      this.picList.push({ url: row.headPic })
    },
    saveForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFormData.headPic = this.picList[0].url
          // 新增请求
          addOrUpdate(this.addFormData).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            this.picList = []
            // 隐藏
            this.addDialogFormVisible = false
            this.addFormData = {}
            // 再次请求列表
            this.doPageQuery()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateContent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateFormData.headPic = this.picList[0].url
          // 新增请求
          addOrUpdate(this.updateFormData).then(res => {
            this.$message.success('修改成功')
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
        this.picList = []
        this.updataDialogFormVisible = false
      }
    },
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
