<template>
  <div>
    <!-- 新建后台账号 -->
    <div class="newAgency">
      <!-- 新建代理 -->
      <div class="blank">
        <el-row :span="24">
          <el-col :span="2">
            <div class="content bg-purple">账号</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="backAccount" placeholder="最多32个字符" clearable></el-input>
          </el-col>
          <el-col :span="2">
            <div class="content bg-purple" style="borderRight:0;borderLeft:0;marginLeft:-4px">姓名</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="backName" placeholder="最多32个字符" clearable></el-input>
          </el-col>
          <el-col :span="2">
            <div class="content bg-purple" style="borderRight:0;borderLeft:0;marginLeft:-4px">密码</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="backPassword" placeholder="8位小写字母或数字" clearable></el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 上限额度 -->
      <div class="blank">
        <el-row :span="24">
          <el-col :span="3">
            <div class="content bg-purple" style="marginRight:-2px">备注</div>
          </el-col>
          <el-col :span="21">
            <el-input v-model="backRemark" clearable></el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 添加白IP -->
      <div class="blank">
        <el-row>
          <el-col :span="3">
            <div class="content bg-purple">添加白IP</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入内容" v-model="ip1" v-on:input="searchIP1" clearable></el-input>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple">.</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入内容" v-model="ip2" v-on:input="searchIP2" clearable></el-input>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple">.</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入内容" v-model="ip3" v-on:input="searchIP3" clearable></el-input>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple">.</div>
          </el-col>
          <el-col :span="3">
            <el-input placeholder="请输入内容" v-model="ip4" v-on:input="searchIP4" clearable></el-input>
          </el-col>
          <el-col :span="1">
            <div class="grid-content bg-purple">/</div>
          </el-col>
          <el-col :span="2.8">
            <!-- 下拉菜单-绑定值用@command函数，给下拉选项中的每一项绑定一个command值，然后选中的值绑定为显示内容 -->
            <select v-model="choice" class="select1">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option selected value="32">32</option>
            </select>
            <!-- <el-dropdown trigger="click" class="bg-purple-choice" @command="handleCommand">
              <p class="el-dropdown-link">
                <span>{{choice}}</span>
                <span class="el-icon-arrow-down el-icon--right"></span>
              </p>
              下拉菜单选项
              <el-dropdown-menu slot="dropdown" class="thechoice">
                <el-dropdown-item command="8">8</el-dropdown-item>
                <el-dropdown-item command="16">16</el-dropdown-item>
                <el-dropdown-item command="24">24</el-dropdown-item>
                <el-dropdown-item command="32">32</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              class="button"
              style="marginLeft:-2px;borderLeft:0"
              @click="searchIP"
            >添加</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- ip列表--白名单 -->
    <div class="ipList" v-show="showIpList">
      <!-- 标题 -->
      <div class="headerIP">
        <h3>IP列表</h3>
      </div>
      <!-- 选择区域-->
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedIP" @change="handleCheckedIPChange">
        <el-checkbox v-for="IP in showIP" :label="IP" :key="IP">{{IP}}</el-checkbox>
      </el-checkbox-group>
      <el-button size="mini" round>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选/全不选</el-checkbox>
      </el-button>
      <el-button size="mini" round @click="handleDel">删除</el-button>
    </div>
    <!-- 选择部门 -->
    <div class="ablank">
      <p class="section">部门</p>
      <div class="secChoice">
        <el-radio-group v-model="checkboxSection">
          <el-radio :label="0" @change="manage">{{checkArr[0]}}</el-radio>
          <el-radio :label="1" @change="finance">{{checkArr[1]}}</el-radio>
          <el-radio :label="2" @change="service">{{checkArr[2]}}</el-radio>
          <el-radio :label="3" @change="maintain">{{checkArr[3]}}</el-radio>
          <el-radio :label="4" @change="run">{{checkArr[4]}}</el-radio>
        </el-radio-group>
      </div>
      <p class="choiceSecBlank">选择权限</p>
      <div class="choiceSec">
        <span>代理事物</span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="0">{{sectionArr[0]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="1">{{sectionArr[1]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="2">{{sectionArr[2]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="3">{{sectionArr[3]}}</el-checkbox>
        </span>
      </div>
      <div class="choiceSec">
        <span>财务报表</span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="4">{{sectionArr[4]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="5">{{sectionArr[5]}}</el-checkbox>
        </span>
      </div>
      <div class="choiceSec">
        <span>运营数据</span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="6">{{sectionArr[6]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="7">{{sectionArr[7]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="8">{{sectionArr[8]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="9">{{sectionArr[9]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="10">{{sectionArr[10]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="11">{{sectionArr[11]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="12">{{sectionArr[12]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="13">{{sectionArr[13]}}</el-checkbox>
        </span>
      </div>
      <div class="choiceSec">
        <span>运维工具</span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="14">{{sectionArr[14]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="15">{{sectionArr[15]}}</el-checkbox>
        </span>
        <span>
          <el-checkbox v-model="checkList" @change="changeShowList" label="16">{{sectionArr[16]}}</el-checkbox>
        </span>
      </div>
      <!-- 显示选择的权限 -->
      <p class="section">首页</p>
      <div style="margin: 15px 0;"></div>
      <el-radio-group v-model="selectRight">
        <el-radio :label="index" v-for="(item,index) in showList" :key="index">{{item}}</el-radio>
      </el-radio-group>
    </div>
    <!-- 确定按钮 -->
    <div class="sure">
      <el-button type="primary" @click="sureNew" class="button">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backAccount: "", //新建代理的账号
      accountTest: 0, //账号验证
      backName: "", //姓名
      nameTest: 0, //姓名验证
      backPassword: "", //密码
      passwordTest: 0, //密码验证
      backRemark: "0", //上限额度
      //   ip地址
      ip1: "0",
      ip1reg: false, //添加ip时的验证
      ip2: "0",
      ip2reg: false,
      ip3: "0",
      ip3reg: false,
      ip4: "0",
      ip4reg: false,
      //   选择框选中的 8、16、24、36
      choice: "32",
      // 全选ip
      checkAll: false, //控制全选按钮
      choiceIP:[], //选中的ip
      checkedIP:[], //显示选中的ip
      allIP:[], //添加的ip数组
      showIP:[], //显示的ip数组
      isIndeterminate: true, //控制样式
      showIpList: false, //控制IP列表的显示
      // 多选框
      checkList: [], //选中权限
      //展示的选中权限
      showList: [],
      showListTest: false, //确保权限不为空
      selectRight: 0, // 每一个部门只能有一个主要权限
      checkArr: ["管理", "财务", "客服", "运维", "运营"], //所有部门
      checkboxSection: [], //单选框选中了某一个部门
      // 控制选中的部门的默认权限
      manager: false, //管理员
      financial: false, //财务
      services: false, //客服
      maintains: false, //运维
      runs: false, //运营
      sectionArr: [
        "直属下线代理查询",
        "直属下线代理设置",
        "代理商额度报表",
        "代理玩家查询",
        "财务收益数据报表",
        "财务概况数据分析",
        "游戏收益统计",
        "游戏日志",
        "代理用户收益统计",
        "盈亏报表",
        "游戏概况数据分析",
        "在线用户详细信息",
        "在线实时数据",
        "24小时在线数据",
        "数据监控",
        "黑名单",
        "下注曲线"
      ], //权限数组
      indexArr: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16"
      ] //下标数组
    };
  },
  created() {
    this.backAccount = ""; //新建代理的账号
    this.accountTest = 0; //账号验证
    this.backName = ""; //姓名
    this.nameTest = 0; //姓名验证
    this.backPassword = ""; //密码
    this.passwordTest = 0; //密码验证
    this.backRemark = "0"; //上限额度
    //   ip地址
    this.ip1 = "0";
    this.ip1reg = false; //添加ip时的验证
    this.ip2 = "0";
    this.ip2reg = false;
    this.ip3 = "0";
    this.ip3reg = false;
    this.ip4 = "0";
    this.ip4reg = false;
    //   选择框选中的 8、16、24、36
    this.choice = "32";
    // 全选ip
    this.checkAll = false; //控制全选按钮
    this.choiceIP = []; //选中的ip
    this.checkedIP = []; //显示选中的ip
    this.allIP= []; //添加的ip数组
    this.showIP = []; //显示的ip数组
    this.isIndeterminate = true; //控制样式
    this.showIpList = false; //控制IP列表的显示
    // 多选框
    this.checkList = []; //选中权限
    //展示的选中权限
    this.showList = [];
    this.showListTest = 0; //权限验证
    this.selectRight = 0; // 每一个部门只能有一个主要权限
    this.checkArr = ["管理", "财务", "客服", "运维", "运营"]; //所有部门
    this.checkboxSection = []; //单选框选中了某一个部门
    // 控制选中的部门的默认权限
    this.manager = false; //管理员
    this.financial = false; //财务
    this.services = false; //客服
    this.maintains = false; //运维
    this.runs = false; //运营
    this.sectionArr = [
      "直属下线代理查询",
      "直属下线代理设置",
      "代理商额度报表",
      "代理玩家查询",
      "财务收益数据报表",
      "财务概况数据分析",
      "游戏收益统计",
      "游戏日志",
      "代理用户收益统计",
      "盈亏报表",
      "游戏概况数据分析",
      "在线用户详细信息",
      "在线实时数据",
      "24小时在线数据",
      "数据监控",
      "黑名单",
      "下注曲线"
    ]; //权限数组
    this.indexArr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
    ]; //下标数组
  },
  methods: {
    //   确保账号不为空
    sureAccount() {
      if (this.backAccount == "") {
        this.accountTest = 0;
      } else {
        this.accountTest = 1;
      }
      return Promise.resolve(this.accountTest);
    },
    // 确保姓名不为空
    sureName() {
      if (this.backName == "") {
        this.nameTest = 0;
      } else {
        this.nameTest = 1;
      }
      return Promise.resolve(this.nameTest);
    },
    // 确保密码不为空
    surePassword() {
      let reg = /^[a-z]{8}|[0-9]{8}$/;
      if (this.backPassword == "" || reg.test(this.backPassword) == false) {
        this.passwordTest = 0;
      } else {
        this.passwordTest = 1;
      }
      return Promise.resolve(this.passwordTest);
    },
    // 确保首页（选择权限）不为空
    sureIndex() {
      if (this.showList.length == 0) {
        this.showListTest = 0;
      } else {
        this.showListTest = 1;
      }
      return Promise.resolve(this.showListTest);
    },
    //   确定新建代理
    sureNew() {
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
          // console.log(val);
          return this.sureIndex();
        })
        .then(val => {
          // console.log(val);
          let arr = [];
          arr.push(this.accountTest);
          arr.push(this.nameTest);
          arr.push(this.passwordTest);
          arr.push(this.showListTest);
          // console.log(arr);
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
          } else if (arr[0] == 1 && arr[1] == 1 && arr[2] == 1 && arr[3] == 0) {
            this.$alert("请选择首页", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else if (arr[0] == 1 && arr[1] == 1 && arr[2] == 1 && arr[3] == 1) {
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("div", null, [
                h("p", null, [
                  h("span", null, "账号： "),
                  h("i", { style: "color: teal" }, this.backAccount)
                ]),
                h("p", null, [
                  h("span", null, "姓名： "),
                  h("i", { style: "color: teal" }, this.backName)
                ]),
                h("p", null, [
                  h("span", null, "密码： "),
                  h("i", { style: "color: teal" }, this.backPassword)
                ]),
                h("p", null, [
                  h("span", null, "备注： "),
                  h("i", { style: "color: teal" }, this.backRemark)
                ]),
                h("p", null, [
                  h("span", null, "白ip "),
                  h(
                    "i",
                    { style: "color: teal" },
                    this.showIP.map(i => {
                      return i + ",";
                    })
                  )
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
                this.$message({
                  message: "账号创建成功",
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
        })
        .catch(val => {});
    },
    // 添加ip
    // 正则验证IP1
    searchIP1() {
      let reg = /^[1-9]*$/;
      if (this.ip1.charAt(1) != 0) {
        if (reg.test(this.ip1.charAt(1))) {
          if (typeof parseInt(this.ip1) == "number") {
            setTimeout(() => {
              this.ip1 = parseInt(this.ip1);
              this.ip1reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip1 = ~~this.ip1;
              this.ip1reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip1 = 0;
            this.ip1reg = false;
          }, 0);
        }
      } else if (this.ip1.charAt(1) == 0 && this.ip1.charAt(0) != 0) {
        setTimeout(() => {
          this.ip1 = ~~this.ip1;
          this.ip1reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip1 = 0;
          this.ip1reg = false;
        }, 0);
      }
    },
    // 正则验证IP2
    searchIP2() {
      // let reg = /^[1-9][0-9]{0,}$/;
      // if (!reg.test(this.ip2)) {
      //   setTimeout(() => {
      //     //不符合规则，把上一次缓存起来的值重新赋给input双向绑定的变量
      //     this.ip2 = 0;
      //     this.ip2reg = false;
      //   }, 0);
      // } else if (this.ip2.length > 3) {
      //   setTimeout(() => {
      //     this.ip2 = 255;
      // this.ip2reg = false;
      //   }, 0);
      // } else {
      // this.ip2reg = true;
      // }
      let reg = /^[1-9]*$/;
      if (this.ip2.charAt(1) != 0) {
        if (reg.test(this.ip2.charAt(1))) {
          if (typeof parseInt(this.ip2) == "number") {
            setTimeout(() => {
              this.ip2 = parseInt(this.ip2);
              this.ip2reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip2 = ~~this.ip2;
              this.ip2reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip2 = 0;
            this.ip2reg = false;
          }, 0);
        }
      } else if (this.ip2.charAt(1) == 0 && this.ip2.charAt(0) != 0) {
        setTimeout(() => {
          this.ip2 = ~~this.ip2;
          this.ip2reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip2 = 0;
          this.ip2reg = false;
        }, 0);
      }
    },
    // 正则验证IP3
    searchIP3() {
      let reg = /^[1-9]*$/;
      if (this.ip3.charAt(1) != 0) {
        if (reg.test(this.ip3.charAt(1))) {
          if (typeof parseInt(this.ip3) == "number") {
            setTimeout(() => {
              this.ip3 = parseInt(this.ip3);
              this.ip3reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip3 = ~~this.ip3;
              this.ip3reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip3 = 0;
            this.ip3reg = false;
          }, 0);
        }
      } else if (this.ip3.charAt(1) == 0 && this.ip3.charAt(0) != 0) {
        setTimeout(() => {
          this.ip3 = ~~this.ip3;
          this.ip3reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip3 = 0;
          this.ip3reg = false;
        }, 0);
      }
    },
    // 正则验证IP4
    searchIP4() {
      let reg = /^[1-9]*$/;
      if (this.ip4.charAt(1) != 0) {
        if (reg.test(this.ip4.charAt(1))) {
          if (typeof parseInt(this.ip4) == "number") {
            setTimeout(() => {
              this.ip4 = parseInt(this.ip4);
              this.ip4reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip4 = ~~this.ip4;
              this.ip4reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip4 = 0;
            this.ip4reg = false;
          }, 0);
        }
      } else if (this.ip4.charAt(1) == 0 && this.ip4.charAt(0) != 0) {
        setTimeout(() => {
          this.ip4 = ~~this.ip4;
          this.ip4reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip4 = 0;
          this.ip4reg = false;
        }, 0);
      }
    },
    // // 选中的值8、16、24、36
    // handleCommand(command) {
    //   this.choice = command;
    // },
    // 将ip改成固定格式0.0.0.0/32
    changeIP(arr) {
      let arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        str =
          str.ip1 +
          "." +
          str.ip2 +
          "." +
          str.ip3 +
          "." +
          str.ip4 +
          "/" +
          str.port;
        arr1.push(str);
      }
      return arr1;
    },
    // 添加ip
    searchIP() {
      // if (
      //   this.ip1reg == false ||
      //   this.ip2reg == false ||
      //   this.ip3reg == false ||
      //   this.ip4reg == false
      // ) {
      //   this.$alert("请输入正确的ip", "提示", {
      //     confirmButtonText: "确定",
      //     callback: action => {
      //       // this.$message("无效操作");
      //     }
      //   });
      // } else {
      // 确认是否添加
      this.$confirm("确认添加?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      // 确认添加
        .then(() => {
          let ipStr =
            this.ip1 +
            "" +
            this.ip2 +
            "" +
            this.ip3 +
            "" +
            this.ip4 +
            "" +
            this.choice +
            "";
          // console.log(ipStr);//输入的ip
          let ipArr = this.allIP; //获取到当前ip数组
          //新数组（如果输入的IP已经存在于ip数组,把重复的拿出来)--将IP中的./等符号去掉，判断数字如果全等于，那么就是重复的-------------------------------------
          let newarr = [];
          for (let i = 0; i < ipArr.length; i++) {
            newarr.push(
              ipArr[i].ip1 +
                "" +
                ipArr[i].ip2 +
                "" +
                ipArr[i].ip3 +
                "" +
                ipArr[i].ip4 +
                "" +
                ipArr[i].port +
                ""
            );
          }
          // 如果新数组有0.0.0.0那么提示，已设置0.0.0.0,任何IP都不受限制
          let reg=/0{4}/;
          for (let i = 0; i < newarr.length; i++) {
            if (reg.test(newarr[i])==true) {
              this.$alert("已设置0.0.0.0,任何IP都不受限制", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
              });
              return
            }
          }
          newarr = newarr.filter(item => {
            return item === ipStr;
          });
          // 新数组结束--------------------------------------------------------------------------------------
          // 判断输入的iP是否重复，如果重复，提示，否则加入新的Ip
          if (newarr.length == 0 || ipArr.length == 0) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            // 数组里面加入这个ip
            ipArr.push({
              ip1: this.ip1,
              ip2: this.ip2,
              ip3: this.ip3,
              ip4: this.ip4,
              port: this.choice
            });
            // console.log(ipArr, this.changeIP(ipArr));
            this.showIpList = true; //控制IP列表的显示
            let reg = /0{4}/;
            if (reg.test(ipStr)==true) {
              this.showIP.push(this.ip1+'.'+this.ip2+'.'+this.ip3+'.'+this.ip4)
            }else{
              this.showIP=this.changeIP(ipArr);//显示处理过后的ip
            }
            // console.log(this.allIP);
            // 还原到初始值------------------------------------------------
            this.ip1 = 0;
            this.ip2 = 0;
            this.ip3 = 0;
            this.ip4 = 0;
            this.choice = 32;
            // 还原到初始值结束---------------------------------------------
          } else {
            this.$alert("IP已在白名单中", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(() => {
          this.showIpList = false; //隐藏ip列表
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      // }
    },
    //ip多选框---------------------------------------------------------------
    // 全选
    handleCheckAllChange(val) {
      // console.log(val,this.showIP,this.allIP);
      this.checkedIP = val ? this.showIP : []; //表示选中的0.0.0.0/32
      this.isIndeterminate = false;//全选按钮样式,全部选中会显示√
      this.choiceIP = val ? this.allIP : [];//表示选中的ip1:xx,ip2:xx..
      // console.log(this.choiceIP)
    },
    // 选中某一项
    handleCheckedIPChange(value) {
      // console.log(value);//value表示被选中的0.0.0.0/32
      this.checkedIP = value;//被选中的0.0.0.0/32
      // 方法1：新建一个空数组，存放选中的下标0.0.0.0/32------------------------
      let arr = [];
      let arr1 = this.showIP;
      for (let i = 0; i < arr1.length; i++) {
        if (value.indexOf(arr1[i])>-1) {
          arr.push(i);//选中的下标
        }
      }
      // 方法1结束------------------------------------------------------------
      // 方法2：从全部的真实ip中找到选中的ip1:xx,ip2:xx-------------------------
      let array=this.allIP;
      let newArr=[]
      for (let i = 0; i < array.length; i++) {
        if (arr.indexOf(i)>-1) {
          newArr.push(array[i])
        }
      }
      this.choiceIP=newArr;
      // console.log(this.choiceIP);//表示选中的ip1:xx,ip2:xx..
      // 方法2结束-------------------------------------------------------------
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.showIP.length;
      // 控制全选按钮的样式
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.showIP.length;
    },
    // 删除选中项
    handleDel() {
      let arr = this.checkedIP; //显示的选中项0.0.0.0/32
      if (arr.length == 0) {
        this.$alert("请选择你要删除的ip", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
      // 方法：新建一个空数组，存放全部IP中尚未被选中的项     0.0.0.0/32------------------------------------------------------
      let array = this.showIP; //全部IP0.0.0.0/32
      let newArr = []; //空数组
      // console.log( arr,array)
      for (let i = 0; i < array.length; i++) {
        if (arr.indexOf(array[i]) == -1) {
          newArr.push(array[i]);
        }
      }
      // 方法结束----------------------------------------------------------------------------------------------------------
      this.showIP = newArr;//显示未选中的项0.0.0.0/32
      // 方法1：新建一个空数组，存放全部IP中尚未被选中的项     ip1:xx,ip2:xx,ip3:xx------------------------------------------------------
      let arr1 = this.choiceIP; //选中项ip1:xx,ip2:xx..
      let allIPArr=this.allIP;//全部IPip1:xx,ip2:xx..
      let newArr1 = []; //空数组
      // console.log( arr,array)
      for (let i = 0; i < allIPArr.length; i++) {
        if (arr1.indexOf(allIPArr[i]) == -1) {
          newArr1.push(allIPArr[i]);
        }
      }
      this.allIP=newArr1;//未选中的项ip1:xx,ip2:xx..
      // 方法1结束----------------------------------------------------------------------------------------------------------
      // 如果全部删除了，那么ip列表为空
      if (this.showIP.length == 0) {
        this.checkAll = false; //控制全选按钮
        this.choiceIP = []; //选中的ip
        this.checkedIP = []; //显示选中的ip
        this.allIP= []; //添加的ip数组
        this.showIP = []; //显示的ip数组
        this.isIndeterminate = true; //控制样式
        this.showIpList = false; //控制IP列表的显示
        //发送ajax修改ip数组-----------------------------------------------------------------
      }
      // console.log(this.allIP);
    },
    //ip多选框结束---------------------------------------------------------------
    // 默认权限--管理员
    manage() {
      // 管理员默认权限包括所有
      this.checkList = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16"
      ];
      let str = this.selectRight; //主要权限为直属下线代理查询
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
        if (this.sectionArr[arr1[i]] == "直属下线代理查询") {
          str = i; //主要权限
        }
      }
      this.selectRight = str; //主要权限
      this.showList = arr; //显示出默认权限
    },
    // 默认权限--财务
    finance() {
      this.checkList = ["0", "1", "2", "4", "5", "9"]; //财务默认权限包括sectionArr中的对应checkList中的这些下标
      let str = this.selectRight; //主要权限
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
        if (this.sectionArr[arr1[i]] == "财务收益数据报表") {
          str = i; //主要权限
        }
      }
      this.selectRight = str; //主要权限
      this.showList = arr; //显示出默认权限
    },
    // 默认权限--客服
    service() {
      this.checkList = ["6", "7"]; //客服默认权限包括sectionArr中的对应checkList中的这些下标
      let str = this.selectRight; //主要权限
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
        if (this.sectionArr[arr1[i]] == "游戏收益统计") {
          str = i; //主要权限
        }
      }
      // console.log(arr)
      this.selectRight = str; //主要权限
      this.showList = arr; //显示出默认权限
    },
    // 默认权限--运维
    maintain() {
      this.checkList = ["3", "11", "12", "13", "14", "15", "16"]; //运维默认权限包括sectionArr中的对应checkList中的这些下标
      let str = this.selectRight; //主要权限
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
        if (this.sectionArr[arr1[i]] == "在线用户详细信息") {
          str = i; //主要权限
        }
      }
      // console.log(arr)
      this.selectRight = str; //主要权限
      this.showList = arr; //显示出默认权限
    },
    // 默认权限--运营
    run() {
      this.checkList = [
        "0",
        "1",
        "2",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ]; //运营默认权限包括sectionArr中的对应checkList中的这些下标
      let str = this.selectRight; //主要权限
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
        if (this.sectionArr[arr1[i]] == "直属下线代理设置") {
          str = i; //主要权限
        }
      }
      // console.log(arr)
      this.selectRight = str; //主要权限
      this.showList = arr; //显示出默认权限
    },
    // 修改权限选中项
    changeShowList() {
      // console.log(this.checkList);
      let arr = [];
      let arr1 = this.checkList;
      for (let i = 0; i < arr1.length; i++) {
        arr.push(this.sectionArr[arr1[i]]);
      }
      // console.log(arr)
      this.showList = arr;
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
.blank {
  margin-bottom: 20px;
}
.ablank {
  margin-top: 20px;
}
/* 添加ip */
.addIP {
  max-width: 700px;
  margin: 10px auto;
  margin-top: 30px;
  height: 34px;
}
.el-row:not(:last-child) {
  /* margin-bottom: 20px; */
}
.el-col {
  /* border-radius: 4px; */
}
.grid-content[data-v-1bf25fbd] {
  border-radius: 0;
  border-collapse: collapse;
}
.bg-purple-dark {
  background: #eee;
  border: 1px solid #ccc;
}
.bg-purple {
  background: #eee;
  border: 1px solid #ccc;
}
.bg-purple-light {
  background: #fff;
  border: 1px solid #ccc;
}
.grid-content {
  /* border-radius: 4px; */
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 20px;
  font-weight: normal;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple-choice {
  background: #fff;
  border: 1px solid #ccc;
  border-left: 1px solid #dcdfe6;
  min-height: 32px;
  width: 80px;
  text-align: left;
  line-height: 32px;
}
.bg-purple-choice > p {
  width: 80px;
  height: 32px;
  display: flex;
  justify-content: space-around;
}
.bg-purple-choice > p > span {
  vertical-align: top;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  line-height: 32px;
}
.thechoice {
  text-align: left;
  min-width: 80px;
}
/* 白名单IP列表 */
.headerIP {
  width: 100%;
  font-size: 18px;
  margin-top: 10px;
  font-weight: 500;
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ipList {
  margin-top: 24px;
}
/* 选择部门 */
.section {
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  margin: 10px 0;
  margin-top: 10px;
}
.secChoice {
  height: 30px;
  margin: 5px 0;
  margin-bottom: 24px;
  line-height: 30px;
  text-align: center;
}
/* 选择权限 */
.choiceSecBlank {
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  margin: 10px 0;
  margin-top: 10px;
}
.choiceSec {
  width: 100%;
  height: 41px;
  line-height: 32px;
  padding: 4px 0;
  font-size: 14px;
  text-align: left;
  border-top: 1px solid #d4d4d4;
}
.choiceSec span:not(:first-child) {
  display: inline-block;
  width: 11%;
}
.choiceSec span:first-child {
  font-size: 14px;
  font-weight: 600;
}
/* 确定按钮 */
.sure {
  margin: 16px;
}
/* 添加按钮 */
.button {
  color: #fff;
  font-size: 14px;
  width: 68px;
}
/* 下拉框选择IP8，16，24，32 */
.select1 {
  border: 1px solid #ccc;
  width: 80px;
  height: 34px;
  color: #555;
}
</style>
