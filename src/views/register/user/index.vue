<template>
  <div class="user">
    <div class="main center">
      <div class="main-title">
        <div>注册用户列表</div>
      </div>
      <!-- 表格部分 -->
      <el-table :data="userInfo" border style="width: 96%" class="center">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="40px"
          fixed
        />
        <!-- 用户名 -->
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="300px"
        >
        </el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像" align="center" width="200px">
          <template v-slot="scope">
            <img
              :src="scope.row.icon"
              alt=""
              style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #f5f5f5;
                margin: 0 auto;
                overflow: hidden;
              "
            />
          </template>
        </el-table-column>
        <!-- 昵称 -->
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          width="260px"
        >
        </el-table-column>
        <!-- 真实姓名 -->
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
          width="300px"
        />
        <!-- 性别 -->
        <el-table-column
          prop="sex"
          label="性别"
          sortable
          align="center"
          width="200px"
        />
        <!-- 电话 -->
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="200px"
        />
        <!-- 邮箱 -->
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          width="200px"
        />
        <!-- 生日 -->
        <el-table-column
          prop="birthday"
          label="生日"
          align="center"
          width="200px"
        />
        <!-- 注册时间 -->
        <el-table-column
          prop="createTime"
          label="注册时间"
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
    </div>
  </div>
</template>
<script>
import { findMembersByPage } from "@/api/register/user";
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      total: 0,
      userInfo: [],
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
  methods: {
    // 获取商品列表
    getUserInfo() {
      findMembersByPage(this.start, this.limit).then((res) => {
        console.log(res);
        res.data.rows.forEach((ele) => (ele.sex = ele.sex ? "女" : "男"));
        this.userInfo = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 改变每页数据条数
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e;
      this.getUserInfo();
    },
    // 改变当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e;
      this.getUserInfo();
    },
  },
};
</script>
<style lang="scss" scoped>
.user {
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
      line-height: 34px;
      padding: 18px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>
