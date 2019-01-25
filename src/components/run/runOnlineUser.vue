<template> 
    <!-- 在线用户详细信息 -->
    <div class="parent">
       <!-- 搜索的范围 -->
        <div class="search">
            <el-row >
                <el-col :span="2"><div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div></el-col>
                <el-col :span="3"><el-input v-model="agencyID" style="marginRight:-1px;"  v-on:input="agencyIDTest" clearable></el-input></el-col>
                <el-col :span="3"><el-button class='jbutton' :disabled="getServerDisable" @click="getServer" style="borderRadius:0;padding:8px" type="primary">获取服务器</el-button></el-col>
                <el-col :span="3"><div  class="grid-content" style="marginLeft:-1px;borderLeft:0">选择服务器</div></el-col>
                <el-col :span="3">
                  <select v-model="serverChoice" class="addChoice">
                    <option :value="item" v-for="(item,index) in serverArr" :key="index">{{item}}</option>
                  </select>
                </el-col>
                <el-col :span="3"><div  class="grid-content">选择游戏</div></el-col>
                <el-col :span="3">
                  <select v-model="gameChoice" class="addChoice">
                    <option value="全部">全部</option>
                  </select>
                </el-col>
                <el-col :span="2"><el-button type="primary" :disabled="searchDisable" class="hbutton" style="borderRadius:0 4px 4px 0" @click="search">查找</el-button></el-col>
            </el-row>
        </div>
        <!-- 表格部分 -->
        <div class="footer" v-show="showTable">
            <!-- 导出按钮
            <div class="toexcel">
                <el-button  @click="exportExcel" type="primary" class="button" style="width:70px;position:absolute;top:0;right:30px">导出</el-button>
            </div> -->
            <!-- 表格 -->
            <div class="tableParent">
              <el-table class="table":data="tableArr" border  style="width: 100%">
                <el-table-column prop="UID" label="用户UID"></el-table-column>
                <el-table-column prop="name" label="用户昵称"></el-table-column>
                <el-table-column prop="code" label="当前分数"></el-table-column>
                <el-table-column prop="game" label="当前游戏"></el-table-column>
                <el-table-column prop="room" label="当前房间"></el-table-column>
                <el-table-column prop="id" label="代理ID"></el-table-column>
                <el-table-column prop="server" label="服务器"></el-table-column>
              </el-table>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="block"  v-show="showTable">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
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
      // 获取服务器
      getServerDisable:false,//按钮是否禁用
      getServerCount:null,//计时器
      getServerTime:3,//秒数倒计时
      // 查找
      searchDisable:false,//按钮是否禁用
      searchCount:null,//计时器
      searchTime:3,//秒数倒计时
      // 计时器结束---------------------------------------
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      tableArr: [], //表格数据
      showTable: false, //显示表格和导表按钮
      serverChoice: "", //服务器选择
      serverArr:[],//服务器数组
      serverEmpty:0,//服务器选择为空，1为非空
      gameChoice: "", //游戏选择
      gameEmpty:0,//游戏选择为空，1为非空
      currentPage: 1, //当前页
      total: 100, // 总条目数
      pageSize: 10 //每页显示条目个数
    };
  },
  created() {
    // 计时器-------------------------------------------
    // 获取服务器
    this.getServerDisable=false;//按钮是否禁用
    this.getServerCount=null;//计时器
    this.getServerTime=3;//秒数倒计时
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchCount=null;//计时器
    this.searchTime=3;//秒数倒计时
    // 计时器结束---------------------------------------
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID为空
    this.tableArr = []; //表格数据
    this.showTable = false; //显示表格和导表按钮
    this.serverChoice = ""; //服务器选择
    this.serverArr=[];//服务器数组
    this.serverEmpty = 0;//服务器选择为空，1为非空
    this.gameChoice = ""; //游戏选择
    this.gameEmpty=0;//游戏选择为空，1为非空
    this.currentPage = 1; //当前页
    this.total = 100; // 总条目数
    this.pageSize = 10; //每页显示条目个数
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
    // 游戏选择不为空
    gameIsEmpty() {
      if (this.gameChoice == null || this.gameChoice == "") {
        this.gameEmpty = 0;
      } else {
        this.gameEmpty = 1;
      }
      return Promise.resolve(this.gameEmpty);
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
    //获取服务器按钮3秒内不能重复点击，3秒后恢复
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
      this.getServerButton();//获取服务器按钮3秒内不能重复点击，3秒后恢复
      this.serverArr=['测试服','测试服1'];
    },
    // 查找结果
    search() {
      this.idIsEmpty().then(val => {
        //   console.log(val);
        return this.serverIsEmpty()
      }).then(val=>{
          return this.gameIsEmpty()
      }).then(val=>{
           // 当代理id没选择
        if (this.idEmpty == 0) {
          this.$alert("请输入代理ID", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          this.tableArr = []; //表格数据
          this.showTable = false; //显示表格和导表按钮
          // 当开始日期没选择
        } else if (this.idEmpty == 1&&this.serverEmpty==0) {
            this.$alert("请选择服务器", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          this.tableArr = []; //表格数据
          this.showTable = false; //显示表格和导表按钮
        } else if (this.idEmpty == 1&&this.serverEmpty==1&&this.gameEmpty==0) {
            this.$alert("请选择游戏", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          this.tableArr = []; //表格数据
          this.showTable = false; //显示表格和导表按钮
        }  else{
          this.searchButton();//查找按钮3秒内不能重复点击
          console.log(this.serverChoice);//选择的服务器
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
                UID: "110118", //用户UID
                name: "VBTEST", //用户昵称
                code: "44", //当前分数
                game: "牛牛", //当前游戏
                room: "1", //当前房间
                id: "1034", //代理ID
                server: "演示服" //服务器
              }
            ];
          }
        }
      });
    },
    // // 导出表格所用
    // exportExcel() {
    //   // 设置当前日期
    //   let time = new Date();
    //   let year = time.getFullYear();
    //   let month = time.getMonth() + 1;
    //   let day = time.getDate();
    //   let name = year + "" + month + "" + day;
    //   // console.log(name)
    //   /* generate workbook object from table */
    //   //  .table要导出的是哪一个表格
    //   var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
    //   /* get binary string as output */
    //   var wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array"
    //   });
    //   try {
    //     //  name+'.xlsx'表示导出的excel表格名字
    //     FileSaver.saveAs(
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       name + ".xlsx"
    //     );
    //   } catch (e) {
    //     if (typeof console !== "undefined") console.log(e, wbout);
    //   }
    //   return wbout;
    // },
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
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 34px;
  width: 88px;
  text-align: left;
  line-height: 34px;
  color: #555;
  border-right: 0;
  padding: 2px;
}
.addChoice > p {
  width: 88px;
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
