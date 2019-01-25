import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Home from '@/components/Home' // 主页
// import agencySearch from '@/components/agencySearch' // 直属下线代理查询
// import agencySet from '@/components/agencySet' // 直属下线代理设置
// import agencyStatement from '@/components/agencyStatement' // 代理商额度报表
// import agencyPlayer from '@/components/agencyPlayer' // 代理玩家查询
// import financialIncome from '@/components/financialIncome' // 财务收益数据报表
// import financialAnalysis from '@/components/financialAnalysis' // 财务概况数据分析
// import runIncome from '@/components/runIncome' // 游戏收益统计
// import runLog from '@/components/runLog' // 游戏日志
// import runUser from '@/components/runUser' // 代理用户收益统计
// import runLoss from '@/components/runLoss' // 盈亏报表
// import runSituation from '@/components/runSituation' // 游戏概况数据分析
// import runOnlineUser from '@/components/runOnlineUser' // 在线用户详细信息
// import runLive from '@/components/runLive' // 在线实时数据
// import run24hours from '@/components/run24hours' // 24小时在线数据
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      // 登录
      path: '/',
      component: resolve => require(['@/components/Login'], resolve),
      name: '登录'
    },
    {
      // 主页--懒加载
      path: '/Home',
      component: resolve => require(['@/components/Home'], resolve),
      // name: '账号管理',
      children: [{
        path: '/account',
        component: resolve => require(['@/components/accountManage/account'], resolve),
        name: '账号管理',
        hidden: true,
        children: [
          {
            path: '/aNewAgency',
            component: resolve => require(['@/components/accountManage/aNewAgency'], resolve),
            name: '新建代理',
            hidden: true
          },
          {
            path: '/aNewBack',
            component: resolve => require(['@/components/accountManage/aNewBack'], resolve),
            name: '新建后台账号',
            hidden: true
          },
          {
            path: '/aChangePwd',
            component: resolve => require(['@/components/accountManage/aChangePwd'], resolve),
            name: '改密码',
            hidden: true
          },
          {
            path: '/aAccountState',
            component: resolve => require(['@/components/accountManage/aAccountState'], resolve),
            name: '账号信息',
            hidden: true
          },
          {
            path: '/aBackAccount',
            component: resolve => require(['@/components/accountManage/aBackAccount'], resolve),
            name: '后台账号',
            hidden: true
          },
          {
            path: '/aResetPwd',
            component: resolve => require(['@/components/accountManage/aResetPwd'], resolve),
            name: '重置代理商密码',
            hidden: true
          }]
      }]
    },
    {
      // 主页--懒加载
      path: '/Home',
      component: resolve => require(['@/components/Home'], resolve),
      name: '代理事物',
      iconCls: 'el-icon-message',
      children: [{
        path: '/agencySearch',
        component: resolve => require(['@/components/agency/agencySearch'], resolve),
        name: '直属下线代理查询',
        hidden: true
      },
      {
        path: '/agencySet',
        component: resolve => require(['@/components/agency/agencySet'], resolve),
        name: '直属下线代理设置'
      },
      {
        path: '/agencyStatement',
        component: resolve => require(['@/components/agency/agencyStatement'], resolve),
        name: '代理商额度报表'
      },
      {
        path: '/agencyPlayer',
        component: resolve => require(['@/components/agency/agencyPlayer'], resolve),
        name: '代理玩家查询'
      }
      ]
    },
    {
      // 主页
      path: '/Home',
      component: resolve => require(['@/components/Home'], resolve),
      name: '财务报表',
      iconCls: 'el-icon-menu',
      children: [{
        path: '/financialIncome',
        component: resolve => require(['@/components/financial/financialIncome'], resolve),
        name: '财务收益数据报表',
        hidden: true
      },
      {
        path: '/financialAnalysis',
        component: resolve => require(['@/components/financial/financialAnalysis'], resolve),
        name: '财务概况数据分析'
      }
      ]
    },
    {
      // 主页
      path: '/Home',
      component: resolve => require(['@/components/Home'], resolve),
      name: '运营数据',
      iconCls: 'el-icon-document',
      children: [{
        path: '/runIncome',
        component: resolve => require(['@/components/run/runIncome'], resolve),
        name: '游戏收益统计',
        hidden: true
      },
      {
        path: '/runLog',
        component: resolve => require(['@/components/run/runLogs'], resolve),
        name: '游戏日志'
      },
      {
        path: '/runUser',
        component: resolve => require(['@/components/run/runUser'], resolve),
        name: '代理用户收益统计'
      },
      {
        path: '/runLoss',
        component: resolve => require(['@/components/run/runLoss'], resolve),
        name: '盈亏报表'
      },
      {
        path: '/runSituation',
        component: resolve => require(['@/components/run/runSituation'], resolve),
        name: '游戏概况数据分析',
        hidden: true
      },
      {
        path: '/runOnlineUser',
        component: resolve => require(['@/components/run/runOnlineUser'], resolve),
        name: '在线用户详细信息'
      },
      {
        path: '/runLive',
        component: resolve => require(['@/components/run/runLive'], resolve),
        name: '在线实时数据'
      },
      {
        path: '/run24hours',
        component: resolve => require(['@/components/run/run24hours'], resolve),
        name: '24小时在线数据'
      }
      ]
    },
    {
      // 主页--懒加载
      path: '/Home',
      component: resolve => require(['@/components/Home'], resolve),
      // name: '用户收益统计',
      children: [{
        path: '/runUserIncome',
        component: resolve => require(['@/components/runUserIncome'], resolve),
        name: '用户收益统计',
        hidden: true}]
    }
  ]
})
