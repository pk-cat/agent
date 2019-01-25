<template>
  <!-- 用户收益统计 -->
  <div>
    <!-- 查询条件 -->
    <div class="search">
      <el-row :span="24">
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:4px 0 0 4px">用户UID</div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="UID" v-on:input="uidTest" clearable></el-input>
        </el-col>
        <el-col :span="3">
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
          <el-button type="primary" class="button" @click="search">查找</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格部分 -->
    <div class="footer" v-show="showTable">
      <!-- 导出按钮 -->
      <div class="toexcel">
        <el-button
          @click="exportExcel"
          type="primary"
          class="button"
          style="width:70px;position:absolute;top:0;right:30px"
        >导出</el-button>
      </div>
      <!-- 表格 -->
      <div class="tableParent">
        <el-table class="table" :data="tableArr" border style="width: 100%">
          <el-table-column prop="uid" label="用户UID"></el-table-column>
          <el-table-column prop="id" label="代理ID"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="score" label="用户输赢(分数)"></el-table-column>
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
      startDate: "", //开始日期
      startEmpty: 0, //开始日期是否为空0为空1表示有值
      endDate: "", //结束日期
      endEmpty: 0, //结束日期是否为空
      UID: 0, //代理ID
      uidEmpty: 0, //代理ID是否为空
      tableArr: [], //表格数据
      showTable: false //显示表格和导表按钮
    };
  },
  created() {
    let uid = this.$route.params.UID; //传递过来的用户UID（runUser)
    let startT = this.$route.params.startTime; //传递过来的日期（runUser)
    let endT = this.$route.params.endTime; //传递过来的日期（runUser)
    if (typeof uid == "string") {
      // 发送ajax获取数据
      setTimeout(() => {
        this.UID = uid;
        this.showTable = true;
        this.tableArr = [
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "港式五张-体验", //类型
            score: "-800" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "德扑游戏场1", //类型
            score: "-10" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "德扑游戏场5", //类型
            score: "-8" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "牛牛体验场", //类型
            score: "-20" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "李逵百炮场", //类型
            score: "-20" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "飞禽走兽-平民", //类型
            score: "-30" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "炸金花-体验", //类型
            score: "-30" //用户输赢(分数)
          },
          {
            uid: uid, //用户UID
            id: "1034", //代理ID
            type: "二八杠-体验", //类型
            score: "-45" //用户输赢(分数)
          }
        ];
      }, 300);
    } else {
      this.showTable = false;
      this.tableArr = [];
    }
    // let str = new Date().getTime();
    // let str1 =
    // new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + 1;
    // let startTime = new Date(str1).getTime();
    this.startDate = startT; //开始日期
    this.startEmpty = 0; //开始日期为空 0为空1表示有值
    this.endDate = endT; //结束日期
    this.endEmpty = 0; //结束日期为空
    this.UID = uid == "undefined" ? 0 : uid; //用户UID
    this.uidEmpty = 0; //用户UID
    this.tableArr = []; //表格数据
    this.showTable = false; //显示表格和导表按钮
  },
  methods: {
    //   代理ID验证
    uidTest() {
      let reg = /^[1-9]*$/;
      let str = this.UID;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.UID = parseInt(this.UID);
            }, 0);
          } else {
            setTimeout(() => {
              this.UID = ~~this.UID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.UID = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.UID = ~~this.UID;
        }, 0);
      } else {
        setTimeout(() => {
          this.UID = 0;
        }, 0);
      }
    },
    // 代理ID不为空
    uidIsEmpty() {
      if (this.UID == 0 || this.UID == "") {
        this.uidEmpty = 0;
      } else {
        this.uidEmpty = 1;
      }
      return Promise.resolve(this.uidEmpty);
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
    // 查找结果
    search() {
      this.uidIsEmpty()
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
          //   console.log(this.uidEmpty, this.startEmpty,this.endDate,this.startDate, this.endEmpty);
          // 当代理id没选择
          if (this.uidEmpty == 0) {
            this.$alert("请输入用户UID", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
            // 当开始日期没选择
          } else if (this.uidEmpty == 1 && this.startEmpty == 0) {
            this.$alert("请选择开始日期", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.tableArr = []; //表格数据
            this.showTable = false; //显示表格和导表按钮
            // 当结束日期没选择
          } else if (
            this.uidEmpty == 1 &&
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
            this.uidEmpty == 1 &&
            this.startEmpty == 1 &&
            this.endEmpty == 1
          ) {
            // 日期限制：截止日期不能大于开始日期，不支持跨月查询，截止日期不能超过今年今月今日
            //   console.log(this.endDate,this.startDate,typeof new Date(this.startDate), typeof new Date(this.endDate));
            if (this.endDate < this.startDate) {
              this.showTable = false;
              this.tableArr = []; //表格数据
              this.$alert("截止日期不能小于起始日期", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let str = new Date().getTime(); //将时间转换成毫秒
              this.startDate = str; //还原到最初的时间
              this.endDate = str;
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
              this.startDate = str; //还原到最初的时间
              this.endDate = str;
            } else if (
              parseInt(new Date(this.startDate).getMonth()) >
                parseInt(new Date().getMonth()) ||
              parseInt(new Date(this.endDate).getMonth()) >
                parseInt(new Date().getMonth())||
              parseInt(new Date(this.startDate).getFullYear()) >
                parseInt(new Date().getFullYear()) ||
              parseInt(new Date(this.endDate).getFullYear()) >
                parseInt(new Date().getFullYear())||
              parseInt(new Date(this.startDate).getDate()) >
                parseInt(new Date().getDate()) ||
              parseInt(new Date(this.endDate).getDate()) >
                parseInt(new Date().getDate())
            ) {
              this.showTable = false; //隐藏数据框以及导表按钮
              this.tableArr = [];
              this.$alert("时间错误，请重新选择", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
              let str = new Date().getTime(); //将时间转换成毫秒
              this.startDate = str; //还原到最初的时间
              this.endDate = str;
            } else {
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
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "港式五张-体验", //类型
                    score: "-800" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "德扑游戏场1", //类型
                    score: "-10" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "德扑游戏场5", //类型
                    score: "-8" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "牛牛体验场", //类型
                    score: "-20" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "李逵百炮场", //类型
                    score: "-20" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "飞禽走兽-平民", //类型
                    score: "-30" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "炸金花-体验", //类型
                    score: "-30" //用户输赢(分数)
                  },
                  {
                    uid: "110118", //用户UID
                    id: "1034", //代理ID
                    type: "二八杠-体验", //类型
                    score: "-45" //用户输赢(分数)
                  }
                ];
              }
            }
          }
        });
    },
    // 导出表格所用
    exportExcel() {
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
  }
};
</script>
<style scoped>
/* 查询条件 */
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
.table {
  font-size: 16px;
}
</style>
