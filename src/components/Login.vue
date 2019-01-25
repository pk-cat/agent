<template>
    <!-- 登录 -->
    <div class="loginPage">
        <!-- 图片文字 -->
        <div>
            <img src="../../static/image/log2.png" alt="棋乐游">
        </div>
        <div class="word">
            <span class="agency">代理商管理系统</span><span class="versions">v1.5.10</span>
        </div>
        <!-- 账号密码 -->
        <div class="main">
            <div class="input">
                <span class="label">账号</span><span class="Inputbox"><el-input v-model="account" placeholder="请输入账号"></el-input></span>
            </div>
            <div class="input">
                <span class="label">密码</span><span class="Inputbox"><el-input v-model="password" placeholder="请输入密码"></el-input></span>
            </div>
            <!-- 多选框 -->
            <div class="checkBox">
                <el-radio v-model="radio" label="1">代理账号</el-radio>
                <el-radio v-model="radio" label="2">后台账号</el-radio>
            </div>
            <!-- 登录 -->
            <div>
                <el-button @click="toHome">登录</el-button>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      account: "", //账号
      password: "", //密码
      radio: "1" //选中代理账号还是后台账号
    };
  },
  methods: {
    toHome() {
      if (this.account != "" && this.password != "") {
        if (this.radio == "1") {
          if (this.account == 1 && this.password == 1) {
            console.log("代理登录");
            let info = {};
            info.account=this.account;//保存账号
            info.password=this.password;//保存密码
            info.maxLimit="19,900";//保存上限额度
            info.lastLimit="18,900";//保存剩余额度
            info.name=this.account;//保存姓名
            info.ID=1034;//保存ID
            info.level="二级代理商";//保存后台等级
            info.top="10000"; //保存上分兑换比率
            info.bottom="10000";//保存下分兑换比率
            info.currency="RMB"; //保存币种
            info.APIKEY="36C68C";//保存APIKEY
            // console.log(info)
            sessionStorage.setItem("info",JSON.stringify(info)); //保存账号的相关信息
            this.$router.push("/agencySearch");
            this.account = "";
            this.password = "";
          } else {
            this.$alert("账号名或密码错误", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.account = "";
            this.password = "";
          }
        } else if((this.radio == "2")) {
          if (this.account == 2 && this.password == 2) {
            console.log("后台登录");
            let info = {};
            info.account=this.account;//保存账号
            info.maxLimit="19,900";//保存上限额度
            info.lastLimit="18,900";//保存剩余额度
            info.name=this.account;//保存姓名
            info.ID=1034;//保存ID
            info.level="二级代理商";//保存后台等级
            info.top="10000"; //保存上分兑换比率
            info.bottom="10000";//保存下分兑换比率
            info.currency="RMB"; //保存币种
            info.APIKEY="36C68C";//保存APIKEY
            // console.log(info)
            sessionStorage.setItem("info",JSON.stringify(info)); //保存账号的相关信息
            this.$router.push("/agencySearch");
            this.account = "";
            this.password = "";
          } else {
            this.$alert("账号名或密码错误", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.account = "";
            this.password = "";
          }
        }
      } else {
        this.$alert("请输入账号和密码", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        this.account = "";
        this.password = "";
      }
    }
  }
};
</script>
<style scoped>
.loginPage {
  text-align: center;
  margin-top: 6%;
}
/* 字 */
.word {
  margin: 5px;
}
.agency {
  display: inline-block;
  margin-right: 5px;
  margin-left: 30px;
  font-size: 24px;
}
.versions {
  font-size: 14px;
  color: gray;
}
.main {
  width: 340px;
  margin: 50px auto;
}
/* 账号 */
.input {
  margin-bottom: 20px;
}
.label {
  display: inline-block;
  width: 60px;
  font-size: 14px;
  line-height: 32px;
  height: 32px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #dcdfe6;
  border-collapse: collapse;
  border-right: 0;
  vertical-align: top;
}
.Inputbox {
  display: inline-block;
  border-collapse: collapse;
  border-left: 0;
  width: 260px;
  vertical-align: top;
}
/* 多选框 */
.checkBox {
  margin-bottom: 10px;
}
</style>

