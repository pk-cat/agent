<template>
    <div class="parent">
      <!-- 直属下线代理查询 -->
        <!-- 导出按钮 -->
        <div class="toexcel">
          <el-button  @click="exportExcel" type="primary" :disabled="disable" class="button" style="width:70px;position:absolute;top:0;right:50px">导表</el-button>
        </div>
        <!-- 表格 -->
        <table class="table">
          <tr>
            <td class="grid-content">代理ID</td>
            <td class="grid-content">代理等级</td>
            <td class="grid-content">账户名称</td>
            <td class="grid-content">代理名字</td>
            <td class="grid-content">代理上限额度</td>
            <td class="grid-content">注册日期（北京）</td>
            <td class="grid-content">状态</td>
            <td class="grid-content">总玩家数量</td>
            <td class="grid-content">上级代理ID</td>
            <td class="grid-content">服务器名称</td>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index">
            <td class="hcontent">{{item.ID}}</td>
            <td class="hcontent">{{item.rank}}</td>
            <td class="hcontent">{{item.account}}</td>
            <td class="hcontent">{{item.name}}</td>
            <td class="hcontent">{{item.max}}</td>
            <td class="hcontent">{{item.time}}</td>
            <td  @click="ChangeStatus(item.ID)" class="jcontent">{{item.status}}</td>
            <td class="hcontent">{{item.num}}</td>
            <td class="hcontent">{{item.lastID}}</td>
            <td class="hcontent">{{item.server}}</td>
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
            :total="total">
            </el-pagination>
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
      // 表格数据---------------------
      tableData: [
        {
          ID: "1100",
          rank: "三级代理商",
          account: "a3",
          name: "a3",
          max: "1,000.000",
          time: "2018-10-23 01：19：22",
          status: "正常",
          num: "0",
          lastID: "1034",
          server: "演示服"
        },
        {
          ID: "1102",
          rank: "三级代理商",
          account: "a3",
          name: "a3",
          max: "1,000.000",
          time: "2018-10-23 01：19：22",
          status: "正常",
          num: "0",
          lastID: "1034",
          server: "演示服"
        },
      ],
      // 计时器------导表按钮3秒内不能重复点击
      oldtime:3,//秒数
      disable:false,//导表按钮是否禁用
      guide:null,//导表计时器
      //计时器结束-----------------------------
      //   表格结束----------------------------
      currentPage: 1, //当前页
      total: 100, // 总条目数
      pageSize: 10 //每页显示条目个数
    };
  },
  created(){
     // 表格数据---------------------
    this.tableData=[
        {
          ID: "1100",
          rank: "三级代理商",
          account: "a3",
          name: "a3",
          max: "1,000.000",
          time: "2018-10-23 01：19：22",
          status: "正常",
          num: "0",
          lastID: "1034",
          server: "演示服"
        },
        {
          ID: "1102",
          rank: "三级代理商",
          account: "a3",
          name: "a3",
          max: "1,000.000",
          time: "2018-10-23 01：19：22",
          status: "正常",
          num: "0",
          lastID: "1034",
          server: "演示服"
        },
      ];
    // 计时器------导表按钮3秒内不能重复点击
    this.oldtime=3;//秒数
    this.disable=false;//导表按钮是否禁用
    this.guide=null;//导表计时器
    //计时器结束-----------------------------
    //   表格结束----------------------------
    this.currentPage= 1; //当前页
    this.total= 100; // 总条目数
    this.pageSize= 10 //每页显示条目个数
  },
  methods: {
    // 导表按钮3秒内不能点击，3秒后恢复
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
    },
    //   分页器结束--------------------------------
    // 跳转问题
    ChangeStatus(item){
      this.$router.push({name:"直属下线代理设置",params:{ID:item}})
    }
  },
  // 确保清除计时器
  beforeDestroy(){
    clearInterval(this.guide);
    this.guide=null;
  }
};
</script>
<style scoped>
.parent{
  position: relative;
}
.a{
  background-color: #dff0d8;
}
/* 表格 */
.table {
  margin: 10px;
  text-align: center;
  line-height: 36px;
  width:98%;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
}
.button {
  position: absolute;
  right: 70px;
  top: 0;
}
.grid-content {
  border: 1px solid #ddd;
  min-height: 36px;
  font-size: 16px;
  font-weight: 600;
  background: #dff0d8;
}
.hcontent{
  background-color: transparent;
  border: 1px solid #ddd;
  font-size: 16px;
}
.jcontent{
  background-color: transparent;
  border: 1px solid #ddd;
  font-size: 16px;
  color:#5bc0de;
}
.jcontent:hover{
  color:black;
  cursor: pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

