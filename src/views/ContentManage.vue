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
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      :data="contentPageData.records"
      height="550"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="组名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        label="组类型"
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
    <el-dialog title="新增内容" :visible.sync="addDialogFormVisible" @close="unShowAndClear(1,'addContentForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addContentFormData" :rules="rules"
               ref="addContentForm">
        <el-form-item label="组名" prop="title">
          <el-input v-model="addContentFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addContentFormData.type" placeholder="请选择应用类型">
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addContentFormData.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联内容条目">
          <el-checkbox-group v-model="addContentFormData.itemIds">
            <el-checkbox :label="singleItem.id" v-for="singleItem in itemList"
                         :key="singleItem.id">{{ singleItem.title }}
            </el-checkbox>
          </el-checkbox-group>
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
        <el-form-item label="组名" prop="title">
          <el-input v-model="updateContentFormData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="updateContentFormData.type" placeholder="请选择内容类型" disabled>
            <el-option label="资讯" :value="1"></el-option>
            <el-option label="壁纸" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="updateContentFormData.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联内容条目">
          <el-checkbox-group v-model="updateContentFormData.itemIds">
            <el-checkbox :label="singleItem.id" v-for="singleItem in itemList"
                         :key="singleItem.id">{{ singleItem.title }}
            </el-checkbox>
          </el-checkbox-group>
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
import { addOrUpdate, deleteById, page, queryBinded } from '@/api/Content'
import { queryList } from '@/api/ContentItem'
import { getToken } from '@/utils/TokenUtil'

export default {
  name: 'ContentManage',
  data () {
    return {
      itemList: [],
      checkedList: [],
      informationContent: '',
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        type: ''
      },
      addDialogFormVisible: false,
      updataDialogFormVisible: false,
      contentPageData: {},
      addContentFormData: {
        itemIds: []
      },
      updateContentFormData: {
        itemIds: []
      },
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
      infoList: [],
      infoItem: {},
      uploadHeader: {
        token: '123'
      }
    }
  },
  methods: {
    doQueryItemList () {
      queryList().then(res => {
        console.log(res)
        this.itemList = res.data
      })
    },
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
      // 查询已绑定的内容条目
      queryBinded({ groupId: row.id }).then(res => {
        this.updateContentFormData = row
        this.updataDialogFormVisible = true
        this.updateContentFormData.itemIds = res.data
      })
    },
    saveContent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求
          addOrUpdate(this.addContentFormData).then(res => {
            this.addContentFormData = {}
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
    },
    pageNumberChange (res) {
      this.pageParam.pageNumber = res
      this.doPageQuery()
    }
  },
  created () {
    this.doPageQuery()
    this.setToken()
    this.doQueryItemList()
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
