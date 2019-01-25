<template>
  <div class="parent">
    <!--代理商额度报表  -->
    <!-- 输入代理ID -->
    <div class="search">
      <span class="label">代理ID</span>
      <el-input placeholder="请输入内容" v-model="searchID" @input="searchValue" clearable></el-input>
      <el-button type="primary" class="button" :disabled="searchDisable" @click="searchAgency" style="borderRadius:0" plain>查找</el-button>
      <el-button
        :disabled="nextDisable"
        type="primary"
        class="jbutton"
        @click="searchNext"
        style="borderLeft:0;borderRadius: 0 4px 4px 0;"
      >下级代理</el-button>
    </div>
    <!-- 导出列表 -->
    <div class="toexcel">
      <el-button
        :disabled="exportDisable"
        type="primary"
        @click="exportExcel"
        class="button"
        style="width:70px;position:absolute;right:50px;top:34px;"
      >导表</el-button>
    </div>
    <!-- 代理信息 -->
    <table class="table">
      <tr>
        <td class="grid-content">级别</td>
        <td class="grid-content">代理ID</td>
        <td class="grid-content">姓名</td>
        <td class="grid-content">上限额度</td>
        <td class="grid-content">下级代理总额度</td>
        <td class="grid-content">下线用户总额度</td>
        <td class="grid-content">剩余额度</td>
        <td class="grid-content">客户总数</td>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index">
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.rank}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.ID}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.name}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.max}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.allAgency}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.allUser}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.surplus}}</td>
        <td :class="item.name==userName?'jcontent':'hcontent'">{{item.customers}}</td>
      </tr>
    </table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
      // 计时器--------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchTime:3,//秒数，
      searchCount:null,//计时器
      // 查找下级
      nextDisable:false,//按钮是否禁用
      nextTime:3,//秒数，
      nextCount:null,//计时器
      // 导表
      exportDisable:false,//按钮是否禁用
      exportTime:3,//秒数，
      exportCount:null,//计时器
      // 计时器结束----------------------------------------
      searchID: 0, //要搜索的代理ID
      userName: "", //名字
      tableData: [
        {
          rank: "二级代理商",
          ID: "1034",
          name: "1",
          max: "199,000.000",
          allAgency: "111.000",
          allUser: "123,217.840",
          surplus: "89,775.360",
          customers: "3"
        },
        {
          rank: "三级代理商",
          ID: "1100",
          name: "a3",
          max: "1,000.000",
          allAgency: "0.000",
          allUser: "0.000",
          surplus: "0.000",
          customers: "0"
        }
      ],
      currentPage: 1, //当前页
      total: 100, // 总条目数
      pageSize: 10 //每页显示条目个数
    };
  },
  created() {
    // 从本地获取到info用户登录信息
    this.userName = JSON.parse(sessionStorage.getItem("info")).account;
    // console.log(this.userName);
    // 计时器--------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchTime=3;//秒数，
    this.searchCount=null;//计时器
    // 查找下级
    this.nextDisable=false;//按钮是否禁用
    this.nextTime=3;//秒数，
    this.nextCount=null;//计时器
    // 导表
    this.exportDisable=false;//按钮是否禁用
    this.exportTime=3;//秒数，
    this.exportCount=null;//计时器
    // 计时器结束----------------------------------------
    this.searchID= 0; //要搜索的代理ID
    this.userName= ""; //名字
    this.tableData= [
        {
          rank: "二级代理商",
          ID: "1034",
          name: "1",
          max: "199,000.000",
          allAgency: "111.000",
          allUser: "123,217.840",
          surplus: "89,775.360",
          customers: "3"
        },
        {
          rank: "三级代理商",
          ID: "1100",
          name: "a3",
          max: "1,000.000",
          allAgency: "0.000",
          allUser: "0.000",
          surplus: "0.000",
          customers: "0"
        }
    ];
    this.currentPage= 1; //当前页
    this.total= 100; // 总条目数
    this.pageSize= 10 //每页显示条目个数
  },
  methods: {
    // 代理ID
    searchValue() {
      let reg = /^[1-9]*$/;
      if (this.searchID.charAt(1) != 0) {
        if (reg.test(this.searchID.charAt(1))) {
          setTimeout(() => {
            this.searchID = ~~this.searchID;
          }, 0);
        } else {
          setTimeout(() => {
            this.searchID = 0;
          }, 0);
        }
      } else if (this.searchID.charAt(1) == 0 && this.searchID.charAt(0) != 0) {
        setTimeout(() => {
          this.searchID = ~~this.searchID;
        }, 0);
      } else {
        setTimeout(() => {
          this.searchID = 0;
        }, 0);
      }
    },
    // 查找按钮3秒内不能重复点击，3秒后恢复
    searchButton(){
      this.searchDisable=true;
      this.searchTime=3;
      this.searchCount=setInterval(()=>{
        this.searchTime--;
        console.log(this.searchTime);
        if (this.searchTime==0) {
          clearInterval(this.searchCount);
          this.searchDisable=false;
        }
      },1000)
    },
    //   查找代理ID
    searchAgency() {
      if (this.searchID == "" || this.searchID == 0) {
        this.$alert("请输入账号", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.searchButton()
        // 发送ajax请求数据-------------------------------------------------------------------
        let data = 1;
        if (data == 1) {
          this.tableData = [
            {
              rank: "二级代理商",
              ID: "1100",
              name: "BOTEST",
              max: "199,000.000",
              allAgency: "111.000",
              allUser: "123,217.840",
              surplus: "89,775.360",
              customers: "3"
            }
          ];
        } else {
          this.tableData = [];
          this.$alert("账号不存在", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      }
    },
    // 查找下级按钮3秒内不能重复点击，3秒后恢复
    searchNextButton(){
      this.nextDisable=true;
      this.nextTime=3;
      this.nextCount=setInterval(()=>{
        this.nextTime--;
        console.log(this.nextTime);
        if (this.nextTime==0) {
          clearInterval(this.nextCount);
          this.nextDisable=false;
        }
      },1000)
    },
    //   查找下级代理ID
    searchNext() {
      if (this.searchID == "" || this.searchID == 0) {
        this.$alert("请输入账号", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else {
        this.searchNextButton()
        // 发送ajax请求数据-------------------------------------------------------------------
        let data = 1;
        if (data == 1) {
          this.tableData = [
            {
              rank: "二级代理商",
              ID: "1034",
              name: "BOTEST",
              max: "1,000.000",
              allAgency: "0.000",
              allUser: "0.000",
              surplus: "0.000",
              customers: "0"
            }
          ];
        } else {
          this.tableData = [];
          this.$alert("账号不存在", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      }
    },
    // 导表按钮3秒内不能重复点击，3秒后恢复
    exportButton(){
      this.exportDisable=true;
      this.exportTime=3;
      this.exportCount=setInterval(()=>{
        this.exportTime--;
        console.log(this.exportTime);
        if (this.exportTime==0) {
          clearInterval(this.exportCount);
          this.exportDisable=false;
        }
      },1000)
    },
    // 导出表格所用
    exportExcel() {
      this.exportButton()//导表按钮3秒内不能重复点击，3秒后恢复
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
    // 分页器所用------------------------------
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handlePrevClick() {
      // 发送ajax请求上一页数据
    },
    handleNextClick() {
      // 发送ajax请求下一页数据
    }
    //   分页器结束--------------------------------
  },
  // 确保清除计时器
  beforeDestroy(){
    // 查找按钮的计时器
    clearInterval(this.searchCount);
    this.searchCount=null;
    // 查找下级按钮的计时器
    clearInterval(this.nextCount);
    this.nextCount=null;
    // 导表按钮的计时器
    clearInterval(this.exportCount);
    this.exportCount=null;
  }
};
</script>

<style scoped>
.parent {
  position: relative;
  margin: 10px;
}
/* 代理ID */
.search {
  display: flex;
  margin: 0 auto;
  width: 380px;
  height: 34px;
}
.label {
  width: 140px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 24px;
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
  padding: 10px;
  width:100px;
  margin-left:-2px;
  line-height: 0px;
  height: 34px;
  border-collapse: collapse;
}
/* 下级代理按钮 */
.jbutton {
  height: 34px;
  font-size: 14px;
  text-align: center;
  line-height: 0;
  background-color: #5bc0de;
  border-color: #46b8da;
  padding: 10px;
  width:180px;
  margin-left:0;
  border-left:0;
  border-radius: 0 4px 4px 0;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
  margin-bottom: 10px;
}
/* 代理信息 */
.table {
  width: 98%;
  margin: 10px;
}
.grid-content {
  min-height: 36px;
  background-color: #dff0d8;
  line-height: 36px;
  border: 1px solid #ddd;
  border-collapse: collapse;
  font-size: 16px;
  font-weight: 600;
}
.hcontent {
  min-height: 36px;
  background-color: transparent;
  line-height: 36px;
  border: 1px solid #ddd;
  border-collapse: collapse;
  font-size: 16px;
}
.jcontent {
  background-color: #f2dede;
  min-height: 36px;
  line-height: 36px;
  border: 1px solid #ddd;
  border-collapse: collapse;
  font-size: 16px;
}
</style>
