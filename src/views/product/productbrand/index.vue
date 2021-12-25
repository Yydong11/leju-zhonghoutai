<template>
  <div class="productbrand">
    <div class="main center">
      <div class="main-title">
        <el-button type="primary" size="mini" @click="goAddBrand"
          >新增</el-button
        >
      </div>
      <!-- 表格部分 -->
      <el-table :data="brandInfo" border style="width: 96%" class="center">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="40px"
          fixed
        />
        <!-- 品牌名称 -->
        <el-table-column
          prop="name"
          label="品牌名称"
          align="center"
          width="300px"
        >
        </el-table-column>
        <!-- 展示状态 -->
        <el-table-column label="展示状态" align="center" width="200px">
          <template v-slot="scope">
            <div>
              是否展示:<el-switch
                v-model="scope.row.showStatus"
                active-color="#409eff"
                inactive-color="#ccc"
                @change="isShowEvent(scope.row.id, scope.row.showStatus)"
              />
            </div>
          </template>
        </el-table-column>
        <!-- logo -->
        <el-table-column label="logo" align="center" width="200px">
          <template v-slot="scope">
            <img
              :src="scope.row.logo"
              alt=""
              style="
                display: block;
                width: 100px;
                height: 100px;
                margin: 0 auto;
              "
            />
          </template>
        </el-table-column>
        <!-- 专区大图 -->
        <el-table-column label="专区大图" align="center" width="200px">
          <template v-slot="scope">
            <img
              :src="scope.row.bigPic"
              alt=""
              style="
                display: block;
                width: 100px;
                height: 100px;
                margin: 0 auto;
              "
            />
          </template>
        </el-table-column>
        <!-- 品牌故事 -->
        <el-table-column
          prop="brandStory"
          label="品牌故事"
          align="center"
          width="260px"
        >
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="300px"
        />
        <!-- 排序 -->
        <el-table-column
          prop="sort"
          label="排序"
          sortable
          align="center"
          width="200px"
        />
        <!-- 产品评论数量 -->
        <el-table-column
          prop="productCommentCount"
          label="产品评论数量"
          align="center"
          width="200px"
        />
        <!-- 产品数量 -->
        <el-table-column
          prop="productCount"
          label="产品数量"
          align="center"
          width="200px"
        />
        <!-- 是否品牌制造商 -->
        <el-table-column
          prop="factoryStatus"
          label="是否品牌制造商"
          align="center"
          width="200px"
        />
        <!-- 操作 -->
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
              @click="goEdit(scope.row)"
              ><i class="el-icon-view el-icon--right" /> 编辑</el-link
            >
            <el-link
              type="danger"
              style="display: inline-block; margin-left: 10px"
              :underline="false"
              @click="delArticle(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <!-- 弹出框部分 -->
    <el-dialog
      title="品牌详情"
      :visible.sync="dialogVisible"
      width="65%"
      @close="reset"
    >
      <el-form
        :model="addForm"
        ref="form"
        :rules="rules"
        :inline="false"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="品牌名称" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="品牌名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0"
            ><el-form-item label="首字母">
              <el-input
                v-model="addForm.firstLetter"
                placeholder="首字母"
                style="width: 100%"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="排序">
              <el-input
                v-model="addForm.sort"
                placeholder="排序"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="产品数量">
              <el-input
                v-model="addForm.productCount"
                placeholder="产品数量"
                style="width: 100%"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="是否展示">
              <el-switch v-model="addForm.showStatus"> </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="是否为品牌制造商">
              <el-switch v-model="addForm.factoryStatus"> </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <div
              style="
                width: 130px;
                padding-right: 10px;
                float: left;
                text-align: right;
                font-weight: 600;
              "
            >
              上传产区大图
            </div>
            <el-upload
              class="avatar-uploader"
              :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
              :headers="getTokens"
              :show-file-list="false"
              :on-success="uploadBigPic"
            >
              <img v-if="addForm.bigPic" :src="addForm.bigPic" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="10" :offset="0">
            <div
              style="
                width: 130px;
                padding-right: 10px;
                float: left;
                text-align: right;
                font-weight: 600;
              "
            >
              上传logo
            </div>
            <el-upload
              class="avatar-uploader"
              :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
              :headers="getTokens"
              :show-file-list="false"
              :on-success="uploadLogo"
            >
              <img v-if="addForm.logo" :src="addForm.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBrandSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  findBrandByPage,
  addBrand,
  updateBrand,
  switchShowStatus,
  delBrand,
} from "@/api/product/productbrand";
import { getToken } from "@/utils/myAuth";
import { baseurl } from "@/api/baseurl";
export default {
  data() {
    return {
      baseurls: "",
      start: 1,
      limit: 10,
      brandInfo: [],
      total: 0,
      dialogVisible: false,
      editInfo: "",
      addForm: {
        bigPic: "",
        brandStory: "",
        createTime: "",
        factoryStatus: true,
        firstLetter: "",
        id: "",
        logo: "",
        modifyTime: "",
        name: "",
        productCommentCount: "",
        productCount: "",
        showStatus: true,
        sort: "",
      },
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.baseurls = baseurl;
    this.getBrandInfo();
  },
  computed: {
    getTokens() {
      return {
        token: getToken(),
      };
    },
  },
  methods: {
    // 获取商品列表
    getBrandInfo() {
      findBrandByPage(this.start, this.limit).then((res) => {
        // console.log(res);
        this.brandInfo = res.data.rows;
        // 将展示更改为布尔值
        this.brandInfo.forEach(
          (ele) => (ele.showStatus = ele.showStatus ? true : false)
        );
        // 将是否品牌制造商更改为布尔值
        this.brandInfo.forEach(
          (ele) => (ele.factoryStatus = ele.factoryStatus ? "是" : "否")
        );

        this.total = res.data.total;
      });
    },
    // 新增品牌
    goAddBrand() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 上传产区大图
    uploadBigPic(val) {
      // console.log(val);
      this.addForm.bigPic = val.data.fileUrl;
    },
    // 上传logo
    uploadLogo(val) {
      // console.log(val);
      this.addForm.logo = val.data.fileUrl;
    },
    // 关闭弹窗重置数据
    reset() {
      this.addForm = {
        bigPic: "",
        brandStory: "",
        createTime: "",
        factoryStatus: true,
        firstLetter: "",
        id: "",
        logo: "",
        modifyTime: "",
        name: "",
        productCommentCount: "",
        productCount: "",
        showStatus: true,
        sort: "",
      };
      this.editInfo = "";
    },
    // 点击确定提交新增/编辑
    addBrandSure() {
      this.addForm.showStatus = this.addForm.showStatus ? 1 : 0;
      this.addForm.factoryStatus = this.addForm.factoryStatus ? 1 : 0;
      if (this.editInfo) {
        //编辑
        updateBrand(this.addForm).then((res) => {
          // console.log(res);
          this.dialogVisible = !this.dialogVisible;
          this.getBrandInfo();
        });
      } else {
        //新增
        addBrand(this.addForm).then((res) => {
          // console.log(res);
          this.dialogVisible = !this.dialogVisible;
          this.getBrandInfo();
        });
      }
    },
    // 点击编辑
    goEdit(val) {
      this.dialogVisible = !this.dialogVisible;
      this.addForm = val;
      this.editInfo = val;
    },
    //点击删除
    delArticle(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBrand(id).then((res) => {
            console.log(res);
            this.getBrandInfo();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 改变是否展示
    isShowEvent(id, status) {
      switchShowStatus({
        id: id,
        status: (status = status ? 1 : 0),
      }).then((res) => {
        // console.log(res);
        this.getBrandInfo();
      });
    },
    // 改变每页数据条数
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e;
      this.getBrandInfo();
    },
    // 改变当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e;
      this.getBrandInfo();
    },
  },
};
</script>
<style lang="scss">
.productbrand {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .main {
    width: 95%;
    background-color: #fff;
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
  .el-form-item__label {
    width: 100%;
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
