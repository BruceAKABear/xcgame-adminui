<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!--支付配置-->
    <el-tabs type="border-card" border style="margin-top: 25px; width: 100%;">
      <el-tab-pane label="充值">
          <el-form label-position="right" label-width="120px" :model="addFromDataPay" ref="addFromDataPay">
            <el-form-item label="标题" prop="title">
              <el-input autocomplete="off" v-model="addFromDataPay.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="title">
              <el-input autocomplete="off" v-model="addFromDataPay.descrip"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload class="upload-demo" name="file" :action="imageUploadUrl" :limit="1" :headers="uploadHeader"
                :on-remove="handleRemovePic" :file-list="picList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传一个图片，同时只能上传jpg/png文件，且不超过10MB</div>
              </el-upload>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addFromDataPay')">提 交</el-button>
          </el-form-item>
          <el-form-item>
            <el-card class="box-card" body-style="padding:5px" style="width:230px;height: 105px;">
              <div class="count-item">
                <div class="count-item-content">
                  <span style="height: 25px;line-height: 20px;">标题标题</span>
                  <span style="height: 70px;font-size: 12px;color: gray;line-height: 25px;">点击链接，长按识别二维码即可关注</span>
                </div>
                <div class="img-box">
                  <el-image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" fit="cover"
                            style="width: 80px; height: 80px"></el-image>
                </div>
              </div>
            </el-card>
          </el-form-item>
          </el-form>
      </el-tab-pane>
      <!--关注配置-->
      <el-tab-pane label="关注">
        <el-form label-position="right" label-width="120px" ref="addForm">
          <el-form-item label="标题" prop="title">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="type">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload class="upload-demo" name="file" :action="imageUploadUrl" :limit="1" :headers="uploadHeader"
              :on-remove="handleRemovePic" :file-list="picList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传一个图片，同时只能上传jpg/png文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { addOrUpdate, getPrePayResponse } from '@/api/SystemManage'
import { getToken } from '@/utils/TokenUtil'
export default {
  name: 'SystemManage',
  data () {
    return {
      addFromDataPay: { },
      picList: [],
      uploadHeader: {
        token: '321'
      },
      imageUploadUrl: 'http://192.168.101.19:8222/image/upload'
      // imageUploadUrl: 'http://127.0.0.1:8222/image/upload'
    }
  },
  methods: {
    handleEdit (row) {
      this.addFromDataPay = row
      this.picList.push({ url: row.picUrl })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求 [0].url
          this.addFromDataPay.picUrl = this.picList[0].url
          addOrUpdate(this.addFromDataPay).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            this.picList = []
            this.doQueryItemList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRemovePic (file, fileList) {
      console.log(file, fileList)
      this.picList = fileList
    },
    setToken () {
      this.uploadHeader.token = getToken()
    },
    doQueryItemList () {
      getPrePayResponse().then(res => {
        this.itemList = res.data
      })
    }
  },
  created () {
    this.doQueryItemList()
    this.setToken()
  }
}
</script>

<style lang="scss" scoped>
  .count-item {
    display: flex;
    align-items: center;
    .count-item-content {
      width: 130px;
      padding-right: 20px;
      display: flex;
      flex-direction: column;

      .count-number {
        // margin-top: 8px;
        font-size: 22px;
        color: black;
      }

    }
    .img-box{
      margin-top: 5px;
      width: 80px;
      height: 100px;
    }
  }
</style>
