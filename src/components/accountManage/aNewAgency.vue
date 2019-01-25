<template>
    <div class="newAgency">
        <!-- 新建代理 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="2"><div class="grid-content " style="borderRadius:4px 0 0 4px;borderRight:0">账号</div></el-col>
                <el-col :span="4"><el-input v-model="account" placeholder="最多32个字符" clearable></el-input></el-col>
                <el-col :span="2"><div class="grid-content " style="borderRight:0;borderLeft:0">姓名</div></el-col>
                <el-col :span="4"><el-input v-model="name" placeholder="最多32个字符" clearable></el-input></el-col>
                <el-col :span="2"><div class="grid-content "style="borderRight:0;borderLeft:0">密码</div></el-col>
                <el-col :span="6"><el-input v-model="password" placeholder="8位小写字母或数字" clearable></el-input></el-col>
                <el-col :span="2"><div class="grid-content "style="borderRight:0;borderLeft:0">币种</div></el-col>
                <el-col :span="2"><div class="grid-content " style="borderRadius: 0 4px 4px 0;">RMB</div></el-col>
            </el-row>
        </div>
        <!-- 上限额度 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="5"><div class="grid-content " style="borderRadius:4px 0 0 4px;borderRight:0">上限额度(人民币)</div></el-col>
                <el-col :span="19"><el-input v-model="max" @input="maxTest" style="borderRadius: 0 4px 4px 0 " clearable></el-input></el-col>
            </el-row>
        </div>
        <!-- 等级备注 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="3"><div class="grid-content " style="borderRadius:4px 0 0 4px;borderRight:0">后台等级</div></el-col>
                <el-col :span="9"><div class="grid-content " style="borderRight:0;">三级代理商</div></el-col>
                <el-col :span="3"><div class="grid-content " style="borderRight:0;">备注</div></el-col>
                <el-col :span="9"><el-input v-model="remark" clearable></el-input></el-col>
            </el-row>
        </div>
        <!-- 确定按钮 -->
        <div >
            <el-button type="primary"class="button" @click='makeAgency'>确定</el-button>
        </div>

       
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      account: "", //新建代理的账号
      accountTest: 0, //账号验证
      name: "", //姓名
      nameTest: 0, //姓名验证
      password: "", //密码
      passwordTest: 0, //密码验证
      max: "0", //上限额度
      remark: "" //备注
    };
  },
  methods: {
    //   确保账号不为空
    sureAccount() {
      if (this.account == "") {
        this.accountTest = 0;
      } else {
        this.accountTest = 1;
      }
      return Promise.resolve(this.accountTest);
    },
    // 确保姓名不为空
    sureName() {
      if (this.name == "") {
        this.nameTest = 0;
      } else {
        this.nameTest = 1;
      }
      return Promise.resolve(this.nameTest);
    },
    // 确保密码不为空
    surePassword() {
      let reg = /^[a-z]{8}|[0-9]{8}$/;
      if (this.password == "" || reg.test(this.password) == false) {
        this.passwordTest = 0;
      } else {
        this.passwordTest = 1;
      }
      return Promise.resolve(this.passwordTest);
    },
    //   确定新建代理
    makeAgency() {
      // 异步处理保证输入不为空
      this.sureAccount()
        .then(val => {
          //   console.log(val);
          return this.sureName();
        })
        .then(val => {
          //   console.log(val);
          return this.surePassword();
        })
        .then(val => {
          //   console.log(val);
          let arr = [];
          arr.push(this.accountTest);
          arr.push(this.nameTest);
          arr.push(this.passwordTest);
          //   console.log(arr);
          if (arr[0] == 0) {
            this.$alert("请输入账号", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (arr[0] == 1 && arr[1] == 0) {
            this.$alert("姓名不能为空,并且不能大于32个字符", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (arr[0] == 1 && arr[1] == 1 && arr[2] == 0) {
            this.$alert("密码为8位小写字母或数字", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (arr[0] == 1 && arr[1] == 1 && arr[2] == 1) {
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("div", null, [
                h("p", null, [
                  h("span", null, "账号： "),
                  h("i", { style: "color: teal" }, this.account)
                ]),
                h("p", null, [
                  h("span", null, "姓名： "),
                  h("i", { style: "color: teal" }, this.name)
                ]),
                h("p", null, [
                  h("span", null, "密码： "),
                  h("i", { style: "color: teal" }, this.password)
                ]),
                h("p", null, [
                  h("span", null, "备注： "),
                  h("i", { style: "color: teal" }, this.remark)
                ]),
                h("p", null, [
                  h("span", null, "上限额度(人民币)： "),
                  h("i", { style: "color: teal" }, this.max)
                ])
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 600);
                } else {
                  done();
                }
              }
            })
              .then(action => {
                this.$message({
                  message: "账号创建成功",
                  type: "success"
                });
                this.account= ""; //新建代理的账号
                this.accountTest= 0, //账号验证
                this.name= ""; //姓名
                this.nameTest= 0; //姓名验证
                this.password= ""; //密码
                this.passwordTest= 0; //密码验证
                this.max= "0"; //上限额度
                this.remark= "" //备注
              })
              .catch(val => {
                this.$message({
                  message: "操作已取消",
                  type: "warning"
                });
              });
          }
        })
        .catch(val => {});
    },
    // 上限额度数字验证
    maxTest(){
      let reg = /^[1-9]*$/;
      if (this.max.charAt(1) != 0) {
        if (reg.test(this.max.charAt(1))) {
          if (typeof parseInt(this.max) == "number") {
            setTimeout(() => {
              this.max = parseInt(this.max);
            }, 0);
          } else {
            setTimeout(() => {
              this.max = ~~this.max;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.max = 0;
          }, 0);
        }
      } else if (this.max.charAt(1) == 0 && this.max.charAt(0) != 0) {
        setTimeout(() => {
          this.max = ~~this.max;
        }, 0);
      } else {
        setTimeout(() => {
          this.max = 0;
        }, 0);
      }
    }
  }
};
</script>
<style scoped>
.newAgency {
  margin: 0 auto;
  width: 700px;
  margin-top: 60px;
}
.grid-content {
  height: 32px;
  font-size: 14px;
  font-weight: normal;
  line-height: 32px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.blank {
  margin-bottom: 20px;
}
</style>
