<template>
  <div class="productlist">
    <!-- 商品管理介绍 -->
    <div class="header">
      <el-collapse>
        <el-collapse-item title="商品管理介绍">
          <div>
            商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 条件查询 -->
    <div class="search center">
      <el-collapse style="border-top: none">
        <el-collapse-item title="条件查询">
          <el-form
            :inline="true"
            :model="formData"
            class="demo-form-inline"
            size="mini"
            style="padding: 0 20px"
          >
            <el-form-item label="商品名称" style="margin-right: 20px">
              <el-input
                v-model="formData.name"
                placeholder="商品名称/模糊查询"
                style="width: 150px"
              />
            </el-form-item>
            <el-form-item label="商品货号" style="margin-right: 20px">
              <el-input
                v-model="formData.productSn"
                placeholder="商品货号"
                style="width: 150px"
              />
            </el-form-item>
            <el-form-item label="品牌" style="margin-right: 10px">
              <el-select
                v-model="formData.brandName"
                placeholder="品牌"
                style="width: 150px"
              >
                <el-option
                  v-for="item in productInfo"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.brandName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="上架状态">
              <el-select
                v-model="formData.publishStatus"
                placeholder="上架状态"
              >
                <el-option label="上架" :value="1" />
                <el-option label="未上架" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="formData.verifyStatus" placeholder="审核状态">
                <el-option label="审核" :value="1" />
                <el-option label="未审核" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 550px">
              <el-button>重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 下方表格部分 -->
    <div class="main center">
      <div class="main-title">
        <el-button type="primary" size="mini" @click="goAddProduct"
          >新增</el-button
        >
        <el-button type="primary" size="mini" @click="handleDownload"
          >导出商品列表excel文件</el-button
        >
      </div>
      <el-table :data="productInfo" border style="width: 96%" class="center">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="40px"
          fixed
        />
        <el-table-column label="商品图片" align="center" width="200px">
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
        <el-table-column label="商品名称" align="center" width="300px">
          <template v-slot="scope">
            <div>{{ scope.row.name }}</div>
            <div>品牌: {{ scope.row.brandName }}</div>
            <div>{{ scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" align="center" width="260px">
          <template v-slot="scope">
            <div>原价:{{ scope.row.price }}</div>
            <div>现价:{{ scope.row.promotionPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="200px"
        />
        <el-table-column label="标签" align="center" width="200px">
          <template v-slot="scope">
            <div>
              最新:<el-switch
                v-model="scope.row.newStatus"
                active-color="#409eff"
                inactive-color="#ccc"
                @change="isNewEvent(scope.row.id, scope.row.newStatus)"
              />
            </div>
            <div style="margin-top: 10px">
              推荐:<el-switch
                v-model="scope.row.recommendStatus"
                active-color="#409eff"
                inactive-color="#ccc"
                @change="
                  isRecommendEvent(scope.row.id, scope.row.recommendStatus)
                "
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标签2" align="center" width="200px">
          <template v-slot="scope">
            <div>
              发布:<el-switch
                v-model="scope.row.publishStatus"
                active-color="#409eff"
                inactive-color="#ccc"
                @change="isPublishEvent(scope.row.id, scope.row.publishStatus)"
              />
            </div>
            <div style="margin-top: 10px">
              审核:<el-switch
                v-model="scope.row.verifyStatus"
                active-color="#409eff"
                inactive-color="#ccc"
                @change="isVerifyEvent(scope.row.id, scope.row.verifyStatus)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="sku" align="center" width="200px">
          <template v-slot="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="editSku(scope.row.id)"
              >编辑sku</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          align="center"
          width="200px"
        />
        <el-table-column
          prop="sort"
          label="排序"
          sortable
          align="center"
          width="200px"
        />
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
              ><i class="el-icon-view el-icon--right" /> 编辑</el-link
            >
            <el-link
              type="danger"
              style="display: inline-block; margin-left: 10px"
              :underline="false"
              @click="delproduct(scope.row.id)"
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
    <!-- 编辑sku弹出框 -->
    <el-dialog title="sku列表" :visible.sync="dialogVisible" width="60%">
      <el-form label-width="80px" :inline="false" size="normal">
        <el-form-item>
          <el-row :gutter="20" style="padding: 40px 0 20px; text-align: right">
            <el-col :span="24" :offset="0"
              ><el-button type="primary" @click="addSku"
                >新增</el-button
              ></el-col
            >
          </el-row>
          <!-- sku表格 -->
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="24" :offset="0" style="padding-right: 0">
              <el-table :data="skuInfo" border style="width: 100%">
                <el-table-column
                  type="index"
                  label="#"
                  width="50"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="pic"
                  label="图片"
                  width="150"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-upload
                      class="avatar-uploader"
                      :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
                      :headers="getTokens"
                      :show-file-list="false"
                      :on-success="(ele) => uploadSkuPic(ele, scope.row.id)"
                    >
                      <img
                        v-if="scope.row.pic"
                        :src="scope.row.pic"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="spData[0].value"
                  label="颜色"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.spData[0].value"
                      style="width: 140px"
                      size="mini"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="spData[1].value"
                  label="大小"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.spData[1].value"
                      style="width: 140px"
                      size="mini"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="stock"
                  label="库存"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.stock"
                      style="width: 140px"
                      size="mini"
                      placeholder="自定义库存"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="lowStock"
                  label="预警库存"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.lowStock"
                      style="width: 140px"
                      size="mini"
                      placeholder="预警库存"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="lockStock"
                  label="锁定库存"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.lockStock"
                      style="width: 140px"
                      size="mini"
                      placeholder="锁定库存"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="skuCode"
                  label="sku编码"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.skuCode"
                      style="width: 140px"
                      size="mini"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.price"
                      style="width: 140px"
                      size="mini"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sale"
                  label="销量"
                  width="180"
                  align="center"
                >
                  <template v-slot="scope">
                    <el-input
                      v-model="scope.row.sale"
                      style="width: 140px"
                      size="mini"
                      placeholder="销量"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180"
                  align="center"
                  fixed="right"
                >
                  <template v-slot="scope">
                    <el-link
                      :underline="false"
                      type="danger"
                      style="font-size: 12px"
                      @click="removeSku(scope.row.id)"
                      >删除</el-link
                    >
                    <el-link
                      :underline="false"
                      type="primary"
                      style="margin-left: 10px; font-size: 12px"
                      @click="submitEditSku(scope.row)"
                      >修改编辑</el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/myAuth";
import baseurl from "@/api/baseurl";
import {
  productsByPage,
  switchNewStatus,
  switchRecommandStatus,
  switchPublishStatus,
  switchVerifyStatus,
  del,
  // 编辑sku
  getSkusByProductId,
  // 删除sku
  delSku,
  // 提交sku修改信息
  updateSkuInfo,
  // 新增sku
  addProductSkus,
} from "@/api/product/productlist";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      baseurls: "",
      formData: {
        brandId: "",
        id: "",
        name: "",
        productCategoryId: "",
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
        brandName: "",
      },
      productInfo: [],
      total: 0,
      // sku编辑框部分
      dialogVisible: false,
      skuInfo: [],
      skuForm: {},
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
    this.getProductInfo();
    this.baseurls = baseurl;
  },
  mounted() {},
  methods: {
    // 获取商品列表
    getProductInfo() {
      productsByPage(this.start, this.limit, this.formData).then((res) => {
        console.log(res);
        this.productInfo = res.data.rows;
        //将是否最新更改为布尔值
        this.productInfo.forEach(
          (ele) => (ele.newStatus = ele.newStatus ? true : false)
        );
        // 将是否推荐更改为布尔值
        this.productInfo.forEach(
          (ele) => (ele.recommendStatus = ele.recommendStatus ? true : false)
        );
        // 将是否发布更改为布尔值
        this.productInfo.forEach(
          (ele) => (ele.publishStatus = ele.publishStatus ? true : false)
        );
        // 将是否审核更改为布尔值
        this.productInfo.forEach(
          (ele) => (ele.verifyStatus = ele.verifyStatus ? true : false)
        );
        this.total = res.data.total;
      });
    },
    // 搜索
    onSubmit() {
      this.getProductInfo();
    },
    // 新增商品
    goAddProduct() {
      this.$router.push("/product/addProduct");
    },
    // 导出excel文件
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["商品名称", "商品品牌", "商品价格"];
        const filterVal = ["name", "brandName", "price"];
        const list = this.productInfo;
        const data = this.formatJson(filterVal, list);
        // console.log('list===',JSON.stringify()list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "product-list",
          autoWidth: true,
          bookType: "xlsx",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    // 改变每页数据条数
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e;
      this.getProductInfo();
    },
    // 改变当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e;
      this.getProductInfo();
    },
    // 更改是否最新
    isNewEvent(id, status) {
      switchNewStatus({
        productId: id,
        status: status ? 1 : 0,
      });
    },
    // 更改是否推荐
    isRecommendEvent(id, status) {
      switchRecommandStatus({
        productId: id,
        status: status ? 1 : 0,
      });
    },
    // 更改是否发布
    isPublishEvent(id, status) {
      switchPublishStatus({
        productId: id,
        status: status ? 1 : 0,
      });
    },
    // 更改是否审核
    isVerifyEvent(id, status) {
      switchVerifyStatus({
        productId: id,
        status: status ? 1 : 0,
      });
    },
    // 编辑sku库存信息
    editSku(id) {
      this.dialogVisible = !this.dialogVisible;
      getSkusByProductId(id).then((res) => {
        console.log(res);
        this.skuInfo = res.data.items;
        console.log(this.skuInfo);
        this.skuInfo.forEach((ele) => (ele.spData = JSON.parse(ele.spData)));
      });
    },
    // 上传sku图片
    uploadSkuPic(e, id) {},
    // 删除sku项
    removeSku(skuId) {
      this.$confirm("是否删除sku?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delSku(skuId).then((res) => {
          console.log(res);
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 提交sku修改信息
    submitEditSku(val) {
      this.skuForm = val;
      var obj = JSON.parse(JSON.stringify(this.skuForm));
      obj.spData = JSON.stringify(obj.spData);
      obj.promotionPrice = 0;
      console.log(this.skuForm);
      updateSkuInfo(obj).then((res) => {
        console.log(res);
        this.$message({
          message: "修改sku成功",
          type: "success",
        });
      });
    },
    // 新增sku(未写完)
    addSku() {
      // var arr1 = [
      //   { key: "颜色", value: "" },
      //   { key: "大小", value: "" },
      // ];
      // var obj2 = {
      //   createTime: "",
      //   id: "",
      //   lockStock: 0,
      //   lowStock: 0,
      //   modifyTime: "",
      //   pic: "",
      //   price: 0,
      //   productId: "",
      //   promotionPrice: 0,
      //   sale: 0,
      //   skuCode: "",
      //   spData: arr1,
      //   stock: 0,
      // };
      // obj2.spData = JSON.stringify(obj2.spData);
      // this.skuInfo.push(obj2);
    },
    // 点击编辑跳转到编辑页面
    goEdit(id) {
      this.$router.push(`/product/editProduct?id=${id}`);
    },
    // 删除商品
    delproduct(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(id).then((res) => {
            console.log(res);
            this.getProductInfo();
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
  },
};
</script>
<style lang="scss">
.productlist {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .header {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    // box-sizing: border-box;
  }
  .search {
    width: 95%;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
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
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .avatar-uploader .el-upload {
    // border: 1px dashed #d9d9d9;
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
