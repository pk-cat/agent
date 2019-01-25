<template>
    <!-- 后台账号 -->
    <div class="newAgency">
        <!-- 导出按钮 -->
        <div class="toexcel">
          <el-button  @click="toexcel" type="primary" class="button" style="width:70px;position:absolute;top:0;right:30px">导表</el-button>
        </div>
        <!-- 表格 -->
        <table class="table">
          <tr>
            <td class="grid-content bg-purple">{{th[0]}}</td>
            <td class="grid-content bg-purple">{{th[1]}}</td>
            <td class="grid-content bg-purple">{{th[2]}}</td>
            <td class="grid-content bg-purple">{{th[3]}}</td>
            <td class="grid-content bg-purple">{{th[4]}}</td>
            <td class="grid-content bg-purple">{{th[5]}}</td>
            <td class="grid-content bg-purple">{{th[6]}}</td>
            <td colspan="2" class="grid-content bg-purple">{{th[7]}}</td>
          </tr>
          <tr v-for="(item,index) in tableData" :key="index">
            <td class="hcontent">{{item.backID}}</td>
            <td class="hcontent">{{item.backUID}}</td>
            <td class="hcontent">{{item.backAccount}}</td>
            <td class="hcontent">{{item.backName}}</td>
            <td class="hcontent">{{item.backTime}}</td>
            <td class="hcontent">{{item.backRemark}}</td>
            <td class="hcontent">{{item.backstatus}}</td>
            <td @click="backResetPwd(item.backAccount)" class="gcontent">{{item.backSetPwd}}</td>
            <td  @click="backBan(item.backAccount,item.backSetNum)" class="gcontent">{{item.backSetNum}}</td>
          </tr>
        </table>
    </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      // 表格数据---------------------
      th: [
        "代理ID",
        "后台UID",
        "后台账号",
        "后台姓名",
        "注册时间",
        "备注",
        "状态",
        "设置"
      ], //表头名称
      tableData: [
        {
          backID: "1034",
          backUID: "10",
          backAccount: "BOTEST1",
          backName: "TEST1",
          backTime: "2018-05-29 12:51:42",
          backRemark: "",
          backstatus: "正常",
          backSetPwd: "重置密码",
          backSetNum: "封号"
        },
        {
          backID: "1034",
          backUID: "11",
          backAccount: "BOTEST2",
          backName: "TEST2",
          backTime: "2018-05-29 14:52:42",
          backRemark: "",
          backstatus: "正常",
          backSetPwd: "重置密码",
          backSetNum: "封号"
        }
      ]
      //   表格结束----------------------------
    };
  },
  methods: {
    // 导出表格所用
    toexcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 重置密码
    backResetPwd(num) {
      // 根据账号发送ajax获取密码-------------------------------------------------------------
      const h = this.$createElement;
      this.$msgbox({
        title: "修改后台账号设置",
        message: h("div", null, [
          h("p", null, [
            h("span", null, "账号 "),
            h("i", { style: "color: teal" }, num)
          ]),
          h("p", null, [
            h("span", null, "密码 "),
            h("i", { style: "color: teal" }, 11111111)
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          this.$message({
            message: "设置成功",
            type: "success"
          });
        })
        .catch(val => {
          this.$message({
            message: "操作已取消",
            type: "warning"
          });
        });
    },
    // 封号
    backBan(num, backSetNum) {
      // console.log(num);
      let arr = this.tableData;
      const h = this.$createElement;
      this.$msgbox({
        title: "修改后台账号设置",
        message: h("div", null, [
          h("p", null, [
            h("span", null, "账号 "),
            h("i", { style: "color: teal" }, num)
          ]),
          h("p", null, [
            h("span", null, "状态 "),
            h("i", { style: "color: teal" }, backSetNum)
          ])
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          // 发送ajax修改后台的状态------------------------------------------------------
          arr.map(i => {
            if (i.backAccount == num) {
              i.backSetNum = i.backSetNum == "封号" ? "解封" : "封号";
              i.backstatus = i.backstatus == "正常" ? "封号" : "正常";
            }
          });
           this.$message({
            message: "修改成功",
            type: "success"
          });
        })
        .catch(val => {
          this.$message({
            message: "操作已取消",
            type: "warning"
          });
        });
    }
  }
};
</script>
<style scoped>
.newAgency {
  margin: 0 auto;
  width: 100%;
  margin-top: 60px;
  position: relative;
}
.a {
  background-color: #dff0d8;
}
/* 表格 */
.table {
  width: 98%;
  margin: 10px;
  text-align: center;
  line-height: 36px;
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
.bg-purple-dark {
  background: #dff0d8;
}
.bg-purple {
  background: #dff0d8;
}
.bg-purple-light {
  background: #dff0d8;
}
.grid-content {
  border: 1px solid #ddd;
  min-height: 36px;
  font-size: 16px;
  font-weight: 600;
}
.hcontent {
  background-color: transparent;
  border: 1px solid #ddd;
  font-size: 16px;
}
.gcontent {
  font-size: 16px;
  text-align: center;
  background-color: #5bc0de;
  border: 1px solid #ddd;
  color: #fff;
  cursor: pointer;
}
.gcontent:hover {
  background-color: #4eb0ce;
}
.jcontent {
  background-color: transparent;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #5bc0de;
}
.jcontent:hover {
  color: black;
  cursor: pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

