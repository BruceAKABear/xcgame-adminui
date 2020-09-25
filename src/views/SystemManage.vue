<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!--支付配置-->
    <el-tabs type="border-card" border style="margin-top: 25px; width: 100%;">
      <el-tab-pane label="支付客服消息模板">
        <div class="changable-box">
          <el-switch
            v-model="payShangeStatus"
            active-text="修改"
            inactive-text="不修改">
          </el-switch>
        </div>
        <div class="pane-box">
          <div class="form-box">
            <el-form label-position="right" label-width="80px" :model="addFromDataPay" ref="addFromDataPayFrom"
                     :rules="rules">
              <el-form-item label="标题" prop="title">
                <el-input autocomplete="off" v-model="addFromDataPay.title"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="title">
                <el-input autocomplete="off" v-model="addFromDataPay.descrip"></el-input>
              </el-form-item>
              <el-form-item label="图片">
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
                  <div slot="tip" class="el-upload__tip">只能图片文件，图片大小必须在1MB以内</div>
                </el-upload>
              </el-form-item>
              <el-form-item v-if="payShangeStatus">
                <el-button type="primary" @click="submitFormPay('addFromDataPayFrom')">提 交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="sample-box">
            <div class="smaple-header">
              <span>支付客服消息预览</span>
            </div>
            <el-card class="box-card" body-style="padding:5px" style="width:260px;height: 105px;">
              <div class="count-item">
                <div class="count-item-content">
                  <span style="height: 25px;line-height: 20px;">{{ addFromDataPay.title }}</span>
                  <span
                    style="height: 50px;font-size: 12px;color: gray;line-height: 25px;">{{
                      addFromDataPay.descrip
                    }}</span>
                </div>
                <div class="img-box">
                  <el-image
                    :src="addFromDataPay.picUrl"
                    fit="cover"
                    style="width: 80px; height: 80px"></el-image>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <!--关注配置-->
      <el-tab-pane label="关注">
        <el-form label-position="right" label-width="80px" ref="addFromDataFollow" :model="addFromDataFollow"
                 :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input autocomplete="off" v-model="addFromDataFollow.title"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="title">
            <el-input autocomplete="off" v-model="addFromDataFollow.descrip"></el-input>
          </el-form-item>
          <el-form-item label="图片">
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
          <el-form-item>
            <el-button type="primary" @click="submitFormFollow('addFromDataFollow')">提 交</el-button>
          </el-form-item>
          <el-form-item>
            <el-card class="box-card" body-style="padding:5px" style="width:230px;height: 105px;">
              <div class="count-item">
                <div class="count-item-content">
                  <span style="height: 25px;line-height: 20px;">{{ addFromDataFollow.title }}</span>
                  <span
                    style="height: 70px;font-size: 12px;color: gray;line-height: 25px;">{{
                      addFromDataFollow.descrip
                    }}</span>
                </div>
                <div class="img-box">
                  <el-image
                    src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
                    fit="cover"
                    style="width: 80px; height: 80px"></el-image>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { addOrUpdatePay, getPrePayResponse, addOrUpdateFollow } from '@/api/SystemManage'
import { getToken } from '@/utils/TokenUtil'

export default {
  name: 'SystemManage',
  data () {
    return {
      addFromDataPay: {},
      addFromDataFollow: {},
      picList: [],
      payList: {},
      rules: {
        title: [
          {
            required: true,
            message: '请输入内容标题',
            trigger: 'blur'
          }
        ],
        descrip: [
          {
            required: true,
            message: '请输入描述内容',
            trigger: 'blur'
          }
        ],
        picUrl: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'change'
          }
        ]
      },
      uploadHeader: {
        token: '321'
      },
      imageUploadUrl: 'http://192.168.101.19:8222/image/upload',
      payShangeStatus: false
    }
  },
  methods: {
    // 支付新增
    submitFormPay (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求
          this.addFromDataPay.picUrl = this.picList[0].url
          addOrUpdatePay(this.addFromDataPay).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            this.picList = []
            this.doQueryPay()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关注新增
    submitFormFollow (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增请求 [0].url
          this.addFromDataFollow.picUrl = this.picList[0].url
          addOrUpdateFollow(this.addFromDataFollow).then(res => {
            this.$message.success('新增成功')
            // 清空
            this.$refs[formName].resetFields()
            this.picList = []
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 支付查询
    doQueryPay () {
      getPrePayResponse({}).then(res => {
        this.addFromDataPay = res.data
        this.picList = [{ url: res.data.picUrl }]
      })
    },
    // 关注查询
    handlePreview (file) {
      console.log(file)
    },
    handleRemovePic (file, fileList) {
      console.log(file, fileList)
      this.picList = fileList
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
    setToken () {
      this.uploadHeader.token = getToken()
    }
  },
  created () {
    this.doQueryPay()
    this.setToken()
  }
}
</script>

<style lang="scss" scoped>
.count-item {
  margin-left: 15px;
  margin-right: 15px;
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

  .img-box {
    margin-top: 5px;
    width: 80px;
    height: 100px;
  }
}

.changable-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;

}

.pane-box {
  display: flex;

  .form-box {
    width: 60%;
    padding: 30px;
  }

  .sample-box {
    width: 40%;
    padding: 30px;

    .smaple-header {
      font-size: 18px;
      font-weight: bold;
      color: #c8c9cc;
      margin-bottom: 15px;
    }
  }
}

</style>
