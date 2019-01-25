<template>
<!-- 代理玩家查询 -->
    <div class="parent">
        <!-- 查找方式 -->
        <div class="searchID">           
            <span class="label1">查找方式</span>
            <el-dropdown trigger="click" @command='handleFindWay' class="addChoice">
                <p class="el-dropdown-link">
                <span>
                    {{findWay}}
                </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="游戏账号">游戏账号</el-dropdown-item>
                <el-dropdown-item command="代理ID">代理ID</el-dropdown-item>
                <el-dropdown-item command="用户UID">用户UID</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span class="label" v-show='this.findWay=="游戏账号"||this.findWay=="代理ID"'>代理ID</span>
            <el-input
            v-show='this.findWay=="游戏账号"||this.findWay=="代理ID"'
                v-model="agencyID"
                @input="agencyIDValue"
                clearable>
            </el-input>
            <span v-show='this.findWay=="游戏账号"' class="label">账号</span>
            <el-input
             v-show='this.findWay=="游戏账号"'
                v-model="account"
                @input="accountValue"
                clearable>
            </el-input>
            <span v-show='this.findWay=="用户UID"' class="label">用户UID</span>
            <el-input
             v-show='this.findWay=="用户UID"'
                v-model="theUID"
                @input="theUIDValue"
                clearable>
            </el-input>
            <el-button type="primary"  class="button" :disabled="disabled" @click="searchBy1">查找</el-button>   
        </div>
        <!-- 导表 -->
        <div  class="toexcel" v-show="showTable">
          <el-button type="primary" @click="exportExcel" :disabled="disable" class="button" style="width:70px;position:absolute;right:50px;top:34px;">导表</el-button>
        </div>
        <!-- 表格 -->
        <table class="table" v-show="showTable">
          <tr>
            <td class="hcontent">代理ID</td>
            <td class="hcontent">代理姓名</td>
            <td class="hcontent">用户UID</td>
            <td class="hcontent">昵称</td>
            <td @click="surplusScore=!surplusScore" class="Jcontent">剩余分数 <img v-show="surplusScore" src="../../../static/image/icon.png" alt="" class="image"></td>
            <td @click="surplusScore=!surplusScore" class="Jcontent">最近一次进游戏时间<img v-show="!surplusScore" src="../../../static/image/icon.png" alt="" class="image"></td>
            <td class="hcontent">登录IP</td>
          </tr>
          <tr v-for="(item,index) in tableData" :key='index'>
            <td class="gcontent">{{item.ID}}</td>
            <td class="gcontent">{{item.name}}</td>
            <td class="gcontent">{{item.UID}}</td>
            <td class="gcontent">{{item.nickName}}</td>
            <td class="gcontent">{{item.surplus}} </td>
            <td class="gcontent">{{item.time}}</td>
            <td class="gcontent">{{item.IP}}</td>
          </tr>
        </table>
        <!-- 分页器 -->
        <div class="page" v-show="showTable"> 
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
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { setInterval, setTimeout, clearInterval } from 'timers';
export default {
  data() {
    return {
      oldtime:3,//导表按钮不能重复点击----时间
      disable:false,//导表按钮是否禁用
      guide:null,//导表计时器
      searchTime:3,//查找按钮不能重复点击--时间
      disabled:false,//查找按钮是否禁用
      searchGuide:null,//查找计时器
      findWay: "游戏账号", //默认查找方式
      agencyID: 1034, //代理ID
      account: 0, //账号
      theUID: 0, //用户UID
      surplusScore: false, //剩余分数是否被选中,最近一次进游戏时间是否被选中
      tableData: [],
      // 分页器
      currentPage3: 5,
      showTable: false //显示查询内容以及分页器以及导出按钮
    };
  },
  created() {
    // 发送AJAX获得数据tableData-----------------------------------------------------------------------
    this.oldtime=3;//导表按钮不能重复点击----时间
    this.disable=false;//导表按钮是否禁用
    this.guide=null;//导表计时器
    this.searchTime=3;//查找按钮不能重复点击--时间
    this.disabled=false;//查找按钮是否禁用
    this.searchGuide=null;//查找计时器
    this.findWay= "游戏账号"; //默认查找方式
    this.agencyID= 1034; //代理ID
    this.account= 0; //账号
    this.theUID= 0; //用户UID
    this.surplusScore= false; //剩余分数是否被选中;最近一次进游戏时间是否被选中
    this.tableData= [];
      // 分页器
    this.currentPage3= 5;
    this.showTable= false //显示查询内容以及分页器以及导出按钮
  },
  methods: {
    // 选择查找方式
    handleFindWay(command) {
      this.findWay = command;
    },
    // 输入的代理ID
    agencyIDValue() {
      let reg = /^[1-9]*$/;
      //如果输入第二位不等于0，分类讨论
      if (this.agencyID.charAt(1) != 0) {
        // 如果输入为数字，那么去除小数
        if (reg.test(this.agencyID.charAt(1))) {
          setTimeout(() => {
            this.agencyID = ~~this.agencyID;
          }, 0);
        }
        // 输入非数字，显示代理ID为0
        else {
          setTimeout(() => {
            this.agencyID = 0;
          }, 0);
        }
      } else if (this.agencyID.charAt(1) == 0 && this.agencyID.charAt(0) != 0) {
        //如果输入类似010开头的数字，那么去掉开头的0
        setTimeout(() => {
          this.agencyID = ~~this.agencyID;
        }, 0);
      } else {
        //输入第二位为0，显示代理ID为0
        setTimeout(() => {
          this.agencyID = 0;
        }, 0);
      }
    },
    // 输入的账号
    accountValue() {
      let reg = /^[1-9]*$/;
      if (this.account.charAt(1) != 0) {
        if (reg.test(this.account.charAt(1))) {
          setTimeout(() => {
            this.account = ~~this.account;
          }, 0);
        } else {
          setTimeout(() => {
            this.account = 0;
          }, 0);
        }
      } else if (this.account.charAt(1) == 0 && this.account.charAt(0) != 0) {
        setTimeout(() => {
          this.account = ~~this.account;
        }, 0);
      } else {
        setTimeout(() => {
          this.account = 0;
        }, 0);
      }
    },
    // 输入的UID
    theUIDValue() {
      let reg = /^[1-9]*$/;
      if (this.theUID.charAt(1) != 0) {
        if (reg.test(this.theUID.charAt(1))) {
          setTimeout(() => {
            this.theUID = ~~this.theUID;
          }, 0);
        } else {
          setTimeout(() => {
            this.theUID = 0;
          }, 0);
        }
      } else if (this.theUID.charAt(1) == 0 && this.theUID.charAt(0) != 0) {
        setTimeout(() => {
          this.theUID = ~~this.theUID;
        }, 0);
      } else {
        setTimeout(() => {
          this.theUID = 0;
        }, 0);
      }
    },
    // 查找按钮3秒内不能点击，3秒后恢复
    searchButton(){
      this.searchTime=3;
        this.disabled=true;
        this.searchGuide =setInterval(()=>{
          this.searchTime--
          // console.log(this.searchTime);
          if (this.searchTime==0) {
            clearInterval(this.searchGuide)
            this.disabled=false;
          }
        },1000)
    },
    // 根据输入内容查找
    searchBy1() {
      // console.log(this.findWay);
      switch (this.findWay) {
        // 查找方式为游戏账号
        case "游戏账号":
          if (this.agencyID != "" && this.agencyID != 0 && this.account != "") {
            // console.log(this.agencyID, this.account);
            this.searchButton()//查找按钮3秒内不能点击
            // 发送AJAX获得数据-------------------------------------------------------------------
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
                  ID: "1100",
                  name: "BOTEST",
                  UID: "201998",
                  nickName: "Z",
                  surplus: "1",
                  time: "2018-10-15",
                  IP: "180.232.100.82"
                },
                {
                  ID: "1034",
                  name: "BOTEST",
                  UID: "201998",
                  nickName: "Z",
                  surplus: "1",
                  time: "2018-10-15",
                  IP: "180.232.100.82"
                },
              ];
            }
          } else {
            this.showTable = false;
            this.$alert("请输入游戏账号", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
          break;
        // 查找方式为代理ID
        case "代理ID":
          if (this.agencyID != "" && this.agencyID != 0) {
              this.searchButton()//查找按钮3秒内不能点击
            // 发送AJAX获得数据-------------------------------------------------------------------
            // console.log(this.agencyID);
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
                  ID: "1034",
                  name: "TEST",
                  UID: "201998",
                  nickName: "Z",
                  surplus: "1",
                  time: "2018-10-15",
                  IP: "180.232.100.82"
                }
              ];
            }
          } else {
            this.showTable = false;
            this.$alert("请输入代理ID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
          break;
        // 查找方式为用户UID
        case "用户UID":
          if (this.theUID != "" && this.theUID != 0) {
              this.searchButton()//查找按钮3秒内不能点击
            // console.log(this.theUID);
            // 发送AJAX获得数据-------------------------------------------------------------------
            let data = 1;
            if (data == 0) {
              this.showTable = false;
              this.$alert("账号不存在", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              this.showTable = true;
              this.tableData = [
                {
                  ID: "1100",
                  name: "BOTEST111111",
                  UID: "201998",
                  nickName: "Z",
                  surplus: "1",
                  time: "2018-10-15",
                  IP: "180.232.100.82"
                }
              ];
            }
          } else {
            this.showTable = false;
            this.$alert("请输入用户UID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
          break;
        default:
          break;
      }
    },
    // 导表按钮3秒内不能点击
    exportButton(){
      this.oldtime=3;
      this.disable=true;
      this.guide =setInterval(()=>{
        this.oldtime--
        // console.log(this.oldtime);
        if (this.oldtime==0) {
          clearInterval(this.guide)
          this.disable=false;
        }
      },1000)
    },
    // 导出表格所用
    exportExcel() {
      // 导表按钮3秒内不能点击，3秒后恢复
      this.exportButton()
      // 设置当前日期--导出表格
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
  // 确保清除计时器
  beforeDestroy() {
    // 导表
    clearInterval(this.guide);
    this.guide=null;
    // 查找
    clearInterval(this.searchGuide);
    this.searchGuide=null;
  }
};
</script>
<style scoped>
.parent {
  position: relative;
}
/* header */
.searchID {
  display: flex;
  margin: 0 auto;
  width: 700px;
  height: 34px;
}
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 120px;
  text-align: left;
  line-height: 32px;
}
.addChoice > p {
  width: 120px;
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
/* 非输入框 */
.label {
  width: 80px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
  /* border-radius: 4px; */
  margin-right: -2px;
}
.label1 {
  width: 90px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-radius: 4px;
  margin-right: -2px;
}
/* 查找按钮 */
.button {
  margin-left: -4px;
  line-height: 0px;
  height: 34px;
  border-collapse: collapse;
}
.el-input {
  width: 120px;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
  margin-bottom: 10px;
}
/*  表格 */
.table {
  width: 98%;
  text-align: center;
  margin: 10px;
}
.hcontent {
  margin-right: -2px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  border: 1px solid #ddd;
  border-collapse: collapse;
  background-color: #dff0d8;
  min-height: 36px;
}
.gcontent {
  margin-right: -2px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  font-weight: 500;
  color: #555;
  border: 1px solid #ddd;
  border-collapse: collapse;
  background-color: transparent;
}
.Jcontent {
  color: #fff;
  background-color: #5bc0de;
  margin-right: -2px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-collapse: collapse;
}
.Jcontent:hover {
  background-color: #3fabdd;
}
.image {
  width: 20px;
  display: inline-block;
  height: 16px;
  vertical-align: middle;
}
/* 分页器 */
.page {
  width: 100%;
}
</style>

