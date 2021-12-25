<template>
  <div class="address">
    <!-- 表格部分 -->
    <div class="main center" style="background-color: #fff; width: 95%">
      <div class="main-title">
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = !dialogVisible"
        >新增</el-button>
      </div>
      <el-table :data="addressInfo" border style="width: 96%" class="center">
        <el-table-column
          label="#"
          type="index"
          align="center"
          width="60px"
          fixed
        />
        <el-table-column
          prop="addressName"
          label="地址名称"
          align="center"
          width="200px"
        />
        <el-table-column label="默认发货地址" align="center" width="300px">
          <template v-slot="scope">
            <span>默认发货地址: </span>
            <el-switch
              v-model="scope.row.sendStatus"
              active-color="#409eff"
              inactive-color="#ccc"
              @change="(e) => changeIsSendStatus(e, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="收货人姓名"
          align="center"
          width="260px"
        />
        <el-table-column
          prop="phone"
          label="收货人电话"
          align="center"
          width="200px"
        />
        <el-table-column label="收货人地址" align="center" width="70px">
          <template v-slot="scope">
            <div>
              {{
                scope.row.province +
                  scope.row.city +
                  scope.row.region +
                  scope.row.detailAddress
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="默认收货地址" align="center" width="300px">
          <template v-slot="scope">
            <span>默认收货地址: </span>
            <el-switch
              v-model="scope.row.receiveStatus"
              active-color="#409eff"
              inactive-color="#ccc"
              @change="(e) => changeIsReceiveStatus(e, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="300px"
        />
        <el-table-column
          prop="address"
          label="操作"
          width="180px"
          fixed="right"
          align="center"
        >
          <template v-slot="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="editAddress(scope.row)"
            ><i class="el-icon-view el-icon--right" /> 编辑</el-link>
            <el-link
              type="danger"
              style="display: inline-block; margin-left: 10px"
              :underline="false"
              @click="removeAddress(scope.row.id)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框部分 -->
    <el-dialog
      title="地址详情"
      :visible.sync="dialogVisible"
      width="60%"
      @close="reset"
    >
      <el-form
        ref="form"
        :model="addressForm"
        :rules="rules"
        label-width="100px"
        size="mini"
        style="padding-left: 50px"
      >
        <el-form-item label="发货地址" prop="addressName" style="width: 60%">
          <el-input v-model="addressForm.addressName" placeholder="发货地址" />
        </el-form-item>
        <el-form-item label="发货人姓名" style="width: 60%">
          <el-input v-model="addressForm.name" placeholder="发货人姓名" />
        </el-form-item>
        <el-form-item label="发货人手机号" style="width: 60%">
          <el-input v-model="addressForm.phone" placeholder="发货人手机号" />
        </el-form-item>
        <el-form-item label="邮政编码" style="width: 60%">
          <el-input v-model="addressForm.postCode" placeholder="邮政编码" />
        </el-form-item>
        <el-form-item label="收货地址" style="width: 60%">
          <el-cascader
            v-model="selectedOptions"
            :options="options"
            style="width: 300px"
            @change="electedArea"
          />
        </el-form-item>
        <el-form-item label="详细地址" style="width: 60%">
          <el-input
            v-model="addressForm.detailAddress"
            placeholder="详细地址"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入省市区数据
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import {
  addressList,
  save,
  setSendOne,
  setReceiveOne,
  update,
  companyAddress
} from '@/api/order/address'
export default {
  data() {
    return {
      addressInfo: [],
      dialogVisible: false,
      options: regionDataPlus,
      selectedOptions: '',
      // 用于判断是新增还是编辑
      editInfo: '',
      addressForm: {
        addressName: '',
        city: '',
        cityCode: '',
        createTime: '',
        detailAddress: '',
        id: '',
        modifyTime: '',
        name: '',
        phone: '',
        postCode: '',
        province: '',
        receiveStatus: false,
        region: '',
        sendStatus: false
      },
      rules: {
        addressName: [
          { required: true, message: '发货地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAddressInfo()
  },
  methods: {
    getAddressInfo() {
      addressList().then((res) => {
        console.log(res)
        res.data.items.forEach((ele) => (ele.sendStatus = !!ele.sendStatus))
        res.data.items.forEach(
          (ele) => (ele.receiveStatus = !!ele.receiveStatus)
        )
        this.addressInfo = res.data.items
      })
    },
    // 设置发货地址默认
    changeIsSendStatus(e, id) {
      //   console.log(e, id);
      if (e) {
        setSendOne({
          id: id
        }).then((res) => {
          console.log(res)
          this.getAddressInfo()
        })
      }
    },
    // 设置收货地址默认
    changeIsReceiveStatus(e, id) {
      console.log(e, id)
      if (e) {
        setReceiveOne({
          id: id
        }).then((res) => {
          console.log(res)
          this.getAddressInfo()
        })
      }
    },
    // 提交新增或编辑地址
    submitAdd() {
      this.addressForm.receiveStatus = this.addressForm.receiveStatus ? 1 : 0
      this.addressForm.sendStatus = this.addressForm.sendStatus ? 1 : 0
      if (this.editInfo) {
        // 提交编辑过的地址
        update(this.addressForm).then((res) => {
          console.log(res)
          this.dialogVisible = !this.dialogVisible
          this.getAddressInfo()
        })
      } else {
        // 提交新增地址
        save(this.addressForm).then((res) => {
          console.log(res)
          this.dialogVisible = !this.dialogVisible
          this.getAddressInfo()
        })
      }
    },
    // 通过级联change时间获取省市区数据
    electedArea(e) {
      this.addressForm.province = CodeToText[e[0]]
      this.addressForm.city = CodeToText[e[1]]
      this.addressForm.region = CodeToText[e[2]]
      this.addressForm.cityCode = e.join(',')
    },
    // 点击确定或取消时,重置数据
    reset() {
      this.addressForm = {
        addressName: '',
        city: '',
        cityCode: '',
        createTime: '',
        detailAddress: '',
        id: '',
        modifyTime: '',
        name: '',
        phone: '',
        postCode: '',
        province: '',
        receiveStatus: '',
        region: '',
        sendStatus: ''
      }
      this.selectedOptions = ''
      this.editInfo = ''
    },
    // 编辑地址
    editAddress(val) {
      this.dialogVisible = !this.dialogVisible
      this.editInfo = val
      console.log(val)
      this.selectedOptions = val.cityCode.split(',')
      this.addressForm = val
    },
    // 删除地址
    removeAddress(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          companyAddress(id).then((res) => {
            // console.log(res);
            this.getAddressInfo()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.address {
  background-color: #f5f5f5;
  overflow: hidden;
  .main {
    overflow: hidden;
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
