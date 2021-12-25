<template>
  <div class="addProduct">
    <!-- 头部步骤条 -->
    <div class="header center">
      <el-steps
        :active="active"
        finish-status="success"
        align-center
        style="width: 70%; margin: 30px auto"
      >
        <el-step title="商品基本信息"></el-step>
        <el-step title="添加库存信息"></el-step>
        <el-step title="添加移动端详情"></el-step>
      </el-steps>
    </div>
    <el-form
      :model="formData"
      ref="form"
      label-width="80px"
      :inline="false"
      size="normal"
      class="center"
      style="
        width: 95%;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
      "
    >
      <!-- 基本信息 -->
      <div class="baseInfo" v-if="this.active == 1">
        <el-form-item style="margin-left: 0">
          <div style="font-size: 16px; border-bottom: 1px solid #ccc">
            基本信息
          </div>
          <el-form
            :model="formData.product"
            ref="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="small"
            style="padding: 20px; box-sizing: border-box"
          >
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="商品名称" prop="name">
                  <el-input
                    v-model="formData.product.name"
                    placeholder="商品名称"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="商品编码">
                  <el-input
                    v-model="formData.product.productSn"
                    placeholder="商品编码"
                    style="width: 200px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="商品分类">
                  <el-select
                    @change="getProductCategoryName"
                    v-model="formData.product.productCategoryId"
                    placeholder="商品分类"
                  >
                    <el-option
                      v-for="item in categoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="商品品牌">
              <el-row :gutter="20">
                <el-col :span="10" :offset="0" style="padding: 0">
                  <el-select
                    @change="getBrandName"
                    v-model="formData.product.brandId"
                    placeholder="品牌"
                    style="width: 200px"
                  >
                    <el-option
                      v-for="item in brandList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="14" :offset="0">
                <el-form-item label="商品描述">
                  <el-input
                    type="textarea"
                    v-model="formData.product.description"
                    style="width: 400px"
                    placeholder="商品描述"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="font-size: 16px; border-bottom: 1px solid #ccc">
            商品属性
          </div>
          <el-form
            :model="formData.product"
            ref="form"
            label-width="100px"
            :inline="false"
            size="small"
            style="padding: 20px; box-sizing: border-box"
          >
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="商品原价">
                  <el-input-number
                    v-model="formData.product.price"
                    :min="0"
                    style="width: 180px"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="促销类型">
                  <el-select
                    v-model="formData.product"
                    disabled
                    placeholder="没有促销使用原价"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="活动价格">
                  <el-input-number
                    v-model="formData.product"
                    :disabled="true"
                    style="width: 180px"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="重量(kg)">
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" style="padding: 0">
                  <el-input-number
                    v-model="formData.product.weight"
                    :min="0"
                    style="width: 180px"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="8" :offset="0" style="padding-left: 40px">
                  <span
                    style="color: #606266; font-size: 14px; font-weight: 700"
                    >审核状态
                  </span>
                  <el-switch
                    v-model="formData.product.verifyStatus"
                    active-color="#409eff"
                    inactive-color="#dcdfe6"
                    style="padding-left: 10px"
                  >
                  </el-switch>
                </el-col>
                <el-col :span="8" :offset="0">
                  <span
                    style="color: #606266; font-size: 14px; font-weight: 700"
                    >是否上架
                  </span>
                  <el-switch
                    v-model="formData.product.publishStatus"
                    active-color="#409eff"
                    inactive-color="#dcdfe6"
                    style="padding-left: 10px"
                  >
                  </el-switch>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="缩略图">
              <el-row :gutter="20">
                <el-col :span="16" :offset="0">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
                    :headers="getTokens"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                  >
                    <img
                      v-if="formData.product.pic"
                      :src="formData.product.pic"
                      class="avatar"
                      style="width: 178px; height: 178px"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div style="font-size: 16px; border-bottom: 1px solid #ccc">
            其他信息
          </div>
          <el-form
            :model="formData.product"
            ref="form"
            label-width="100px"
            :inline="false"
            size="small"
            style="padding: 20px; box-sizing: border-box"
          >
            <el-row :gutter="20">
              <el-col :span="8" :offset="0" style="padding-left: 40px">
                <span style="color: #606266; font-size: 14px; font-weight: 700"
                  >推荐状态
                </span>
                <el-switch
                  v-model="formData.product.recommendStatus"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                  style="padding-left: 10px"
                >
                </el-switch>
              </el-col>
              <el-col :span="8" :offset="0">
                <span style="color: #606266; font-size: 14px; font-weight: 700"
                  >新品状态
                </span>
                <el-switch
                  v-model="formData.product.newStatus"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                  style="padding-left: 10px"
                >
                </el-switch>
              </el-col>
              <el-col :span="8" :offset="0">
                <span style="color: #606266; font-size: 14px; font-weight: 700"
                  >预告商品
                </span>
                <el-switch
                  v-model="formData.product.previewStatus"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                  style="padding-left: 10px"
                >
                </el-switch>
              </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="8" :offset="0">
                <el-form-item label="搜索关键词">
                  <el-input
                    v-model="formData.product.keywords"
                    placeholder="关键词"
                    style="width: 150px"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="库存预警">
                  <el-input-number
                    v-model="formData.product.lowStock"
                    :min="0"
                    style="width: 180px"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="商品排序">
                  <el-input-number
                    v-model="formData.product.sort"
                    :min="0"
                    style="width: 180px"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="产品服务">
              <el-row :gutter="20">
                <el-checkbox-group v-model="formData.product.serviceIds">
                  <el-checkbox :label="1">无忧退货</el-checkbox>
                  <el-checkbox :label="2">快速退款</el-checkbox>
                  <el-checkbox :label="3">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-row>
            </el-form-item>
          </el-form>
        </el-form-item>
      </div>

      <!-- 库存信息 -->
      <div class="stockInfo" v-else-if="this.active == 2">
        <el-form-item style="margin-left: 0">
          <div
            style="
              font-size: 16px;
              border-bottom: 1px solid #ccc;
              margin-bottom: 30px;
            "
          >
            商品sku信息
          </div>
          <el-form :model="formData" ref="form" label-width="80px" size="small">
            <!-- 标题/副标题 -->
            <el-row :gutter="20">
              <el-col :span="10" :offset="0">
                <el-form-item label="标题">
                  <el-input
                    v-model="formData.product.detailTitle"
                    style="width: 250px"
                    placeholder="标题"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14" :offset="0">
                <el-form-item label="副标题">
                  <el-input
                    v-model="formData.product.subTitle"
                    style="width: 400px"
                    placeholder="副标题"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 画册图片 -->
            <el-row :gutter="20">
              <el-col :span="24" :offset="0">
                <el-form-item label="画册图片">
                  <el-upload
                    :file-list="fileList"
                    :action="baseurls + '/lejuAdmin/material/uploadFileOss'"
                    :headers="getTokens"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :limit="5"
                    :on-exceed="handleExceed"
                    :on-success="uploadAlbumPictures"
                    :on-remove="removeAlbumPictures"
                  >
                    <i class="el-icon-plus"></i>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                      style="padding-left: 80px"
                    >
                      只能上传jpg/png文件，且不超过500kb,文件不超过5个
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- sku设置部分 -->
            <div class="sku">
              <el-form-item
                label="sku设置"
                label-width="80px"
                style="display: inline-block; margin-bottom: 0"
              ></el-form-item>
              <!-- 颜色 -->
              <el-row
                :gutter="20"
                style="display: inline-block; width: 93%; float: right"
                v-if="colorList.length != 0"
              >
                <el-col
                  :span="16"
                  :offset="0"
                  style="padding-right: 0; padding-left: 0"
                >
                  <el-form-item label="颜色:" label-width="50px">
                    <el-checkbox
                      v-for="item in colorList"
                      :key="item.id"
                      v-model="item.isChecked"
                      >{{ item.value }}
                      <span
                        style="color: red; font-size: 12px; margin-left: 5px"
                        @click.stop.prevent="removeColor(item.id)"
                        >删除</span
                      >
                    </el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 大小 -->
              <el-row
                :gutter="20"
                style="display: inline-block; width: 93%; float: right"
                v-if="sizeList.length != 0"
              >
                <el-col
                  :span="16"
                  :offset="0"
                  style="padding-right: 0; padding-left: 0"
                >
                  <el-form-item label="大小:" label-width="50px">
                    <el-checkbox
                      v-for="item in sizeList"
                      :key="item.id"
                      v-model="item.isChecked"
                      >{{ item.value }}
                      <span
                        style="color: red; font-size: 12px; margin-left: 5px"
                        @click.stop.prevent="removeSize(item.id)"
                        >删除</span
                      >
                    </el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 创建选项 -->
              <el-row
                :gutter="20"
                style="display: inline-block; width: 93%; float: right"
              >
                <el-col :span="9" :offset="0" style="padding-right: 0">
                  <el-form-item>
                    <el-input
                      v-model.trim="color"
                      placeholder="颜色描述:比如土豪金"
                      style="width: 160px; margin-right: 10px"
                      clearable
                    ></el-input>
                    <el-button size="small" @click="addColor"
                      >创建颜色选项</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0" style="padding-right: 0">
                  <el-form-item>
                    <el-input
                      v-model.trim="size"
                      placeholder="大小"
                      style="width: 160px; margin-right: 10px"
                      clearable
                    ></el-input>
                    <el-button size="small" @click="addSize"
                      >创建大小选项</el-button
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="0" style="text-align: right">
                  <el-form-item style="width: 100%">
                    <el-button
                      type="primary"
                      size="small"
                      :plain="true"
                      @click="createSku"
                      >生成sku列表</el-button
                    >
                    <el-button type="primary" size="small">新增sku</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- sku表格 -->
              <el-row
                :gutter="20"
                style="display: inline-block; width: 93%; float: right"
                v-if="formData.pmsSkuStockList.length != 0"
              >
                <el-col :span="24" :offset="0" style="padding-right: 0">
                  <el-table
                    :data="formData.pmsSkuStockList"
                    border
                    style="width: 100%"
                  >
                    <el-table-column
                      type="index"
                      label="#"
                      width="50"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="pic" label="图片" width="200">
                      <template v-slot="scope">
                        <el-upload
                          class="avatar-uploader"
                          :action="
                            baseurls + '/lejuAdmin/material/uploadFileOss'
                          "
                          :headers="getTokens"
                          :show-file-list="false"
                          :on-success="
                            (ele) => uploadSkuPrice(ele, scope.row.ids)
                          "
                        >
                          <img
                            v-if="scope.row.pic"
                            :src="scope.row.pic"
                            class="avatar"
                          />
                          <i
                            v-else
                            class="el-icon-plus avatar-uploader-icon"
                          ></i>
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
                      prop="address"
                      label="操作"
                      width="180"
                      align="center"
                      fixed="right"
                    >
                      <el-link
                        :underline="false"
                        type="danger"
                        @click="removeSku(ids)"
                        >删除</el-link
                      >
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </el-form-item>
      </div>

      <!-- 移动端详情 -->
      <div class="mobileInfo" v-else>
        <el-form-item style="margin-left: 0">
          <div
            style="
              font-size: 16px;
              border-bottom: 1px solid #ccc;
              margin-bottom: 30px;
            "
          >
            详情描述
          </div>
          <el-form
            :model="formData.product"
            ref="form"
            label-width="100px"
            size="normal"
          >
            <el-row :gutter="20" style="margin-bottom: 20px">
              <el-col :span="24" :offset="0">
                <el-form-item label="商品详情" style="width: 100%; padding: 0">
                  <tinymce
                    v-model="formData.product.detailDesc"
                    style="width: 850px; float: left"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" :offset="0">
                <el-form-item label="备注" style="width: 100%">
                  <el-input
                    type="textarea"
                    v-model="formData.product.note"
                    placeholder="备注"
                    style="width: 800px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-form-item>
      </div>
      <!-- 按钮部分 -->
      <div class="btn">
        <el-button
          type="primary"
          size="small"
          @click="nextStep"
          v-if="this.active == 1"
          >下一步,填写库存信息</el-button
        >
        <el-button
          size="small"
          @click="prevStep"
          v-if="this.active == 2 || this.active == 3"
          >返回上一步</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="nextStep"
          v-if="this.active == 2"
          >下一步,填写移动端详情</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="submit"
          v-else-if="this.active == 3"
          >提交保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import tinymce from "@/components/Tinymce";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "@/utils/myAuth";
import { baseurl } from "@/api/baseurl";
import {
  getAllCategory,
  findAllBrand,
  addProductAndSkus,
  productSkusDetail,
  updateProductAndSkus,
} from "@/api/product/addProduct";
export default {
  components: {
    tinymce,
  },
  data() {
    return {
      // 画册图片回显使用
      fileList: [],
      urlObj: {},
      urlArr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      baseurls: "",
      // 颜色数据
      colorList: [],
      // 容量数据
      sizeList: [],
      active: 1,
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
      },
      categoryList: [],
      brandList: [],
      color: "",
      size: "",
      EditForm: {},
      formData: {
        pmsSkuStockList: [],
        product: {
          albumPics: [],
          brandId: "",
          brandName: "",
          // createTime: "",
          deleteStatus: 0,
          description: "",
          detailDesc: "",
          detailHtml: "",
          detailMobileHtml: "",
          detailTitle: "",
          feightTemplateId: "",
          giftGrowth: 0,
          giftPoint: 0,
          // id: "",
          keywords: "",
          lowStock: 0,
          modifyTime: "",
          name: "",
          newStatus: false,
          note: "",
          originalPrice: "",
          pic: "",
          previewStatus: false,
          price: "",
          productAttributeCategoryId: "",
          productCategoryId: "",
          productCategoryName: "",
          productSn: "",
          promotionEndTime: "",
          promotionPerLimit: 0,
          promotionPrice: 0,
          promotionStartTime: "",
          publishStatus: false,
          recommendStatus: false,
          sale: 0,
          serviceIds: [],
          sort: "",
          stock: "",
          subTitle: "",
          unit: "",
          usePointLimit: "",
          verifyStatus: false,
          weight: "",
        },
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
    this.getCategory();
    this.getBrandList();
    this.getProductInfo();
  },
  mounted() {},
  methods: {
    // 获取分类数据
    getCategory() {
      getAllCategory().then((res) => {
        // console.log(res);
        this.categoryList = res.data.items.find(
          (ele) => ele.category.name == "乐居"
        ).children;
        // console.log(this.categoryList);
      });
    },
    // 通过分类id获取到分类名称
    getProductCategoryName(e) {
      this.formData.product.productCategoryName = this.categoryList.find(
        (ele) => ele.id == e
      ).name;
    },
    // 获取品牌数据
    getBrandList() {
      findAllBrand().then((res) => {
        // console.log(res);
        this.brandList = res.data.items;
      });
    },
    // 通过品牌id获取品牌名称
    getBrandName(e) {
      // console.log(e);
      this.formData.product.brandName = this.brandList.find(
        (ele) => ele.id == e
      ).name;
    },
    // 基本信息上传图片
    handleAvatarSuccess(e) {
      // console.log(e);
      this.formData.product.pic = e.data.fileUrl;
    },
    // 步骤条下一步
    nextStep() {
      if (this.active >= 3) {
        this.active = 3;
        return;
      }
      this.active++;
    },
    // 步骤条上一步
    prevStep() {
      if (this.active <= 1) {
        this.active = 1;
        return;
      }
      this.active--;
    },
    // 画册图片点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 画册图片移除文件列表中已上传的文件时的钩子
    removeAlbumPictures(file) {
      const removeUrl = file.response.data.fileUrl;
      const removeUrlIndex = this.formData.product.albumPics.findIndex(
        (ele) => ele == removeUrl
      );
      this.formData.product.albumPics.splice(removeUrlIndex, 1);
      // console.log(this.formData.product.albumPics);
    },
    // 画册图片文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 画册图片上传成功时的函数
    uploadAlbumPictures(e) {
      this.formData.product.albumPics.push(e.data.fileUrl);
      // console.log(e);
      // console.log(this.formData.product.albumPics);
    },
    // 创建颜色选项
    addColor() {
      if (!this.color) {
        return;
      }
      this.colorList.push({
        value: this.color,
        isChecked: false,
        id: uuidv4(),
      });
      this.color = "";
    },
    // 移除创建好的颜色选项
    removeColor(id) {
      var colorIndex = this.colorList.findIndex((ele) => (ele.id = id));
      this.colorList.splice(colorIndex, 1);
    },
    // 创建大小选项
    addSize() {
      if (!this.size) {
        return;
      }
      this.sizeList.push({
        value: this.size,
        isChecked: false,
        id: uuidv4(),
      });
      this.size = "";
    },
    // 移除创建好的大小选项
    removeSize(id) {
      var sizeIndex = this.sizeList.findIndex((ele) => (ele.id = id));
      this.sizeList.splice(sizeIndex, 1);
    },
    // 生成sku列表
    createSku() {
      // 筛选选中的颜色和大小
      var colorCheckedList = this.colorList.filter((ele) => ele.isChecked);
      var sizeCheckedList = this.sizeList.filter((ele) => ele.isChecked);
      if (colorCheckedList.length == 0) {
        this.$message.error("请选中颜色");
        return;
      }
      var arr = [];
      this.$confirm("此操作将清空sku列表,并生成新的列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          colorCheckedList.forEach((ele) => {
            sizeCheckedList.forEach((ite) => {
              var arr1 = [
                { key: "颜色", value: ele.value },
                { key: "大小", value: ite.value },
              ];
              var obj = {
                lockStock: "", // 锁定库存 预留
                lowStock: "", // 低库存预警  预留
                pic: "", // sku封面图片
                price: 0, // 价格
                promotionPrice: "", //  促销价格  预留
                sale: "", // 销量 预留
                skuCode: "", // sku编码
                spData: arr1, //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
                stock: "", // 库存
                ids: uuidv4(),
              };
              arr.push(obj);
            });
            this.formData.pmsSkuStockList = arr;
          });
          // console.log(this.formData.pmsSkuStockList);
          this.$message({
            type: "success",
            message: "创建成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 上传sku封面图片
    uploadSkuPrice(e, val) {
      // console.log(e, val);
      var item = this.formData.pmsSkuStockList.find((ele) => ele.ids == val);
      item.pic = e.data.fileUrl;
    },
    //移除sku列表项
    removeSku(ids) {
      var skuIndex = this.formData.pmsSkuStockList.findIndex(
        (ele) => ele.ids == ids
      );
      this.formData.pmsSkuStockList.splice(skuIndex, 1);
      if (this.formData.pmsSkuStockList.length == 0) {
        (this.colorList = []), (this.sizeList = []);
      }
    },
    // 首页点击编辑时数据回显
    getProductInfo() {
      if (!this.$route.query.id) {
        return;
      }
      this.fileList = [];
      this.urlArr = [];
      productSkusDetail(this.$route.query.id).then((res) => {
        // console.log(res);
        var newObj = res.data;
        // 将sku颜色大小信息转换成数组
        newObj.skus.forEach((ele) => (ele.spData = JSON.parse(ele.spData)));
        // 将画册图片转换成数组,并设置回显
        newObj.product.albumPics = newObj.product.albumPics.split(",");
        newObj.product.albumPics.forEach((val) => {
          this.urlObj.url = val;
          this.urlArr.push(val);
          this.fileList.push(this.urlObj);
          this.urlObj = {};
        });
        this.dialogFormVisible = true;
        this.diaStatus = "updata";
        // 将产品服务信息转换成数组
        newObj.product.serviceIds = [1, 2, 3];
        // 新品状态转换
        newObj.product.newStatus = newObj.product.newStatus ? true : false;
        //是否预告商品转换
        newObj.product.previewStatus = newObj.product.previewStatus
          ? true
          : false;
        //是否上架转换
        newObj.product.publishStatus = newObj.product.publishStatus
          ? true
          : false;
        //推荐状态转换
        newObj.product.recommendStatus = newObj.product.recommendStatus
          ? true
          : false;
        //审核状态转换
        newObj.product.verifyStatus = newObj.product.verifyStatus
          ? true
          : false;
        this.formData.product = res.data.product;
        this.formData.pmsSkuStockList = res.data.skus;
        console.log(this.formData.product);
        console.log(this.formData.pmsSkuStockList);
        this.EditForm = res.data;
      });
    },
    // 提交保存
    submit() {
      // 判断是新增还是编辑
      if (this.EditForm.product) {
        //编辑
        // 将sku颜色大小信息转换成字符串
        this.formData.pmsSkuStockList.forEach(
          (ele) => (ele.spData = JSON.stringify(ele.spData))
        );
        // 将画册图片转换成字符串
        this.formData.product.albumPics =
          this.formData.product.albumPics.join(",");
        // 将产品服务信息转换成字符串
        this.formData.product.serviceIds =
          this.formData.product.serviceIds.join("");
        // 将关键词格式变成标准逗号隔开格式
        // this.formData.product.keywords = this.formData.product.keywords.join(",");
        // 新品状态转换
        this.formData.product.newStatus = this.formData.product.newStatus
          ? 1
          : 0;
        //是否预告商品转换
        this.formData.product.previewStatus = this.formData.product
          .previewStatus
          ? 1
          : 0;
        //是否上架转换
        this.formData.product.publishStatus = this.formData.product
          .publishStatus
          ? 1
          : 0;
        //推荐状态转换
        this.formData.product.recommendStatus = this.formData.product
          .recommendStatus
          ? 1
          : 0;
        //审核状态转换
        this.formData.product.verifyStatus = this.formData.product.verifyStatus
          ? 1
          : 0;
        // console.log(this.formData);
        updateProductAndSkus(this.formData).then((res) => {
          // console.log(res);
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/product");
          }, 1000);
        });
      } else {
        //新增
        // 将sku颜色大小信息转换成字符串
        this.formData.pmsSkuStockList.forEach(
          (ele) => (ele.spData = JSON.stringify(ele.spData))
        );
        // 将画册图片转换成字符串
        this.formData.product.albumPics =
          this.formData.product.albumPics.join(",");
        // 将产品服务信息转换成字符串
        this.formData.product.serviceIds =
          this.formData.product.serviceIds.join("");
        // 将关键词格式变成标准逗号隔开格式
        // this.formData.product.keywords = this.formData.product.keywords.join(",");
        // 新品状态转换
        this.formData.product.newStatus = this.formData.product.newStatus
          ? 1
          : 0;
        //是否预告商品转换
        this.formData.product.previewStatus = this.formData.product
          .previewStatus
          ? 1
          : 0;
        //是否上架转换
        this.formData.product.publishStatus = this.formData.product
          .publishStatus
          ? 1
          : 0;
        //推荐状态转换
        this.formData.product.recommendStatus = this.formData.product
          .recommendStatus
          ? 1
          : 0;
        //审核状态转换
        this.formData.product.verifyStatus = this.formData.product.verifyStatus
          ? 1
          : 0;
        // console.log(this.formData);
        addProductAndSkus(this.formData).then((res) => {
          // console.log(res);
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/product");
          }, 1000);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addProduct {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .header {
    width: 100%;
    height: 120px;
    background-color: #fff;
    margin: 0;
    overflow: hidden;
  }
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
  }
  .baseInfo {
    width: 100%;
    background-color: #fff;
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
  .stockInfo {
    width: 100%;
    background-color: #fff;
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
  .btn {
    width: 300px;
    margin: 30px auto 0;
    text-align: center;
  }
}
</style>
