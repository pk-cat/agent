<template>
    <!-- 重置代理商密码 -->
    <div class="newAgency">
        <div  class="blank">
            <el-row >
                <el-col :span="4"><div class="content bg-purple"  style="borderRight:0;">代理ID</div></el-col>
                <el-col :span="16"><el-input v-model="resetID" @input="resetIDTest" clearable></el-input></el-col>
            </el-row>
        </div>
        <div  class="blank">
            <el-row >
                <el-col :span="4"><div class="content bg-purple"  style="borderRight:0;">新密码</div></el-col>
                <el-col :span="12"><el-input v-model="resetNew" placeholder="请输入新密码" clearable></el-input></el-col>
                <el-col :span="4"><el-button type="primary" class="button" style="borderLeft:0;marginLeft:-2px" @click="sureReset">确定</el-button></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      resetID: 0, // 代理ID
      resetNew: "" // 新密码
    };
  },
  methods: {
    //   代理ID验证
    resetIDTest() {
      let reg = /^[1-9]*$/;
      if (this.resetID.charAt(1) != 0) {
        if (reg.test(this.resetID.charAt(1))) {
          if (typeof parseInt(this.resetID) == "number") {
            setTimeout(() => {
              this.resetID = parseInt(this.resetID);
            }, 0);
          } else {
            setTimeout(() => {
              this.resetID = ~~this.resetID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.resetID = 0;
          }, 0);
        }
      } else if (this.resetID.charAt(1) == 0 && this.resetID.charAt(0) != 0) {
        setTimeout(() => {
          this.resetID = ~~this.resetID;
        }, 0);
      } else {
        setTimeout(() => {
          this.resetID = 0;
        }, 0);
      }
    },
    // 确定重置代理商密码
    sureReset() {
      let reg = /^[a-z]{8}|[0-9]{8}$/;
      if (reg.test(this.resetNew)) {
        const h = this.$createElement;
        this.$msgbox({
          title: "代理账号密码修改确认",
          message: h("div", null, [
            h("p", null, [
              h("span", null, "新密码设置后,该代理帐号请重新登入,是否确定修改?")
            ]),
            h("p", null, [
              h("span", null, "代理ID"),
              h("i", { style: "color: teal" }, this.resetID)
            ]),
            h("p", null, [
              h("span", null, "新密码"),
              h("i", { style: "color: teal" }, this.resetNew)
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(action => {
            //   发送ajax修改--------------------------------------------------------
            let data = 1;
            if (data == 0) {
              this.$message.error("账号不存在");
            } else {
              this.$message({
                message: "代理密码修改成功",
                type: "success"
              });
            }
          })
          .catch(val => {
            this.$message({
              message: "操作已取消",
              type: "warning"
            });
          });
      } else {
        this.$alert("密码为8位数字或字母", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
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
.bg-purple {
  background: #eee;
  border: 1px solid #ccc;
}
.blank {
  margin-bottom: 20px;
  width: 400px;
  margin-left: 24%;
}
.content {
  margin-right: -2px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button{
  width:70px;
}
</style>
