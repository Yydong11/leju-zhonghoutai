<template>
  <div class="addArticle">
    <div class="container center" style="width: 95%; background-color: #fff">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>{{ this.id ? "修改" : "新增" }}文章</span>
        </div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          :inline="false"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="作者" prop="author">
                <el-input v-model="form.author" placeholder="作者姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="标题"
                style="margin-right: 20px"
                prop="title"
              >
                <el-input v-model="form.title" placeholder="文章标题" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否显示">
                <el-switch
                  v-model="form.isShow"
                  :active-value="true"
                  :inactive-value="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20" :offset="0">
              <el-form-item label="摘要">
                <el-input
                  v-model="form.summary"
                  type="textarea"
                  :rows="2"
                  placeholder="摘要"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="0">
              <el-form-item label="封面图片">
                <el-upload
                  class="upload-demo"
                  :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
                  :limit="1"
                  :headers="getTokens"
                  :on-success="uploadImgUrl"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary"
                    >点击上传素材</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
                <img
                  v-if="this.id"
                  :src="this.form.coverImg"
                  alt=""
                  style="width: 200px; height: 200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" :offset="0">
              <el-form-item label="切换富文本类型">
                <el-radio v-model="form.editorType" label="0">富文本</el-radio>
                <el-radio v-model="form.editorType" label="1"
                  >Markdown</el-radio
                >
                <span style="color: #e6a23c"
                  >注意!切换编辑器会清空编辑内容</span
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" size="small" style="margin-bottom: 5px"
            >插入图片⬇</el-button
          >
          <tinymce v-if="this.form.editorType == 0" v-model="form.content1" />
          <markdown-editor
            v-else-if="this.form.editorType == 1"
            ref="markdown"
            v-model="form.content1"
          />
          <el-button
            type="primary"
            size="small"
            style="display: block; margin: 10px auto 0"
            @click="onSubmit"
            >立即{{ this.id ? "修改" : "新增" }}</el-button
          >
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/myAuth";
import tinymce from "@/components/Tinymce";
import markdownEditor from "@/components/MarkdownEditor";
import { baseurl } from "@/api/baseurl";
import {
  addArticle,
  productArticle,
  updateArticle,
} from "@/api/content/article";
export default {
  components: {
    tinymce,
    markdownEditor,
  },
  data() {
    return {
      baseurls: "",
      fileList: [],
      id: "",
      form: {
        author: "",
        collectCount: "",
        content1: "",
        content2: "",
        coverImg: "",
        createTime: "",
        editorType: "0",
        id: "",
        isShow: true,
        modifyTime: "",
        summary: "",
        title: "",
        viewCount: "",
        zanCount: "",
      },
      rules: {
        author: [
          { required: true, message: "请输入作者姓名", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
      },
    };
  },
  computed: {
    getTokens() {
      return {
        token: getToken(),
      };
    },
  },
  created() {
    this.baseurls = baseurl;
    // console.log(this.$route.query.id);
    // 判断下是修改还是新增,新增就不走这个接口
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      productArticle(this.$route.query.id).then((res) => {
        console.log(res);
        res.data.productArticle.isShow = !!res.data.productArticle.isShow;
        res.data.productArticle.editorType = res.data.productArticle.editorType
          ? "1"
          : "0";
        this.form = res.data.productArticle;
      });
    }
  },
  methods: {
    uploadImgUrl(e) {
      console.log(e);
      this.form.coverImg = e.data.fileUrl;
    },
    onSubmit() {
      this.form.isShow = this.form.isShow ? 1 : 0;
      if (this.form.editorType == 1) {
        (this.form.content1 = this.$refs.markdown.getValue()),
          (this.form.content2 = this.$refs.markdown.getHtml());
      }
      if (this.id) {
        // 修改
        updateArticle(this.form).then((res) => {
          console.log(res);
        });
        return;
      }
      // 新增
      addArticle(this.form).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addArticle {
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 50px;
  &::v-deep .te-md-splitter {
    width: 50%;
  }
  &::v-deep .tui-editor .te-preview-style-vertical .te-preview {
    width: 100%;
  }
}
</style>
