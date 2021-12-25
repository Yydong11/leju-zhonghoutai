<template>
  <div class="dashboard">
    <div class="con" ref="con">
      <!-- 切换全屏按钮 -->
      <div class="button" @click="fullScreen">
        <svg-icon icon-class="全屏" />
      </div>
      <!-- 头部标题 -->
      <div class="header center">
        <div class="header-title">不凡数据大屏</div>
      </div>
      <div class="time">{{ currentTime }}</div>
      <div class="container">
        <!-- 左侧电商数据和热门搜索词 -->
        <div class="left">
          <!-- 电商数据 -->
          <div class="commerceData">
            <el-row :gutter="20">
              <el-col :span="24" :offset="0">
                <span
                  style="font-size: 22px; color: #9aa8d4; margin-right: 10px"
                  >电商数据</span
                >
                <span style="font-size: 20px; color: #404d69">Shell Data</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="24"
                :offset="0"
                style="font-size: 16px; margin: 20px 0 20px"
              >
                <span style="color: #9aa8d4">销售量</span>
                <span style="color: #73aae5; float: right">万元</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="height: 70px">
              <el-col :span="24" :offset="0" style="padding: 0">
                <countTo
                  :startVal="startVal"
                  :endVal="endVal"
                  :duration="2000"
                  style="color: #fff; font-size: 60px; font-weight: 600"
                ></countTo>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :span="24"
                :offset="0"
                style="font-size: 16px; margin: 20px 0 20px"
              >
                <span style="color: #9aa8d4">完成百分比</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="height: 50px">
              <el-col
                :span="24"
                :offset="0"
                style="text-align: center; padding-top: 20px"
              >
                <el-progress
                  ref="progress"
                  :percentage="percen"
                  stroke-width="10"
                ></el-progress>
              </el-col>
            </el-row>
          </div>
          <!-- 热门搜索词 -->
          <div class="hotSearch" style="margin-top: 20px">
            <el-row :gutter="20" style="margin-bottom: 20px">
              <el-col :span="24" :offset="0">
                <span
                  style="font-size: 22px; color: #9aa8d4; margin-right: 10px"
                  >热门搜索词</span
                >
                <span style="font-size: 20px; color: #404d69">Top Search</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" :offset="0" style="height: 400px">
                <div id="characterCloud"></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 中间柱状图,分布图和饼图 -->
        <div class="between">
          <!-- 柱状图部分 -->
          <div class="bar">
            <div id="barChart"></div>
          </div>
          <div class="between-bottom">
            <!-- 中国地图部分 -->
            <div class="mapBox">
              <!-- <div class="map-title">全国订单人数分布图</div> -->
              <div id="map"></div>
            </div>
            <!-- 饼图部分 -->
            <div class="pieBox">
              <div id="pie"></div>
            </div>
          </div>
        </div>
        <!-- 右侧统计数据和大额订单 -->
        <div class="right">
          <!-- 统计数据 -->
          <div class="census">
            <el-row :gutter="20" style="margin-bottom: 30px">
              <el-col :span="24" :offset="0">
                <span
                  style="font-size: 22px; color: #9aa8d4; margin-right: 10px"
                  >统计数据</span
                >
                <span style="font-size: 20px; color: #404d69"
                  >Statistics Data</span
                >
              </el-col>
            </el-row>
            <el-row :gutter="20" style="height: 75px">
              <el-col
                :span="3"
                :offset="0"
                style="padding: 0; height: 100%; margin-right: 20px"
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  style="width: 40px; height: 40px; margin-top: 10px"
                />
              </el-col>
              <el-col :span="7" :offset="0" style="padding: 0">
                <div style="color: #fff; font-size: 32px; font-weight: 600">
                  85.6
                </div>
                <div style="color: #b0c2f9; font-size: 12px">订单总数(万)</div>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="padding: 0; height: 100%; margin-right: 20px"
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  style="width: 40px; height: 40px; margin-top: 10px"
                />
              </el-col>
              <el-col :span="7" :offset="0" style="padding: 0">
                <div style="color: #fff; font-size: 32px; font-weight: 600">
                  32.5
                </div>
                <div style="color: #b0c2f9; font-size: 12px">
                  销售总量(万元)
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="height: 75px">
              <el-col
                :span="3"
                :offset="0"
                style="padding: 0; height: 100%; margin-right: 20px"
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  style="width: 40px; height: 40px; margin-top: 10px"
                />
              </el-col>
              <el-col :span="7" :offset="0" style="padding: 0">
                <div style="color: #fff; font-size: 32px; font-weight: 600">
                  92.6
                </div>
                <div style="color: #b0c2f9; font-size: 12px">人均消费</div>
              </el-col>
              <el-col
                :span="3"
                :offset="0"
                style="padding: 0; height: 100%; margin-right: 20px"
              >
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  style="width: 40px; height: 40px; margin-top: 10px"
                />
              </el-col>
              <el-col :span="7" :offset="0" style="padding: 0">
                <div style="color: #fff; font-size: 32px; font-weight: 600">
                  45
                </div>
                <div style="color: #b0c2f9; font-size: 12px">
                  近十分钟新增订单数量
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 大额订单 -->
          <div class="bigOrder" style="margin-top: 20px">
            <el-row :gutter="20" style="margin-bottom: 20px">
              <el-col :span="24" :offset="0">
                <span
                  style="font-size: 22px; color: #9aa8d4; margin-right: 10px"
                  >大额订单Top</span
                >
                <span style="font-size: 20px; color: #404d69"
                  >Supper Orders</span
                >
              </el-col>
            </el-row>
            <div class="order-card">
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">时间</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">数量</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">金额</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品1</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">51</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">666666</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品2</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">66</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">696969</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品3</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">77</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">777777</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品4</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">67</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28256</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品5</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">57</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28257</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品6</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">58</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28258</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品7</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">59</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28259</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="
                  height: 38px;
                  line-height: 38px;
                  padding: 0;
                  border-bottom: 1px solid #9aa8d4;
                "
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品8</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">60</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28260</el-col>
              </el-row>
              <el-row
                :gutter="20"
                style="height: 38px; line-height: 38px; padding: 0"
              >
                <el-col :span="6" :offset="0" style="padding: 0">12-22</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">物品9</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">63</el-col>
                <el-col :span="6" :offset="0" style="padding: 0">28263</el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "@/utils/china.js";
// 引入中国地图
import countTo from "vue-count-to";
// 引入字符云
import "echarts-wordcloud";
// 引入设置全屏
import screenfull from "screenfull";
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 12010284,
      percen: 55,
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
    };
  },
  created() {
    var vm = this;
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear();
      var m = vm.appendZero(new Date().getMonth() + 1);
      var d = vm.appendZero(new Date().getDate());
      var ho = vm.appendZero(new Date().getHours());
      var mi = vm.appendZero(new Date().getMinutes());
      var ss = vm.appendZero(new Date().getSeconds());
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + ss;
    }, 1000);
  },
  methods: {
    // 柱状图
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById("barChart"));
      var xAxisDate = [];
      var data1 = [];
      var data2 = [];
      // 模拟数据
      for (var i = 0; i < 80; i++) {
        xAxisDate.push("date" + i);
        data1.push(Math.ceil(Math.random() * 10));
        data2.push(Math.ceil(Math.random() * 10));
      }
      var config = {
        title: {
          text: "订单退单柱状图",
          textStyle: {
            color: "#9aa8d4",
            fontSize: 22,
            fontWeight: "normal",
          },
        },
        tooltip: {},
        // x轴
        xAxis: {
          data: xAxisDate,
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#A8AAB3", // 左边线的颜色
              width: "1", // 坐标轴的宽度
            },
          },
          axisLabel: {
            // 坐标轴字体样式
            textStyle: {
              color: "#A8AAB3", // 坐标轴具体的颜色
              fontSize: 12,
            },
          },
        },
        // y轴
        yAxis: {
          // 设置轴线
          axisLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#A8AAB3",
              width: "1",
            },
          },
          axioslable: {
            textStyle: {
              color: "#A8AAB3",
              fontSize: 12,
            },
          },
          // 设置刻度线
          axisTick: {
            show: true,
          },
          // 网格是否显示
          splitLine: {
            show: false,
          },
        },
        // 下边两个按钮
        legend: {
          data: ["订单", "退单"],
          type: "plain",
          bottom: 20,
          // 字体样式
          textStyle: {
            color: "#A8AAB3", // 坐标值得具体的颜色
            fontSize: 12,
          },
        },
        // 系列
        series: [
          {
            name: "订单",
            type: "bar",
            data: data1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7D05E2" }, // 柱图渐变色
                  { offset: 0.5, color: "#B600FF" }, // 柱图渐变色
                  { offset: 1, color: "#BC04E2" }, // 柱图渐变色
                ]),
              },
            },
          },
          {
            name: "退单",
            type: "bar",
            data: data1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#24CBFF" }, // 柱图高亮渐变色
                  { offset: 0.5, color: "#24A3FF" }, // 柱图高亮渐变色
                  { offset: 1, color: "#2492FF" }, // 柱图高亮渐变色
                ]),
              },
            },
          },
        ],
        // 柱子弹出来的动画
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      };
      // 绘制图表
      myChart1.setOption(config);
    },
    // 饼图
    init1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart2 = echarts.init(document.getElementById("pie"));
      var config = {
        title: {
          text: "购买终端",
          // 标题字体样式
          textStyle: {
            color: "#9aa8d4",
            fontSize: 22,
            fontWeight: "normal",
          },
        },
        // hover扇面时候显示的内容 b是data的name  c是data的value
        tooltip: {
          trigger: "item",
          formatter: "{b}数量:{c}ge;占比({d}%)",
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: ["25%", "50%"],
            roseType: "area",
            data: [
              {
                value: 25,
                name: "Android",
                label: {
                  normal: {
                    textStyle: {
                      // 字体颜色渐变  扇颜色保持一致
                      color: "#4B4CDC",
                      fontSize: 12,
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    // 渐变柱状图
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#6D48DC" }, // 柱图渐变色
                      { offset: 0.5, color: "#6D48DC" }, // 柱图渐变色
                      { offset: 1, color: "#4B4CDC" }, // 柱图渐变色
                    ]),
                  },
                },
              },
              {
                value: 20,
                name: "ios",
                label: {
                  normal: {
                    // 字体颜色
                    textStyle: {
                      color: "#248DFF",
                      fontSize: 12,
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    // 渐变柱状图
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#24C9FF" }, // 柱图渐变色
                      { offset: 0.5, color: "#24ABFF" }, // 柱图渐变色
                      { offset: 1, color: "#248DFF" }, // 柱图渐变色
                    ]),
                  },
                },
              },
              {
                value: 15,
                name: "PC Web",
                label: {
                  normal: {
                    textStyle: {
                      color: "#BD00FF",
                      fontSize: 12,
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    // 渐变柱状图
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#D200FF" }, // 柱图渐变色
                      { offset: 0.5, color: "#BD00FF" }, // 柱图渐变色
                      { offset: 1, color: "#BD00FF" }, // 柱图渐变色
                    ]),
                  },
                },
              },

              {
                value: 5,
                name: "Wap Web",
                label: {
                  normal: {
                    textStyle: {
                      color: "#70218F",
                      fontSize: 12,
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    // 渐变柱状图
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#8A1D89" }, // 柱图渐变色
                      { offset: 0.5, color: "#7C1D8C" }, // 柱图渐变色
                      { offset: 1, color: "#70218F" }, // 柱图渐变色
                    ]),
                  },
                },
              },
            ],
          },
        ],
      };
      // 绘制图表
      myChart2.setOption(config);
    },
    // 中国地图
    init2() {
      var myChart3 = echarts.init(document.getElementById("map"), "dark");
      var option;
      var outname = [
        "南海诸岛",
        "北京",
        "天津",
        "上海",
        "重庆",
        "河北",
        "河南",
        "云南",
        "辽宁",
        "黑龙江",
        "湖南",
        "安徽",
        "山东",
        "新疆",
        "江苏",
        "浙江",
        "江西",
        "湖北",
        "广西",
        "甘肃",
        "山西",
        "内蒙古",
        "陕西",
        "吉林",
        "福建",
        "贵州",
        "广东",
        "青海",
        "西藏",
        "四川",
        "宁夏",
        "海南",
        "台湾",
        "香港",
        "澳门",
      ];
      var outvalue = [
        0, 524, 13, 140, 75, 13, 83, 11, 19, 15, 69, 260, 39, 4, 31, 104, 36,
        1052, 33, 347, 9, 157, 22, 4, 18, 5, 2398, 41, 0, 484, 404, 22, 3, 5,
        225,
      ];
      var outdata = [];

      var max = 6000,
        min = 10;
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      for (var i = 0; i < outname.length; i++) {
        outdata.push({
          name: outname[i],
          value: outvalue[i],
        });
      }

      var geoCoordMap = {};
      /*获取地图数据*/
      var mapFeatures = echarts.getMap("china").geoJson.features;
      //  console.log(mapFeatures)
      mapFeatures.forEach(function (v) {
        console.info(v);
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      var convertData = function (outdata) {
        var res = [];
        for (var i = 0; i < outdata.length; i++) {
          var geoCoord = geoCoordMap[outdata[i].name];
          if (geoCoord) {
            res.push({
              name: outdata[i].name,
              value: geoCoord.concat(outdata[i].value),
            });
          }
        }
        return res;
      };
      option = {
        backgroundColor: "#0a1631",
        title: {
          text: "全国订单人数分布图",
          // 标题字体样式
          textStyle: {
            color: "#9aa8d4",
            fontSize: 22,
            fontWeight: "normal",
          },
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            if (params.value.length > 1) {
              return (
                "&nbsp;&nbsp;" +
                params.name +
                "&nbsp;&nbsp;&nbsp;" +
                params.value[2] +
                "人&nbsp;&nbsp;"
              );
            } else {
              return (
                "&nbsp;&nbsp;" +
                params.name +
                "&nbsp;&nbsp;&nbsp;" +
                params.value +
                "人&nbsp;&nbsp;"
              );
            }
          },
        },

        geo: {
          map: "china",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },
          layoutSize: "100%",
          itemStyle: {
            normal: {
              borderColor: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#00F6FF",
                  },
                  {
                    offset: 1,
                    color: "#53D9FF",
                  },
                ],
                false
              ),
              borderWidth: 3,
              shadowColor: "rgba(10,76,139,1)",
              shadowOffsetY: 0,
              shadowBlur: 60,
            },
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            aspectScale: 0.75,
            //zoom:1.1,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#073684", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#061E3D", // 100% 处的颜色
                    },
                  ],
                },
                borderColor: "#215495",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#073684", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#061E3D", // 100% 处的颜色
                    },
                  ],
                },
              },
            },
            data: outdata,
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              brushType: "stroke",
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(5,80,151,0.2)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(5,80,151,0.8)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,108,255,0.7)",
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight: "bold",
                position: "inside",
                formatter: function (para) {
                  return "{cnNum|" + para.data.value[2] + "}";
                },
                rich: {
                  cnNum: {
                    fontSize: 13,
                    color: "#D4EEFF",
                  },
                },
              },
            },
            symbol: "circle",
            symbolSize: function (val) {
              if (val[2] === 0) {
                return 0;
              }
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = maxSize4Pin - a * max;
              return a * val[2] + b * 1.2;
            },
            data: convertData(outdata),
            zlevel: 1,
          },
        ],
      };
      option && myChart3.setOption(option);
    },
    // 字符云
    init3() {
      var chart = echarts.init(
        document.getElementById("characterCloud", "dark")
      );
      chart.setOption({
        series: [
          {
            type: "wordCloud",
            shape: "circle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            right: null,
            bottom: null,
            sizeRange: [12, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 8,
            drawOutOfBound: false,
            layoutAnimation: true,
            textStyle: {
              fontFamily: "sans-serif",
              fontWeight: "bold",
              color: function () {
                return (
                  "rgb(" +
                  [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                  ].join(",") +
                  ")"
                );
              },
            },
            emphasis: {
              focus: "self",
            },
            data: [
              {
                name: "科比·布莱恩特",
                value: 366,
              },
              {
                name: "特斯拉Model",
                value: 367,
              },
              {
                name: "保时捷",
                value: 368,
              },
              {
                name: "法拉利",
                value: 369,
              },
              {
                name: "人上人",
                value: 370,
              },
              {
                name: "兰德酷路泽",
                value: 371,
              },
              {
                name: "凯文·杜兰特",
                value: 371,
              },
            ],
          },
        ],
      });
    },
    // 全屏
    fullScreen() {
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.con);
      }
    },
    // 时间
    //时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
  },
  mounted() {
    this.init();
    this.init1();
    this.init2();
    this.init3();
    setTimeout(() => {
      this.percen = 88;
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  // height: 100vh;
  background-color: #0a1631;
  .con {
    .button {
      width: 30px;
      height: 30px;
      font-size: 30px;
      color: #9aa8d4;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    .time {
      width: 250px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 25px;
      position: absolute;
      right: 20px;
      top: 20px;
      overflow: hidden;
    }
    .header {
      width: 70%;
      height: 120px;
      text-align: center;
      margin-top: 0;
      line-height: 100px;
      background: url("http://nevermo2013.gitee.io/leju_shop_admin/static/img/titleBG.a4cdf1b6.png")
        center no-repeat;
      background-size: 100% 100%;
      background-position: 50%;
      &-title {
        font-size: 36px;
        color: #fff;
        text-shadow: #fff 0 0 15px;
        font-weight: 700;
      }
    }
    .container {
      width: 100%;
      display: flex;
      justify-content: start;
      align-content: center;
      .left {
        width: 25%;
        height: 700px;
        padding: 10px 0 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        .commerceData {
          width: 100%;
          ::v-deep .el-progress-bar__inner {
            background-image: linear-gradient(90deg, #24cbff 30%, #9000ff);
          }
          ::v-deep .el-progress__text {
            color: #fff;
            font-weight: 600;
            font-size: 20px;
          }
        }
        // 字符云
        .hotSearch {
          width: 100%;
          height: 400px;
          #characterCloud {
            width: 100%;
            height: 100%;
            background-color: #16223c;
          }
        }
      }
      .between {
        width: 50%;
        padding: 10px 0 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        // 柱状图
        .bar {
          width: 100%;
          height: 400px;
          #barChart {
            width: 100%;
            height: 400px;
          }
        }
        .between-bottom {
          width: 100%;
          height: 360px;
          display: flex;
          justify-content: start;
          align-content: center;
          // 中国地图
          .mapBox {
            width: 50%;
            height: 360px;
            #map {
              width: 100%;
              height: 360px;
            }
          }
          // 饼图
          .pieBox {
            width: 50%;
            height: 360px;
            #pie {
              width: 100%;
              height: 360px;
            }
          }
        }
      }
      .right {
        width: 25%;
        padding: 10px 10px 0;
        box-sizing: border-box;
        overflow: hidden;
        .bigOrder .order-card {
          width: 100%;
          text-align: center;
          color: #9aa8d4;
          font-size: 14px;
          border: 1px solid #9aa8d4;
          box-sizing: border-box;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
