<template>
  <div class="refundlist">
    <!-- 条件查询 -->
    <div class="search center">
      <el-card>
        <div slot="header">
          <span>条件查询</span>
        </div>
        <div>
          <el-form
            :inline="true"
            :model="refundForm"
            class="demo-form-inline"
            size="mini"
            style="padding: 0 20px"
          >
            <el-form-item label="订单编号" style="margin-right: 20px">
              <el-input
                v-model="refundForm.orderSn"
                placeholder="请输入订单编号"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="状态" style="margin-right: 20px">
              <el-select
                v-model="refundForm.status"
                placeholder="退单状态"
                style="width: 120px"
              >
                <el-option label="待处理" :value="0" />
                <el-option label="退货中" :value="1" />
                <el-option label="已完成" :value="2" />
                <el-option label="已拒绝" :value="3" />
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
      <el-table :data="refundInfo" border style="width: 96%" class="center">
        <el-table-column
          label="#"
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
        <el-table-column label="退单状态" align="center" width="300px">
          <template v-slot="scope">
            <el-button type="danger" size="small" v-if="scope.row.status == 0"
              >待处理</el-button
            >
            <el-button type="warning" size="small" v-if="scope.row.status == 1"
              >退货中</el-button
            >
            <el-button
              type="primary"
              size="small"
              plain
              v-if="scope.row.status == 2"
              >已完成</el-button
            >
            <el-button type="info" size="small" v-if="scope.row.status == 3"
              >已拒绝</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          width="300px"
        />
        <el-table-column
          prop="reason"
          label="退单原因"
          align="center"
          width="200px"
        />
        <el-table-column
          prop="productName"
          label="商品名称"
          align="center"
          width="200px"
        />
        <el-table-column
          prop="refundInfo"
          label="商品属性"
          align="center"
          width="200px"
        >
          <template v-slot="scope">
            <span style="margin-right: 10px"
              >颜色:{{ scope.row.productAttr[0].value }}</span
            >
            <span>大小:{{ scope.row.productAttr[1].value }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handleNote"
          label="商品备注"
          align="center"
          width="200px"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
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
              @click="goRefundInfo(scope.row.id)"
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
import { findReturnApply } from "@/api/order/refund";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      total: 0,
      refundInfo: [],
      refundForm: {
        createTime: "",
        handleTime: "",
        memberUsername: "",
        orderId: "",
        orderSn: "",
        status: "",
      },
    };
  },
  created() {
    this.getRefundInfo();
  },
  mounted() {},
  methods: {
    // 条件查询
    onSearch() {
      this.getRefundInfo();
    },
    // 获取退单列表
    getRefundInfo() {
      findReturnApply(this.start, this.limit, this.refundForm).then((res) => {
        console.log(res);
        this.refundInfo = res.data.rows;
        this.refundInfo.forEach(
          (ele) => (ele.productAttr = JSON.parse(ele.productAttr))
        );
        this.total = res.data.total;
      });
    },
    // 改变每页数据条数
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e;
      this.getRefundInfo();
    },
    // 改变当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e;
      this.getRefundInfo();
    },
    // 点击查看订单跳转
    goRefundInfo(id) {
      this.$router.push(`/order/refund/refundinfo?id=${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.refundlist {
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
