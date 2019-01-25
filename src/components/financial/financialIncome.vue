<template>
  <!-- 财务收益数据报表 -->
  <div class="parent">
    <!-- 搜索的日期范围 -->
    <div class="search">
      <el-row :span="24">
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div>
        </el-col>
        <el-col :span="3">
          <el-input v-model="agencyID" v-on:input="agencyIDTest" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content" style="borderLeft:0">(北京时间)从</div>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="1">
          <div class="grid-content">至</div>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" class="button" :disabled="searchDisable" @click="financialSearch">查找</el-button>
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
        <el-table class="table" :data="tableArr" border style="width: 100%">
          <el-table-column prop="id" label="代理ID"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="rank" label="级别"></el-table-column>
          <el-table-column prop="bet" label="投注总额"></el-table-column>
          <el-table-column prop="payout" label="派彩总额"></el-table-column>
          <el-table-column prop="royalty" label="盈利Royalty"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      // 计时器----------------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchTime:3,//秒数
      searchCount:null,//计时器
      // 导表
      exportDisable:false,//按钮是否禁用
      exportTime:3,//秒数
      exportCount:null,//计时器
      // 计时器结束------------------------------------------------
      startDate: "", //开始日期
      startEmpty: 0, //开始日期是否为空0为空1表示有值
      endDate: "", //结束日期
      endEmpty: 0, //结束日期是否为空
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      tableArr: [], //表格数据
      showTable: false //显示表格和导表按钮
    };
  },
  created() {
    // 计时器----------------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchTime=3;//秒数
    this.searchCount=null;//计时器
    // 导表
    this.exportDisable=false;//按钮是否禁用
    this.exportTime=3;//秒数
    this.exportCount=null;//计时器
    // 计时器结束------------------------------------------------
    let now = new Date();
    let startTime = new Date(now.getFullYear(), now.getMonth(), 1).valueOf(); //当月一号
    let endtime = now.valueOf(); //当前日期
    this.startDate = startTime; //开始日期
    this.startEmpty = 0; //开始日期为空 0为空1表示有值
    this.endDate = endtime; //结束日期
    this.endEmpty = 0; //结束日期为空
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID为空
    this.tableArr = []; //表格数据
    this.showTable = false; //显示表格和导表按钮
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
    // 开始日期不为空
    startIsEmpty() {
      if (this.startDate == "" || this.startDate == null) {
        this.startEmpty = 0;
      } else {
        this.startEmpty = 1;
      }
      return Promise.resolve(this.startEmpty);
    },
    // 结束日期不为空
    endIsEmpty() {
      if (this.endDate == "" || this.endDate == null) {
        this.endEmpty = 0;
      } else {
        this.endEmpty = 1;
      }

      return Promise.resolve(this.endEmpty);
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
    // 查找结果---------------------------------------发送ajax
    financialSearch() {
      this.idIsEmpty()
        .then(val => {
          //   console.log(val);
          return this.startIsEmpty();
        })
        .then(val => {
          //   console.log(val);
          return this.endIsEmpty();
        })
        .then(val => {
          //   console.log(val);
          //   console.log(this.idEmpty, this.startEmpty,this.endDate,this.startDate, this.endEmpty);
          // 当代理id没选择
          if (this.idEmpty == 0) {
            this.$alert("请输入代理ID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
            // 当开始日期没选择
          } else if (this.idEmpty == 1 && this.startEmpty == 0) {
            this.$alert("请选择开始日期", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
            // 当结束日期没选择
          } else if (
            this.idEmpty == 1 &&
            this.startEmpty == 1 &&
            this.endEmpty == 0
          ) {
            this.$alert("请选择结束日期", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
          } else if (
            this.idEmpty == 1 &&
            this.startEmpty == 1 &&
            this.endEmpty == 1
          ) {
            // 日期（不能跨月查询，截止日期不能小于起始日期，超过本月查不到数据
            if (this.endDate < this.startDate) {
              this.showTable = false;
              this.tableArr = []; //表格数据
              this.$alert("截止日期不能小于起始日期", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let now = new Date();
              let startTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
              ).valueOf(); //当月一号
              this.endDate = now.valueOf(); //当前日期
              this.startDate = startTime; //开始日期
            } else if (
              new Date(this.startDate).getMonth() !=
              new Date(this.endDate).getMonth()
            ) {
              this.showTable = false;
              this.tableArr = []; //表格数据
              this.$alert("暂不支持跨月查询", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let now = new Date();
              let startTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
              ).valueOf(); //当月一号
              this.endDate= now.valueOf(); //默认结束日期
              this.startDate = startTime; //开始日期
              // 超过本月查不到数据
            }
            // 如果日期大于本月本日，显示时间错误
            else if (
              parseInt(new Date(this.startDate).getMonth()) >
                parseInt(new Date().getMonth()) ||
              parseInt(new Date(this.endDate).getMonth()) >
                parseInt(new Date().getMonth()) ||
              parseInt(new Date(this.startDate).getFullYear()) >
                parseInt(new Date().getFullYear()) ||
              parseInt(new Date(this.endDate).getFullYear()) >
                parseInt(new Date().getFullYear()) ||
              parseInt(new Date(this.startDate).getDate()) >
                parseInt(new Date().getDate()) ||
              parseInt(new Date(this.endDate).getDate()) >
                parseInt(new Date().getDate())
            ) {
              this.showTable = false;
              this.tableArr = [];
              this.$alert("时间错误，请重新选择", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let now = new Date();
              let startTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
              ).valueOf(); //当月一号
              this.endDate = now.valueOf(); //结束日期
              this.startDate = startTime; //开始日期
            } else {
              this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
              //   发送AJAx获得数据---------------------------------------------------------
              let data = 1;
              if (data == 0) {
                this.showTable = false;
                this.$alert("查无数据", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else {
                this.showTable = true;
                this.tableArr = [
                  {
                    id: "1034", //代理ID
                    name: "BOTEST", //姓名
                    rank: "二级代理商", //级别
                    bet: "6608", //投注总额
                    payout: "4000", //派彩总额
                    royalty: "3000"
                  } //盈利
                ];
              }
            }
          }
        });
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
    // 导出表格所用
    exportExcel() {
      this.exportButton(); // 导表按钮3秒内不能重复点击，3秒后恢复
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
.parent {
  margin: 10px;
}
/* 搜索的日期范围 */
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
  font-weight: normal;
  color: #555;
  background-color: #eee;
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
.tableParent {
  margin-top: 10px;
  width: 100%;
}
</style>
