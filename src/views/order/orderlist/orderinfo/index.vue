<template>
  <div class="orderinfo">
    <div class="container center">
      <!-- 头部步骤条 -->
      <div class="header center">
        <el-steps :active="active">
          <el-step
            title="待付款"
            :description="infoListBase.createTime"
          ></el-step>
          <el-step
            title="待发货"
            :description="infoListBase.paymentTime"
          ></el-step>
          <el-step
            title="已发货"
            :description="infoListBase.deliveryTime"
          ></el-step>
          <el-step
            title="已完成"
            :description="infoListBase.receiveTime"
            v-if="active != 5"
          ></el-step>
          <el-step
            title="退货"
            :description="infoListBase.finishTime"
            v-if="active != 4"
          ></el-step>
        </el-steps>
      </div>
      <el-divider></el-divider>
      <!-- 订单信息 -->
      <div class="ordermessage">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600; margin-right: 10px"
              >订单信息:</span
            >
            <el-button
              type="danger"
              size="mini"
              style="font-weight: 600"
              v-if="active == 1"
              >待付款</el-button
            >
            <el-button
              type="warning"
              size="mini"
              style="font-weight: 600"
              v-if="active == 2"
              >待发货</el-button
            >
            <el-button
              type="primary"
              size="mini"
              plain
              style="font-weight: 600"
              v-if="active == 3"
              >已发货</el-button
            >
            <el-button
              type="primary"
              size="mini"
              style="font-weight: 600"
              v-if="active == 4"
              >已完成</el-button
            >
            <el-button
              type="info"
              size="mini"
              style="font-weight: 600"
              v-if="active == 5"
              >退货</el-button
            >
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">订单金额:</span>
            <span style="color: red">{{ infoListBase.totalAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">订单编号:</span>
            <span>{{ infoListBase.orderSn }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">用户账号:</span>
            <span>{{ infoListBase.memberUsername }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">备注:</span>
            <span>{{ infoListBase.note }}</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">下单时间:</span>
            <span>{{ infoListBase.createTime }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">付款时间:</span>
            <span>{{ infoListBase.paymentTime }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">发货时间:</span>
            <span>{{ infoListBase.deliveryTime }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">收货时间:</span>
            <span>{{ infoListBase.receiveTime }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 收货人信息 -->
      <div class="receiver">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600">收货人信息:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">收货人:</span>
            <span>{{ infoListBase.receiverName }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">用户姓名:</span>
            <span>{{ infoListBase.memberUsername }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">手机号码:</span>
            <span>{{ infoListBase.receiverPhone }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">邮政编码:</span>
            <span>{{ infoListBase.receiverPostCode }}</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">地市:</span>
            <span
              >{{ infoListBase.receiverProvince }}
              {{ infoListBase.receiverCity }}</span
            >
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">详细地址:</span>
            <span>{{ infoListBase.receiverDetailAddress }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 商品信息 -->
      <div class="productInfo">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600">商品信息:</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-table :data="infoItems" border style="width: 95%" class="center">
            <el-table-column
              prop="productName"
              label="商品名称"
              width="150"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品图片"
              width="180"
              align="center"
            >
              <template v-slot="scope">
                <img
                  :src="scope.row.productPic"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isReturn"
              label="是否退货"
              align="center"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="productBrand"
              label="品牌"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="productPrice"
              label="价格"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="productQuantity"
              label="商品数量"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="totalPrice"
              fixed="right"
              label="小计"
              width="200"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-divider></el-divider>
      <!-- 费用信息 -->
      <div class="costInfo">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600">费用信息:</span>
          </el-col>
        </el-row>
        <el-row
          :gutter="20"
          style="height: 40px; line-height: 40px; font-size: 14px"
        >
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">运费金额:</span>
            <span style="color: red">{{ infoListBase.freightAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">订单总金额:</span>
            <span style="color: red">{{ infoListBase.totalAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">实际金额:</span>
            <span style="color: red">{{ infoListBase.payAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            <span style="margin-right: 10px">促销优化金额:</span>
            <span style="color: red">{{ infoListBase.discountAmount }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider v-if="active > 2"></el-divider>
      <!-- 填写物流信息 -->
      <div class="logisticsInfo" v-if="active == 2">
        <el-form
          :inline="true"
          :rules="rules"
          :model="logisticsForm"
          class="demo-form-inline"
        >
          <el-form-item label="物流公司" style="margin: 0; margin-right: 20px">
            <el-select
              v-model="logisticsForm.deliveryCompany"
              placeholder="请选择物流公司"
              size="mini"
            >
              <el-option label="顺丰快递" value="1"></el-option>
              <el-option label="京东快递" value="2"></el-option>
              <el-option label="中通快递" value="3"></el-option>
              <el-option label="中国邮政" value="4"></el-option>
              <el-option label="申通快递" value="5"></el-option>
              <el-option label="韵达快递" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="物流单号"
            prop="deliverySn"
            style="margin: 0; margin-right: 20px"
          >
            <el-input v-model="logisticsForm.deliverySn" size="mini"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 确认发货按钮 -->
      <div class="sureSend center" v-if="active == 2">
        <el-button
          type="primary"
          size="small"
          style="display: block; width: 100%"
          @click="submitSend"
          >确认发货</el-button
        >
      </div>
      <!-- 物流信息表格 -->
      <div class="logistics" v-if="active > 2">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <span style="font-size: 16px; font-weight: 600">物流信息:</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-table
              :data="logisticsList"
              border
              style="width: 95%"
              class="center"
            >
              <el-table-column prop="time" label="时间" align="center">
              </el-table-column>
              <el-table-column prop="sendStatus" label="状态">
              </el-table-column>
              <el-table-column prop="sendDesc" label="备注" align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { orderDetail, sendDone } from "@/api/order/orderlist/orderinfo";
export default {
  data() {
    return {
      active: 0,
      orderInfoList: [],
      infoListBase: [],
      infoItems: [],
      logisticsForm: {
        orderId: this.$route.query.id,
        deliverySn: "",
        deliveryCompany: "",
      },
      // 物流信息数据
      logisticsList: [
        {
          time: "2015-03-06 21:16:58",
          sendStatus: "深圳市横岗速递营销部已收件",
          sendDesc: "揽投员姓名：钟定基;联系电话：13883838888",
        },
        {
          time: "2015-03-07 14:25:00",
          sendStatus: "离开深圳市 发往广州市",
          sendDesc: "",
        },
        {
          time: "2015-03-08 00:17:00",
          sendStatus: "到达广东速递物流公司广航中心处理中心（经转）",
          sendDesc: "",
        },
        {
          time: "2015-03-08 01:15:00",
          sendStatus: "离开广州市 发往北京市（经转）",
          sendDesc: "",
        },
        {
          time: "2015-03-09 09:01:00",
          sendStatus: "到达北京黄村转运站处理中心（经转）",
          sendDesc: "",
        },
        {
          time: "2015-03-09 18:39:00",
          sendStatus: "离开北京市 发往呼和浩特市（经转）",
          sendDesc: "",
        },
        {
          time: "2015-03-10 18:06:00",
          sendStatus: "到达 呼和浩特市 处理中心",
          sendDesc: "",
        },
        {
          time: "2015-03-11 09:53:48",
          sendStatus: "呼和浩特市邮政速递物流分公司金川揽投部安排投递",
          sendDesc: "投递员姓名：安长虹;联系电话：18047140142",
        },
      ],
      rules: {
        deliverySn: [
          { required: true, message: "请填写物流单号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getOrderInfoList();
    // console.log(this.$route.query.id);
  },
  mounted() {},
  methods: {
    getOrderInfoList() {
      orderDetail(this.$route.query.id).then((res) => {
        console.log(res);
        this.orderInfoList = res.data.orderDetail;
        this.infoListBase = res.data.orderDetail.orderBase;
        this.infoItems = res.data.orderDetail.orderItems;
        this.infoItems.forEach(
          (ele) => (ele.isReturn = ele.isReturn ? "是" : "否")
        );
        this.active = this.infoListBase.status + 1;
      });
    },
    // 确认发货
    submitSend() {
      sendDone(this.logisticsForm).then((res) => {
        console.log(res);
        this.$message({
          message: "发货成功",
          type: "success",
        });
        this.getOrderInfoList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.orderinfo {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .container {
    width: 95%;
    background-color: #fff;
    padding: 20px;
    overflow: hidden;
    .header {
      width: 80%;
      margin-bottom: 30px;
    }
    .ordermessage {
      width: 100%;
      margin: 20px 0 40px;
    }
    .receiver {
      width: 100%;
      margin: 20px 0 40px;
    }
    .productInfo {
      width: 100%;
      margin: 20px 0 40px;
    }
    .costInfo {
      width: 100%;
      margin: 20px 0 40px;
    }
    .logisticsInfo {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-bottom: 40px;
      .el-form .demo-form-inline .el-form--inline {
        margin: 0;
      }
      div.el-form-item.is-required.el-form-item--mini {
        margin: 0;
      }
    }
    .sureSend {
      width: 150px;
      margin-bottom: 30px;
    }
    .logistics {
      width: 100%;
      margin: 20px 0 40px;
    }
  }
}
</style>
