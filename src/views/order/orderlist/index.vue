<template>
  <div class="orderlist">
    <!-- 条件查询 -->
    <div class="search center">
      <el-card>
        <div slot="header">
          <span>条件查询</span>
        </div>
        <div>
          <el-form
            :inline="true"
            :model="orderForm"
            class="demo-form-inline"
            size="mini"
            style="padding: 0 20px"
          >
            <el-form-item label="订单编号" style="margin-right: 20px">
              <el-input
                v-model="orderForm.orderSn"
                placeholder="请输入订单编号"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="订单类型" style="margin-right: 20px">
              <el-select
                v-model="orderForm.orderType"
                placeholder="订单类型"
                style="width: 120px"
              >
                <el-option label="正常订单" value="0"></el-option>
                <el-option label="秒杀订单" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式" style="margin-right: 20px">
              <el-select
                v-model="orderForm.payType"
                placeholder="支付方式"
                style="width: 120px"
              >
                <el-option label="未支付" :value="0" />
                <el-option label="支付宝" :value="1" />
                <el-option label="微信" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" style="margin-right: 20px">
              <el-select
                v-model="orderForm.status"
                placeholder="订单状态"
                style="width: 120px"
              >
                <el-option label="待付款" :value="0" />
                <el-option label="待发货" :value="1" />
                <el-option label="已发货" :value="2" />
                <el-option label="已完成" :value="3" />
                <el-option label="退货" :value="4" />
                <el-option label="无效订单" :value="5" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 750px">
              <el-button>重置</el-button>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <!-- 下方表格部分 -->
    <div class="main center" style="width: 95%">
      <el-table :data="orderInfo" border style="width: 96%" class="center">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50px"
          fixed
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          align="center"
          width="200px"
        />
        <el-table-column label="支付方式" align="center" width="300px">
          <template v-slot="scope">
            <el-button type="info" size="small" v-if="scope.row.payType == 0"
              >未支付</el-button
            >
            <el-button
              type="primary"
              size="mini"
              v-else-if="scope.row.payType == 1"
              style="font-size: 20px"
            >
              <svg-icon icon-class="alipay" />
            </el-button>
            <el-button
              type="success"
              size="mini"
              v-else-if="scope.row.payType == 2"
              style="font-size: 20px"
            >
              <svg-icon icon-class="weixin" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" width="300px">
          <template v-slot="scope">
            <el-button type="danger" size="small" v-if="scope.row.status == 0"
              >待付款</el-button
            >
            <el-button type="warning" size="small" v-if="scope.row.status == 1"
              >待发货</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              v-if="scope.row.status == 2"
              >已发货</el-button
            >
            <el-button type="primary" size="small" v-if="scope.row.status == 3"
              >已完成</el-button
            >
            <el-button type="info" size="small" v-if="scope.row.status == 4"
              >退货</el-button
            >
            <el-button type="info" size="small" v-if="scope.row.status == 5"
              >无效订单</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="300px"
        />
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          align="center"
          width="200px"
        />
        <el-table-column label="订单类型" align="center" width="200px">
          <template>
            <el-button type="success" size="small" plain>正常订单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          align="center"
          width="200px"
        />
        <el-table-column
          label="操作"
          width="180px"
          fixed="right"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="goOrderInfo(scope.row.id)"
              ><i class="el-icon-view el-icon--left"></i>查看订单</el-button
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
  </div>
</template>
<script>
import { findOrdersByPage } from "@/api/order/orderlist";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      total: 0,
      orderInfo: [],
      orderForm: {
        deliverySn: "",
        id: "",
        memberUsername: "",
        orderSn: "",
        orderType: "",
        payType: "",
        sourceType: "",
        status: "",
      },
    };
  },
  created() {
    this.getOrderInfo();
  },
  mounted() {},
  methods: {
    // 条件查询
    onSearch() {
      this.getOrderInfo();
    },
    // 获取订单列表
    getOrderInfo() {
      findOrdersByPage(this.start, this.limit, this.orderForm).then((res) => {
        console.log(res);
        this.orderInfo = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 改变每页数据条数
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e;
      this.getOrderInfo();
    },
    // 改变当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e;
      this.getOrderInfo();
    },
    // 点击查看订单跳转
    goOrderInfo(id) {
      this.$router.push(`/order/orderlist/orderinfo?id=${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.orderlist {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .search {
    width: 95%;
    background-color: #fff;
    margin-bottom: 30px;
  }
  .main {
    width: 95%;
    background-color: #fff;
    padding-bottom: 20px;
    overflow: hidden;
  }
}
</style>
