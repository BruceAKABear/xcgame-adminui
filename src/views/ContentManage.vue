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
      size="small"
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
        label="备注"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{ scope.row.remarks ? scope.row.remarks : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        label="内容类型"
        width="180"
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
        align="center"
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
    <!--新增弹框-->
    <el-dialog title="新增内容" :visible.sync="addDialogFormVisible" @close="unShowAndClear(1,'addContentForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addContentFormData" :rules="rules"
               ref="addContentForm">
        <el-form-item label="内容标题" prop="title">
          <el-input v-model="addContentFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="type">
          <el-select v-model="addContentFormData.type" placeholder="请选择应用类型">
            <el-option label="资讯" value="1"></el-option>
            <el-option label="壁纸" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容备注">
          <el-input v-model="addContentFormData.remarks" autocomplete="off"></el-input>
        </el-form-item>

<!--        <div style="border: solid 1px #909399;padding: 10px">-->
<!--          <el-form-item label="条目标题">-->
<!--            <el-input v-model="addContentFormData.remarks" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="条目描述">-->
<!--            <el-input v-model="addContentFormData.remarks" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="主图">-->
<!--            <el-upload-->
<!--              class="upload-demo"-->
<!--              action="http://127.0.0.1:8222/image/upload"-->
<!--              name="file"-->
<!--              :headers="uploadHeader"-->
<!--              :on-remove="handleRemovePic"-->
<!--              :file-list="picList"-->
<!--              :on-success="successUpload"-->
<!--              list-type="picture"-->
<!--            >-->
<!--              <el-button size="small" type="primary">点击上传</el-button>-->
<!--              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="资讯详情" prop="remarks">-->
<!--            <quill-editor ref="text" v-model="informationContent" style="height:200px;"/>-->
<!--          </el-form-item>-->
<!--        </div>-->
        <el-form-item label="上传壁纸" v-if="addContentFormData.type==2">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:8222/image/upload"
            name="file"
            :headers="uploadHeader"
            :on-remove="handleRemovePic"
            :file-list="picList"
            :on-success="successUpload"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(1,'addContentForm')">取 消</el-button>
        <el-button type="primary" @click="saveContent('addContentForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改弹框-->
    <el-dialog title="修改内容" :visible.sync="updataDialogFormVisible" @close="unShowAndClear(2,'updateContentForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateContentFormData" :rules="rules"
               ref="updateContentForm">
        <el-form-item label="内容标题" prop="title">
          <el-input v-model="updateContentFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容类型" prop="type">
          <el-select v-model="updateContentFormData.type" placeholder="请选择内容类型" disabled>
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容备注" prop="remarks">
          <el-input v-model="updateContentFormData.remarks" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上传壁纸" v-if="updateContentFormData.type==2">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:8222/image/upload"
            name="file"
            :headers="uploadHeader"
            :on-remove="handleRemovePic"
            :file-list="picList"
            :on-success="successUpload"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(2,'updateContentForm')">取 消</el-button>
        <el-button type="primary" @click="updateContent('updateContentForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { page, deleteById, addOrUpdate } from '@/api/Content'
import { getToken } from '@/utils/TokenUtil'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'ContentManage',
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'] // 链接、图片、视频
          ] // 工具菜单栏配置
        },
        placeholder: '请在这里添加产品描述', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true // 语法检测
      },
      informationContent: '',
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
        type: [
          {
            required: true,
            message: '请选择内容类型',
            trigger: 'change'
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
  comments: {
    VueQuillEditor
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.contentPageData = res.data
      })
    },
    handleDel (rowData) {
      deleteById({ id: rowData.id }).then(res => {
        console.log(res)
        this.$message.success('删除成功')
        // 重新查询数据
        this.doPageQuery()
      })
    },
    handleEdit (row) {
      this.updateContentFormData = row
      this.updataDialogFormVisible = true
      if (row.type === 2) {
        this.picList = JSON.parse(row.content)
      }
    },
    saveContent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 遍历图片
          if (this.addContentFormData.type === 2) {
            this.addContentFormData.content = JSON.stringify(this.picList)
          }

          // 新增请求
          addOrUpdate(this.addContentFormData).then(res => {
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
    updateContent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 遍历图片
          if (this.updateContentFormData.type === 2) {
            this.updateContentFormData.content = JSON.stringify(this.picList)
          }
          // 新增请求
          addOrUpdate(this.updateContentFormData).then(res => {
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
