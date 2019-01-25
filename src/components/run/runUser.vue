<template>
  <!-- 代理用户收益统计-->
  <div class="parent">
      <!-- 查找方式 -->
      <div class="searchID">  
        <select v-model="findWay" class="addChoice">
          <option value="所有用户">所有用户</option>
          <option value="用户UID">用户UID</option>
          <option value="游戏账号">游戏账号</option>
        </select>         
          <!-- <el-dropdown trigger="click" @command='handleFindWay' class="addChoice">
              <p class="el-dropdown-link">
              <span>
                  {{findWay}}
              </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="所有用户">所有用户</el-dropdown-item>
              <el-dropdown-item command="用户UID">用户UID</el-dropdown-item>
              <el-dropdown-item command="游戏账号">游戏账号</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown> -->
          <div class="label1" v-show='this.findWay=="所有用户"'>代理ID</div>
          <el-input
          v-show='this.findWay=="所有用户"'
              v-model="agencyID"
              @input="agencyIDTest"
              clearable>
          </el-input>
          <div v-show='this.findWay=="用户UID"' class="label1">用户UID</div>
          <el-input
            v-show='this.findWay=="用户UID"'
              v-model="theUID"
              @input="UIDTest"
              clearable>
          </el-input>
          <div v-show='this.findWay=="游戏账号"' class="label1">账号</div>
          <el-input
            v-show='this.findWay=="游戏账号"'
              v-model="account"
              @input="accountTest"
              clearable>
          </el-input>
          <div class="label">收益类型选择</div>
          <el-dropdown trigger="click" @command='handletype' class="addChoice1">
              <p class="el-dropdown-link">
              <span>
                  {{typeGain}}
              </span>
              <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="(item,index) in typeChoiceArr" :key='index' v-bind:command="item">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
      <!-- 查询时间 -->
        <!-- 搜索的日期范围 -->
      <div class="search">
          <el-row >
              <el-col :span="6"><div class="grid-content" style="borderRadius:4px 0 0 4px;">(北京时间)从</div></el-col>
              <el-col :span="6">
                  <el-date-picker
                      v-model="startDate"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp">
                  </el-date-picker>
              </el-col>
              <el-col :span="4"><div class="grid-content">至</div></el-col>
              <el-col :span="6">
                  <el-date-picker
                      v-model="endDate"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp">
                  </el-date-picker>
              </el-col>
              <el-col :span="2"><el-button type="primary" :disabled="searchDisable" class="button" @click="searchBy1">查找</el-button></el-col>
          </el-row>
      </div>
      <!-- 表格部分 -->
      <div v-show="showTable" class="footer">
          <!-- 导表 -->
        <div  class="toexcel" >
          <el-button type="primary" @click="exportExcel" :disabled='exportDisable' class="button" style="width:70px;position:absolute;right:50px;">导表</el-button>
        </div>
        <!-- 表格 -->
        <table  class="table">
          <tr class="tableTr">
            <td>用户UID</td>
            <td>游戏账号</td>
            <td>代理ID</td>
            <td>代理姓名</td>
            <td>输赢（分数）</td>
            <td>有效下注</td> 
            <td>抽水</td> 
          </tr>
          <tr class="tableDate" v-for="(item,index) in tableData" :key="index">
            <td><span @click="toUserIncome(item.UID)" :class="item.UID=='汇总'?'':'router'">{{item.UID}}</span></td>
            <td>{{item.gameAccount}}</td>
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.score}}</td>
            <td>{{item.bet}}</td>
            <td>{{item.drew}}</td>
          </tr>
        </table>
        <!-- 分页器 -->
        <div class="page" > 
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
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
      findWay: "所有用户", //默认查找方式
      startDate: 0, //开始日期
      startEmpty: 0, //开始日期是否为空0为空1表示有值
      endDate: 0, //结束日期
      endEmpty: 0, //结束日期是否为空
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      account: 0, //账号
      accountEmpty: 0, //账号是否为空
      theUID: 0, //用户UID
      theUIDEmpty: 0, //用户UID是否为空
      surplusScore: false, //剩余分数是否被选中,最近一次进游戏时间是否被选中
      tableData: [],
      typeGain: "汇总", //选择的收益类型
      typeChoiceArr: [
        "汇总",
        "全部",
        "上分",
        "下分",
        "德扑游戏场1",
        "德扑游戏场2",
        "德扑游戏场3",
        "德扑游戏场4",
        "德扑游戏场5",
        "德扑游戏场6",
        "德扑定时赛",
        "德扑菜鸟场",
        "德扑普通场",
        "德扑精英场",
        "德扑卓越场",
        "德扑大师场",
        "德扑宗师场",
        "牛牛体验场-随机庄",
        "牛牛新手场-随机庄",
        "牛牛精英场-随机庄",
        "牛牛大师场-随机庄",
        "牛牛体验场-看牌抢庄",
        "牛牛新手场-看牌抢庄",
        "牛牛精英场-看牌抢庄",
        "牛牛大师场-看牌抢庄",
        "牛牛体验场-通比",
        "牛牛新手场-通比",
        "牛牛精英场-通比",
        "牛牛大师场-通比",
        "抢庄牛牛-体验",
        "抢庄牛牛-新手",
        "抢庄牛牛-精英",
        "抢庄牛牛-大师",
        "百牛-体验场",
        "百牛-初级场",
        "百牛-中级场",
        "百牛-高级场",
        "李逵百炮场",
        "李逵千炮场",
        "李逵万炮场",
        "30秒-体验场",
        "30秒-初级场",
        "30秒-中级场",
        "30秒-高级场",
        "金蟾0.1元场",
        "金蟾1元场",
        "金蟾10元场",
        "金蟾测试场",
        "龙虎-体验场",
        "龙虎-初级场",
        "龙虎-中级场",
        "龙虎-高级场",
        "奔驰宝马-体验场",
        "奔驰宝马-新手场",
        "奔驰宝马-精英场",
        "奔驰宝马-大师场",
        "飞禽走兽-平民",
        "飞禽走兽-小资",
        "飞禽走兽-老板",
        "飞禽走兽-贵族",
        "炸金花-体验",
        "炸金花-新手",
        "炸金花-精英",
        "炸金花-大师",
        "二八杠-体验",
        "二八杠-新手",
        "二八杠-精英",
        "二八杠-大师",
        "港式五张-体验",
        "港式五张-新手",
        "港式五张-精英",
        "港式五张-大师"
      ], //收益类型数组
      // 分页器
      currentPage3: 5,
      showTable: false //显示查询内容以及分页器以及导出按钮
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
    let str = new Date().getTime(); //将时间转换成毫秒
    this.findWay = "所有用户"; //默认查找方式
    this.startDate = str; //开始日期
    this.startEmpty = 0; //开始日期是否为空0为空1表示有值
    this.endDate = str; //结束日期
    this.endEmpty = 0; //结束日期是否为空
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID是否为空
    this.account = 0; //账号
    this.accountEmpty = 0; //账号是否为空
    this.theUID = 0; //用户UID
    this.theUIDEmpty = 0; //用户UID是否为空
    this.surplusScore = false; //剩余分数是否被选中,最近一次进游戏时间是否被选中
    this.tableData = [];
    this.typeGain = "汇总"; //选择的收益类型
    this.typeChoiceArr = [
      "汇总",
      "全部",
      "上分",
      "下分",
      "德扑游戏场1",
      "德扑游戏场2",
      "德扑游戏场3",
      "德扑游戏场4",
      "德扑游戏场5",
      "德扑游戏场6",
      "德扑定时赛",
      "德扑菜鸟场",
      "德扑普通场",
      "德扑精英场",
      "德扑卓越场",
      "德扑大师场",
      "德扑宗师场",
      "牛牛体验场-随机庄",
      "牛牛新手场-随机庄",
      "牛牛精英场-随机庄",
      "牛牛大师场-随机庄",
      "牛牛体验场-看牌抢庄",
      "牛牛新手场-看牌抢庄",
      "牛牛精英场-看牌抢庄",
      "牛牛大师场-看牌抢庄",
      "牛牛体验场-通比",
      "牛牛新手场-通比",
      "牛牛精英场-通比",
      "牛牛大师场-通比",
      "抢庄牛牛-体验",
      "抢庄牛牛-新手",
      "抢庄牛牛-精英",
      "抢庄牛牛-大师",
      "百牛-体验场",
      "百牛-初级场",
      "百牛-中级场",
      "百牛-高级场",
      "李逵百炮场",
      "李逵千炮场",
      "李逵万炮场",
      "30秒-体验场",
      "30秒-初级场",
      "30秒-中级场",
      "30秒-高级场",
      "金蟾0.1元场",
      "金蟾1元场",
      "金蟾10元场",
      "金蟾测试场",
      "龙虎-体验场",
      "龙虎-初级场",
      "龙虎-中级场",
      "龙虎-高级场",
      "奔驰宝马-体验场",
      "奔驰宝马-新手场",
      "奔驰宝马-精英场",
      "奔驰宝马-大师场",
      "飞禽走兽-平民",
      "飞禽走兽-小资",
      "飞禽走兽-老板",
      "飞禽走兽-贵族",
      "炸金花-体验",
      "炸金花-新手",
      "炸金花-精英",
      "炸金花-大师",
      "二八杠-体验",
      "二八杠-新手",
      "二八杠-精英",
      "二八杠-大师",
      "港式五张-体验",
      "港式五张-新手",
      "港式五张-精英",
      "港式五张-大师"
    ]; //收益类型数组
    // 分页器
    this.currentPage3 = 5;
    this.showTable = false; //显示查询内容以及分页器以及导出按钮
  },
  methods: {
    // 选择查找方式
    handleFindWay(command) {
      this.findWay = command;
    },
    // 选择收益类型
    handletype(num) {
      this.typeGain = num;
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
    //   用户UID验证
    UIDTest() {
      let reg = /^[1-9]*$/;
      let str = this.theUID;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.theUID = parseInt(this.theUID);
            }, 0);
          } else {
            setTimeout(() => {
              this.theUID = ~~this.theUID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.theUID = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.theUID = ~~this.theUID;
        }, 0);
      } else {
        setTimeout(() => {
          this.theUID = 0;
        }, 0);
      }
    },
    //  游戏账号验证
    accountTest() {
      let reg = /^[1-9]*$/;
      let str = this.account;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.account = parseInt(this.account);
            }, 0);
          } else {
            setTimeout(() => {
              this.account = ~~this.account;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.account = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.account = ~~this.account;
        }, 0);
      } else {
        setTimeout(() => {
          this.account = 0;
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
    // 用户UID不为空
    theUIDIsEmpty() {
      if (this.theUID == 0 || this.theUID == "") {
        this.theUIDEmpty = 0;
      } else {
        this.theUIDEmpty = 1;
      }
      return Promise.resolve(this.theUIDEmpty);
    },
    // 账号不为空
    accountIsEmpty() {
      if (this.account == 0 || this.account == "") {
        this.accountEmpty = 0;
      } else {
        this.accountEmpty = 1;
      }
      return Promise.resolve(this.accountEmpty);
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
    // 根据输入内容查找----------------------------------------------------------AJAX
    searchBy1() {
      let str = this.findWay;
      if (str == "所有用户") {
        this.idIsEmpty()
          .then(val => {
            // console.log("ID", val);
            return this.startIsEmpty();
          })
          .then(val => {
            // console.log("开始时间不为空", val);
            return this.endIsEmpty();
          })
          .then(val => {
            // console.log("结束时间", val);
            if (this.idEmpty == 0) {
              this.$alert("请输入代理ID", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.idEmpty == 1 && this.startEmpty == 0) {
              this.$alert("请选择开始时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.idEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 0
            ) {
              this.$alert("请选择结束时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.idEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 1
            ) {
              // 日期限制，不支持跨月查询，结束日期不能大于开始日期，截止日期到本年本月本日
              //   console.log(this.endDate,this.startDate,typeof new Date(this.startDate), typeof new Date(this.endDate));
              if (this.endDate < this.startDate) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("截止日期不能小于起始日期", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else if (
                new Date(this.startDate).getMonth() !=
                new Date(this.endDate).getMonth()
              ) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              }  else if (parseInt(new Date(this.startDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.endDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.startDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.endDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.startDate).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(this.endDate).getDate())>parseInt(new Date().getDate())
              ) {
                this.showTable = false;
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              }else {
                this.searchButton();//查找按钮3秒内不能重复点击
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
                  this.tableData = [
                    {
                      UID: "汇总",
                      gameAccount: "--",
                      id: "--",
                      name: "--",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "110118",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "201998",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    }
                  ];
                }
              }
            }
          });
      } else if (str == "用户UID") {
        this.theUIDIsEmpty()
          .then(val => {
            // console.log("ID", val);
            return this.startIsEmpty();
          })
          .then(val => {
            // console.log("开始时间不为空", val);
            return this.endIsEmpty();
          })
          .then(val => {
            // console.log("结束时间", val);
            if (this.theUIDEmpty == 0) {
              this.$alert("请输入用户UID", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.theUIDEmpty == 1 && this.startEmpty == 0) {
              this.$alert("请选择开始时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.theUIDEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 0
            ) {
              this.$alert("请选择结束时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.theUIDEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 1
            ) {
              // 时间限制，不能跨月查询，结束日期不能超过开始日期，截止日期到本年本月本日
              if (this.endDate < this.startDate) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("截止日期不能小于起始日期", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else if (
                new Date(this.startDate).getMonth() !=
                new Date(this.endDate).getMonth()
              ) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else if (parseInt(new Date(this.startDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.endDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.startDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.endDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.startDate).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(this.endDate).getDate())>parseInt(new Date().getDate())
              ) {
                this.showTable = false;
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else{
                this.searchButton();//查找按钮3秒内不能重复点击
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
                  this.tableData = [
                    {
                      UID: "汇总",
                      gameAccount: "--",
                      id: "--",
                      name: "--",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "110118",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "201998",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    }
                  ];
                }
              }
            }
          });
      } else if (str == "游戏账号") {
        this.accountIsEmpty()
          .then(val => {
            // console.log("ID", val);
            return this.startIsEmpty();
          })
          .then(val => {
            // console.log("开始时间不为空", val);
            return this.endIsEmpty();
          })
          .then(val => {
            // console.log("结束时间", val);
            if (this.accountEmpty == 0) {
              this.$alert("请输入账号", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.accountEmpty == 1 && this.startEmpty == 0) {
              this.$alert("请选择开始时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.accountEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 0
            ) {
              this.$alert("请选择结束时间", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.accountEmpty == 1 &&
              this.startEmpty == 1 &&
              this.endEmpty == 1
            ) {
              if (this.endDate < this.startDate) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("截止日期不能小于起始日期", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else if (
                new Date(this.startDate).getMonth() !=
                new Date(this.endDate).getMonth()
              ) {
                this.showTable = false;
                this.tableData = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else if (parseInt(new Date(this.startDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.endDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.startDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.endDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.startDate).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(this.endDate).getDate())>parseInt(new Date().getDate())
              ) {
                this.showTable = false;
                this.$alert("时间错误，请重新选择", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
              } else {
                this.searchButton();//查找按钮3秒内不能重复点击
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
                  this.tableData = [
                    {
                      UID: "汇总",
                      gameAccount: "--",
                      id: "--",
                      name: "--",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "110118",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    },
                    {
                      UID: "201998",
                      gameAccount: "test",
                      id: 1034,
                      name: "BOTEST",
                      score: "-748",
                      bet: "841",
                      drew: "2.6"
                    }
                  ];
                }
              }
            }
          });
      }
    },
    // 跳转到用户收益页面
    toUserIncome(uid){
      this.$router.push({ name: '用户收益统计', params: { UID: uid,startTime:this.startDate,endTime:this.endDate}});
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
      this.exportButton();//导表按钮3秒内不能重复点击，3秒后恢复
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
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  position: relative;
}
/* header */
.searchID {
  display: flex;
  margin: 0 auto;
  height: 34px;
  width: 700px;
}
.el-input {
  width: 180px;
}
.search {
  width: 700px;
  margin: 0 auto;
  margin-top: 20px;
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
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 104px;
  text-align: left;
  line-height: 32px;
}
.addChoice > p {
  width: 104px;
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
/* 下拉菜单 */
.addChoice1 {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 196px;
  text-align: left;
  line-height: 32px;
}
.addChoice1 > p {
  width: 196px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addChoice1 > p > span {
  vertical-align: top;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  line-height: 32px;
}
/* 非输入框 */
.label {
  width: 120px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
.label1 {
  width: 80px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
/* 查找按钮 */
.button {
  line-height: 0px;
  height: 34px;
  width: 58px;
  padding-left: 14px;
}
/* 表格 */
.footer {
  position: relative;
  margin:40px 20px;
}
.table {
  width: 100%;
}
.tableTr {
  background-color: #dff0d8;
}
.tableTr td {
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.tableDate td {
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}
/* 点击跳转 */
.router {
  background-color: transparent;
  font-size: 16px;
  color: #5bc0de;
  cursor: pointer;
}
.router:hover {
  background-color: transparent;
  font-size: 16px;
  color: black;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
  margin-bottom: 10px;
}
/* 分页器 */
.page {
  width: 100%;
  margin-top: 20px;
}
</style>

