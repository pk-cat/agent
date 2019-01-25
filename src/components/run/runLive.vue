<template>
  <!-- 在线实时数据 -->
  <div class="parent">
    <!-- 查询条件 -->
    <div class="search">
      <el-row >
          <el-col :span="2"><div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div></el-col>
          <el-col :span="4"><el-input v-model="agencyID" style="marginRight:-1px;"  v-on:input="agencyIDTest" clearable></el-input></el-col>
          <el-col :span="3"><el-button class='jbutton' :disabled="getServerDisable" @click="getServer" style="borderRadius:0;padding:8px" type="primary">获取服务器</el-button></el-col>
          <el-col :span="4"><div  class="grid-content" style="marginLeft:-1px;borderLeft:0">选择服务器</div></el-col>
          <el-col :span="3">
            <select v-model="serverChoice" class="addChoice">
              <option :value='item' v-for="(item,index) in serverArr" :key="index">{{item}}</option>
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
            </el-dropdown> -->
          </el-col>
          <el-col :span="3"><el-button type="primary" class="hbutton" :disabled="searchDisable" style="borderRadius: 0 4px 4px 0;"  @click="search">查找</el-button></el-col>
      </el-row>
    </div>
    <!-- 折线图 -->
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div class="echart"  ref="myEchart"></div>
  </div>
</template>
<script>
import Chart from "echarts";
import { setInterval, clearInterval } from 'timers';
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
      tableArr: [], //表格数据
      showTable: false, //显示表格和导表按钮
      serverChoice: "", //服务器选择
      serverArr:[],//服务器数组
      serverEmpty: 0, //服务器选择为空，1为非空
      // 折线图配置
      option: {
        title: {
          x: "center", // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: "top",
          //textAlign: null
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "#ccc", // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 16,
          },
          text: "当前在线人数",
        },
        color:  [
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
        tooltip: { trigger: "axis" },
        //图例--折线提示
        legend: {
          x: "center",
          y: "30",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#5bc0de" // 图例文字颜色

          },
          formatter: function(name) {
            return name;
          }
        },
        backgroundColor: "#fff",
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
          name: "时间间隔五分钟",
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
                let str1 = new Date().getDate(); //今天
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
          data: [],
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
            name: "当前在线人数",
            data: [],
            smooth:true//折线变成圆滑的曲线
          }
        ]
      }
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
    // 查找按钮3秒内不能重复点击
    searchButton(){
      this.searchDisable=true;
      this.searchTime=3;
      this.searchCount = setInterval(()=>{
        this.searchTime--;
        // console.log(this.searchTime);
        if (this.searchTime==0) {
          this.searchDisable=false;
          clearInterval(this.searchCount)
        }
      },1000)
    },
    // 获取服务器按钮3秒内不能重复点击
    getServerButton(){
      this.getServerDisable=true;
      this.getServerTime=3;
      this.getServerCount = setInterval(()=>{
        this.getServerTime--;
        // console.log(this.getServerTime);
        if (this.getServerTime==0) {
          this.getServerDisable=false;
          clearInterval(this.getServerCount)
        }
      },1000)
    },
    // 获取服务器
    getServer(){
      this.getServerButton();// 获取服务器按钮3秒内不能重复点击
      this.serverArr=['测试服','测试服1'];
    },
    // 查找结果
    search() {
      this.idIsEmpty()
        .then(val => {
          //   console.log(val);
          return this.serverIsEmpty();
        })
        .then(val => {
          // 当代理id没选择
          if (this.idEmpty == 0) {
            this.$alert("请输入代理ID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            // 当开始日期没选择
          } else if (
            this.idEmpty == 1 &&
            (this.serverEmpty == 0 || this.gameEmpty == 0)
          ) {
            this.$alert("请选择服务器", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else {
            this.searchButton();//查找按钮3秒内不能重复点击
            // console.log(this.serverChoice);//选择的服务器
            //   发送AJAx获得数据---------------------------------------------------------
            let data = 1;
            if (data == 0) {
              this.$alert("查无数据", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              this.initChart()
            }
          }
        });
    },
    // 折线图
    initChart() {
      let str = new Date().getTime();
      for (let i = 0; i <= 24; i++) {
        let str1 = str - 5 * 60 * 1000 * i;
        let hours = new Date(str1).getHours();
        let minute = new Date(str1).getMinutes();
        if (minute % 5 != 0) {
          minute = minute - (minute % 5);
        }
        if (minute < 10) {
          minute = "0" + minute;
        } else if (minute > 60) {
          ++hours;
        }
        if (hours < 0) {
          hours = 23;
        } else if (hours > 24) {
          hours = 0;
        }
        str1 = hours + ":" + minute;
        this.option.xAxis.data.unshift(str1);
        this.option.series[0].data.push(1);
      }
      this.chart = Chart.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption(this.option);
    }
  },
  // 确认清除计时器
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
.parent{
  margin: 10px;
}
/* 查询条件 */
.search {
  width: 700px;
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
  width: 96px;
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
.echart{
  width:100%;
  height:400px;
  margin-top: 20px;
}
.echart div{
  width:100%;
  height:400px;
}
/* 获取服务器按钮 */
.jbutton {
  height: 34px;
  font-size: 14px;
  text-align: center;
  line-height: 0;
  background-color: #5bc0de;
  border-color: #46b8da;
  border-radius: 0;
  padding: 10px;
  width:88px;
  margin: 0;
}
/* 查找按钮 */
.hbutton {
  height: 34px;
  font-size: 14px;
  text-align: center;
  line-height: 0;
  background-color: #5bc0de;
  border-color: #46b8da;
  border-radius: 0;
  padding: 10px;
  width:70px;
  margin: 0;
}
</style>
