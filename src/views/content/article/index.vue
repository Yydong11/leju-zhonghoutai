<template>
  <div class="article">
    <!-- 搜索部分 -->
    <div class="search center" style="background-color: #fff; width: 92%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>条件查询</span>
        </div>
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline"
          size="small"
          style="padding: 0 40px"
        >
          <el-form-item label="标题" style="margin-right: 40px">
            <el-input
              v-model="form.title"
              placeholder="标题"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="作者" style="margin-right: 40px">
            <el-input
              v-model="form.author"
              placeholder="作者"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="编辑类型">
            <el-select v-model="form.editorType" placeholder="编辑类型">
              <el-option label="富文本" value="0" />
              <el-option label="Markdown" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 700px">
            <el-button>重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 下方表格部分 -->
    <div class="main center" style="background-color: #fff; width: 92%">
      <div class="main-title">
        <el-button
          type="primary"
          size="small"
          @click="goAddArticle"
        >新增</el-button>
      </div>
      <el-table :data="articleList" border style="width: 90%" class="center">
        <el-table-column
          label="#"
          type="index"
          align="center"
          width="60px"
          fixed
        />
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          width="230px"
        />
        <el-table-column
          prop="coverImg"
          label="展示图片"
          align="center"
          width="200px"
        >
          <template v-slot="scope">
            <img
              :src="scope.row.coverImg"
              alt=""
              style="
                display: block;
                width: 100px;
                height: 100px;
                margin: 0 auto;
              "
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="260px"
        />
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="200px"
        />
        <el-table-column label="文章是否展示" align="center" width="200px">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.isShow"
              active-color="#409eff"
              inactive-color="#ccc"
              @change="isShowEvent(scope.row.id, scope.row.isShow)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="内容"
          align="center"
          width="200px"
        >
          <template v-slot="scope">
            <el-button type="primary" plain size="mini">{{
              scope.row.editorType
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="180px"
          fixed="right"
        >
          <template v-slot="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="goEdit(scope.row.id)"
            ><i class="el-icon-view el-icon--right" /> 编辑文章</el-link>
            <el-link
              type="danger"
              style="display: inline-block; margin-left: 10px"
              :underline="false"
              @click="delArticle(scope.row.id)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="width: 90%; margin: 0 auto"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { findArticles, changeShowStatus, del } from '@/api/content/article'
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      articleList: [],
      total: 0,
      form: {
        author: '',
        collectCount: '',
        content1: '',
        content2: '',
        coverImg: '',
        createTime: '',
        editorType: '',
        id: '',
        isShow: '',
        modifyTime: '',
        summary: '',
        title: '',
        viewCount: '',
        zanCount: ''
      }
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      findArticles(this.start, this.limit, this.form).then((res) => {
        console.log(res)
        res.data.rows.forEach((ele) => (ele.isShow = !!ele.isShow))
        res.data.rows.forEach(
          (ele) => (ele.editorType = ele.editorType ? 'Markdown' : '富文本框')
        )
        this.articleList = res.data.rows
        this.total = res.data.total
        this.value = res.data.rows.isShow ? 'true' : 'false'
      })
    },
    // 查询
    onSubmit() {
      this.getArticleList()
    },
    // 切换每页数据数
    handleSizeChange(e) {
      console.log(e)
      this.limit = e
      this.getArticleList()
    },
    // 切换初始页
    handleCurrentChange(e) {
      console.log(e)
      this.start = e
      this.getArticleList()
    },
    // 文章是否展示
    isShowEvent(id, isShow) {
      // console.log(id, isShow);
      changeShowStatus({
        id: id,
        isShow: isShow ? 1 : 0
      })
    },
    // 跳转到新增文章页面
    goAddArticle() {
      this.$router.push('/content/addArticle')
    },
    // 跳转到编辑文章页面
    goEdit(id) {
      this.$router.push(`/content/editArticle?id=${id}`)
    },
    // 删除文章
    delArticle(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del(id).then((res) => {
            console.log(res)
            this.getArticleList()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.article {
  background-color: #f5f5f5;
  overflow: hidden;
  .main {
    overflow: hidden;
    margin-bottom: 50px;
    padding-bottom: 30px;
    .main-title {
      width: 100%;
      height: 70px;
      padding: 18px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
