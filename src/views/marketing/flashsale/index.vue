<template>
  <div class="flashsale">
    <div class="main center">
      <div class="main-title">
        <el-button @click="goAddSale" type="primary" size="mini"
          >新增</el-button
        >
      </div>
      <!-- 活动表格部分 -->
      <el-table :data="flashsaleInfo" border style="width: 96%" class="center">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="40px"
          fixed
        />
        <!-- 商品图片 -->
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
        <!-- 活动时间 -->
        <el-table-column label="活动时间" align="center" width="300px">
          <template v-slot="scope">
            <div>开始时间:{{ scope.row.promotionStartTime }}</div>
            <div>结束时间:{{ scope.row.promotionEndTime }}</div>
          </template>
        </el-table-column>
        <!-- 是否过期 -->
        <el-table-column
          prop="timeOut"
          label="是否过期"
          align="center"
          width="200px"
        >
        </el-table-column>
        <!-- 商品名称 -->
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="260px"
        >
        </el-table-column>
        <!-- 品牌名称 -->
        <el-table-column
          prop="brandName"
          label="品牌名称"
          align="center"
          width="300px"
        />
        <!-- 商品价格 -->
        <el-table-column
          prop="promotionPrice"
          label="商品价格"
          sortable
          align="center"
          width="200px"
        />
        <!-- 商品类别 -->
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="200px"
        />
        <!-- 创建时间 -->
        <el-table-column
          prop="createTime"
          label="创建时间"
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
              type="danger"
              style="display: inline-block; margin-left: 10px; font-size: 12px"
              :underline="false"
              @click="delFlashsale(scope.row.recommendId)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 点击弹出商品列表框(第一层) -->
    <el-dialog title="热销详情" :visible.sync="dialogVisible" width="80%">
      <!-- 条件查询部分 -->
      <el-card class="center" style="width: 95%">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <el-form
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          size="mini"
          style="padding: 0 20px"
        >
          <el-form-item style="margin-right: 20px">
            <el-input
              v-model="formData.name"
              placeholder="商品名称/模糊查询"
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item style="margin-right: 20px">
            <el-input
              v-model="formData.productSn"
              placeholder="商品货号"
              style="width: 120px"
            />
          </el-form-item>
          <el-form-item style="margin-right: 20px">
            <el-select
              v-model="formData.brandName"
              placeholder="品牌"
              style="width: 120px"
            >
              <el-option
                v-for="item in productInfo"
                :key="item.id"
                :label="item.brandName"
                :value="item.brandName"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.publishStatus"
              placeholder="上架状态"
              style="width: 120px; margin-right: 20px"
            >
              <el-option label="上架" :value="1" />
              <el-option label="未上架" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.verifyStatus"
              placeholder="审核状态"
              style="width: 120px"
            >
              <el-option label="审核" :value="1" />
              <el-option label="未审核" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 商品列表部分 -->
      <el-card
        class="center"
        style="width: 95%; height: 500px; overflow-y: auto"
      >
        <div slot="header">
          <span>商品列表</span>
        </div>
        <el-table :data="productInfo" border style="width: 96%" class="center">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="40px"
            fixed
          />
          <el-table-column label="选择" align="center" width="260px">
            <template v-slot="scope">
              <el-radio-group v-model="productInfo.radio">
                <el-radio
                  :label="scope.row.id"
                  @change="goAddFlash(scope.row.id)"
                  ><br
                /></el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
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
          <el-table-column
            prop="weight"
            label="重量"
            align="center"
            width="200px"
          />
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
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 点击弹出新增限时活动框(第二层) -->
    <el-dialog
      title="编辑限时活动"
      :visible.sync="dialogVisible1"
      width="50%"
      @close="reset"
    >
      <el-form :model="addRec" ref="form" :inline="false" size="mini">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="商品原价">
              <span>{{ addRec.price }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0"
            ><el-form-item label="商品名称">
              <span>{{ addRec.name }}</span>
            </el-form-item></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="促销价格">
              <el-input-number
                v-model="addRec.promotionPrice"
                :min="0"
                label="促销价格"
                style="width: 90%"
              ></el-input-number></el-form-item
          ></el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input-number
                v-model="addRec.sort"
                :min="0"
                label="排序"
                style="width: 90%"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="addRec.promotionStartTime"
                class="myInput"
                type="datetime"
                placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 90%"
              /> </el-form-item
          ></el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="addRec.promotionEndTime"
                class="myInput"
                type="datetime"
                placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 90%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="活动限购数量">
              <el-input-number
                v-model="addRec.promotionPerLimit"
                :min="0"
                label="活动限购数量"
                style="width: 90%"
              ></el-input-number></el-form-item
          ></el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品图片">
              <img
                :src="addRec.pic"
                alt=""
                style="width: 150px; height: 150px"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addSaleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  findAllRecommends,
  delRecommend,
  addRecommend,
} from "@/api/marketing/flashsale";
import { productsByPage } from "@/api/product/productlist";
export default {
  data() {
    return {
      flashsaleInfo: [],
      dialogVisible: false,
      start: 1,
      limit: 10,
      // 用于商品条件查询
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
      // 用于新增限时活动
      addRec: {
        brandName: "",
        createTime: "",
        modifyTime: "",
        name: "",
        pic: "",
        price: 0,
        productCategoryName: "",
        productId: "",
        productSn: "",
        promotionEndTime: "",
        promotionPerLimit: 0,
        promotionPrice: "",
        promotionStartTime: "",
        publishStatus: "",
        recommendId: "",
        sort: "",
        type: "",
      },
      dialogVisible1: false,
    };
  },
  created() {
    this.getFlashsaleInfo();
    this.getProductInfo();
  },
  mounted() {},
  methods: {
    // 获取活动列表
    getFlashsaleInfo() {
      findAllRecommends().then((res) => {
        console.log(res);
        // var date = date.parse(new Date());
        // res.data.items.forEach(
        //   (ele) =>
        //     (ele.timeOut =
        //       date.parse(ele.promotionEndTime) > date ? "是" : "否")
        // );
        this.flashsaleInfo = res.data.items;
      });
    },
    // 删除限时活动
    delFlashsale(recommendId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delRecommend(recommendId).then((res) => {
          console.log(res);
          this.getFlashsaleInfo();
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    // 新增活动弹出商品框
    goAddSale() {
      this.dialogVisible = !this.dialogVisible;
    },
    // 获取商品列表
    getProductInfo() {
      productsByPage(this.start, this.limit, this.formData).then((res) => {
        console.log(res);
        this.productInfo = res.data.rows;
        this.productInfo.forEach((ele) => (ele.radio = false));
        this.total = res.data.total;
      });
    },
    // 搜索
    onSubmit() {
      this.getProductInfo();
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
    // 点击商品列表选择弹出新增活动框
    goAddFlash(id) {
      console.log(id);
      var productIsCheckedInfo = this.productInfo.find((ele) => ele.id == id);
      console.log(productIsCheckedInfo);
      this.dialogVisible1 = !this.dialogVisible1;
      this.addRec.brandName = productIsCheckedInfo.brandName;
      this.addRec.productCategoryName =
        productIsCheckedInfo.productCategoryName;
      this.addRec.productId = productIsCheckedInfo.id;
      this.addRec.productSn = productIsCheckedInfo.productSn;
      this.addRec.publishStatus = productIsCheckedInfo.publishStatus;
      this.addRec.price = productIsCheckedInfo.price;
      this.addRec.name = productIsCheckedInfo.name;
      this.addRec.pic = productIsCheckedInfo.pic;
    },
    // 关闭新增活动框时重置数据
    reset() {
      this.productIsCheckedInfo = {};
      this.addRec = {
        brandName: "",
        createTime: "",
        modifyTime: "",
        name: "",
        pic: "",
        price: 0,
        productCategoryName: "",
        productId: "",
        productSn: "",
        promotionEndTime: "",
        promotionPerLimit: 0,
        promotionPrice: "",
        promotionStartTime: "",
        publishStatus: "",
        recommendId: "",
        sort: "",
        type: "",
      };
    },
    // 确定新增限时活动
    addSaleSure() {
      addRecommend(this.addRec).then((res) => {
        console.log(res);
        this.dialogVisible1 = !this.dialogVisible1;
        this.dialogVisible = !this.dialogVisible;
        this.getFlashsaleInfo();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.flashsale {
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
}
</style>
