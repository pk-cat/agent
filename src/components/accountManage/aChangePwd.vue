<template>
<!-- 改密码 -->
    <div class="newAgency">
        <div>
            <el-row :span="18">
                <el-col :span="2"><div class="content ">密码</div></el-col>
                <el-col :span="6"><el-input v-model="oldPwd" placeholder="请输入旧密码" clearable></el-input></el-col>
                <el-col :span="2"><div class="content " style="borderRight:0;borderLeft:0;marginLeft:-4px">新密码</div></el-col>
                <el-col :span="6"><el-input v-model="newPwd" placeholder="请输入新密码"clearable></el-input></el-col>
                <el-col :span="2"><el-button type="primary" class="button" style='marginLeft:-2px;' @click="surePwd">确定</el-button></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      oldPwd: "", //旧密码
      newPwd: "" //新密码
    };
  },
  methods: {
    // 确定修改密码
    surePwd() {
      let reg = /^[a-z]{8}|[0-9]{8}$/;
      if (reg.test(this.oldPwd) && reg.test(this.newPwd)) {
        const h = this.$createElement;
        this.$msgbox({
          title: "密码修改确认",
          message: h("div", null, [
            h("p", null, "新密码设置后,会返回登录界面.是否确定修改?"),
            h("p", null, [
              h("span", null, "新密码： "),
              h("i", { style: "color: teal" }, this.newPwd)
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
              }, 300);
            } else {
              done();
            }
          }
        })
          .then(action => {
            this.$router.push("/");
          })
          .catch(val => {
            this.$message({
              message: "操作已取消",
              type: "warning"
            });
          });
      } else {
        this.$alert("密码为8位小写字母或数字", "提示", {
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

</style>

