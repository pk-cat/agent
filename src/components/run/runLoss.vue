<template>
    <!-- 盈亏报表 -->
    <div class="parent">
        <div class="search">
            <!-- 查找类型 -->
            <el-row>
                <el-col :span="2"><div class="grid-content">代理ID</div></el-col>
                <el-col :span="3"><el-input v-model="agencyID"  v-on:input="agencyIDTest" clearable></el-input></el-col>
                <el-col :span="2"><div class="grid-content"style="borderLeft:0" >北京时间从</div></el-col>
                <el-col :span="4">
                    <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp">
                    </el-date-picker>
                </el-col>
                <el-col :span="1"><div class="grid-content">至</div></el-col>
                <el-col :span="4">
                    <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp">
                    </el-date-picker>
                </el-col>
                <el-col :span="3"><div class="grid-content">收益类型选择</div></el-col>
                <el-col :span="2">
                  <!-- 收益类型选择 -->
                  <!-- <select v-model="typeChoice">
                    <option value="汇总">汇总</option>
                    <option value="所有游戏">所有游戏</option>
                    <option value="自选游戏">自选游戏</option>
                  </select> -->
                  <el-dropdown trigger="click" @command='handleCommand' class="addChoice">
                    <p class="el-dropdown-link">
                    <span>
                        {{typeChoice}}
                    </span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </p>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="汇总">汇总</el-dropdown-item>
                    <el-dropdown-item command="所有游戏">所有游戏</el-dropdown-item>
                    <el-dropdown-item command="自选游戏">自选游戏</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
                <el-col :span="1"><el-button type="primary" class="jbutton" :disabled="searchDisable" style="borderRadius:0 4px 4px 0;" @click="search">查找</el-button></el-col>
            </el-row>
            <!-- 收益类型选择为自选游戏时 -->
            <div class="typeIsGame" v-show="typeChoice=='自选游戏'">
                <div class="game" style="borderBottom:0">
                    <p>游戏类别:</p>
                    <el-checkbox-group v-model="checkType">
                        <el-checkbox label="棋牌" @change="chess"></el-checkbox>
                        <el-checkbox label="牛牛" @change="niuniu"></el-checkbox>
                        <el-checkbox label="捕鱼" @change='catchFish'></el-checkbox>
                        <el-checkbox label="百人" @change="hundred"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="game">
                    <p style="width:100px;marginRight:10px">游戏名:</p>
                    <span>
                        <el-checkbox v-model="checkList" @change='changeShowList' label="港式五张" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList' label="德州扑克" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList' label="牛牛-随机庄" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="牛牛-看牌抢庄" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="牛牛-通比" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="抢庄牛牛" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="李逵捕鱼" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="金蟾捕鱼" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="欢乐30秒" style="width:80px;marginLeft:0;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="百牛" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="龙虎" style="width:80px;"></el-checkbox>
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="奔驰宝马" style="width:80px;"></el-checkbox> 
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="飞禽走兽" style="width:80px;"></el-checkbox> 
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="炸金花" style="width:80px;"></el-checkbox> 
                        <el-checkbox v-model="checkList" @change='changeShowList'  label="二八杠" style="width:80px;"></el-checkbox>  
                    </span>
                </div>
            </div>
        </div>
        <!-- 表格部分 -->
        <div class="footer" v-show="showTable">
            <!-- 自选游戏选中的 -->
            <div class="typeChoiceSpan" >
                <span v-for="(item,index) in showList" v-show="showTable&&(typeChoice=='自选游戏')" :key="index">
                    <span>{{item}}</span><i v-show="index!=(showList.length - 1)">，</i>
                </span>
            </div>
            <!-- 导出按钮 -->
            <div class="toexcel">
                <el-button  @click="exportExcel" :disabled="exportDisable" type="primary" class="button" style="width:70px;position:absolute;top:0;right:30px">导出</el-button>
            </div>
            <!-- 表格部分 -->
            <div class="tableData">
                <table class="table">
                    <!-- 表头 -->
                    <tr class="tableTr">
                        <td>代理ID</td>
                        <td>代理名称</td>
                        <td>日期</td>
                        <td>有效投注总额</td>
                        <td>投注总额</td>
                        <td>派彩总额</td>
                        <td>入账</td>
                        <td>出账</td>
                        <td>盈利</td>
                        <td>抽水总额</td>
                        <td>投注单量</td>
                        <td>不重复用户</td>
                        <td>上分</td>
                        <td>下分</td>
                        <td>净现金流入</td>
                    </tr>
                    <!-- 内容 -->
                    <tbody>
                        <tr v-for="(item,index) in tableArr" :class="item.date.indexOf('汇总')>-1?'tableTr':''" :style="index%2==0?'':'backgroundColor: rgb(197, 217, 241)'" :key="index">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.date}}</td>
                            <td>{{item.effectiveBet}}</td>
                            <td>{{item.bet}}</td>
                            <td>{{item.payout}}</td>
                            <td>{{item.income}}</td>
                            <td>{{item.pay}}</td>
                            <td>{{item.gain}}</td>
                            <td>{{item.drew}}</td>
                            <td>{{item.oneBet}}</td>
                            <td>{{item.users}}</td>
                            <td>{{item.top}}</td>
                            <td>{{item.bottom}}</td>
                            <td>{{item.cash}}</td>
                        </tr>
                    </tbody>
                </table>
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
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      startDate: "", //开始日期
      startEmpty: 0, //开始日期是否为空0为空1表示有值
      endDate: "", //结束日期
      endEmpty: 0, //结束日期是否为空
      typeChoice: "汇总", //收益类型的选择
      typeEmpty: 0, //收益类型是否为空0为空1表示有值
      checkList: [], //收益类型为自选游戏的时候   默认选中的游戏
      showList: [], //最终选中的游戏名
      checkType: [], //最终选中的游戏类别
      chessNum: 1, //棋牌点击计算次数
      niuniuNum: 1, //牛牛点击计算次数
      catchFishNum: 1, //捕鱼点击计算次数
      hundredNum: 1, //百人点击计算次数
      tableArr: [], //表格数据
      showTable: false //显示表格和导表按钮
    };
  },
  created(){
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
    let timeNew = new Date().valueOf();//获取当前时间
    this.agencyID= 0;//代理ID
    this.idEmpty= 0;//代理ID是否为空
    this.startDate= timeNew;//开始日期
    this.startEmpty= 0;//开始日期是否为空0为空1表示有值
    this.endDate= timeNew;//结束日期
    this.endEmpty= 0;//结束日期是否为空
    this.typeChoice= "汇总";//收益类型的选择
    this.typeEmpty= 0;//收益类型是否为空0为空1表示有值
    this.checkList= [];//收益类型为自选游戏的时候   默认选中的游戏
    this.showList= [];//最终选中的游戏名
    this.checkType= [];//最终选中的游戏类别
    this.chessNum= 1;//棋牌点击计算次数
    this.niuniuNum= 1;//牛牛点击计算次数
    this.catchFishNum= 1;//捕鱼点击计算次数
    this.hundredNum= 1;//百人点击计算次数
    this.tableArr= [];//表格数据
    this.showTable= false //显示表格和导表按钮
  },
  methods: {
    // 下拉列表--服务器选择
    handleCommand(command) {
      this.typeChoice = command;
      this.checkList= [];//收益类型为自选游戏的时候   默认选中的游戏
      this.showList= [];//最终选中的游戏名
      this.checkType= [];//最终选中的游戏类别
      this.chessNum= 1;//棋牌点击计算次数
      this.niuniuNum= 1;//牛牛点击计算次数
      this.catchFishNum= 1;//捕鱼点击计算次数
      this.hundredNum= 1;//百人点击计算次数
      this.tableArr= [];//表格数据
      this.showTable= false //显示表格和导表按钮
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
    // 收益类型选择不为空
    typeIsEmpty() {
      if (this.typeChoice == "" || this.typeChoice == null) {
        this.typeEmpty = 0;
      } else {
        this.typeEmpty = 1;
      }
      return Promise.resolve(this.typeEmpty);
    },
    // 查找----------------------------------------------------发送ajax
    search() {
      //   console.log(this.checkList, this.showList, this.checkType);
      this.idIsEmpty()
        // 代理ID是否为空
        .then(val => {
          //   console.log(val);
          return this.startIsEmpty();
        })
        // 时间段是否为空
        .then(val => {
          //   console.log(val);
          return this.endIsEmpty();
        })
        // 收益类型是否为空
        .then(val => {
          //   console.log(val);
          return this.typeIsEmpty();
        })
        .then(val => {
          //   console.log(val);
          // 代理ID为空，提示输入代理ID
          if (this.idEmpty == 0) {
            this.$alert("请输入代理ID", "提示", {
              confirmButtomText: "确定",
              callback: action => {}
            });
            this.showTable = false; //隐藏表格和导表按钮
            // 时间段为空，提示输入时间段
          } else if (
            this.idEmpty == 1 &&
            (this.startEmpty == 0 || this.endEmpty == 0)
          ) {
            this.$alert("请选择时间段", "提示", {
              confirmButtomText: "确定",
              callback: action => {}
            });
            this.showTable = false; //隐藏表格和导表按钮
             //收益类型为空，提示选择收益类型
          } else if (
            this.idEmpty == 1 &&
            this.startEmpty == 1 &&
            this.endEmpty == 1 &&
            this.typeEmpty == 0
          ) {
            this.$alert("请选择收益类型", "提示", {
              confirmButtomText: "确定",
              callback: action => {}
            });
            this.showTable = false; //隐藏表格和导表按钮
          } else if (
            this.idEmpty == 1 &&
            this.startEmpty == 1 &&
            this.endEmpty == 1 &&
            this.typeEmpty == 1
          ) {
            // 自选游戏必须选择游戏才可以查找
            if (this.typeChoice=='自选游戏' &&this.showList.length==0) {
              this.$alert("请选择游戏", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
            }else{
              // 日期（不能跨月查询，截止日期不能小于起始日期，超过本月查不到数据
              if (this.endDate < this.startDate) {
                this.showTable = false;
                this.tableArr = []; //表格数据
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
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let str = new Date().getTime(); //将时间转换成毫秒
                this.startDate=str;//还原到最初的时间
                this.endDate=str;
                // 超过本月查不到数据
              } else if (parseInt(new Date(this.startDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.endDate).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(this.startDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.endDate).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(this.startDate).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(this.endDate).getDate())>parseInt(new Date().getDate())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let str = new Date().getTime(); //将时间转换成毫秒
                  this.startDate=str;//还原到最初的时间
                  this.endDate=str;
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击，3秒后恢复
                // 根据选择的收益类型发送ajax------------------------------------------------------------------------------------------------------------
                this.showTable = true; //显示表格和导表按钮
                // 所有游戏
                let arr3 = [
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-16",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  },
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-19",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  },
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "汇总",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  }
                ];
                // 汇总
                let arr2=[
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "当月汇总",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  }
                ];
                // 自选游戏
                let arr4=[
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-16",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  },
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-19",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  },
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-16",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  },
                  {
                    id: 1034,
                    name: "BOTEST",
                    date: "2018-11-19",
                    effectiveBet: "71",
                    bet: "71",
                    payout: 24,
                    income: 59,
                    pay: 12,
                    gain: 47,
                    drew: 0.6,
                    oneBet: 18,
                    users: 1,
                    top: 0,
                    bottom: 0,
                    cash: 0
                  }
                ];
                switch (this.typeChoice) {
                  case '汇总':
                    this.tableArr = arr2;
                    break;
                  case '所有游戏':
                    this.tableArr = arr3;
                    break;
                  case '自选游戏':
                    this.tableArr = arr4;
                    break;
                  default:
                    break;
                }
              }
            }
          }
        });
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
      this.exportButton();// 导表按钮3秒内不能重复点击，3秒后恢复
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
    // 收益类型--自选游戏显示的游戏类别
    // 棋牌类游戏名
    chess() {
      if (this.chessNum == 1) {
        this.checkList.push("德州扑克");
        this.checkList.push("炸金花");
        this.checkList.push("二八杠");
        this.chessNum = 2;
      } else {
        let arr = this.checkList;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == "德州扑克") {
            arr.splice(i, 1);
          }
          if (arr[i] == "炸金花") {
            arr.splice(i, 1);
          }
          if (arr[i] == "二八杠") {
            arr.splice(i, 1);
          }
        }
        this.checkList = arr;
        this.chessNum = 1;
      }
      this.changeShowList();
    },
    // 牛牛类游戏名
    niuniu() {
      // 点击一下选中，再点击删除
      if (this.niuniuNum == 1) {
        this.checkList.push("牛牛-随机庄");
        this.checkList.push("牛牛-看牌抢庄");
        this.checkList.push("牛牛-通比");
        this.checkList.push("抢庄牛牛");
        this.niuniuNum = 2; //控制选中
      } else {
        let arr = this.checkList;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == "牛牛-随机庄") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "牛牛-看牌抢庄") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "牛牛-通比") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "抢庄牛牛") {
            this.checkList.splice(i, 1);
          }
        }
        this.checkList = arr;
        this.niuniuNum = 1; //控制选中
      }
      this.changeShowList();
    },
    //捕鱼类游戏名
    catchFish() {
      if (this.catchFishNum == 1) {
        this.checkList.push("李逵捕鱼");
        this.checkList.push("金蟾捕鱼");
        this.catchFishNum = 2;
      } else {
        let arr = this.checkList;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == "李逵捕鱼") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "金蟾捕鱼") {
            this.checkList.splice(i, 1);
          }
        }
        this.checkList = arr;
        this.catchFishNum = 1;
      }
      this.changeShowList();
    },
    //百人类游戏名
    hundred() {
      if (this.hundredNum == 1) {
        this.checkList.push("欢乐30秒");
        this.checkList.push("百牛");
        this.checkList.push("龙虎");
        this.checkList.push("奔驰宝马");
        this.checkList.push("飞禽走兽");
        this.hundredNum = 2;
      } else {
        let arr = this.checkList;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == "欢乐30秒") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "百牛") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "龙虎") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "奔驰宝马") {
            this.checkList.splice(i, 1);
          }
          if (arr[i] == "飞禽走兽") {
            this.checkList.splice(i, 1);
          }
        }
        this.checkList = arr;
        this.hundredNum = 1;
      }
      this.changeShowList();
    },
    // 修改选中项
    changeShowList() {
      // console.log(this.checkList);
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(arr1[i]);
      }
      // console.log(arr)
      this.showList = arr;
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
.search {
  width: 1000px;
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
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 116px;
  text-align: left;
  line-height: 32px;
  color: #555;
}
.addChoice > p {
  width: 116px;
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
/* 收益类型选择为自选游戏 */
.typeIsGame {
  margin-top: 20px;
}
.game {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  display: flex;
  text-align: left;
}
.game p {
  width: 80px;
  font-size: 14px;
  font-weight: bold;
}
/* 表格部分 */
/* 自选游戏的查询 */
.typeChoiceSpan{
    position: absolute;
    left: 0;
    top: 15px;
    width:100%;
    color: #777;
    text-align: left;
    font-size: 16px;
}
.typeChoiceSpan span{
    display: inline-block;
}
.footer {
  margin: 20px;
  position: relative;
}
.tableData {
  margin-top: 14px;
}
.table {
  width: 100%;
}
.table thead {
  background-color: rgb(22, 54, 92);
  color: white;
}
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  background-color: transparent;
}
.tableTr {
  background-color: rgb(22, 54, 92);
  color: white;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
}
/* 查找按钮 */
.jbutton {
  height: 34px;
  font-size: 14px;
  text-align: center;
  line-height: 0;
  background-color: #5bc0de;
  border-color: #46b8da;
  border-radius: 0;
  width:100px;
  padding-left:50px;
}
</style>
