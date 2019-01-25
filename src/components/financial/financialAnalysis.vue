<template>
  <!-- 财务概况数据分析 -->
  <div>
    <!-- 选择条件 -->
    <div class="search">
      <el-row :span="24">
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div>
        </el-col>
        <el-col :span="3">
          <el-input v-model="agencyID" v-on:input="agencyIDTest" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content" style="borderLeft:0">(北京)时间</div>
        </el-col>
        <el-col :span="6" v-show="choice=='年收支图表'">
          <el-date-picker v-model="year" type="year" format="yyyy年" placeholder="选择年"></el-date-picker>
        </el-col>
        <el-col :span="6" v-show="choice=='月收支图表'">
          <el-date-picker v-model="month" type="month" format="yyyy年MM月" placeholder="选择月"></el-date-picker>
        </el-col>
        <el-col :span="6" v-show="choice=='周收支图表'">
          <el-date-picker v-model="week" type="week" format="yyyy年第WW周" placeholder="选择周"></el-date-picker>
        </el-col>
        <el-col :span="6" v-show="choice=='日收支图表'">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="3">
          <div class="grid-content">查询条件</div>
        </el-col>
        <el-col :span="4">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click" @command="handleCommand" class="addChoice">
            <span class="el-dropdown-link">
              {{choice}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="年收支图表">年收支图表</el-dropdown-item>
              <el-dropdown-item command="月收支图表">月收支图表</el-dropdown-item>
              <el-dropdown-item command="周收支图表">周收支图表</el-dropdown-item>
              <el-dropdown-item command="日收支图表">日收支图表</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="searchDisable"
            type="primary"
            class="button"
            style="borderRadius:0 4px 4px 0;marginLeft:10px;"
            @click="searchData"
          >查找</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格部分 -->
    <div class="footer" v-show="showTable">
      <!-- 导出按钮 -->
      <div class="toexcel">
        <el-button
          :disabled="exportDisable"
          @click="exportExcel"
          type="primary"
          class="button"
          style="width:70px;position:absolute;top:0;right:30px"
        >导出</el-button>
      </div>
      <!-- 表格 -->
      <div class="tableParent">
        <table class="table">
          <tr class="tableTr">
            <td>时间</td>
            <td>代理ID</td>
            <td>投注总额</td>
            <td>派彩总额</td>
            <td>抽水(衰减)总额</td>
            <td>盈利Royalty</td>
          </tr>
          <tr v-for="(item,index) in tableArr" :key="index"  :style="index==0?'backgroundColor:#d9edf7':''">
            <td>{{item.time}}</td>
            <td>{{item.id}}</td>
            <td>{{item.bet}}</td>
            <td>{{item.payout}}</td>
            <td>{{item.reduce}}</td>
            <td>{{item.royalty}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { setInterval, clearInterval } from 'timers';
export default {
  data() {
    return {
      // 计时器-------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchCount:null,//计时器
      searchTime:3,//秒数倒计时
      // 导表
      exportDisable:false,//按钮是否禁用
      exportCount:null,//计时器
      exportTime:3,//秒数倒计时
      // 计时器结束---------------------------------------
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID验证
      //   查询条件，年、周、日、月
      date: "", //日期
      week: "", //周
      year: "", //年
      month: "", //月
      choice: "日收支图表", //下拉框选择查询条件
      tableArr: [], //表格数据
      showTable: true //显示表格和导表按钮
    };
  },
  created() {
    // 计时器-------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchCount=null;//计时器
    this.searchTime=3;//秒数倒计时
    // 导表
    this.exportDisable=false;//按钮是否禁用
    this.exportCount=null;//计时器
    this.exportTime=3;//秒数倒计时
    // 计时器结束---------------------------------------
    let str = new Date();
    let newTime =
      str.getFullYear() +
      "-" +
      (parseInt(str.getMonth()) + 1) +
      "-" +
      str.getDate();
    let timeNew = str.valueOf(); //获取当前时间
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID验证
    //   查询条件，年、周、日、月
    this.date = timeNew; //日期
    this.week = timeNew; //周
    this.year = timeNew; //年
    this.month = timeNew; //月
    this.choice = "日收支图表"; //下拉框选择查询条件
    this.tableArr = [
      {
        time: newTime,
        id: "1034",
        bet: 2,
        payout: 0,
        reduce: 1,
        royalty: 1
      }
    ]; //表格数据
    this.showTable = true; //显示表格和导表按钮
  },
  methods: {
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
    // 导表按钮3秒内不能重复点击，3秒后恢复
    exportButton(){
      this.exportDisable=true;
      this.exportTime=3;
      this.exportCount=setInterval(()=>{
        this.exportTime--;
        // console.log(this.exportTime);
        if (this.exportTime==0) {
          clearInterval(this.exportCount)
          this.exportDisable=false;
        }
      },1000)
    },
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
    //下拉框选择值
    handleCommand(command) {
      this.choice = command;
      this.tableArr = []; //表格数据
      this.showTable = false; //显示表格和导表按钮
      let str = new Date();
      let timeNew = str.valueOf(); //获取当前时间
      //   查询条件，年、周、日、月
      switch (command) {
        case "日收支图表":
          this.date = timeNew; //日期
          break;
        case "周收支图表":
          this.week = timeNew; //周
          break;
        case "周收支图表":
          this.month = timeNew; //月
          break;
        case "年收支图表":
          this.year = timeNew; //年
          break;
        default:
          break;
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
    // 导出表格所用
    exportExcel() {
      this.exportButton();//导表按钮3秒内不能重复点击
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //查询数据
    searchData() {
      this.idIsEmpty().then(val => {
        // console.log(val);
        // 代理验证不通过，则提示输入代理ID
        if (this.idEmpty == 0) {
          this.showTable = false; //隐藏表格以及导出按钮
          this.$alert("请输入代理ID", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        } else {
          // console.log(this.choice);//选择的查询条件
          let str = this.choice;
          switch (str) {
            case "日收支图表":
              if (this.date == "" || this.date == null) {
                this.showTable = false; //隐藏表格以及导出按钮
                this.$alert("请选择日期", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } // 如果日期大于本月本日，显示时间错误
              else if (
                parseInt(new Date(this.date).getDate()) >
                  parseInt(new Date().getDate()) ||
                parseInt(new Date(this.date).getFullYear()) >
                  parseInt(new Date().getFullYear())||
                parseInt(new Date(this.date).getMonth()) >
                  parseInt(new Date().getMonth())
              ) {
                this.showTable = false;
                this.tableArr = [];
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.date = str; //还原到最初的时间
              } else {
                this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
                this.showTable = true; //显示表格以及导出按钮
                let str = new Date(this.date);
                let date =
                  str.getFullYear() +
                  "年" +
                  (parseInt(str.getMonth()) + 1) +
                  "月" +
                  str.getDate() +
                  "日";
                this.tableArr = [
                  {
                    time: date,
                    id: 1034,
                    bet: 2,
                    payout: 0,
                    reduce: 1,
                    royalty: 1
                  }
                ];
              }
              break;
            case "周收支图表":
              // 选择时间不能为
              if (this.week == "" || this.week == null) {
                this.showTable = false; //隐藏表格以及导出按钮
                this.$alert("请选择周", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
              // 选择时间不能超过此时此刻
              else if (
                parseInt(new Date(this.week).getDate()) >
                  parseInt(new Date().getDate()) ||
                parseInt(new Date(this.week).getFullYear()) >
                  parseInt(new Date().getFullYear())||
                parseInt(new Date(this.week).getMonth()) >
                  parseInt(new Date().getMonth())
              ) {
                this.showTable = false;
                this.tableArr = [];
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.week = str; //还原到最初的时间
              } else {
                this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
                this.showTable = true; //显示表格以及导出按钮
                var d1 = new Date(this.week);
                var d2 = new Date(this.week);
                d2.setMonth(0);
                d2.setDate(1);
                var rq = d1 - d2;
                var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
                var s2 = Math.ceil(s1 / 7);
                this.tableArr = [
                  {
                    time: d1.getFullYear() + "年第" + s2 + "周",
                    id: 1034,
                    bet: 11,
                    payout: 95.12,
                    reduce: 3.055,
                    royalty: -84.12
                  },
                  {
                    time: d1.getFullYear() +'-'+ (parseInt(d1.getMonth())+1) +'-'+ (parseInt(d1.getDate())-2),
                    id: 1034,
                    bet: 11,
                    payout: 32.4,
                    reduce: 1.775,
                    royalty: -21.4
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1)+'-'+(parseInt(d1.getDate())-1),
                    id: 1034,
                    bet: 0,
                    payout: 62.72,
                    reduce: 1.280,
                    royalty: -62.72
                  }
                ];
              }
              break;
            case "月收支图表":
              // 选择时间不能为空
              if (this.month == "" || this.month == null) {
                this.showTable = false; //隐藏表格以及导出按钮
                this.$alert("请选择月", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
              // 选择时间不能超过此时此刻
              else if (
                parseInt(new Date(this.month).getFullYear()) >
                  parseInt(new Date().getFullYear())||
                parseInt(new Date(this.month).getMonth()) >
                  parseInt(new Date().getMonth())
              ) {
                this.showTable = false;
                this.tableArr = [];
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.month = str; //还原到最初的时间
              } else {
                this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
                this.showTable = true; //显示表格以及导出按钮
                let month =
                  new Date(this.month).getFullYear() +
                  "年" +
                  (parseInt(new Date(this.month).getMonth()) + 1) +
                  "月";
                let d1 = new Date(this.month)
                this.tableArr = [
                  {
                    time: month,
                    id: 1034,
                    bet: 11,
                    payout: 95.12,
                    reduce: 3.055,
                    royalty: -84.12
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1)+'-'+(parseInt(d1.getDate())-2),
                    id: 1034,
                    bet: 11,
                    payout: 32.4,
                    reduce: 1.775,
                    royalty: -21.4
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1)+'-'+(parseInt(d1.getDate())-1),
                    id: 1034,
                    bet: 0,
                    payout: 62.72,
                    reduce: 1.280,
                    royalty: -62.72
                  }
                ];
              }
              break;
            case "年收支图表":
              // 时间不能为空
              if (this.year == "" || this.year == null) {
                this.showTable = false; //隐藏表格以及导出按钮
                this.$alert("请选择年", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
              // 时间不能超过今年
              else if (
                parseInt(new Date(this.year).getFullYear()) >
                  parseInt(new Date().getFullYear())
              ) {
                this.showTable = false;
                this.tableArr = [];
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.year = str; //还原到最初的时间
              } else {
                this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
                this.showTable = true; //显示表格以及导出按钮
                let year = new Date(this.year).getFullYear() + "年";
                let d1 = new Date(this.year)
                this.tableArr = [
                  {
                    time: year,
                    id: 1034,
                    bet: 400000,
                    payout: 330000,
                    reduce: 10000,
                    royalty: 70000
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1-3),
                    id: 1034,
                    bet: 100000,
                    payout: 100000,
                    reduce: 2500,
                    royalty: 14000
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1-2),
                    id: 1034,
                    bet: 100000,
                    payout: 100000,
                    reduce: 2500,
                    royalty: 21000
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1-1),
                    id: 1034,
                    bet: 100000,
                    payout: 100000,
                    reduce: 2500,
                    royalty: 21000
                  },
                  {
                    time: d1.getFullYear()+'-'+(parseInt(d1.getMonth())+1),
                    id: 1034,
                    bet: 100000,
                    payout: 30000,
                    reduce: 2500,
                    royalty: 14000
                  }
                ];
              }
              break;
            default:
              break;
          }
        }
      });
    }
  },
  // 确保清除定时器
  beforeDestroy(){
    // 查找的计时器
    clearInterval(this.searchCount);
    this.searchCount=null;
    // 导表的计时器
    clearInterval(this.exportCount);
    this.exportCount=null;
  }
};
</script>
<style scoped>
.search {
  width: 700px;
  margin: 10px auto;
}
.grid-content {
  margin-right: -2px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
}
.gcontent {
  padding: 2px;
  width: 120px;
  margin-right: -2px;
  min-height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
}
/* 表格部分 */
.footer {
  margin: 20px;
  position: relative;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
}
/* 表格 */
.tableParent {
  margin-top: 10px;
  width: 100%;
}
.table{
  width:100%;
}
td{
  height:40px;  
  line-height: 40px;  
  font-size: 16px;
  text-align: center;
  background-color: transparent;
  border:1px solid #ddd;
}
.tableTr td{
  background-color:#dff0d8;
  font-weight: 600;
}
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 130px;
  text-align: left;
  line-height: 32px;
  color: #555;
  border-right: 0;
}
.addChoice span {
  width: 100%;
  display: inline-block;
  text-align: center;
  line-height: 32px;
}
</style>
