<template>
    <div>
      <!-- 主页 -->
        <el-container>
            <!-- 顶部标题 -->
            <el-header>
                <h1 class="headerH3">
                   代理商管理系统 
                </h1>
                <span class="headerSpan">
                    v1.5.10
                </span>
            </el-header>
            <!-- 顶部导航 -->
            <div class="topNav">
              <el-row class="elRow">
                  <el-col :span="8" style="textAlign:left">
                      <div class="grid-content bg-purple">
                          <div class="welcome">
                              欢迎您:&nbsp; <span>{{account}}</span>&nbsp;&nbsp;[二级代理商] &nbsp;&nbsp;上限额度：<span>{{maxLimit}}</span>&nbsp;&nbsp;剩余额度：<span>{{lastLimit}}</span>
                          </div>
                      </div>
                  </el-col>
                  <el-col :span="8" style="textAlign:center">
                      <div class="grid-content bg-purple">
                          <!-- 显示当前模块名 -->
                          <strong>{{$route.name}}</strong>
                      </div>
                  </el-col>
                  <el-col :span="8" style="textAlign:right">
                      <div class="grid-content bg-purple">
                          <div class="headerIcon" @click="toMain">
                              <img src="../../static/image/index.png" style='vertical-align:middle;' alt="">
                              <span>主页</span>
                          </div>
                          <!-- 账号管理--点击跳转到账号信息 -->
                          <router-link to='/aAccountState' class="headerIcon1">
                            <img src="../../static/image/account.png" style='vertical-align:middle;width:16px;height:16px;marginBottom:4px;marginRight:4px' alt="">
                            <span style='fontSize:14px;color:black;'>账号管理</span>
                          </router-link>
                          <div  class="headerIcon"  @click="toLogin">
                              <img src="../../static/image/logout.png" style='vertical-align:middle;' alt=""><span>注销</span>
                          </div>
                      </div>
                  </el-col>
              </el-row>
            </div>
            <!-- 中间 -->
            <el-container class="middle">
                <!-- 侧边栏导航 -->
                <el-aside width="200px" class="aside">
                        <div>
                          <div @click="Agencyshow" class="tittle">
                            <span>代理事务</span><span v-show='!showAgency'>∨</span><span v-show="showAgency">∧</span>
                          </div>
                          <div v-show="showAgency">
                            <div>
                              <router-link v-bind:class="this.$route.path=='/agencySearch'?'routerActive':'router'" to="/agencySearch">直属下线代理查询</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/agencySet'?'routerActive':'router'"  to="/agencySet">直属下线代理设置</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/agencyStatement'?'routerActive':'router'" to="/agencyStatement">代理商额度报表</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/agencyPlayer'?'routerActive':'router'" to="/agencyPlayer">代理玩家查询</router-link>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div @click="Financialshow" class="tittle">
                            <span>财务报表</span><span v-show='!showFinancial'>∨</span><span v-show="showFinancial">∧</span>
                          </div>
                          <div v-show="showFinancial">
                            <div>
                              <router-link v-bind:class="this.$route.path=='/financialIncome'?'routerActive':'router'" to="/financialIncome">财务收益数据报表</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/financialAnalysis'?'routerActive':'router'" to="/financialAnalysis">财务概况数据分析</router-link>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div @click="Runshow" class="tittle">
                            <span>运营数据</span><span v-show='!showRun'>∨</span><span v-show="showRun">∧</span>
                          </div>
                          <div v-show="showRun">
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runIncome'?'routerActive':'router'" to="/runIncome">游戏收益统计</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runLog'?'routerActive':'router'" to="/runLog">游戏日志</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runUser'?'routerActive':'router'" to="/runUser">代理用户收益统计</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runLoss'?'routerActive':'router'" to="/runLoss">盈亏报表</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runSituation'?'routerActive':'router'" to="/runSituation">游戏概况数据分析</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runOnlineUser'?'routerActive':'router'" to="/runOnlineUser">在线用户详细信息</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/runLive'?'routerActive':'router'" to="/runLive">在线实时数据</router-link>
                            </div>
                            <div>
                              <router-link v-bind:class="this.$route.path=='/run24hours'?'routerActive':'router'" to="/run24hours">24小时在线数据</router-link>
                            </div>
                          </div>
                        </div>
                </el-aside>
                <!-- 右侧路由出口 -->
                <el-main>
                  <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                      <router-view></router-view>
                    </transition>
                  </el-col>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      account: "1100", //登录账户
      maxLimit: "3000", //该账户的上限额度
      lastLimit: "2000", //该账户的剩余额度
      showAgency: false, //显示代理事务
      showFinancial: false, //显示代理事务
      showRun: false //显示代理事务
    };
  },
  created() {
    // 获取本地数据登录账号信息
    this.account = sessionStorage.getItem("account")
      ? sessionStorage.getItem("account")
      : this.account;
    this.maxLimit = sessionStorage.getItem("maxLimit")
      ? sessionStorage.getItem("maxLimit")
      : this.maxLimit;
    this.lastLimit = sessionStorage.getItem("lastLimit")
      ? sessionStorage.getItem("lastLimit")
      : this.lastLimit;
  },
  methods: {
    // 左侧导航栏---------------------------------------
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(index, indexPath) {
      // console.log(index,indexPath)
    },
    // 左侧导航栏结束-----------------------
    // 只显示代理事物
    Agencyshow() {
      this.showAgency = !this.showAgency;
      this.showFinancial = false;
      this.showRun = false;
    },
    // 只显示财务报表
    Financialshow() {
      this.showFinancial = !this.showFinancial;
      this.showAgency = false;
      this.showRun = false;
    },
    // 只显示运营数据
    Runshow() {
      this.showRun = !this.showRun;
      this.showAgency = false;
      this.showFinancial = false;
    },
    // 点击主页，前往主页面
    toMain(){
      this.$router.push('/agencySearch')
    },
    // 点击注销，前往登录页
    toLogin(){
      this.$router.push('/')
    },
  }
};
</script>
<style scoped>
/* 顶部导航 */
.topNav{
  margin-bottom: 40px;
}
.aside{
  overflow: hidden;
}
/* 路由 */
.router {
  width:100%;
  display: block;
  padding: 15px;
  margin-bottom: -1px;
  color: black;
  background-color: #fff;
  border: 1px solid #ddd;
  padding-left: 44px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}
/* 路由点击 */
.routerActive {
  width:100%;
  color: #ffffff;
  display: block;
  padding: 15px;
  margin-bottom: -1px;
  background-color: #a2b0d8;
  border: 1px solid #ddd;
  padding-left: 44px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}
.tittle{
  display: block;
  padding: 15px;
  margin-bottom: -1px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
  display:flex;
  justify-content: space-between;
  cursor: pointer;
  width:100%;
}
.router:hover{
  background-color:rgba(250, 246, 252, 0.959)
}
.tittle:hover{
  background-color:rgba(250, 246, 252, 0.959)
}
/* 标题 */
.headerH3 {
  display: inline-block;
  font-size: 24px;
}
.headerSpan {
  font-size: 14px;
  color: gray;
  margin-left: 4px;
}
/* 顶部导航 */
.el-row:not(:last-child) {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
/* 顶部导航栏颜色 */
.bg-purple-dark {
  background: #a2b0d8;
}
.bg-purple {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 36px;
  background: #a2b0d8;
}
.bg-purple-light {
  background: #a2b0d8;
}
.grid-content {
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/* 右侧导航 */
.headerIcon {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 36px;
  cursor: pointer;
  cursor: hand;
  display: inline-block;
}
.headerIcon:hover {
  background-color: #f1ecec;
}
.headerIcon1 {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 36px;
  cursor: pointer;
  cursor: hand;
  display: inline-block;
  text-decoration: none;
}
.headerIcon1:hover {
  background-color: #f1ecec;
}
/* 导航小图标 */
.bg-purple > div > img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-bottom: 4px;
}
/* 欢迎 */
.welcome span {
  color: #840dcc;
  text-shadow: 0 1px 0 rgba(236, 226, 241, 0.78);
}
/* 中间部分 */
.middle {
  padding: 0 15px;
}
</style>



