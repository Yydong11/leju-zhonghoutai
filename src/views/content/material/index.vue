<template>
  <div class="material">
    <div class="container center">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
          <el-upload
            action="/lejuAdmin/material/uploadFileOss"
            :limit="1"
            :file-list="fileList"
            :headers="getTokens"
            :on-success="uploadImgUrl"
          >
            <el-button size="small" type="primary">点击上传素材</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <div class="container-list">
          <div
            v-for="item in materialList"
            :key="item.id"
            class="container-item"
          >
            <div class="item-time">创建时间:{{ item.createTime }}</div>
            <div class="item-photo">
              <img :src="item.ossUrl" alt="">
              <el-button type="danger" class="item-btn">删除</el-button>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          :current-page="start"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { findMaterialByPage, uploadFileOssSave } from '@/api/content/material'
import { getToken } from '@/utils/myAuth'
export default {
  data() {
    return {
      start: 1,
      limit: 10,
      materialList: [],
      total: 0,
      fileList: [],
      file: ''
    }
  },
  computed: {
    getTokens() {
      return {
        token: getToken()
      }
    }
  },
  created() {
    this.getMaterialList()
  },
  methods: {
    getMaterialList() {
      findMaterialByPage(this.start, this.limit).then((res) => {
        // console.log(res);
        this.materialList = res.data.rows
        this.total = res.data.total
      })
    },
    // 多少条每页
    handleSizeChange(e) {
      // console.log(e);
      this.limit = e
      this.getMaterialList()
    },
    // 当前页
    handleCurrentChange(e) {
      // console.log(e);
      this.start = e
      this.getMaterialList()
    },
    // 文件上传成功时的钩子函数
    uploadImgUrl(e) {
      // console.log(e);
      this.file = e.data.fileUrl
      console.log(this.file)
      // 出错
      // uploadFileOssSave(this.file).then((res) => {
      //   console.log(res);
      // });
    }
  }
}
</script>

<style lang="scss">
.material {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  padding-bottom: 100px;
  .container {
    width: 95%;
    background-color: #fff;
    .container-list {
      width: 100%;
      display: flex;
      justify-content: first baseline;
      align-content: center;
      flex-wrap: wrap;
      & .container-item:nth-child(5n) {
        margin-right: 0;
      }
      .container-item {
        width: 18.3%;
        height: 420px;
        margin: 0 20px 20px 0;
        border: 1px solid #ebeef5;
        box-sizing: border-box;
        border-radius: 5px;
        .item-time {
          width: 100%;
          box-sizing: border-box;
          color: #303133;
          padding: 18px 20px;
          border-bottom: 1px solid #ebeef5;
          font-size: 14px;
          line-height: 16px;
        }
        .item-photo {
          width: 100%;
          height: 340px;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          img {
            width: 100%;
            height: 250px;
          }
          .item-btn {
            width: 88px;
            height: 28px;
            line-height: 14px;
            padding: 7px 15px;
            box-sizing: border-box;
            position: absolute;
            right: 20px;
            bottom: 20px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
