<template>
  <div class="myset">
    <div class="container center">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="安全设置">
          <el-row
            :gutter="20"
            style="
              margin: 5px 0 30px;
              font-size: 22px;
              padding-left: 20px;
              height: 30px;
              line-height: 30px;
            "
          >
            <el-col :span="12" :offset="0">安全设置</el-col>
          </el-row>
          <div style="padding-left: 30px">
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">账号密码</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >当前密码强度:强</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                >修改</el-col
              >
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">密保手机</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >已绑定手机：138****8293</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                >修改</el-col
              >
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">密保问题</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >未设置密保问题，密保问题可有效保护账户安全</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                >修改</el-col
              >
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">备用邮箱</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >已绑定邮箱：ant***sign.com</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                >修改</el-col
              >
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">MFA 设备</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >未绑定 MFA 设备，绑定后，可以进行二次确认</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                >修改</el-col
              >
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <el-row
            :gutter="20"
            style="
              margin: 5px 0 30px;
              font-size: 22px;
              padding-left: 20px;
              height: 30px;
              line-height: 30px;
            "
          >
            <el-col :span="12" :offset="0">新消息通知</el-col>
          </el-row>
          <div style="padding-left: 30px">
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">账号密码</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >其他用户的消息将以站内信的形式通知</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
              >
                <el-switch
                  v-model="value"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                >
                </el-switch>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">系统消息</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >系统消息将以站内信的形式通知</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                ><el-switch
                  v-model="value1"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                >
                </el-switch
              ></el-col>
            </el-row>
            <el-row
              :gutter="20"
              style="
                padding-left: 10px;
                font-size: 14px;
                border-bottom: 1px solid #f0f0f0;
                margin-top: 20px;
              "
            >
              <el-col :span="20" :offset="0">待办任务</el-col>
              <el-col
                :span="20"
                :offset="0"
                style="color: gray; margin: 10px 0 20px"
                >待办任务将以站内信的形式通知</el-col
              >
              <el-col
                :span="4"
                :offset="0"
                style="color: #409eff; font-size: 16px"
                ><el-switch
                  v-model="value2"
                  active-color="#409eff"
                  inactive-color="#dcdfe6"
                >
                </el-switch
              ></el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left",
      value: true,
      value1: true,
      value2: true,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.myset {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
  .container {
    width: 95%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>
