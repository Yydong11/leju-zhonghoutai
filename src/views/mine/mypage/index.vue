<template>
  <div class="mypage">
    <div class="container center">
      <div class="user">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <img
              :src="userInfoList.icon"
              alt=""
              style="
                display: block;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin: 0 auto;
              "
            />
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24" :offset="0">
            <div style="text-align: center; font-size: 20px">
              {{ userInfoList.username }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24" :offset="0">
            <svg-icon icon-class="书签" />
            <span style="margin-left: 5px">交互专家</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="24" :offset="0">
            <svg-icon icon-class="用户" />
            <span style="margin-left: 5px"
              >不凡学院－某某某事业群－某某平台部－某某技术部－UED</span
            >
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="24" :offset="0">
            <svg-icon icon-class="坐标" />
            <span style="margin-left: 5px">
              河南省 郑州市 金水区 绿地新都会</span
            >
          </el-col>
        </el-row>
        <!-- 标签 -->
        <div class="lable">
          <el-row :gutter="20" style="margin: 20px 0 10px">
            <el-col :span="24" :offset="0" style="padding-left: 0">
              <span style="font-size: 16px">标签</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <div class="lable-list">
                <div
                  class="lable-item"
                  v-for="(item, index) in lableList"
                  :key="index"
                >
                  {{ item }}
                  <span
                    @click="removeItem(index)"
                    style="margin-left: 5px; cursor: pointer"
                    >×</span
                  >
                </div>
                <span
                  @click="changeActive"
                  v-if="active"
                  style="font-size: 20px; cursor: pointer"
                  >+</span
                >
                <span v-else
                  ><el-input
                    @change="pushItem"
                    v-model.trim="itemInfo"
                    placeholder="标签"
                    size="mini"
                    style="width: 100px"
                  ></el-input
                ></span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 小组部分 -->
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <div class="temp">
              <div class="temp-item">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                  alt=""
                />
                <span>不凡UI设计组</span>
              </div>
              <div class="temp-item">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152042345120151821.jpg"
                  alt=""
                />
                <span>不凡前端开发组</span>
              </div>
              <div class="temp-item">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
                  alt=""
                />
                <span>阿里支付组</span>
              </div>
              <div class="temp-item">
                <img src="https://cn.vuejs.org/images/logo.png" alt="" />
                <span>vue小组</span>
              </div>
              <div class="temp-item">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"
                  alt=""
                />
                <span>全员都是吴彦祖</span>
              </div>
              <div class="temp-item">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                  alt=""
                />
                <span>高逼格天团</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="main-title">
          <div
            ref="article"
            style="margin-right: 30px; cursor: pointer; color: #409eff"
            @click="article"
          >
            文章
          </div>
          <div ref="project" style="cursor: pointer" @click="project">项目</div>
          <div class="line" ref="line"></div>
        </div>
        <!-- 文章内容部分 -->
        <div class="con-article" v-if="this.current == 0">
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
          <div class="con-article-item">
            <el-row :gutter="20" style="margin-top: 20px">
              <el-col :span="24" :offset="0">
                <span style="font-size: 16px">Vue</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col
                :span="2"
                :offset="0"
                style="color: #409eff; margin-right: 10px"
              >
                <span class="way">Element</span>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="color: #409eff; text-align: center"
              >
                <span class="way">饿了么</span>
              </el-col>
              <el-col :span="3" :offset="0" style="color: #409eff">
                <span class="way">设计语言</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="24" :offset="0">
                <span
                  >段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; text-align: right">
              <el-col :span="24" :offset="0">
                <span style="color: gray">周树人 2020-11-20 10:33</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px; height: 20px">
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="旗子" /> 125</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="手指" /> 13453</span>
              </el-col>
              <el-col :span="4" :offset="0" style="color: #409eff">
                <span class="num"> <svg-icon icon-class="消息" /> 222</span>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 项目内容部分 -->
        <div class="con-project" v-if="this.current == 1">
          <el-row :gutter="20" style="margin-bottom: 20px">
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-card
                shadow="hover"
                style="height: 270px; position: relative; cursor: pointer"
              >
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-card shadow="hover" style="height: 270px; position: relative">
                <img
                  src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png"
                  alt=""
                  style="width: 100%; height: 150px"
                />
                <span class="bufan">不凡学院</span>
                <div style="padding-left: 3px; margin-top: 3px">
                  那是一种内在的东西， 他们到达不了，也无法触及的
                </div>
                <div>
                  <span
                    style="
                      color: gray;
                      position: absolute;
                      left: 5px;
                      bottom: 10px;
                    "
                    >一天前</span
                  >
                  <span class="iconList">
                    <img
                      class="icon"
                      src="	https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png"
                      alt=""
                    />
                    <img
                      class="icon"
                      src="	https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg"
                      alt=""
                    />
                  </span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/utils/myAuth";
export default {
  data() {
    return {
      userInfoList: {},
      itemInfo: "",
      lableList: [],
      active: true,
      current: 0,
    };
  },
  created() {
    this.userInfoList = getUserInfo();
    // console.log(this.userInfoList);
  },
  mounted() {},
  methods: {
    // 改变输入框是否显示
    changeActive() {
      this.active = false;
    },
    // 输入框失去焦点时pushitem
    pushItem() {
      if (!this.itemInfo) {
        return;
      }
      this.active = true;
      this.lableList.push(this.itemInfo);
    },
    // 点击标签的×时删除item
    removeItem(index) {
      this.lableList.splice(index, 1);
    },
    // 点击文章
    article() {
      this.current = 0;
      this.$refs.line.style.transform = "";
      this.$refs.article.style.color = "#409eff";
      this.$refs.project.style.color = "#303133";
    },
    // 点击项目
    project() {
      this.current = 1;
      this.$refs.article.style.color = "#303133";
      this.$refs.project.style.color = "#409eff";
      this.$refs.line.style.transform = "translate(58px)";
    },
  },
};
</script>
<style lang="scss" scoped>
.mypage {
  width: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
  padding-bottom: 100px;
  .container {
    width: 95%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    color: #303133;
    font-size: 12px;
    .user {
      width: 300px;
      // height: 600px;
      padding: 20px;
      box-sizing: border-box;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      //   标签部分
      .lable {
        border-top: 0.5px dashed #ccc;
        margin-top: 20px;
        margin-bottom: 20px;
        .lable-list {
          width: 100%;
          display: flex;
          justify-content: first baseline;
          align-content: center;
          flex-wrap: wrap;
          .lable-item {
            height: 20px;
            line-height: 20px;
            padding: 0 3px;
            border: 1px solid #d9ecff;
            border-radius: 4px;
            color: #409eff;
            background-color: #ecf5ff;
            margin: 0 8px 8px 0;
          }
        }
      }
      //   小组部分
      .temp {
        width: 100%;
        display: flex;
        border-top: 0.5px dashed #ccc;
        border-bottom: 0.5px dashed #ccc;
        padding: 10px 0 20px;
        box-sizing: border-box;
        justify-content: space-between;
        align-content: center;
        flex-wrap: wrap;
        .temp-item {
          width: 48%;
          height: 40px;
          margin-bottom: 20px;
          line-height: 15px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
          span {
            width: 80px;
            font-size: 15px;
            line-height: 20px;
          }
        }
      }
    }
    .main {
      width: 640px;
      padding: 20px;
      box-sizing: border-box;
      margin-left: 20px;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      overflow: hidden;
      .main-title {
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #e4e7ed;
        box-sizing: border-box;
        font-size: 14px;
        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;
        .line {
          width: 28px;
          height: 2px;
          background-color: #409eff;
          position: absolute;
          bottom: -2px;
          left: 0;
          transition: 0.2s;
        }
      }
      .con-article {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        color: #303133;
        font-size: 14px;
        overflow: hidden;
        .con-article-item {
          height: 180px;
          border-bottom: 1px dashed #ccc;
          div.el-col.el-col-3.el-col-offset-0 {
            padding: 0 !important;
          }
          div.el-col.el-col-3.el-col-offset-0 {
            padding: 0 !important;
          }
          .way {
            height: 20px;
            background-color: #ecf5ff;
            border: 1px solid #d9ecff;
            border-radius: 4px;
            font-size: 12px;
            padding: 0 3px;
          }
          .num {
            display: block;
            border-right: 1px solid #ccc;
            color: gray;
            margin-right: 5px;
          }
        }
      }
      .con-project {
        width: 100%;
        padding-top: 20px;
        ::v-deep .el-card__body {
          padding: 0 !important;
        }
        .bufan {
          font-size: 16px;
          width: 100%;
          padding-left: 3px;
        }
        .iconList {
          position: absolute;
          bottom: 5px;
          right: 20px;
          & .icon:nth-child(1) {
            position: relative;
            z-index: 111;
          }
          & .icon:nth-child(2) {
            position: relative;
            left: -10px;
            z-index: 100;
          }
          & .icon:nth-child(3) {
            position: relative;
            left: -20px;
            z-index: 11;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
