<template>
  <!-- 24小时在线数据 -->
  <div class="parent">
    <!-- 查询条件 -->
    <div class="search">
      <el-row>
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="agencyID" v-on:input="agencyIDTest" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            :disabled="getServerDisable"
            class="button"
            style="borderRadius:0;padding:8px;marginLeft:-14px"
            type="primary"
            @click="getServer"
          >获取服务器</el-button>
        </el-col>
        <el-col :span="3">
          <div class="grid-content" style="marginLeft:-14px;borderLeft:0">选择服务器</div>
        </el-col>
        <el-col :span="3">
          <select v-model="serverChoice" class="addChoice">
            <option :value="item" v-for="(item,index) in serverArr" :key="index">{{item}}</option>
          </select>
          <!-- <el-dropdown trigger="click" @command='handleCommand' class="addChoice">
                  <p class="el-dropdown-link">
                  <span>
                      {{serverChoice}}
                  </span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  </p>
                  <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="测试服">测试服</el-dropdown-item>
                  <el-dropdown-item command="测试服1">测试服1</el-dropdown-item>
                  </el-dropdown-menu>
          </el-dropdown>-->
        </el-col>
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:0">时间</div>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :disabled="searchDisable" class="button" @click="search">查找</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 折线图 -->
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div class="echart" ref="myEchart"></div>
  </div>
</template>
<script>
import Chart from "echarts";
export default {
  data() {
    return {
      // 计时器-------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchCount:null,//计时器
      searchTime:3,//秒数倒计时
      // 获取服务器
      getServerDisable:false,//按钮是否禁用
      getServerCount:null,//计时器
      getServerTime:3,//秒数倒计时
      // 计时器结束---------------------------------------
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      serverChoice: "", //服务器选择
      serverArr:[],//服务器的数组
      serverEmpty: 0, //服务器选择为空，1为非空
      time: "", //时间选择
      timeEmpty: 0, //时间选择为空，1为非空
      monthArr: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ], //月份
      // 折线图配置
      option: {
        title: {
          x: "center", // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: "top",
          //textAlign: null
          borderColor: "#ccc", // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 16
          },
          text: "24小时在线人数曲线"
        },
        color: [
          "#5bc0de",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        backgroundColor: "#fff",
        tooltip: { trigger: "axis" },
        //图例--折线提示
        legend: {
          x: "center",
          y: "30",
          textStyle: {
            color: "#5bc0de" // 图例文字颜色
          },
          formatter: function(name) {
            return name;
          }
        },
        //右上角的工具箱
        toolbox: {
          x: "80%",
          y: "top",
          show: true,
          feature: {
            mark: { show: true },
            //是否可以保存图片
            saveAsImage: { show: true },
            //dataView : '数据视图',
            dataView: { show: true },
            // 图表切换
            magicType: {
              type: ["line", "bar"]
            }
          }
        },
        calculable: true,
        xAxis: {
          nameLocation: "middle", //坐标轴名称显示位置。
          // 坐标轴文字样式
          nameTextStyle: {
            fontSize: 14
          },
          nameGap: 24, //坐标轴名称与轴线之间的距离。
          name: "取每小时最大值",
          // 悬停提示
          axisPointer: {
            label: {
              show: true,
              formatter: function(params) {
                let weekArr = [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ];
                let monthArr = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ];
                let str = params.value;
                str = str.substring(0, str.indexOf(":")); //横坐标
                let str1 = new Date().getDate(); //今天
                let hours = new Date().getHours(); //小时
                if (str > hours) {
                  //横坐标时间节点大于当前小时数表示昨天，否则表示今天
                  str1 = str1 - 1;
                }
                return (
                  weekArr[new Date().getDay() - 1] +
                  "." +
                  monthArr[new Date().getMonth()] +
                  str1 +
                  "." +
                  params.value
                );
              }
            }
          },
          data: []
        },
        yAxis: [
          {
            nameLocation: "middle", //坐标轴名称显示位置。
            // 坐标轴文字样式
            nameTextStyle: {
              fontSize: 14
            },
            nameGap: 24, //坐标轴名称与轴线之间的距离。
            type: "value",
            name: "人数",
            min: "-1",
            max: "5",
            // 轴线不显示
            splitLine: {
              show: false
            },
            // 网格区域
            splitArea: {
              show: true,
              areaStyle: {
                color: ["rgba(68, 170, 213, 0.1)"]
              }
            }
          }
        ],
        series: [
          {
            type: "line",
            name: "每小时最大在线人数",
            data: [],
            smooth:true
          },
          {
            type: "line",
            name: "前一天每小时的最大在线人数",
            data: [],
            smooth:true
          }
        ]
      }
    };
  },
  created() {
    // 计时器-------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchCount=null;//计时器
    this.searchTime=3;//秒数倒计时
    // 获取服务器
    this.getServerDisable=false;//按钮是否禁用
    this.getServerCount=null;//计时器
    this.getServerTime=3;//秒数倒计时
    // 计时器结束---------------------------------------
    let timaNew = new Date().valueOf(); //获取当前时间
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID是否为空
    this.serverChoice = ""; //服务器选择
    this.serverArr= [];//服务器的数组
    this.serverEmpty = 0; //服务器选择为空，1为非空
    this.time = timaNew; //时间选择
    this.timeEmpty = 0; //时间选择为空，1为非空
    this.monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];//月份
    // 折线图配置
    this.option = {
      title: {
        x: "center", // 水平安放位置，默认为左对齐，可选为：
        // 'center' ¦ 'left' ¦ 'right'
        // ¦ {number}（x坐标，单位px）
        y: "top",
        //textAlign: null
        borderColor: "#ccc", // 标题边框颜色
        borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
        padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
        itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
        textStyle: {
          fontSize: 16
        },
        text: "24小时在线人数曲线"
      },
      color: [
        "#5bc0de",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ],
      backgroundColor: "#fff",
      tooltip: { trigger: "axis" },
      //图例--折线提示
      legend: {
        x: "center",
        y: "30",
        textStyle: {
          color: "#5bc0de" // 图例文字颜色
        },
        formatter: function(name) {
          return name;
        }
      },
      //右上角的工具箱
      toolbox: {
        x: "80%",
        y: "top",
        show: true,
        feature: {
          mark: { show: true },
          //是否可以保存图片
          saveAsImage: { show: true },
          //dataView : '数据视图',
          dataView: { show: true },
          // 图表切换
          magicType: {
            type: ["line", "bar"]
          }
        }
      },
      calculable: true,
      xAxis: {
        nameLocation: "middle", //坐标轴名称显示位置。
        // 坐标轴文字样式
        nameTextStyle: {
          fontSize: 14
        },
        nameGap: 24, //坐标轴名称与轴线之间的距离。
        name: "取每小时最大值",
        // 悬停提示
        axisPointer: {
          label: {
            show: true,
            formatter: function(params) {
              let weekArr = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ];
              let monthArr = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ];
              let str = params.value;
              str = str.substring(0, str.indexOf(":")); //横坐标
              let str1 = new Date().getDate(); //今天
              let hours = new Date().getHours(); //小时
              if (str > hours) {
                //横坐标时间节点大于当前小时数表示昨天，否则表示今天
                str1 = str1 - 1;
              }
              return (
                weekArr[new Date().getDay() - 1] +
                "." +
                monthArr[new Date().getMonth()] +
                str1 +
                "." +
                params.value
              );
            }
          }
        },
        data: []
      },
      yAxis: [
        {
          nameLocation: "middle", //坐标轴名称显示位置。
          // 坐标轴文字样式
          nameTextStyle: {
            fontSize: 14
          },
          nameGap: 24, //坐标轴名称与轴线之间的距离。
          type: "value",
          name: "人数",
          min: "-1",
          max: "5",
          // 轴线不显示
          splitLine: {
            show: false
          },
          // 网格区域
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(68, 170, 213, 0.1)"]
            }
          }
        }
      ],
      series: [
        {
          type: "line",
          name: "每小时最大在线人数",
          data: [],
          smooth:true//折线变成圆滑的曲线
        },
        {
          type: "line",
          name: "前一天每小时的最大在线人数",
          data: [],
          smooth:true//折线变成圆滑的曲线
        }
      ]
    };
  },
  methods: {
    //   代理ID验证
    agencyIDTest() {
      let reg = /^[1-9]*$/;
      let str = this.agencyID;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.agencyID = parseInt(this.agencyID);
            }, 0);
          } else {
            setTimeout(() => {
              this.agencyID = ~~this.agencyID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.agencyID = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.agencyID = ~~this.agencyID;
        }, 0);
      } else {
        setTimeout(() => {
          this.agencyID = 0;
        }, 0);
      }
    },
    // 代理ID不为空
    idIsEmpty() {
      if (this.agencyID == 0 || this.agencyID == "") {
        this.idEmpty = 0;
      } else {
        this.idEmpty = 1;
      }
      return Promise.resolve(this.idEmpty);
    },
    // 服务器选择不为空
    serverIsEmpty() {
      if (this.serverChoice == null || this.serverChoice == "") {
        this.serverEmpty = 0;
      } else {
        this.serverEmpty = 1;
      }
      return Promise.resolve(this.serverEmpty);
    },
    // // 下拉列表--服务器选择
    // handleCommand(command) {
    //   this.serverChoice = command;
    // },
    // 时间不为空
    timeIsEmpty() {
      if (this.time == "" || this.time == null) {
        this.timeEmpty = 0;
      } else {
        this.timeEmpty = 1;
      }
      return Promise.resolve(this.timeEmpty);
    },
    // 查找按钮3秒内不能重复点击，3秒后恢复
    searchButton(){
      this.searchDisable=true;
      this.searchTime=3;
      this.searchCount=setInterval(()=>{
        this.searchTime--;
        // console.log(this.searchTime);
        if (this.searchTime==0) {
          clearInterval(this.searchCount)
          this.searchDisable=false;
        }
      },1000)
    },
    // 获取服务器按钮3秒内不能重复点击，3秒后恢复
    getServerButton(){
      this.getServerDisable=true;
      this.getServerTime=3;
      this.getServerCount=setInterval(()=>{
        this.getServerTime--;
        // console.log(this.getServerTime);
        if (this.getServerTime==0) {
          clearInterval(this.getServerCount)
          this.getServerDisable=false;
        }
      },1000)
    },
    // 获取服务器
    getServer(){
      this.getServerButton(); // 获取服务器按钮3秒内不能重复点击，3秒后恢复
      this.serverArr=['测试服1','测试服2']
    },
    // 查找结果
    search() {
      this.idIsEmpty()
        .then(val => {
          //   console.log(val);
          return this.serverIsEmpty();
        })
        .then(val => {
          //   console.log(val);
          return this.timeIsEmpty();
        })
        .then(val => {
          // 当代理id没选择
          if (this.idEmpty == 0) {
            this.$alert("请输入代理ID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            // 当开始日期没选择
          } else if (this.idEmpty == 1 && this.serverEmpty == 0) {
            this.$alert("请选择服务器", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (
            this.idEmpty == 1 &&
            this.serverEmpty == 1 &&
            this.timeEmpty == 0
          ) {
            this.$alert("请选择时间", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (
            this.idEmpty == 1 &&
            this.serverEmpty == 1 &&
            this.timeEmpty == 1
          ) {
            // 时间超过本月本日，提示时间错误
            if (
              parseInt(new Date(this.time).getMonth()) >
                parseInt(new Date().getMonth()) ||
              parseInt(new Date(this.time).getFullYear()) >
                parseInt(new Date().getFullYear())||
              parseInt(new Date(this.time).getDate()) >
                parseInt(new Date().getDate())
            ) {
              this.showTable = false; //隐藏数据框以及导表按钮
              this.tableArr = [];
              this.$alert("时间错误，请重新选择", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              this.agencyID = 0; //清除代理ID
              let str = new Date().getTime(); //将时间转换成毫秒
              this.time = str; //还原到最初的时间
            } else {
              // 查找按钮3秒内不能重复点击，3秒后恢复
              this.searchButton()
              // console.log(this.serverChoice);//选择的服务器
              //   发送AJAx获得数据---------------------------------------------------------
              let data = 1;
              if (data == 0) {
                this.$alert("查无数据", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else {
                this.initChart();
              }
            }
          }
        });
    },
    // 折线图
    initChart() {
      let num = new Date().getHours();
      let arr = [];
      let str1 =
        new Date().getDate() + "." + this.monthArr[new Date().getMonth()];
      for (let i = 0; i < 24; i++) {
        num++;
        if (num >= 24) {
          num = parseInt(num) - 24;
        }
        if (num < 10) {
          num = "0" + parseInt(num);
        }
        arr.push(num + ":00");
        if (i > 13 && i < 18) {
          this.option.series[1].data.push(1);
        } else {
          this.option.series[1].data.push(0);
        }
        this.option.series[0].data.push(1);
      }
      this.option.xAxis.data = arr;
      this.chart = Chart.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption(this.option);
    }
  },
  // 确保清除定时器
  beforeDestroy(){
    // 查找的计时器
    clearInterval(this.searchCount);
    this.searchCount=null;
    // 获取服务器的计时器
    clearInterval(this.getServerCount);
    this.getServerCount=null;
  }
};
</script>
<style scoped>
.parent {
  margin: 10px;
}
/* 查询条件 */
.search {
  width: 800px;
  margin: 0 auto;
}
.grid-content {
  margin-right: -2px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
}
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 34px;
  width: 100px;
  text-align: left;
  line-height: 34px;
  color: #555;
  border-right: 0;
  padding: 2px;
}
.addChoice > p {
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addChoice > p > span {
  vertical-align: top;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  line-height: 32px;
}
/* 折线图 */
.echart {
  margin-top: 30px;
  width: 100%;
  height: 400px;
}
.echart div {
  width: 100%;
  height: 400px;
  background-color: rgba(68, 170, 213, 0.1);
}
</style>
