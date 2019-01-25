<template>
  <!-- 游戏收益统计 -->
  <div class="parent">
    <!-- 搜索的日期范围 -->
    <div class="search">
      <el-row :span="17">
        <el-col :span="2">
          <div class="grid-content" style="borderRadius:4px 0 0 4px">代理ID</div>
        </el-col>
        <el-col :span="3">
          <el-input v-model="agencyID" v-on:input="agencyIDTest" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <div class="grid-content" style="borderLeft:0">截止时间</div>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="deadline"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" class="button" :disabled="searchDisable" @click="financialSearch">查找</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格部分 -->
    <div class="footer" v-show="showTable">
      <!-- 导出按钮 -->
      <div class="toexcel">
        <el-button
          :disabled="exportDisable"
          @click="exportExcel"
          type="primary"
          class="button"
          style="width:70px;position:absolute;top:0;right:30px"
        >导出</el-button>
      </div>
      <!-- 表格 -->
      <div class="tableParent">
        <table class="table">
          <tr class="tableTr">
            <td>代理ID</td>
            <td>姓名</td>
            <td>游戏名称</td>
            <td>当日投注总额</td>
            <td>当日派彩总额</td>
            <td>当日税收总额</td>
            <td>当日盈收</td>
            <td>前日盈收</td>
            <td>本月盈收</td>
            <td>累加总盈收</td>
          </tr>
          <tbody v-for="(item,index) in tableData5" @click="gameType(item.gameName)" :key="index">
            <tr :style="item.gameName=='全部'?'backgroundColor:#f2dede':''">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.gameName}}</td>
              <td>{{item.todayBet}}</td>
              <td>{{item.todayPayout}}</td>
              <td>{{item.todayRevenue}}</td>
              <td>{{item.todayRoyalty}}</td>
              <td>{{item.yesRoyalty}}</td>
              <td>{{item.monthRoyalty}}</td>
              <td>{{item.allRoyalty}}</td>
            </tr>
            <tr class="incomeTr">
              <td colspan="10">
                <template v-if="gameTyper==item.gameName" type="expand" >
                  <gameIncome v-bind:yxsytjData='item.children' v-if="gameTyper==item.gameName"></gameIncome>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import gameIncome from '../gameIncome/gameIncome'
export default {
  components:{
    gameIncome
  },
  data() {
    return {
      // 计时器----------------------------------------------------
      // 查找
      searchDisable:false,//按钮是否禁用
      searchTime:3,//秒数
      searchCount:null,//计时器
      // 导表
      exportDisable:false,//按钮是否禁用
      exportTime:3,//秒数
      exportCount:null,//计时器
      // 计时器结束------------------------------------------------
      deadline: "", //截止日期
      deadlineEmpty: 0, //截止日期是否为空0为空1表示有值
      agencyID: 0, //代理ID
      idEmpty: 0, //代理ID是否为空
      tableArr: [], //表格数据
      showTable: true, //显示表格和导表按钮
      gameTyper:'',//点击的游戏
      tableData5: [
        // 全部
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "全部", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "-62.7", //前日盈收
          monthRoyalty: "-84.1", //本月盈收
          allRoyalty: "75910", //累加总盈收
          children: []
        },
        //   德州扑克
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "德州扑克", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "515.7", //累加总盈收
          children: [
            {
              gName: "德扑游戏场1",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 64.2
            },
            {
              gName: "德扑游戏场2",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 35.6
            },
            {
              gName: "德扑游戏场3",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 15
            },
            {
              gName: "德扑游戏场4",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 9.8
            },
            {
              gName: "德扑游戏场6",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 391.2
            }
          ]
        },
        // 牛牛随机庄
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "牛牛-随机庄", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "3026.3", //累加总盈收
          children: [
            {
              gName: "牛牛体验场-随机庄",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: -204.7
            },
            {
              gName: "牛牛新手场-随机庄",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 234
            },
            {
              gName: "牛牛大师场-随机庄",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 2997
            }
          ]
        },
        // 牛牛-看牌抢庄
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "牛牛-看牌抢庄", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "8.25", //累加总盈收
          children: [
            {
              gName: "牛牛体验场-看牌抢庄",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: -4.95
            },
            {
              gName: "牛牛新手场-看牌抢庄",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 13.2
            }
          ]
        },
        // 牛牛-通比
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "牛牛-通比", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "3178.077", //累加总盈收
          children: [
            {
              gName: "牛牛体验场-通比",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: -52.45
            },
            {
              gName: "牛牛新手场-通比",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 68
            },
            {
              gName: "牛牛精英场-通比",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1617.922
            },
            {
              gName: "牛牛大师场-通比",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1544.605
            }
          ]
        },
        // 抢庄牛牛
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "抢庄牛牛", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "-28.5", //本月盈收
          allRoyalty: "3114", //累加总盈收
          children: [
            {
              gName: "抢庄牛牛-体验",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 256.2
            },
            {
              gName: "抢庄牛牛-新手",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 232.6
            },
            {
              gName: "抢庄牛牛-精英",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 895
            },
            {
              gName: "抢庄牛牛-大师",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: -28.5,
              allProfits: 1730.2
            }
          ]
        },
        // 李逵捕鱼
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "李逵捕鱼", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "-958.1", //累加总盈收
          children: [
            {
              gName: "李逵百炮场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 2580.9
            },
            {
              gName: "李逵千炮场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: -5499
            },
            {
              gName: "李逵万炮场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1960
            }
          ]
        },
        // 金蟾捕鱼
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "金蟾捕鱼", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "7.1", //本月盈收
          allRoyalty: "778.2", //累加总盈收
          children: [
            {
              gName: "金蟾0.1元场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 7.1,
              allProfits: 778.2
            },
            {
              gName: "金蟾1元场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1224
            },
            {
              gName: "金蟾10元场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 23190
            }
          ]
        },
        // 欢乐30秒
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "欢乐30秒", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "13,685.75", //累加总盈收
          children: [
            {
              gName: "30秒-体验场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 785.75
            },
            {
              gName: "30秒-高级场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 12900
            }
          ]
        },
        // 百牛
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "百牛", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "-62.72", //前日盈收
          monthRoyalty: "-62.72", //本月盈收
          allRoyalty: "8896.575", //累加总盈收
          children: [
            {
              gName: "百牛-体验场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: -62.72,
              monthProfits: -62.72,
              allProfits: -2773.425
            },
            {
              gName: "百牛-高级场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 11670
            }
          ]
        },
        // 龙虎
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "龙虎", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "252", //累加总盈收
          children: [
            {
              gName: "龙虎-体验场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 2
            },
            {
              gName: "龙虎-中级场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 250
            }
          ]
        },
        // 奔驰宝马
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "奔驰宝马", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "-10693", //累加总盈收
          children: [
            {
              gName: "奔驰宝马-体验场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits:7
            },
            {
              gName: "奔驰宝马-精英场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: -12500
            },
            {
              gName: "奔驰宝马-大师场",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1800
            }
          ]
        },
        // 飞禽走兽
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "飞禽走兽", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "8718", //累加总盈收
          children: [
            {
              gName: "飞禽走兽-平民",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits:618
            },
            {
              gName: "飞禽走兽-老板",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 100
            },
            {
              gName: "飞禽走兽-贵族",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 8000
            }
          ]
        },
        // 炸金花
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "炸金花", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "14338.4", //累加总盈收
          children: [
            {
              gName: "炸金花-体验",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits:1012.5
            },
            {
              gName: "炸金花-新手",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 228.4
            },
            {
              gName: "炸金花-精英",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 200
            },
            {
              gName: "炸金花-大师",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 12897.5
            }
          ]
        },
        // 二八杠
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "二八杠", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "1866.4", //累加总盈收
          children: [
            {
              gName: "二八杠-体验",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits:48.9
            },
            {
              gName: "二八杠-大师",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 1817.5
            }
          ]
        },
        // 港式五张
        {
          id: "1034", //代理ID
          name: "BOTEST", //姓名
          gameName: "港式五张", //游戏名称
          todayBet: "0", //当日投注总额
          todayPayout: "0", //当日派彩总额
          todayRevenue: "0", //当日税收总额
          todayRoyalty: "0", //当日盈收
          yesRoyalty: "0", //前日盈收
          monthRoyalty: "0", //本月盈收
          allRoyalty: "4769.339", //累加总盈收
          children: [
            {
              gName: "港式五张-体验",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits:796.839
            },
            {
              gName: "港式五张-大师",
              gBet: 0,
              gPayout: 0,
              gRevenue: 0,
              gProfits: 0,
              gYesProfits: 0,
              monthProfits: 0,
              allProfits: 3972.5
            }
          ]
        }
      ],
    };
  },
  created() {
    // 计时器----------------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchTime=3;//秒数
    this.searchCount=null;//计时器
    // 导表
    this.exportDisable=false;//按钮是否禁用
    this.exportTime=3;//秒数
    this.exportCount=null;//计时器
    // 计时器结束------------------------------------------------
    let timeNew = new Date().valueOf(); //当前时间
    this.deadline = timeNew; //截止日期
    this.deadlineEmpty = 0; //截止日期为空 0为空1表示有值
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID为空
    this.tableArr = []; //表格数据
    this.showTable = true; //显示表格和导表按钮
    this.gameTyper='';//点击的游戏
    this.tableData5 = [
      // 全部
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "全部", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "-62.7", //前日盈收
        monthRoyalty: "-84.1", //本月盈收
        allRoyalty: "75910", //累加总盈收
        children: []
      },
      //   德州扑克
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "德州扑克", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "515.7", //累加总盈收
        children: [
          {
            gName: "德扑游戏场1",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 64.2
          },
          {
            gName: "德扑游戏场2",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 35.6
          },
          {
            gName: "德扑游戏场3",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 15
          },
          {
            gName: "德扑游戏场4",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 9.8
          },
          {
            gName: "德扑游戏场6",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 391.2
          }
        ]
      },
      // 牛牛随机庄
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "牛牛-随机庄", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "3026.3", //累加总盈收
        children: [
          {
            gName: "牛牛体验场-随机庄",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: -204.7
          },
          {
            gName: "牛牛新手场-随机庄",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 234
          },
          {
            gName: "牛牛大师场-随机庄",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 2997
          }
        ]
      },
      // 牛牛-看牌抢庄
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "牛牛-看牌抢庄", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "8.25", //累加总盈收
        children: [
          {
            gName: "牛牛体验场-看牌抢庄",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: -4.95
          },
          {
            gName: "牛牛新手场-看牌抢庄",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 13.2
          }
        ]
      },
      // 牛牛-通比
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "牛牛-通比", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "3178.077", //累加总盈收
        children: [
          {
            gName: "牛牛体验场-通比",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: -52.45
          },
          {
            gName: "牛牛新手场-通比",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 68
          },
          {
            gName: "牛牛精英场-通比",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1617.922
          },
          {
            gName: "牛牛大师场-通比",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1544.605
          }
        ]
      },
      // 抢庄牛牛
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "抢庄牛牛", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "-28.5", //本月盈收
        allRoyalty: "3114", //累加总盈收
        children: [
          {
            gName: "抢庄牛牛-体验",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 256.2
          },
          {
            gName: "抢庄牛牛-新手",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 232.6
          },
          {
            gName: "抢庄牛牛-精英",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 895
          },
          {
            gName: "抢庄牛牛-大师",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: -28.5,
            allProfits: 1730.2
          }
        ]
      },
      // 李逵捕鱼
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "李逵捕鱼", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "-958.1", //累加总盈收
        children: [
          {
            gName: "李逵百炮场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 2580.9
          },
          {
            gName: "李逵千炮场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: -5499
          },
          {
            gName: "李逵万炮场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1960
          }
        ]
      },
      // 金蟾捕鱼
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "金蟾捕鱼", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "7.1", //本月盈收
        allRoyalty: "778.2", //累加总盈收
        children: [
          {
            gName: "金蟾0.1元场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 7.1,
            allProfits: 778.2
          },
          {
            gName: "金蟾1元场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1224
          },
          {
            gName: "金蟾10元场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 23190
          }
        ]
      },
      // 欢乐30秒
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "欢乐30秒", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "13,685.75", //累加总盈收
        children: [
          {
            gName: "30秒-体验场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 785.75
          },
          {
            gName: "30秒-高级场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 12900
          }
        ]
      },
      // 百牛
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "百牛", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "-62.72", //前日盈收
        monthRoyalty: "-62.72", //本月盈收
        allRoyalty: "8896.575", //累加总盈收
        children: [
          {
            gName: "百牛-体验场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: -62.72,
            monthProfits: -62.72,
            allProfits: -2773.425
          },
          {
            gName: "百牛-高级场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 11670
          }
        ]
      },
      // 龙虎
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "龙虎", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "252", //累加总盈收
        children: [
          {
            gName: "龙虎-体验场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 2
          },
          {
            gName: "龙虎-中级场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 250
          }
        ]
      },
      // 奔驰宝马
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "奔驰宝马", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "-10693", //累加总盈收
        children: [
          {
            gName: "奔驰宝马-体验场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits:7
          },
          {
            gName: "奔驰宝马-精英场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: -12500
          },
          {
            gName: "奔驰宝马-大师场",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1800
          }
        ]
      },
      // 飞禽走兽
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "飞禽走兽", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "8718", //累加总盈收
        children: [
          {
            gName: "飞禽走兽-平民",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits:618
          },
          {
            gName: "飞禽走兽-老板",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 100
          },
          {
            gName: "飞禽走兽-贵族",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 8000
          }
        ]
      },
      // 炸金花
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "炸金花", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "14338.4", //累加总盈收
        children: [
          {
            gName: "炸金花-体验",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits:1012.5
          },
          {
            gName: "炸金花-新手",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 228.4
          },
          {
            gName: "炸金花-精英",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 200
          },
          {
            gName: "炸金花-大师",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 12897.5
          }
        ]
      },
      // 二八杠
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "二八杠", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "1866.4", //累加总盈收
        children: [
          {
            gName: "二八杠-体验",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits:48.9
          },
          {
            gName: "二八杠-大师",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 1817.5
          }
        ]
      },
      // 港式五张
      {
        id: "1034", //代理ID
        name: "BOTEST", //姓名
        gameName: "港式五张", //游戏名称
        todayBet: "0", //当日投注总额
        todayPayout: "0", //当日派彩总额
        todayRevenue: "0", //当日税收总额
        todayRoyalty: "0", //当日盈收
        yesRoyalty: "0", //前日盈收
        monthRoyalty: "0", //本月盈收
        allRoyalty: "4769.339", //累加总盈收
        children: [
          {
            gName: "港式五张-体验",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits:796.839
          },
          {
            gName: "港式五张-大师",
            gBet: 0,
            gPayout: 0,
            gRevenue: 0,
            gProfits: 0,
            gYesProfits: 0,
            monthProfits: 0,
            allProfits: 3972.5
          }
        ]
      }
    ];
  },
  methods: {
    //   代理ID验证
    agencyIDTest() {
      let reg = /^[1-9]*$/;
      let str = this.agencyID;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.agencyID = parseInt(this.agencyID);
            }, 0);
          } else {
            setTimeout(() => {
              this.agencyID = ~~this.agencyID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.agencyID = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.agencyID = ~~this.agencyID;
        }, 0);
      } else {
        setTimeout(() => {
          this.agencyID = 0;
        }, 0);
      }
    },
    // 代理ID不为空
    idIsEmpty() {
      if (this.agencyID == 0 || this.agencyID == "") {
        this.idEmpty = 0;
      } else {
        this.idEmpty = 1;
      }
      return Promise.resolve(this.idEmpty);
    },
    // 截止日期不为空
    deadlineIsEmpty() {
      let str = this.deadline;
      if (str == "" || str == null) {
        this.deadlineEmpty = 0;
      } else {
        this.deadlineEmpty = 1;
      }
      return Promise.resolve(this.deadlineEmpty);
    },
    // 查找按钮3秒内不能重复点击，3秒后恢复
    searchButton(){
      this.searchDisable=true;
      this.searchTime=3;
      this.searchCount=setInterval(()=>{
        this.searchTime--;
        // console.log(this.searchTime);
        if (this.searchTime==0) {
          clearInterval(this.searchCount)
          this.searchDisable=false;
        }
      },1000)
    },
    // 查找结果
    financialSearch() {
      // this.idIsEmpty()
      //   .then(val => {
      //     //   console.log(val);
      //     return this.deadlineIsEmpty();
      //   })
      //   .then(val => {
      //     //   console.log(val);
      //     //   console.log(this.idEmpty, this.startEmpty,this.endDate,this.startDate, this.endEmpty);
      //     // 当代理id没选择
      //     if (this.idEmpty == 0) {
      //       this.$alert("请输入代理ID", "提示", {
      //         confirmButtonText: "确定",
      //         callback: action => {}
      //       });
      //       this.tableArr = []; //表格数据
      //       this.showTable = false; //显示表格和导表按钮
      //       // 当开始日期没选择
      //     } else if (this.idEmpty == 1 && this.deadlineEmpty == 0) {
      //       this.$alert("请选择截止日期", "提示", {
      //         confirmButtonText: "确定",
      //         callback: action => {}
      //       });
      //       this.tableArr = []; //表格数据
      //       this.showTable = false; //显示表格和导表按钮
      //       // 当结束日期没选择
      //     } else if (this.idEmpty == 1 && this.deadlineEmpty == 1) {
      
      if (
        parseInt(new Date(this.deadline).getMonth()) >
          parseInt(new Date().getMonth()) ||
        parseInt(new Date(this.deadline).getFullYear()) >
          parseInt(new Date().getFullYear()) ||
        parseInt(new Date(this.deadline).getDate()) >
          parseInt(new Date().getDate())
      ) {
        this.showTable = false; //隐藏数据框以及导表按钮
        this.tableArr = [];
        this.$alert("时间错误，请重新选择", "提示", {
          confirmButtonText: "确定",
          callback: action => {}
        });
        let str = new Date().getTime(); //将时间转换成毫秒
        this.deadline = str; //还原到最初的时间
      } else {
        //   发送AJAx获得数据---------------------------------------------------------
        this.searchButton();//查找按钮3秒内不能重复点击
        let data = 1;
        if (data == 0) {
          this.showTable = false;
          this.$alert("查无数据", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        } else {
          this.showTable = true;
          this.tableData5 = [
            // 全部
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "全部", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "-62.7", //前日盈收
              monthRoyalty: "-84.1", //本月盈收
              allRoyalty: "75910", //累加总盈收
              children: []
            },
            //   德州扑克
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "德州扑克", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "515.7", //累加总盈收
              children: [
                {
                  gName: "德扑游戏场1",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 64.2
                },
                {
                  gName: "德扑游戏场2",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 35.6
                },
                {
                  gName: "德扑游戏场3",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 15
                },
                {
                  gName: "德扑游戏场4",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 9.8
                },
                {
                  gName: "德扑游戏场6",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 391.2
                }
              ]
            },
            // 牛牛随机庄
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "牛牛-随机庄", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "3026.3", //累加总盈收
              children: [
                {
                  gName: "牛牛体验场-随机庄",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: -204.7
                },
                {
                  gName: "牛牛新手场-随机庄",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 234
                },
                {
                  gName: "牛牛大师场-随机庄",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 2997
                }
              ]
            },
            // 牛牛-看牌抢庄
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "牛牛-看牌抢庄", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "8.25", //累加总盈收
              children: [
                {
                  gName: "牛牛体验场-看牌抢庄",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: -4.95
                },
                {
                  gName: "牛牛新手场-看牌抢庄",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 13.2
                }
              ]
            },
            // 牛牛-通比
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "牛牛-通比", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "3178.077", //累加总盈收
              children: [
                {
                  gName: "牛牛体验场-通比",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: -52.45
                },
                {
                  gName: "牛牛新手场-通比",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 68
                },
                {
                  gName: "牛牛精英场-通比",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1617.922
                },
                {
                  gName: "牛牛大师场-通比",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1544.605
                }
              ]
            },
            // 抢庄牛牛
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "抢庄牛牛", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "-28.5", //本月盈收
              allRoyalty: "3114", //累加总盈收
              children: [
                {
                  gName: "抢庄牛牛-体验",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 256.2
                },
                {
                  gName: "抢庄牛牛-新手",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 232.6
                },
                {
                  gName: "抢庄牛牛-精英",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 895
                },
                {
                  gName: "抢庄牛牛-大师",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: -28.5,
                  allProfits: 1730.2
                }
              ]
            },
            // 李逵捕鱼
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "李逵捕鱼", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "-958.1", //累加总盈收
              children: [
                {
                  gName: "李逵百炮场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 2580.9
                },
                {
                  gName: "李逵千炮场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: -5499
                },
                {
                  gName: "李逵万炮场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1960
                }
              ]
            },
            // 金蟾捕鱼
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "金蟾捕鱼", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "7.1", //本月盈收
              allRoyalty: "778.2", //累加总盈收
              children: [
                {
                  gName: "金蟾0.1元场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 7.1,
                  allProfits: 778.2
                },
                {
                  gName: "金蟾1元场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1224
                },
                {
                  gName: "金蟾10元场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 23190
                }
              ]
            },
            // 欢乐30秒
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "欢乐30秒", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "13,685.75", //累加总盈收
              children: [
                {
                  gName: "30秒-体验场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 785.75
                },
                {
                  gName: "30秒-高级场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 12900
                }
              ]
            },
            // 百牛
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "百牛", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "-62.72", //前日盈收
              monthRoyalty: "-62.72", //本月盈收
              allRoyalty: "8896.575", //累加总盈收
              children: [
                {
                  gName: "百牛-体验场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: -62.72,
                  monthProfits: -62.72,
                  allProfits: -2773.425
                },
                {
                  gName: "百牛-高级场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 11670
                }
              ]
            },
            // 龙虎
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "龙虎", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "252", //累加总盈收
              children: [
                {
                  gName: "龙虎-体验场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 2
                },
                {
                  gName: "龙虎-中级场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 250
                }
              ]
            },
            // 奔驰宝马
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "奔驰宝马", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "-10693", //累加总盈收
              children: [
                {
                  gName: "奔驰宝马-体验场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits:7
                },
                {
                  gName: "奔驰宝马-精英场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: -12500
                },
                {
                  gName: "奔驰宝马-大师场",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1800
                }
              ]
            },
            // 飞禽走兽
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "飞禽走兽", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "8718", //累加总盈收
              children: [
                {
                  gName: "飞禽走兽-平民",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits:618
                },
                {
                  gName: "飞禽走兽-老板",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 100
                },
                {
                  gName: "飞禽走兽-贵族",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 8000
                }
              ]
            },
            // 炸金花
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "炸金花", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "14338.4", //累加总盈收
              children: [
                {
                  gName: "炸金花-体验",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits:1012.5
                },
                {
                  gName: "炸金花-新手",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 228.4
                },
                {
                  gName: "炸金花-精英",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 200
                },
                {
                  gName: "炸金花-大师",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 12897.5
                }
              ]
            },
            // 二八杠
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "二八杠", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "1866.4", //累加总盈收
              children: [
                {
                  gName: "二八杠-体验",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits:48.9
                },
                {
                  gName: "二八杠-大师",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 1817.5
                }
              ]
            },
            // 港式五张
            {
              id: "1034", //代理ID
              name: "BOTEST", //姓名
              gameName: "港式五张", //游戏名称
              todayBet: "0", //当日投注总额
              todayPayout: "0", //当日派彩总额
              todayRevenue: "0", //当日税收总额
              todayRoyalty: "0", //当日盈收
              yesRoyalty: "0", //前日盈收
              monthRoyalty: "0", //本月盈收
              allRoyalty: "4769.339", //累加总盈收
              children: [
                {
                  gName: "港式五张-体验",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits:796.839
                },
                {
                  gName: "港式五张-大师",
                  gBet: 0,
                  gPayout: 0,
                  gRevenue: 0,
                  gProfits: 0,
                  gYesProfits: 0,
                  monthProfits: 0,
                  allProfits: 3972.5
                }
              ]
            }
          ];
        }
      }
      // }
      // });
    },
    // 点击游戏切换游戏类型
    gameType(item){
      this.gameTyper=this.gameTyper==item?'':item;
      if (item=='全部') {
        this.gameTyper=''
      }
    },
    // 导表按钮3秒内不能重复点击，3秒后恢复
    exportButton(){
      this.exportDisable=true;
      this.exportTime=3;
      this.exportCount=setInterval(()=>{
        this.exportTime--;
        // console.log(this.exportTime);
        if (this.exportTime==0) {
          clearInterval(this.exportCount)
          this.exportDisable=false;
        }
      },1000)
    },
    // 导出表格所用
    exportExcel() {
      this.exportButton();//导表按钮3秒内不能重复点击
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
    },
  },
   // 确保清除定时器
  beforeDestroy(){
    // 查找的计时器
    clearInterval(this.searchCount);
    this.searchCount=null;
    // 导表的计时器
    clearInterval(this.exportCount);
    this.exportCount=null;
  }
};
</script>
<style scoped>
.parent {
  /* margin: 10px; */
}
/* 搜索的日期范围 */
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
  font-weight: normal;
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
/* 表格 */
.tableParent {
  margin-top: 10px;
  width: 100%;
}
.table{
  width:100%;
}
.tableTr {
  background-color: #dff0d8;
}
.tableTr td{
  font-weight: 600;
}
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  text-align: center;
}
.incomeTr{
  height:4px;
  background-color:rgb(228, 226, 226);
}
.incomeTr td{
  padding:6px;
}
</style>

