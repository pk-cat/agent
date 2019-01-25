<template>
  <!-- 游戏概况数据分析 -->
  <div class="parent">
    <!-- 查找条件 -->
    <div class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content">代理ID</div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="agencyID" v-on:input="agencyIDTest" clearable></el-input>
        </el-col>
        <el-col :span="2">
          <div class="grid-content" style="borderLeft:0">时间</div>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="searchDisable"
            type="primary"
            class="button"
            style="borderRadius:0 4px 4px 0;marginLeft:-2px"
            @click="search"
          >查找</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格部分 -->
    <div class="footer" v-show="showTable">
      <!-- 表格 -->
      <div class="tableParent">
        <el-table class="table" :data="tableArr" border style="width: 100%">
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="newReg" label="新增注册用户(人)"></el-table-column>
          <el-table-column prop="newRecharge" label="新增充值用户(人)"></el-table-column>
          <el-table-column prop="top" label="上分数量"></el-table-column>
          <el-table-column prop="bottom" label="下份数量"></el-table-column>
          <el-table-column prop="betAll" label="投注总额"></el-table-column>
          <el-table-column prop="payout" label="派彩总额"></el-table-column>
          <el-table-column prop="drew" label="抽水"></el-table-column>
          <el-table-column prop="betNum" label="投注人数(去重)"></el-table-column>
          <el-table-column prop="income" label="系统收入"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 计时器-------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchCount:null,//计时器
      searchTime:3,//秒数倒计时
      // 计时器结束---------------------------------------
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      date: "", //选择的时间
      dateEmpty: 0, //选择时间为空1非空
      tableArr: [], //表格数据
      showTable: false //显示表格和导表按钮
    };
  },
  created() {
    // 计时器-------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchCount=null;//计时器
    this.searchTime=3;//秒数倒计时
    // 计时器结束---------------------------------------
    let timeNew = new Date().valueOf(); //获取到当前时间
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID是否为空
    this.date = timeNew; //选择的时间
    this.dateEmpty = 0; //选择时间为空1非空
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
    // 选择的时间不为空
    dateIsEmpty() {
      if (this.date == null || this.date == "") {
        this.dateEmpty = 0;
      } else {
        this.dateEmpty = 1;
      }
      return Promise.resolve(this.dateEmpty);
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
    // 查找结果
    search() {
      this.idIsEmpty()
        .then(val => {
          //   console.log(val);
          return this.dateIsEmpty();
        })
        .then(val => {
          // 当代理id没选择
          if (this.idEmpty == 0) {
            this.$alert("请输入代理ID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
            // 当开始日期没选择
          } else if (this.idEmpty == 1 && this.dateEmpty == 0) {
            this.$alert("请选择时间", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
          } else if (this.idEmpty == 1 && this.dateEmpty == 1) {
            // 如果时间是超过本月 ，显示时间错误
            if (
              parseInt(new Date(this.date).getMonth()) >
                parseInt(new Date().getMonth()) ||
              parseInt(new Date(this.date).getFullYear()) >
                parseInt(new Date().getFullYear())||
              parseInt(new Date(this.date).getDate()) >
                parseInt(new Date().getDate())
            ) {
              this.showTable = false; //隐藏数据框以及导表按钮
              this.tableArr = [];
              this.$alert("时间错误，请重新选择", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let str = new Date().getTime(); //将时间转换成毫秒
              this.date = str; //还原到最初的时间
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
                let timenew = new Date();
                let timeToday =
                  timenew.getFullYear() +
                  "-" +
                  (parseInt(timenew.getMonth()) + 1) +
                  "-" +
                  timenew.getDate();
                let timeYesterday =
                  timenew.getFullYear() +
                  "-" +
                  (parseInt(timenew.getMonth()) + 1) +
                  "-" +
                  (parseInt(timenew.getDate()) - 1);
                let timeMonth =
                  timenew.getFullYear() +
                  "-" +
                  (parseInt(timenew.getMonth()) + 1);
                this.showTable = true;
                this.tableArr = [
                  {
                    time: timeToday, //时间
                    newReg: 0, //新增注册用户(人)
                    newRecharge: 0, //新增充值用户(人)
                    top: 0, //上分数量
                    bottom: 0, //下分数量
                    betAll: 47, //投注总额
                    payout: 47, //派彩总额
                    drew: 0, //抽水
                    betNum: 1, //投注人数(去重)
                    income: 47 //系统收入
                  },
                  {
                    time: timeYesterday, //时间
                    newReg: 0, //新增注册用户(人)
                    newRecharge: 0, //新增充值用户(人)
                    top: 0, //上分数量
                    bottom: 0, //下分数量
                    betAll: 125, //投注总额
                    payout: 13, //派彩总额
                    drew: 0, //抽水
                    betNum: 1, //投注人数(去重)
                    income: 112 //系统收入
                  },
                  {
                    time: timeMonth, //时间
                    newReg: 0, //新增注册用户(人)
                    newRecharge: 0, //新增充值用户(人)
                    top: 13993, //上分数量
                    bottom: 0, //下分数量
                    betAll: 9971, //投注总额
                    payout: 6004, //派彩总额
                    drew: 134, //抽水
                    betNum: "--", //投注人数(去重)
                    income: 3967 //系统收入
                  }
                ];
              }
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
  }
};
</script>
<style scoped>
.parent {
  margin: 10px;
}
.header {
  width: 600px;
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
.tableParent {
  margin-top: 10px;
  width: 100%;
}
</style>
