<template>
  <div class="productclassify">
    <div class="center" style="width: 95%; background-color: #fff">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <span>分类管理</span>
        </div>
        <!-- 内容部分 -->
        <!-- 乐居分类部分 -->
        <div class="leju-category">
          <div class="leju-title">乐居分类:</div>
          <div class="leju-list">
            <el-row :gutter="20">
              <el-col
                v-for="item in lejuInfo.children"
                :key="item.id"
                :span="6"
              >
                <el-card shadow="hover" class="grid-content bg-purple">
                  <div class="leju-item-title">{{ item.name }}</div>
                  <div class="leju-item-photo">
                    <img :src="item.icon" alt=""></div></el-card>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 全部分类部分 -->
        <div class="all-category">
          <div class="all-title">全部分类:</div>
          <div class="all-main">
            <el-table
              :data="categoryInfo"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              border
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column prop="name" label="菜单名称" width="180" fixed />
              <el-table-column width="200" align="center" label="icon">
                <template v-slot="scope" prop="icon">
                  <div class="main-icon">
                    <img :src="scope.row.icon" alt="">
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="keywords"
                label="分类名字"
                align="center"
                width="200"
              />
              <el-table-column
                prop="sort"
                label="排序"
                align="center"
                width="200"
              />
              <el-table-column
                prop="showStatus"
                label="显示状态"
                align="center"
                width="200"
              />
              <el-table-column
                prop="navStatus"
                label="导航栏展示"
                align="center"
                width="200"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
                width="200"
              />
              <el-table-column
                prop="createTime"
                label="创建时间"
                align="center"
                width="200"
              />
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAllCategory } from '@/api/product/productclassify'
export default {
  data() {
    return {
      categoryInfo: [],
      lejuInfo: {}
    }
  },
  created() {
    this.getCategoryInfo()
  },
  methods: {
    //   获取全部分类列表
    getCategoryInfo() {
      getAllCategory().then((res) => {
        console.log(res)
        const data = res.data
        // console.log(data);
        this.lejuInfo = data.items.find((ele) => ele.category.name == '乐居')
        console.log(this.lejuInfo)
        this.categoryInfo = data.items.map((ele) => {
          var obj = {
            ...ele.category,
            children: ele.children
          }
          return obj
        })
        console.log(this.categoryInfo)
        this.categoryInfo.forEach(
          (ele) => (ele.showStatus = ele.showStatus ? '显示' : '不显示'),
          (ele) => (ele.navStatus = ele.navStatus ? '展示' : '不展示')
        )
        this.categoryInfo.forEach(
          (ele) => (ele.navStatus = ele.navStatus ? '展示' : '不展示')
        )
      })
    }
  }
}
</script>

<style lang="scss">
.productclassify {
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .leju-category {
    .leju-title {
      color: #333;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .leju-list {
      width: 100%;
      margin-bottom: 20px;
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #fff;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .el-card__body {
        padding: 0;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height: 400px;
        border: 1px solid #ebeef5;
        padding: 0;
        .leju-item-title {
          width: 100%;
          height: 53px;
          padding: 18px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #ebeef5;
        }
        .leju-item-photo {
          width: 100%;
          height: 350px;
          padding: 20px;
          box-sizing: border-box;
          img {
            display: block;
            width: 100%;
            height: 300px;
          }
        }
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    }
  }
  .all-category {
    .all-title {
      color: #333;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .all-main {
      width: 100%;
      .main-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
