<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!--支付配置-->
    <el-tabs type="border-card" border style="margin-top: 25px; width: 100%;">
      <el-tab-pane label="充值">
          <el-form label-position="right" label-width="120px" :rules="rules">
            <el-form-item label="标题" prop="title">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="type">
              <el-input type="textarea" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload class="upload-demo" name="file" :limit="1" :headers="uploadHeader"
                :on-remove="handleRemovePic" :file-list="picList" :on-success="successUpload" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip">只能上传一个图片，同时只能上传jpg/png文件，且不超过10MB</div>
              </el-upload>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addpay">提 交</el-button>
          </el-form-item>
          </el-form>
      </el-tab-pane>
      <!--关注配置-->
      <el-tab-pane label="关注">
        <el-form label-position="right" label-width="120px" :rules="rules" ref="addForm">
          <el-form-item label="标题" prop="title">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="type">
            <el-input type="textarea" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload class="upload-demo" name="file" :limit="1" :headers="uploadHeader"
              :on-remove="handleRemovePic" :file-list="picList" :on-success="successUpload" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传一个图片，同时只能上传jpg/png文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addatt">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SystemManage',
  data () {
    return {
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
            message: '请输入内容',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addatt () {
      console.log('添加关注')
    },
    addpay () {
      console.log('添加充值')
    }
  }
}
</script>

<style scoped>

</style>
