<template>
  <div class="advertlist">
    <div class="main center">
      <div class="main-title">
        <el-button type="primary" size="mini" @click="goAddAdvert"
          >新增</el-button
        >
      </div>
      <!-- 表格部分 -->
      <el-table :data="advertlistInfo" border style="width: 96%" class="center">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="40px"
          fixed
        />
        <!-- 广告图片 -->
        <el-table-column label="广告图片" align="center" width="200px">
          <template v-slot="scope">
            <img
              :src="scope.row.pic"
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
        <!-- 时间 -->
        <el-table-column label="时间" align="center" width="300px">
          <template v-slot="scope">
            <div>开始时间:{{ scope.row.startTime }}</div>
            <div>结束时间:{{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <!-- 广告名称 -->
        <el-table-column
          prop="name"
          label="广告名称"
          align="center"
          width="260px"
        >
        </el-table-column>
        <!-- 点击数 -->
        <el-table-column
          prop="clickCount"
          label="点击数"
          align="center"
          width="300px"
        />
        <!-- 下单数 -->
        <el-table-column
          prop="orderCount"
          label="下单数"
          sortable
          align="center"
          width="200px"
        />
        <!-- 轮播位置 -->
        <el-table-column
          prop="type"
          label="轮播位置"
          align="center"
          width="200px"
        />
        <!-- 链接地址 -->
        <el-table-column
          prop="url"
          label="链接地址"
          align="center"
          width="200px"
        />
        <!-- 备注 -->
        <el-table-column
          prop="note"
          label="备注"
          align="center"
          width="200px"
        />
        <!-- 上下线状态 -->
        <el-table-column
          prop="status"
          label="上下线状态"
          align="center"
          width="200px"
        />
        <!-- 操作 -->
        <el-table-column
          label="操作"
          width="120px"
          align="center"
          fixed="right"
        >
          <template v-slot="scope">
            <el-link
              @click="goEdit(scope.row)"
              type="primary"
              :underline="false"
              style="font-size: 12px"
              >编辑</el-link
            >
            <el-link
              type="danger"
              style="display: inline-block; margin-left: 10px; font-size: 12px"
              :underline="false"
              @click="delAdvert(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增弹出框部分 -->
    <el-dialog
      title="广告详情"
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
            <el-form-item label="广告名称" prop="name">
              <el-input
                v-model="addForm.name"
                placeholder="广告名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0"
            ><el-form-item label="备注">
              <el-input
                v-model="addForm.note"
                placeholder="备注"
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
                v-model="addForm.orderCount"
                placeholder="产品数量"
                style="width: 100%"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="链接">
              <el-input
                v-model="addForm.url"
                placeholder="链接"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="首页轮播位置">
              <el-select v-model="addForm.type" style="width: 100%">
                <el-option label="APP首页轮播" value="0">
                </el-option> </el-select></el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="addForm.startTime"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="addForm.endTime"
                type="datetime"
                placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="上下线状态">
              <el-switch v-model="addForm.status"> </el-switch>
            </el-form-item>
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
              图片
            </div>
            <el-upload
              class="avatar-uploader"
              :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
              :headers="getTokens"
              :show-file-list="false"
              :on-success="uploadPic"
            >
              <img v-if="addForm.pic" :src="addForm.pic" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdvertSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { adsList, delAds, addAds, updateAds } from "@/api/marketing/advertlist";
import { baseurl } from "@/api/baseurl";
import { getToken } from "@/utils/myAuth";
export default {
  data() {
    return {
      advertlistInfo: [],
      baseurls: "",
      dialogVisible: false,
      editInfo: "",
      addForm: {
        clickCount: "",
        createTime: "",
        endTime: "",
        id: "",
        modifyTime: "",
        name: "",
        note: "",
        orderCount: "",
        pic: "",
        productId: "",
        sort: "",
        startTime: "",
        status: false,
        type: "",
        url: "",
      },
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
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
    this.getAdvertlistInfo();
    this.baseurls = baseurl;
  },
  mounted() {},
  methods: {
    // 获取广告列表数据
    getAdvertlistInfo() {
      adsList().then((res) => {
        console.log(res);
        res.data.items.forEach(
          (ele) => (ele.status = ele.status ? "上线" : "否")
        );
        res.data.items.forEach(
          (ele) => (ele.type = ele.type ? "其他" : "首页轮播")
        );
        this.advertlistInfo = res.data.items;
      });
    },
    // 删除广告
    delAdvert(adsId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delAds(adsId).then((res) => {
          console.log(res);
          this.getAdvertlistInfo();
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },

    // 点击新增广告
    goAddAdvert() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 上传广告图片
    uploadPic(val) {
      // console.log(val);
      this.addForm.pic = val.data.fileUrl;
    },
    // 关闭弹窗重置数据
    reset() {
      this.addForm = {
        clickCount: "",
        createTime: "",
        endTime: "",
        id: "",
        modifyTime: "",
        name: "",
        note: "",
        orderCount: "",
        pic: "",
        productId: "",
        sort: "",
        startTime: "",
        status: false,
        type: "",
        url: "",
      };
      this.editInfo = "";
    },
    // 点击确定提交新增/编辑
    addAdvertSure() {
      this.addForm.status = this.addForm.status ? 1 : 0;
      if (this.editInfo) {
        //编辑
        this.addForm.type = 0;
        updateAds(this.addForm).then((res) => {
          // console.log(res);
          this.dialogVisible = !this.dialogVisible;
          this.getAdvertlistInfo();
        });
      } else {
        //新增
        addAds(this.addForm).then((res) => {
          // console.log(res);
          this.dialogVisible = !this.dialogVisible;
          this.getAdvertlistInfo();
        });
      }
    },
    // 点击编辑
    goEdit(val) {
      this.dialogVisible = !this.dialogVisible;
      this.addForm = val;
      this.addForm.status = this.addForm.status ? true : false;
      this.editInfo = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.advertlist {
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
