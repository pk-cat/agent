<template>
    <div>
      <!-- 直属下线代理设置 -->
        <!-- 搜索代理ID -->
        <div class="searchID">
            <span class="label">
                代理ID    
            </span>
            <el-input
            placeholder="默认账号1100，1102"
            v-model="searcher"
            v-on:input="searchValue"
            clearable>
            </el-input>
            <el-button type="primary" class="button" :disabled="searchDisable" @click="searchID">查找</el-button>
        </div>
        <!-- 搜索结果-代理账号的信息 -->
        <div class="searchResult" v-show="showResult">
          <el-row class="elrow" :span="24">
            <el-col :span="3"><div class="hcontent bg-purple">代理ID</div></el-col>
            <el-col :span="9"><div class="hcontent bg-purple">代理上限额度</div></el-col>
            <el-col :span="9"><div class="hcontent bg-purple">代理剩余额度</div></el-col>
            <el-col :span="3"><div class="hcontent bg-purple">状态</div></el-col>
          </el-row>
            <el-row :span="24">
              <el-col :span="3"><div class="gcontent bg-purple">{{showArr.ID}}</div></el-col>
              <el-col :span="4">
                <div class="jcontent bg-purple">
                  <p class="close">{{showArr.max}}</p>
                  <!-- 修改代理上限额度 -->
                  <select v-model="addMax" class="select">
                    <option selected value="增加">增加</option>
                    <option value="减少">减少</option>
                  </select>
                </div>
              </el-col>
              <el-col :span="2"><div class="gcontent bg-purple">修改数量</div></el-col>
              <el-col :span="3">
                <!-- 修改代理上限额度 -->
                <div class="jcontent bg-purple-light">
                  <el-input v-model="addNum" clearable maxlength='22' placeholder="请输入内容" @input="searchMax"></el-input>
                  <el-button type="primary" class="jbutton" :disabled="maxDisable" @click="changeMax">修改</el-button>
                </div>
              </el-col>
              <el-col :span="4"><div class="jcontent bg-purple">
                  <p class="close">{{showArr.remain}}</p>
                  <!-- 修改代理剩余额度 -->
                  <select v-model="addRemain" class="select">
                    <option selected value="增加">增加</option>
                    <option value="减少">减少</option>
                  </select>
                </div>
              </el-col>
              <el-col :span="2"><div class="gcontent bg-purple">修改数量</div></el-col>
              <el-col :span="3">
                <!-- 修改代理剩余额度 -->
                 <div class="jcontent bg-purple-light">
                  <el-input v-model="addRemainNum" clearable maxlength='22' placeholder="请输入内容"  @input="searchRemain"></el-input>
                  <el-button type="primary" class="jbutton" :disabled="remainDisable" @click="changeRemain">修改</el-button>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="jcontent bg-purple">
                  <p class="close"> {{showArr.status}}</p>
                  <el-button type="primary" class="jbutton" @click="ban">{{showBan}}</el-button>
                </div>
              </el-col>
            </el-row>
        </div>
        <!-- 添加ip-->
        <div class="addIP">
            <el-row>
              <el-col :span="3"><div class="content bg-purple">添加白IP</div></el-col>
              <el-col :span="3"><el-input
              placeholder="请输入内容"
              v-model="ip1"
              v-on:input="searchIP1"
              clearable>
              </el-input></el-col>
              <el-col :span="1"><div class="grid-content bg-purple">.</div></el-col>
              <el-col :span="3"><el-input
              placeholder="请输入内容"
              v-model="ip2"
              v-on:input="searchIP2"
              clearable>
              </el-input></el-col>
              <el-col :span="1"><div class="grid-content bg-purple">.</div></el-col>
              <el-col :span="3"><el-input
              placeholder="请输入内容"
              v-model="ip3"
              v-on:input="searchIP3"
              clearable>
              </el-input></el-col>
              <el-col :span="1"><div class="grid-content bg-purple">.</div></el-col>
              <el-col :span="3"><el-input
              placeholder="请输入内容"
              v-model="ip4"
              v-on:input="searchIP4"
              clearable>
              </el-input></el-col>
              <el-col :span="1"><div class="grid-content bg-purple">/</div></el-col>
              <el-col :span="2.8">
                  <!-- 下拉菜单-绑定值用@command函数，给下拉选项中的每一项绑定一个command值，然后选中的值绑定为显示内容 -->
                  <select v-model="choice" class="select1">
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option selected value="32">32</option>
                  </select>
              </el-col>
              <el-col :span="2"><el-button type="primary" class="jbutton" @click="searchIP" style="borderRadius:0 4px 4px 0;marginLeft:0;">添加</el-button></el-col>
            </el-row>
            
        </div>
        <!-- ip列表--白名单 -->
        <div class="ipList" v-show="showIpList">
          <!-- 标题 -->
          <div class="headerIP">
            <h3>IP列表</h3>
          </div>
          <!-- 选择区域--后台已经有的白名单 -->
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedIP" @change="handleCheckedIPChange">
            <el-checkbox v-for="(IP,index) in showIP" :label="IP" :key="index">{{IP}}</el-checkbox>
          </el-checkbox-group>
          <el-button size="mini" round>
            <el-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckAllChange">全选/全不选</el-checkbox>
          </el-button>
          <el-button size="mini" round @click="handleDel">删除</el-button>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { setInterval, clearInterval } from 'timers';
export default {
  data() {
    return {
      // 计时器----------------------------------------------------
      //查找按钮
      searchDisable:false,//按钮是否禁用
      searchTime:3,//秒数
      searchCount:null,//计时器
      // 修改上限额度
      maxDisable:false,//按钮是否禁用
      maxTime:3,//秒数
      maxCount:null,//计时器
      // 修改剩余额度
      remainDisable:false,//按钮是否禁用
      remainTime:3,//秒数
      remainCount:null,//计时器
      // 计时器结束------------------------------------------------
      searcher: "0", //代理ID
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
      // 代理信息数据
      agency: [
        {
          ID: "1100",
          max: "3000",
          remain: "2000",
          status: "正常",
          ip: [{ip1:1,ip2:1,ip3:1,ip4:1,port:16}, {ip1:2,ip2:0,ip3:0,ip4:0,port:8}]
        },
        {
          ID: "1102",
          max: "2000",
          remain: "1000",
          status: "正常",
          ip: [{ip1:3,ip2:0,ip3:0,ip4:0,port:16}, {ip1:4,ip2:0,ip3:0,ip4:0,port:16}]
        }
      ], 
      showArr: [], //要显示的账号信息
      agencyTh: ["代理ID", "代理上限额度", "代理剩余额度", "状态"], //代理的账号信息-表头
      addMax: "增加", //修改上限额度-增加还是减少
      addNum: 0, // 修改上限额度-数量
      addRemain: "增加", //修改剩余额度-增加还是减少
      addRemainNum: 0, // 修改剩余额度-数量,
      showNum: 0, //显示的修改上限额度的数量
      showRemainNum: 0, //显示的修改剩余额度的数量
      showBan: "封号",
      showResult: false, //显示搜索结果
      // 全选ip
      checkAll: false, //控制全选按钮
      checkedIP: [], //默认选中的ip 0.0.0.0/32
      showIP: [], //显示的IP 0.0.0.0/32
      isIndeterminate: true, //控制样式
      choiceIP: [], //选中的ip 0.0.0.0/32
      trueIP:[],//IP数据--真实存的ip1:xx,ip2:xx...
      showIpList: false //控制IP列表的显示
    };
  },
  created() {
    // 计时器----------------------------------------------------
      //查找按钮
    this.searchDisable=false;//按钮是否禁用
    this.searchTime=3;//秒数
    this.searchCount=null;//计时器
      // 修改上限额度
    this.maxDisable=false;//按钮是否禁用
    this.maxTime=3;//秒数
    this.maxCount=null;//计时器
      // 修改剩余额度
    this.remainDisable=false;//按钮是否禁用
    this.remainTime=3;//秒数
    this.remainCount=null;//计时器
      // 计时器结束------------------------------------------------
    this.showResult = false; //显示搜索结果
    this.showIpList = false; //控制IP列表的显示
    let array =this.agency ;//代理信息
    (this.ip1reg = false), //添加ip时的验证
      (this.ip2reg = false), //添加ip时的验证
      (this.ip3reg = false), //添加ip时的验证
      (this.ip3reg = false); //添加ip时的验证
    this.showBan = "封号"; //默认正常状态
    this.addMax = "增加"; //修改上限额度-增加还是减少
    this.addRemain = "增加"; //修改剩余额度-增加还是减少
    let ID = this.$route.params.ID; //点击直属下线代理查询中的状态，跳转到本页面，传递ID
    let arr = array;
    arr = arr.filter(item => {
      return item.ID == ID;
    }); //账号信息-------判断有无跳转，如果没跳转，ID=='undefined'
    if (typeof ID == "string") {
      this.searcher=ID;//代理ID等于传过来的ID
      this.showArr = arr[0]; //显示点击直属下线代理查询中的状态，跳转到本页面，对应ID的代理信息\
      this.trueIP=this.showArr.ip;//IP数据--真实存的ip1:xx,ip2:xx...
      let arr22 = arr[0].ip;
      let arr3=this.changeIP(arr22);//显示的IP
      this.showIP=arr3;//显示的IP
      this.checkedIP.push(arr3[0]); //默认选中的ip
      this.choiceIP.push(arr3[0]); //选中的ip
      this.showResult = true; //如果有ID那么显示搜索结果
      this.showIpList = true; //控制IP列表的显示
    } else {
      this.showArr = array[0]; //显示点击直属下线代理查询中的状态，跳转到本页面，对应ID的代理信息
      this.trueIP=this.showArr.ip;//IP数据--真实存的ip1:xx,ip2:xx...
      let arr22 = array[0].ip;
      let arr3=this.changeIP(arr22);//显示的IP
      this.showIP=arr3;//显示的IP
      this.checkedIP.push(arr3[0]); //默认选中的ip
      this.choiceIP.push(arr3[0]); //选中的ip
      this.showResult = false; //如果有ID那么显示搜索结果
      this.showIpList = false; //控制IP列表的显示
    }
  },
  methods: {
    // 将ip改成固定格式
    changeIP(arr){
      let arr1=[];
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i]
        str=str.ip1+'.'+str.ip2+'.'+str.ip3+'.'+str.ip4+'/'+str.port;
        arr1.push(str)
      }
      return arr1
    },
    // 查找按钮3秒内无法点击，3秒后恢复
    searchButton(){
      this.searchTime=3;
      this.searchDisable=true;
      this.searchCount=setInterval(()=>{
        this.searchTime--;
        console.log(this.searchTime);
        if (this.searchTime==0) {
          clearInterval(this.searchCount)
          this.searchDisable=false;
        }
      },1000)
    },
    //   点击查找ID
    searchID() {
      if (this.searcher == "" || this.searcher == 0) {
        this.showResult = false; //隐藏代理信息
        this.showIpList = false; //控制IP列表的隐藏
        this.$alert("请输入代理ID", "提示", {
          confirmButtonText: "确定",
          callback: action => {
          }
        });
      } else {
        this.searchButton()
        // 发送ajax寻找账号是否存在，如果存在，可以添加，如果不存在，提示账号不存在
        let data = 1;
        if (data == 0) {
          this.$alert("账号不存在", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              //   this.$message("无效操作");
            }
          });
          this.showResult = false; //隐藏代理信息
          this.showIpList = false; //控制IP列表的隐藏
        } else {
          let arr = this.agency;//代理信息数组
          let strAgency = this.searcher//显示的代理信息
          arr = arr.filter(item => {
            return item.ID == strAgency;
          });//返回代理信息
          if (arr=='') {
            this.$alert('账号不存在','提示',{
              confirmButtonText:'确定',
              callback:action=>{}
            })
            this.showResult = false; //显示搜索结果
            this.showIpList = false; //控制IP列表的显示
            this.searcher='';//清空输入框
          }else{
            this.showResult = true; //显示搜索结果
            this.showIpList = true; //控制IP列表的显示
            this.showArr=arr[0];//显示的为查询出来的数组
            let IPArr=arr[0].ip;//显示出IP
            this.showIP=this.changeIP(IPArr);
            this.checkedIP.push(this.showIP[0]); //默认选中的ip
            this.choiceIP.push(this.showIP[0]); //选中的ip
          }
        }
      }
    },
    // 查找代理id--监听input内容的变化--如果输入不是正整数，就为0,如果输入的是正整数，那么就删除0，用~~，
    searchValue() {
      let reg = /^[1-9]*$/;
      if (this.searcher.charAt(1) != 0) {
        if (reg.test(this.searcher.charAt(1))) {
          if (typeof parseInt(this.searcher) == "number") {
            setTimeout(() => {
              this.searcher = parseInt(this.searcher);
            }, 0);
          } else {
            setTimeout(() => {
              this.searcher = ~~this.searcher;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.searcher = 0;
          }, 0);
        }
      } else if (this.searcher.charAt(1) == 0 && this.searcher.charAt(0) != 0) {
        setTimeout(() => {
          this.searcher = ~~this.searcher;
        }, 0);
      } else {
        setTimeout(() => {
          this.searcher = 0;
        }, 0);
      }
    },
    // 修改上限额度
    changeMax() {
      if (this.addNum == "" || this.addNum == 0) {
        this.$alert("请输入大于0的整数", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            // this.$message("无效操作");
          }
        });
      } else {
        // 输入数字大于0,弹出框显示修改的ID以及修改数量
        const h = this.$createElement;
        this.$msgbox({
          title: "修改上限额度",
          message: h("div", null, [
            h("p", null, [
              h("span", null, "ID："),
              h("span", { style: "color: teal" }, this.showArr.ID)
            ]),
            h("p", null, [
              h("span", null, "增加数量："),
              h(
                "span",
                { style: "color: teal" },
                (this.showNum =
                  this.addMax == "增加" ? this.addNum : -this.addNum)
              )
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            let num = parseInt(this.addNum);
            let remain = parseInt(this.showArr.remain);
            // 判断输入数字大于剩余额度？显示额度不足：修改代理上限额度
            if (num > remain) {
              this.$alert("额度不足", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              // setTimeout(() => {
              // 增加代理上限额度
              if (this.addMax == "增加") {
                this.showArr.max = parseInt(this.showArr.max) + parseInt(num);

                // 发送ajax修改上限额度==============================================================
              } else {
                // 减少代理上限额度
                // console.log(parseInt(this.showArr.max) )
                this.showArr.max = parseInt(this.showArr.max) - parseInt(num);
                // console.log(parseInt(this.showArr.max) )
                // 发送ajax修改上限额度===================================================================
              }
              // }, 10);
            }
          })
          .catch(action => {});
      }
    },
    // 上限额度修改框  监听input内容的变化--如果输入不是正整数，就为0,如果输入的是正整数，那么就删除0，用~~，
    searchMax() {
      let reg = /^[1-9]*$/;
      if (this.addNum.charAt(1) != 0) {
        if (reg.test(this.addNum.charAt(1))) {
          if (typeof parseInt(this.addNum) == "number") {
            setTimeout(() => {
              this.addNum = parseInt(this.addNum);
            }, 0);
          } else {
            setTimeout(() => {
              this.addNum = ~~this.addNum;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.addNum = 0;
          }, 0);
        }
      } else if (this.addNum.charAt(1) == 0 && this.addNum.charAt(0) != 0) {
        setTimeout(() => {
          this.addNum = ~~this.addNum;
        }, 0);
      } else {
        setTimeout(() => {
          this.addNum = 0;
        }, 0);
      }
    },
    // 修改代理剩余额度
    changeRemain() {
      if (this.addRemainNum == "" || this.addRemainNum == 0) {
        this.$alert("请输入大于0的整数", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            // this.$message("无效操作");
          }
        });
      } else {
        // 输入数字大于0,弹出框显示修改的ID以及修改数量
        const h = this.$createElement;
        this.$msgbox({
          title: "修改代理剩余额度",
          message: h("div", null, [
            h("p", null, [
              h("span", null, "ID："),
              h("span", { style: "color: teal" }, this.showArr.ID)
            ]),
            h("p", null, [
              h("span", null, "增加数量："),
              h(
                "span",
                { style: "color: teal" },
                (this.showRemainNum =
                  this.addRemain == "增加"
                    ? this.addRemainNum
                    : -this.addRemainNum)
              )
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            let num = parseInt(this.addRemainNum);
            let remain = parseInt(this.showArr.remain);

            // 判断输入数字<剩余额度？显示额度不足：修改代理剩余额度
            if (this.addRemain == "减少" && remain - num < 0) {
              this.$alert("额度不足", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            } else {
              // setTimeout(() => {
              // 增加代理剩余额度
              if (this.addRemain == "增加") {
                this.showArr.remain =
                  parseInt(this.showArr.remain) + parseInt(num);

                // 发送ajax修改剩余额度==============================================================
              } else {
                // 减少代理剩余额度
                // console.log(parseInt(this.showArr.remain) )
                this.showArr.remain =
                  parseInt(this.showArr.remain) - parseInt(num);
                // console.log(parseInt(this.showArr.remain) )
                // 发送ajax修改剩余额度===================================================================
              }
              // }, 10);
            }
          })
          .catch(action => {});
      }
    },
    // 剩余额度修改框   监听input内容的变化--如果输入不是正整数，就为0,如果输入的是正整数，那么就删除0，用~~
    searchRemain() {
      let reg = /^[1-9]*$/;
      if (this.addRemainNum.charAt(1) != 0) {
        if (reg.test(this.addRemainNum.charAt(1))) {
          if (typeof parseInt(this.addRemainNum) == "number") {
            setTimeout(() => {
              this.addRemainNum = parseInt(this.addRemainNum);
            }, 0);
          } else {
            setTimeout(() => {
              this.addRemainNum = ~~this.addRemainNum;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.addRemainNum = 0;
          }, 0);
        }
      } else if (
        this.addRemainNum.charAt(1) == 0 &&
        this.addRemainNum.charAt(0) != 0
      ) {
        setTimeout(() => {
          this.addRemainNum = ~~this.addRemainNum;
        }, 0);
      } else {
        setTimeout(() => {
          this.addRemainNum = 0;
        }, 0);
      }
    },
    // 封号和解封
    ban() {
      if (this.showArr.status == "正常") {
        const h = this.$createElement;
        this.$msgbox({
          title: "封号",
          message: h("div", null, [
            h("p", null, "注意：帐号被封之后,子帐号、用户帐号,也一起封号"),
            h("p", null, [
              h("span", null, "ID："),
              h("span", { style: "color: teal" }, this.showArr.ID)
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            // setTimeout(() => {
            this.showArr.status = "已封";
            this.showBan = "解封";
            // 发送AJAX修改状态==============================================================
            // }, 0);
          })
          .catch(() => {});
      } else {
        const h = this.$createElement;
        this.$msgbox({
          title: "解封",
          message: h("div", null, [
            h("span", null, "ID："),
            h("span", { style: "color: teal" }, this.showArr.ID)
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            // setTimeout(() => {
            this.showArr.status = "正常";
            this.showBan = "封号";
            // 发送AJAX修改状态==============================================================
            // }, 0);
          })
          .catch(() => {});
      }
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
              // this.ip1reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip1 = ~~this.ip1;
              // this.ip1reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip1 = 0;
            // this.ip1reg = false;
          }, 0);
        }
      } else if (this.ip1.charAt(1) == 0 && this.ip1.charAt(0) != 0) {
        setTimeout(() => {
          this.ip1 = ~~this.ip1;
          // this.ip1reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip1 = 0;
          // this.ip1reg = false;
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
              // this.ip2reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip2 = ~~this.ip2;
              // this.ip2reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip2 = 0;
            // this.ip2reg = false;
          }, 0);
        }
      } else if (this.ip2.charAt(1) == 0 && this.ip2.charAt(0) != 0) {
        setTimeout(() => {
          this.ip2 = ~~this.ip2;
          // this.ip2reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip2 = 0;
          // this.ip2reg = false;
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
              // this.ip3reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip3 = ~~this.ip3;
              // this.ip3reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip3 = 0;
            // this.ip3reg = false;
          }, 0);
        }
      } else if (this.ip3.charAt(1) == 0 && this.ip3.charAt(0) != 0) {
        setTimeout(() => {
          this.ip3 = ~~this.ip3;
          // this.ip3reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip3 = 0;
          // this.ip3reg = false;
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
              // this.ip4reg = true;
            }, 0);
          } else {
            setTimeout(() => {
              this.ip4 = ~~this.ip4;
              // this.ip4reg = true;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.ip4 = 0;
            // this.ip4reg = false;
          }, 0);
        }
      } else if (this.ip4.charAt(1) == 0 && this.ip4.charAt(0) != 0) {
        setTimeout(() => {
          this.ip4 = ~~this.ip4;
          // this.ip4reg = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.ip4 = 0;
          // this.ip4reg = false;
        }, 0);
      }
    },

    // 添加ip
    searchIP() {
      let strAgency = this.searcher//显示的代理信息
      if ((strAgency != "" && strAgency != 0) || this.showResult==true){
        // 发送ajax寻找账号是否存在，如果存在，可以添加，如果不存在，提示账号不存在-------------------------------------------
        let data = 1;
        if (data == 0) {
          this.$alert("账号不存在", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
          this.showResult = false; //隐藏代理信息
          this.showIpList = false; //控制IP列表的隐藏
        } else {
          let arr = this.agency;//代理信息数组
          arr = arr.filter(item => {
            return item.ID == strAgency;
          });//返回代理信息
          if (arr=='') {
            this.$alert("账号不存在", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
            this.showResult = false; //隐藏代理信息
            this.showIpList = false; //控制IP列表的隐藏
            this.searcher='';//清空输入框
          }else{
            // 确认是否添加
            this.$confirm("确认添加?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            // 确定添加
            .then(() => {
              let ipStr=this.ip1+''+this.ip2+''+this.ip3+''+this.ip4+''+this.choice+'';
              // console.log(ipStr);//输入的ip
              //获取到当前ip数组-----------------------------------------
              let ipArr = this.showArr.ip
              //获取到当前ip数组结束-----------------------------------------
              //新数组==将IP中的./等符号去掉-------------------------------------
              let newarr = [];
              for (let i = 0; i < ipArr.length; i++) {
                newarr.push(ipArr[i].ip1+''+ipArr[i].ip2+''+ipArr[i].ip3+''+ipArr[i].ip4+''+ipArr[i].port+'')
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
              // 新数组===（如果输入的IP已经存在,把重复的拿出来放入新数组中)
              newarr=newarr.filter(item=>{
                return item===ipStr
              })
              // 新数组结束--------------------------------------------------------------------------------------
              // 判断如果ip数组是空的，那么直接添加，或者新数组（存放重复内容）的长度为0，直接添加
              if (newarr.length==0 || ipArr.length == 0) {
                  this.showResult = true; //显示代理信息
                  this.showIpList = true; //控制IP列表的显示
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  })
                  ipArr.push({ip1:this.ip1,ip2:this.ip2,ip3:this.ip3,ip4:this.ip4,port:this.choice});//加入新ip
                  let reg = /0{4}/;
                  if (reg.test(ipStr)==true) {
                    this.showIP.push(this.ip1+'.'+this.ip2+'.'+this.ip3+'.'+this.ip4)
                  }else{
                     this.showIP=this.changeIP(ipArr);//显示处理过后的ip
                  }
                  this.ip1=0;this.ip2=0;this.ip3=0;this.ip4=0;this.choice=32;//恢复默认值
                  // console.log(this.agency);
              }else{
                // 新数组长度不为0，说明有重复
                this.$alert("IP已在白名单中", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消操作"
              });
            });
          }
        }
      }else {
        this.$alert("请输入代理ID", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    //ip多选框
    // 全选
    handleCheckAllChange(val) {
      // console.log(val);
      this.checkedIP = val ? this.showIP : []; //表示选中的0.0.0.0/32
      this.isIndeterminate = false;
      this.choiceIP = this.checkedIP;
      // console.log(this.choiceIP)
      this.trueIP=val?this.showArr.ip : [];//表示真实IP ip1:xx,ip2:xx
    },
    // 选中某一项
    handleCheckedIPChange(value) {
      this.choiceIP = value;//选中的ip 0.0.0.0/32
      // console.log(this.choiceIP)
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
      let array=this.showArr.ip;
      let newArr=[];
      for (let i = 0; i < array.length; i++) {
        if (arr.indexOf(i)>-1) {
          newArr.push(array[i])
        }
      }
      this.trueIP=newArr;
      // console.log(this.trueIP);//表示选中的ip1:xx,ip2:xx..
      // 方法2结束-------------------------------------------------------------
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.showIP.length;
      // 控制全选按钮的样式
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.showIP.length;
    },
    // 删除选中项
    handleDel() {
      let arr = this.choiceIP; //选中项0.0.0.0/32
      let arr1 = this.trueIP;//选中项ip1:xx,ip2:xx
      if (arr.length == 0) {
        this.$alert("请选择你要删除的ip", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
      // 方法：新建一个空数组，存放全部IP中尚未被选中的项     0.0.0.0/32------------------------------------------------------
      let array = this.showIP; //全部IP
      let newArr = []; //空数组
      // console.log( arr,array)
      for (let i = 0; i < array.length; i++) {
        if (arr.indexOf(array[i]) == -1) {
          newArr.push(array[i]);
        }
      }
      // console.log(newArr);
      this.showIP = newArr;//显示的是全部IP中尚未被选中的项
      // 方法结束----------------------------------------------------------------------------------------------------------
      // 方法：新建一个空数组，存放全部IP中尚未被选中的项     ip1:xx,ip2:xx,ip3:xx------------------------------------------------------
      let arr2 = this.showArr;
      // arr2=arr2.filter(item=>{
      //   item.ID==this.showArr.ID
      // })
      let newArray= arr2.ip;//全部的IP
      let newA=[];
      for (let i = 0; i < newArray.length; i++) {
        if (arr1.indexOf(newArray[i])==-1) {
          newA.push(newArray[i])
        }
      }
      arr2.ip=newA;//删除以后剩下的IP
      // 如果全部删除了，那么ip列表为空
      if (this.showIP.length == 0) {
        arr2.ip=[];//全部IP数组
        this.checkAll = false; //控制全选按钮
        this.choiceIP = []; //选中的ip
        this.checkedIP = []; //默认选中的ip
        this.trueIP= []; //添加的ip数组
        this.showIP = []; //显示的ip数组
        this.isIndeterminate = true; //控制样式
        this.showIpList = false; //控制IP列表的显示
        //发送ajax修改ip数组-----------------------------------------------------------------
      }
      // console.log(this.agency);
      
    }
  },
  // 确保清除计时器
  beforeDestroy(){
    // 清除查找按钮的计时器
    clearInterval(this.searchCount)
    this.searchCount=null;
  },
};
</script>
<style scoped>
/* 搜索代理 */
.searchID {
  display: flex;
  margin: 0 auto;
  width: 350px;
  height: 34px;
}
.label {
  width: 100px;
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
  margin-left: -4px;
  line-height: 0px;
  height: 34px;
  border-collapse: collapse;
}
/* 下拉框 */
.select{
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom: 0;
  width:80px;
  height:34px;
  color: #555;
}
/* 下拉框选择IP8，16，24，32 */
.select1{
  border: 1px solid #ccc;
  width:80px;
  height:34px;
  color: #555;
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
/* 搜索结果 */
.searchResult {
  width: 96%;
  height: 100px;
  display: inline-block;
  text-align: center;
  margin-top: 24px;
}
.gcontent {
  margin-right: -2px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #f1ecec;
  border: 1px solid #ccc;
  /* border-radius: 4px; */
  border-collapse: collapse;
}
/* 查询ID的结果表格--修改额度的输入框的样式 */
.jcontent {
  margin-right: -2px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #f1ecec;
  border: 1px solid #ccc;
  /* border-radius: 4px; */
  border-collapse: collapse;
  display: flex;
  justify-content: space-between;
}
/* 查询ID的结果表格 */
.hcontent {
  margin-right: -2px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  background-color: #f1ecec;
  border: 1px solid #ccc;
  border-collapse: collapse;
  background-color: #dff0d8;
}
/* 不加圆角的按钮 */
.jbutton {
  height: 34px;
  font-size: 14px;
  text-align: center;
  line-height: 0;
  background-color: #5bc0de;
  border-color: #46b8da;
  border-radius: 0;
  padding: 10px;
  width:80px;
}
.close {
  text-align: center;
  width: 50%;
}
.addChoice {
  width: 80px;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
}
/* 白名单IP列表 */
.headerIP {
  width: 98%;
  font-size: 18px;
  margin: 10px;
  font-weight: 500;
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ipList {
  margin-top: 24px;
}
</style>

