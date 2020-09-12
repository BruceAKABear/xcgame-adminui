<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--头-->
    <div class="app-header">
      <el-button size="small" type="primary" @click="addDialogFormVisible=true">新增员工</el-button>
    </div>
    <!--表格-->
    <el-table
      size="small"
      :data="employeePageData.records"
      height="500"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="手机号/账号"
        width="180">
      </el-table-column>
      <el-table-column
        label="启用状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enable ? 'success' : 'warning'">{{
              scope.row.enable ? '启用' : '停用'
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="员工类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isAdmin?'success':'info'">
            {{ scope.row.isAdmin ? '超级管理员' : '普通员工' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        width="180"
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
            @click="handleDel(scope.row)" v-if="!scope.row.isAdmin">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增弹框-->
    <el-dialog title="新增内容" :visible.sync="addDialogFormVisible" @close="unShowAndClear(1,'addEmployeeForm')">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addEmployeeFormData" :rules="rules"
               ref="addEmployeeForm">
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="addEmployeeFormData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="addEmployeeFormData.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="addEmployeeFormData.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(1,'addEmployeeForm')">取 消</el-button>
        <el-button type="primary" @click="saveEmployee('addEmployeeForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改弹框-->
    <el-dialog title="修改内容" :visible.sync="updataDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="updateEmployeeFormData" :rules="rules"
               ref="updateEmployeeForm">
        <el-form-item label="用户昵称">
          <el-input v-model="updateEmployeeFormData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="updateEmployeeFormData.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="启停状态">
          <el-switch
            v-model="updateEmployeeFormData.enable"
            active-text="启用"
            inactive-text="停用">
          </el-switch>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="updateEmployeeFormData.passWord" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear(2,'updateEmployeeForm')">取 消</el-button>
        <el-button type="primary" @click="updateEmployee('updateEmployeeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addOrUpdate, deleteById } from '@/api/Employee'

export default {
  name: 'SystemManage',
  data () {
    return {
      employeePageData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      addDialogFormVisible: false,
      updataDialogFormVisible: false,
      addEmployeeFormData: {},
      updateEmployeeFormData: {},
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ],
        passWord: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    doPageQuery () {
      page(this.pageParam).then(res => {
        this.employeePageData = res.data
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
    saveEmployee (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求
          addOrUpdate(this.addEmployeeFormData).then(res => {
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
    updateEmployee (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求
          addOrUpdate(this.updateEmployeeFormData).then(res => {
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
    handleDel (rowData) {
      this.$confirm('是否确认删除？').then(res => {
        deleteById({ id: rowData.id }).then(res => {
          console.log(res)
          this.$message.success('删除成功')
          // 重新查询数据
          this.doPageQuery()
        })
      })
    },
    handleEdit (row) {
      this.updateEmployeeFormData = row
      this.updataDialogFormVisible = true
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
