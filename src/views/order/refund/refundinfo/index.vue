<template>
  <div class="refundinfo">
    <div class="container center">
      <!-- 订单信息 -->
      <div class="refundOrdermessage">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600; margin-right: 10px"
              >订单信息:</span
            >
            <el-button
              type="danger"
              size="mini"
              style="font-weight: 600"
              v-if="active == 0"
              >待处理</el-button
            >
            <el-button
              type="warning"
              size="mini"
              style="font-weight: 600"
              v-if="active == 1"
              >退货中</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              style="font-weight: 600"
              v-if="active == 2"
              >已完成</el-button
            >
            <el-button
              type="info"
              size="mini"
              style="font-weight: 600"
              v-if="active == 3"
              >已拒绝</el-button
            >
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">订单编号:</span>
            <span>{{ refundInfoList.orderSn }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">退单人姓名:</span>
            <span>{{ refundInfoList.returnName }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">退单理由:</span>
            <span>{{ refundInfoList.reason }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">退单描述:</span>
            <span>{{ refundInfoList.description }}</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            margin-bottom: 20px;
          "
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">申请时间:</span>
            <span>{{ refundInfoList.createTime }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-link
              @click="goOrderInfo(refundInfoList.orderId)"
              type="primary"
              :underline="false"
              >查看订单详情</el-link
            >
          </el-col>
        </el-row>
        <el-row :gutter="20" style="width: 100%; font-size: 14px">
          <el-col :span="24" :offset="0">
            <span style="margin-right: 20px; float: left">退单图片:</span>
            <div style="float: left">
              <img
                :src="item"
                alt=""
                v-for="(item, index) in this.refundInfoList.proofPics"
                :key="index"
                style="width: 100px; height: 100px; margin-right: 10px"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 退货商品 -->
      <div class="refundProductInfo">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600">退货商品:</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-table
            :data="refundProductList"
            border
            style="width: 95%"
            class="center"
          >
            <el-table-column label="商品图片" width="180" align="center">
              <template v-slot="scope">
                <img
                  :src="scope.row.productPic"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column label="商品描述" width="150" align="center">
              <template v-slot="scope">
                <div>{{ scope.row.productName }}</div>
                <div>品牌:{{ scope.row.productBrand }}</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="productRealPrice"
              label="商品价格"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column label="商品属性" width="200" align="center">
              <template v-slot="scope">
                <span style="margin-right: 5px"
                  >颜色:{{ scope.row.productAttr[0].value }}</span
                >
                <span>大小:{{ scope.row.productAttr[1].value }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="productCount"
              label="商品数量"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="returnAmount"
              label="总计"
              width="180"
              align="center"
              fixed="right"
            >
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 用户信息 -->
      <div class="userInfo">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="12" :offset="0">
            <span style="font-size: 16px; font-weight: 600">用户信息:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">联系人:</span>
            <span>{{ refundInfoList.returnName }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">联系电话:</span>
            <span>{{ refundInfoList.returnPhone }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 费用信息 -->
      <div class="costInfo">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="12" :offset="0">
            <span style="font-size: 16px; font-weight: 600">费用信息:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">退单金额:</span>
            <span style="color: red">{{ refundInfoList.returnAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">运费金额:</span>
            <span style="color: red">0</span>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 处理退款 -->
      <div class="handle" v-if="active == 0">
        <el-form
          :inline="true"
          :rules="rules"
          :model="handleForm"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="退款金额">
            <el-input-number
              v-model="handleForm.returnAmount"
              :min="0"
              style="width: 150px"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="处理人" prop="handleMan">
            <el-input v-model="handleForm.handleMan"></el-input>
          </el-form-item>
          <el-form-item label="处理备注" prop="handleNote">
            <el-input v-model="handleForm.handleNote"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 处理退款结果按钮 -->
      <div class="handle-btn center" v-if="active == 0">
        <el-button
          @click="agreeReturn"
          type="primary"
          size="small"
          style="width: 140px"
          >同意退款</el-button
        >
        <el-button @click="refuseReturn" size="small" style="width: 140px"
          >拒绝退款</el-button
        >
      </div>
      <!-- 处理结果 -->
      <div class="result" v-if="active > 0">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="12" :offset="0">
            <span style="font-size: 16px; font-weight: 600">处理结果:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">处理人:</span>
            <span>{{ refundInfoList.handleMan }}</span>
          </el-col>
          <el-col :span="7" :offset="0">
            <span style="margin-right: 10px">处理备注:</span>
            <span>{{ refundInfoList.handleNote }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">处理时间:</span>
            <span>{{ refundInfoList.handleTime }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider v-if="active > 1"></el-divider>
      <!-- 商家收到退货信息 -->
      <div class="receiveResult" v-if="active == 1">
        <el-form
          :inline="true"
          :rules="rules"
          :model="receiveForm"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="收货人" prop="receiveMan">
            <el-input v-model="receiveForm.receiveMan"></el-input>
          </el-form-item>
          <el-form-item label="收货备注" prop="receiveNote">
            <el-input v-model="receiveForm.receiveNote"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 商家确认收货按钮 -->
      <div class="receive-btn center" v-if="active == 1">
        <el-button
          @click="sureReceive"
          type="primary"
          size="small"
          style="width: 140px"
          >确认收货</el-button
        >
      </div>
      <!-- 收货信息 -->
      <div class="receive" v-if="active == 2">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="12" :offset="0">
            <span style="font-size: 16px; font-weight: 600">收货信息:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">退单收货人:</span>
            <span>{{ refundInfoList.receiveMan }}</span>
          </el-col>
          <el-col :span="8" :offset="0">
            <span style="margin-right: 10px">退单收货备注:</span>
            <span>{{ refundInfoList.receiveNote }}</span>
          </el-col>
          <el-col :span="8" :offset="0">
            <span style="margin-right: 10px">退单收货时间:</span>
            <span>{{ refundInfoList.receiveTime }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import {
  orderReturn,
  agreeApply,
  rejectApply,
  receiveProduct,
} from "@/api/order/refund/refundinfo";
export default {
  data() {
    return {
      active: 0,
      refundInfoList: [],
      refundProductList: [],
      // 处理退款接口提交数据
      handleForm: {
        id: this.$route.query.id,
        handleMan: "",
        handleNote: "",
        returnAmount: "",
      },
      // 商家收货提交数据
      receiveForm: {
        id: this.$route.query.id,
        receiveMan: "",
        receiveNote: "",
      },
      rules: {
        handleMan: [{ required: true, message: "处理人姓名", trigger: "blur" }],
        handleNote: [{ required: true, message: "处理备注", trigger: "blur" }],
        receiveMan: [
          { required: true, message: "收货人姓名", trigger: "blur" },
        ],
        receiveNote: [{ required: true, message: "收货备注", trigger: "blur" }],
      },
    };
  },
  created() {
    // console.log(this.$route.query.id);
    this.getRefundInfoList();
  },
  mounted() {},
  methods: {
    // 获取退单明细
    getRefundInfoList() {
      orderReturn(this.$route.query.id).then((res) => {
        console.log(res);
        res.data.orderReturnApply.proofPics =
          res.data.orderReturnApply.proofPics.split(",");
        res.data.orderReturnApply.productAttr = JSON.parse(
          res.data.orderReturnApply.productAttr
        );
        this.refundInfoList = res.data.orderReturnApply;
        this.refundProductList.push(res.data.orderReturnApply);
        this.active = this.refundInfoList.status;
      });
    },
    // 点击跳转到订单详情页面
    goOrderInfo(id) {
      this.$router.push(`/order/orderlist/orderinfo?id=${id}`);
    },
    // 同意退货
    agreeReturn() {
      if (!this.handleForm.handleMan) {
        this.$message({
          message: "请填写必要信息",
          type: "warning",
        });
        return;
      }
      agreeApply(this.handleForm.id, this.handleForm).then((res) => {
        console.log(res);
        this.getRefundInfoList();
      });
    },
    // 拒绝退货
    refuseReturn() {
      if (!this.handleForm.handleMan) {
        this.$message({
          message: "请填写必要信息",
          type: "warning",
        });
        return;
      }
      rejectApply(this.handleForm.id, this.handleForm).then((res) => {
        console.log(res);
        this.getRefundInfoList();
      });
    },
    // 商家确认收到退货
    sureReceive() {
      if (!this.receiveForm.receiveMan) {
        this.$message({
          message: "请填写必要信息",
          type: "warning",
        });
        return;
      }
      receiveProduct(this.receiveForm.id, this.receiveForm).then((res) => {
        console.log(res);
        this.getRefundInfoList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.refundinfo {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .container {
    width: 95%;
    background-color: #fff;
    padding: 20px;
    overflow: hidden;
    // 订单信息
    .refundOrdermessage {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 退货商品
    .refundProductInfo {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 用户信息
    .userInfo {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 费用信息
    .costInfo {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 处理退款
    .handle {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 处理退款结果按钮
    .handle-btn {
      width: 300px;
      text-align: center;
    }
    // 处理结果
    .result {
      width: 100%;
      margin: 20px 0 40px;
    }
    // 商家收到退货信息
    .receiveResult {
      width: 100%;
      margin: 20px 0 40px;
    }
    .receive-btn {
      width: 150px;
      text-align: center;
    }
    // 收货信息
    .receive {
      width: 100%;
      margin: 20px 0 40px;
    }
  }
}
</style>
