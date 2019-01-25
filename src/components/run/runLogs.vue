<template>
<!-- 游戏日志-->
    <div class="parent">
        <!-- 查找方式 -->
        <div class="searchID">    
          <select v-model="findWay" class="addChoice">
            <option value="所有用户">所有用户</option>
            <option value="用户UID">用户UID</option>
            <option value="游戏账号">游戏账号</option>
            <option value="流水号">流水号</option>
            <option value="牌局编号">牌局编号</option>
          </select>       
            <!-- <el-dropdown trigger="click" @command='handleFindWay' class="addChoice">
                <p class="el-dropdown-link">
                <span>
                    {{findWay}}
                </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="所有用户">所有用户</el-dropdown-item>
                <el-dropdown-item command="用户UID">用户UID</el-dropdown-item>
                <el-dropdown-item command="游戏账号">游戏账号</el-dropdown-item>
                <el-dropdown-item command="流水号">流水号</el-dropdown-item>
                <el-dropdown-item command="牌局编号">牌局编号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
            <div v-show='this.findWay=="用户UID"' class="label">用户UID</div>
            <el-input v-show='this.findWay=="用户UID"' v-model="theUID" @input="UIDTest" clearable> </el-input>
            <div v-show='this.findWay=="游戏账号"' class="label1">账号</div>
            <el-input v-show='this.findWay=="游戏账号"' v-model="account" class="inputWidth" @input="accountTest" clearable></el-input>
            <div :class="this.findWay=='游戏账号'?'label3':'label'" v-show='this.findWay=="所有用户"||this.findWay=="游戏账号"'>代理ID</div>
            <el-input  v-show='this.findWay=="所有用户"||this.findWay=="游戏账号"'v-model="agencyID" :class="this.findWay=='所有用户'?'':'inputWidth'" @input="agencyIDTest" clearable></el-input>
            <div :class="this.findWay=='游戏账号'?'label1':'label'" v-show='this.findWay=="所有用户"||this.findWay=="用户UID"||this.findWay=="游戏账号"'>游戏</div>
            <el-dropdown v-show='this.findWay=="所有用户"||this.findWay=="用户UID"||this.findWay=="游戏账号"' trigger="click" @command='handletype' class="addChoice1">
                <p class="el-dropdown-link">
                <span>
                    {{typeGame}}
                </span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                </p>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item v-for="(item,index) in typeChoiceArr" :key='index' v-bind:command="item">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div v-show='this.findWay=="流水号"' class="label2">单号</div>
            <el-input v-show='this.findWay=="流水号"' v-model="oddNum" @input="oddNumTest1" clearable></el-input>
            <div v-show='this.findWay=="牌局编号"' class="label2">记录单号</div>
            <el-input v-show='this.findWay=="牌局编号"' v-model="recordNum" @input="recordNumTest1" clearable></el-input>
        </div>
         <!-- 搜索的日期范围 -->
        <div class="search">
            <el-row >
                <el-col :span="8"><div class="grid-content" style="borderRadius:4px 0 0 4px;borderRight:0">(北京时间)从</div></el-col>
                <el-col :span="14">
                    <el-date-picker
                      v-model="value5"
                      type="datetimerange"
                      :picker-options="pickerOptions2"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right"
                      >
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" :disabled="searchDisable" class="button" style="marginLeft:-10px;borderRadius:0 4px 4px 0;" @click="searchBy1">
                    查找
                  </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 表格信息 -->
        <div v-show="showTable" class="footer">
            <!-- 导表 -->
          <div  class="toexcel" >
            <el-button type="primary" :disabled="exportDisable" @click="exportExcel" class="button" style="width:70px;position:absolute;right:50px;">
              导表
            </el-button>
          </div>
          <!-- 表格 -->
          <table class="table">
            <tr class="tableTr">
              <td>流水号</td>
              <td>代理ID</td>
              <td>代理姓名</td> 
              <td>线路</td>
              <td rowspan="2" style="display:table-cell; vertical-align:middle">投注</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">有效投注</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">抽水</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">派彩</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">原始分数</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">损益</td> 
              <td rowspan="2" style="display:table-cell; vertical-align:middle">结算分数</td> 
              <td>开始时间(北京)</td>
            </tr>
            <tr class="tableTr">
              <td>牌局编号</td>
              <td>用户UID</td>
              <td>游戏账号</td>
              <td>类型</td>
              <td>结算时间(北京)</td>
            </tr>
            <tbody :style="index%2==0?'':'background-color:#decfd0;'" @click="gameType(item.type)"  v-for="(item,index) in tableData" :key="index"> 
              <tr>
                <td>{{item.oddNum}}</td>
                <td>{{item.id}}</td>
                <td>{{item.name}}</td> 
                <td>{{item.line}}</td>
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.bet}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.useFulBet}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.drew}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.payout}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.firstScore}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.loss}}</td> 
                <td rowspan="2" style="display:table-cell; vertical-align:middle">{{item.finialScore}}</td> 
                <td>{{item.startTime}}</td>
              </tr>
              <tr>
                <td>{{item.recordNum}}</td>
                <td>{{item.UID}}</td>
                <td>{{item.account}}</td>
                <td>{{item.type}}</td>
                <td>{{item.endTime}}</td>
              </tr>
              <tr class="clickBlock">
                <td colspan="12">
                  <!-- 采用组件的方式 -->
                  <template v-if="gameTyper==item.type" type="expand" >
                    <depuGame v-bind:data='item.data' v-if="gameTyper=='德扑游戏场1'" class="clickBlock"></depuGame>
                    <niuniuSuiji v-bind:nnsj='item.nnsj' v-if="gameTyper=='牛牛体验场-随机庄'" class="clickBlock"></niuniuSuiji>
                    <niuniuKPQZ v-bind:nnkpqz='item.nnkpqz' v-if="gameTyper=='牛牛体验场-看牌抢庄'" class="clickBlock"></niuniuKPQZ>
                    <niuniuTB v-bind:nntb='item.nntb' v-if="gameTyper=='牛牛体验场-通比'" class="clickBlock"></niuniuTB>
                    <qzNiuniu v-bind:qznn='item.qznn' v-if="gameTyper=='抢庄牛牛-体验'" class="clickBlock"></qzNiuniu>
                    <bainiu v-bind:bn='item.bn' v-if="gameTyper=='百牛-体验场'" class="clickBlock"></bainiu>
                    <sec30 v-bind:sec30='item.sec30' v-if="gameTyper=='30秒-体验场'" class="clickBlock"></sec30>
                    <jinchan  v-bind:jcData='item.jcData' v-if="gameTyper=='金蟾0.1元场'" class="clickBlock"></jinchan>
                    <longhu  v-bind:lh='item.lh' v-if="gameTyper=='龙虎-体验场'" class="clickBlock"></longhu>
                    <likui v-bind:lkData='item.lkData'  v-if="gameTyper=='李逵百炮场'" class="clickBlock"></likui>
                    <likui v-bind:lkData='item.lkData'  v-if="gameTyper=='李逵千炮场'" class="clickBlock"></likui>
                    <benchi v-bind:bcData='item.bcData' v-if="gameTyper=='奔驰宝马-体验场'" class="clickBlock"></benchi>
                    <feiqin v-bind:fqData='item.fqData' v-if="gameTyper=='飞禽走兽-平民'" class="clickBlock"></feiqin>
                    <zhajinhua v-bind:zjhData='item.zjhData' v-if="gameTyper=='炸金花-体验'" class="clickBlock"></zhajinhua>
                    <erbagang  v-bind:ebgData='item.ebgData' v-if="gameTyper=='二八杠-体验'" class="clickBlock"></erbagang>
                    <gangshiFive  v-bind:gswzData='item.gswzData'  v-if="gameTyper=='港式五张-体验'" class="clickBlock"></gangshiFive>
                  </template>
                </td>
              </tr>
            </tbody>
          </table> 
          <!-- 分页器 -->
          <div class="page" > 
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </div>
    </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import depuGame from '../popBox/depuGame' //德扑
import niuniuSuiji from '../popBox/niuniuSuiji' //牛牛-随机庄
import niuniuKPQZ from '../popBox/niuniuKPQZ' //牛牛-看牌抢庄
import niuniuTB from '../popBox/niuniuTB' //牛牛-通比
import qzNiuniu from '../popBox/qzNiuniu' //抢庄牛牛
import bainiu from '../popBox/bainiu' //百牛
import sec30 from '../popBox/sec30' //30秒
import jinchan from '../popBox/jinchan' //金蟾
import longhu from '../popBox/longhu' //龙虎
import likui from '../popBox/likui' //李逵
import benchi from '../popBox/benchi' //奔驰宝马
import feiqin from '../popBox/feiqin' //飞禽走兽
import zhajinhua from '../popBox/zhajinhua' //炸金花
import erbagang from '../popBox/erbagang' //二八杠
import gangshiFive from '../popBox/gangshiFive' //港式五张
export default {
  // 弹窗的组件
  components:{
    depuGame,
    niuniuSuiji,
    niuniuKPQZ,
    niuniuTB,
    qzNiuniu,
    bainiu,
    sec30,
    jinchan,
    longhu,
    likui,
    benchi,
    feiqin,
    zhajinhua,
    erbagang,
    gangshiFive
  },
  data() {
    return {
    // 计时器-------------------------------------------
    // 查找
    searchDisable:false,//按钮是否禁用
    searchCount:null,//计时器
    searchTime:3,//秒数倒计时
    // 导表
    exportDisable:false,//按钮是否禁用
    exportCount:null,//计时器
    exportTime:3,//秒数倒计时
    // 计时器结束---------------------------------------
    findWay: "所有用户", //默认查找方式
    agencyID: 0, //代理ID
    idEmpty: 0, //代理ID是否为空
    account: 0, //账号
    accountEmpty: 0, //账号是否为空
    theUID: 0, //用户UID
    theUIDEmpty: 0, //用户UID是否为空
    oddNum: 0, //单号
    oddNumTest: 0, //单号是否为空
    recordNum: 0, //记录单号
    recordNumTest: 0, //记录单号是否为空
    surplusScore: false, //剩余分数是否被选中,最近一次进游戏时间是否被选中
    // tableData: [],
    // 全部的游戏数据
    tableData: [
      // 上分
      {
        oddNum: 14767,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'上分',
        endTime:2018
      },
      //德扑游戏场1           
      {
        oddNum: 14768,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 4,
        useFulBet: 4,
        drew: 0,
        payout:0,
        firstScore:5028,
        loss:-4,
        finialScore:5024,
        startTime:2018,
        recordNum:5730,
        UID:110118,
        account:'TEST',
        type:'德扑游戏场1',
        endTime:2018,
        data:[
          {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
          user:[
            {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
            {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
            {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
            {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
            ],
          boutArr:[
            {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
            {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
            {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
            {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
            ]
          },
        ],
      },
      //牛牛随机庄 
      {
        oddNum: 14769,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-随机庄',
        endTime:2018,
        nnsj:[
          {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
          userArr:[
            {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
            {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
            {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
            {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
            ]
          }
        ],
      },
      //牛牛看牌抢庄 
      {
        oddNum: 6838,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 1,
        useFulBet: 1,
        drew: 0,
        payout:0,
        firstScore:10672.508,
        loss:-1,
        finialScore:10671.508,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-看牌抢庄',
        endTime:2018,
        nnkpqz:[
          {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
          userArr:[
            {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
            {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
            {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
            {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
            ]
          }
        ],
      },
      //牛牛通比 
      {
        oddNum: 7023,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 1,
        useFulBet: 1,
        drew: 0,
        payout:0,
        firstScore:10716.578,
        loss:-1,
        finialScore:10715.578,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-通比',
        endTime:2018,
        nntb:[
          {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
          userArr:[
            {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
            {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
            {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
            {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
            ]
          }
        ],
      },
      // 抢庄牛牛-体验
      {
        oddNum: 14770,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'抢庄牛牛-体验',
        endTime:2018,
        qznn:[
          {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
          userArr:[
            {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
            {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
            {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
            {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
            ]
          }
        ],
      },
      // 百牛
      {
        oddNum: 11787,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 2324,
        useFulBet: 2324,
        drew: 0,
        payout:0,
        firstScore:24901.391,
        loss:-2324,
        finialScore:22577.391,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'百牛-体验场',
        endTime:2018,
        bn:[
          {drewPattern:"区域抽水",drew:'2%',
          betArr:[
            {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
            {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
            {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
            {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
            {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
            ]
          }
        ],
      },
      // 30秒
      {
        oddNum: 4907,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 100,
        useFulBet: 0,
        drew: 0,
        payout:100,
        firstScore:1700.045,
        loss:0,
        finialScore:1700.045,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'Zpian',
        type:'30秒-体验场',
        endTime:2018,
        sec30:[
          {drewPattern:"--",drew:'--',
          // 庄家的牌                     //庄点数
          bankerPoker:['101','Q1','81'],bankerNum:'8点',
          // 闲家的牌                     //闲点数
          playerPoker:['53','51','81'],bankerNum:'8点',
          // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
          banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
          // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
          winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
          }
        ],
      },
      // 金蟾0.1元场
      {
        oddNum: 14771,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'金蟾0.1元场',
        endTime:2018,
        jcData:[
          {
            fishArr:[
            {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
            {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
            {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
            {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
            {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
          }
        ]
      },
      // 龙虎
      {
        oddNum: 6214,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 92,
        useFulBet: 92,
        drew: 0,
        payout:184,
        firstScore:10338.227,
        loss:92,
        finialScore:10480.227,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'test',
        type:'龙虎-体验场',
        endTime:2018,
        lh:[
          {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
          // 赔率：庄赢    庄输     和局
          oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
          // 押注：庄赢    庄输     和局
          betBwin:'--',betBloss:'--',betSum:'--',
          // 赢分：庄赢    庄输     和局
          winBwin:'--',winBloss:'--',winSum:'--',
          // 龙虎数据
          dataArr:[
            {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
            // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
            // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
            // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
            },
            {poker:['62'],num:'6,红桃',betAll:7,
            // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
            // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
            // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
            }
          ],
          // 庄家的牌                     //庄点数
          bankerPoker:['101','Q1','81'],bankerNum:'8点',
          // 闲家的牌                     //闲点数
          playerPoker:['53','51','81'],bankerNum:'8点',
          // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
          banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
          // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
          winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
          }
        ],
      },
      // 李逵百炮场
      {
        oddNum: 14772,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'李逵百炮场',
        endTime:2018,
        lkData:[
          {
            fishArr:[
            {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
            {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
            {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
            {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:435.9,getFish:422.6,origin:13.744,now:0.444
          }
        ]
      },
      // 李逵千炮场
      {
        oddNum: 14773,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'李逵千炮场',
        endTime:2018,
        lkData:[
          {
            fishArr:[
            {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
            {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
            {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
            {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:435.9,getFish:422.6,origin:13.744,now:0.444
          }
        ]
      },
      // 奔驰宝马-体验场
      {
        oddNum: 14774,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'奔驰宝马-体验场',
        endTime:2018,
        bcData:[
          {
            drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
            multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
            bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
            win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
          }
        ]
      },
      // 飞禽走兽-平民
      {
        oddNum: 14775,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'飞禽走兽-平民',
        endTime:2018,
        fqData:[
          {
            drewPattern:'押注抽水',drew:'3%',
            mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
            mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
            specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
            MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
            betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
            winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
          }
        ]
      },
      // 炸金花-体验
      {
        oddNum: 14776,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'炸金花-体验',
        endTime:2018,
        zjhData:[
          {
            drewPattern:'赢分抽水',drew:'5%',UID:110118,
            user:[
              {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
              {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
              {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
            ],
            boutArr:[
              {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
              {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
              {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
            ]
          }
        ]
      },
      // 二八杠-体验
      {
        oddNum: 14777,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'二八杠-体验',
        endTime:2018,
        ebgData:[
          {
            drewPattern:'赢分抽水',drew:'5%',UID:110118,
            userData:[
              {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
              {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
              {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
              {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
            ]
          }
        ]
      },
      //港式五张-体验
      {
        oddNum: 14778,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'港式五张-体验',
        endTime:2018,
        gswzData:[
          {
            drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
            user:[
              {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
              {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
              {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
              {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
              {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
            ],
            boutArr:[
              {bout:1,bottom:1,//回合，池底
              userArr:[
                {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                {UID:101117,combine:'散牌，Q',bet:'--'},
                {UID:100662,combine:'散牌，9',bet:'--'},
                {UID:101169,combine:'对子,K加注',bet:1},
                {UID:110118,combine:'散牌，J弃牌',bet:'--'}
              ]}
            ]
          }
        ]
      }
    ],
    typeGame:"全部", //选择的游戏
    gameTyper:"",//点击哪一个游戏的弹窗
    // 时间段的选择--------------------------------------------------------
    pickerOptions2:{
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    },
    value5:'',//时间段的数组；第一项表示开始时间，第二项表示结束时间
    value5Empty:0,//时间段是否为空
    // 时间段的选择结束----------------------------------------------------
    //收益类型数组---------------------------------------------------------
    typeChoiceArr:[
      "全部",
      "上分-下分",
      "德扑游戏场1",
      "德扑游戏场2",
      "德扑游戏场3",
      "德扑游戏场4",
      "德扑游戏场5",
      "德扑游戏场6",
      "德扑定时赛",
      "德扑菜鸟场",
      "德扑普通场",
      "德扑精英场",
      "德扑卓越场",
      "德扑大师场",
      "德扑宗师场",
      "牛牛体验场-随机庄",
      "牛牛新手场-随机庄",
      "牛牛精英场-随机庄",
      "牛牛大师场-随机庄",
      "牛牛体验场-看牌抢庄",
      "牛牛新手场-看牌抢庄",
      "牛牛精英场-看牌抢庄",
      "牛牛大师场-看牌抢庄",
      "牛牛体验场-通比",
      "牛牛新手场-通比",
      "牛牛精英场-通比",
      "牛牛大师场-通比",
      "抢庄牛牛-体验",
      "抢庄牛牛-新手",
      "抢庄牛牛-精英",
      "抢庄牛牛-大师",
      "百牛-体验场",
      "百牛-初级场",
      "百牛-中级场",
      "百牛-高级场",
      "李逵百炮场",
      "李逵千炮场",
      "李逵万炮场",
      "30秒-体验场",
      "30秒-初级场",
      "30秒-中级场",
      "30秒-高级场",
      "金蟾0.1元场",
      "金蟾1元场",
      "金蟾10元场",
      "金蟾测试场",
      "龙虎-体验场",
      "龙虎-初级场",
      "龙虎-中级场",
      "龙虎-高级场",
      "奔驰宝马-体验场",
      "奔驰宝马-新手场",
      "奔驰宝马-精英场",
      "奔驰宝马-大师场",
      "飞禽走兽-平民",
      "飞禽走兽-小资",
      "飞禽走兽-老板",
      "飞禽走兽-贵族",
      "炸金花-体验",
      "炸金花-新手",
      "炸金花-精英",
      "炸金花-大师",
      "二八杠-体验",
      "二八杠-新手",
      "二八杠-精英",
      "二八杠-大师",
      "港式五张-体验",
      "港式五张-新手",
      "港式五张-精英",
      "港式五张-大师"
    ], //收益类型数组结束--------------------------------------------------
    // 分页器
    currentPage3:5,
    showTable:true, //显示查询内容以及分页器以及导出按钮
    };
  },
  created() {
    // 计时器-------------------------------------------
    // 查找
    this.searchDisable=false;//按钮是否禁用
    this.searchCount=null;//计时器
    this.searchTime=3;//秒数倒计时
    // 导表
    this.exportDisable=false;//按钮是否禁用
    this.exportCount=null;//计时器
    this.exportTime=3;//秒数倒计时
    // 计时器结束---------------------------------------
    this.findWay = "所有用户"; //默认查找方式
    this.agencyID = 0; //代理ID
    this.idEmpty = 0; //代理ID是否为空
    this.account = 0; //账号
    this.accountEmpty = 0; //账号是否为空
    this.theUID = 0; //用户UID
    this.theUIDEmpty = 0; //用户UID是否为空
    this.oddNum = 0; //单号
    this.oddNumTest = 0; //单号是否为空
    this.recordNum = 0; //记录单号
    this.recordNumTest = 0; //记录单号是否为空
    this.surplusScore = false; //剩余分数是否被选中,最近一次进游戏时间是否被选中
    // this.tableData = [];
    // 全部的游戏数据
    this.tableData = [
      // 上分
      {
        oddNum: 14767,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'上分',
        endTime:2018
      },
      //德扑游戏场1           
      {
        oddNum: 14768,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 4,
        useFulBet: 4,
        drew: 0,
        payout:0,
        firstScore:5028,
        loss:-4,
        finialScore:5024,
        startTime:2018,
        recordNum:5730,
        UID:110118,
        account:'TEST',
        type:'德扑游戏场1',
        endTime:2018,
        data:[
          {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
          user:[
            {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
            {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
            {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
            {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
            ],
          boutArr:[
            {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
            {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
            {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
            {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
            ]
          },
        ],
      },
      //牛牛体验场-随机庄 
      {
        oddNum: 14769,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-随机庄',
        endTime:2018,
        nnsj:[
          {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
          userArr:[
            {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
            {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
            {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
            {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
            ]
          }
        ],
      },
      //牛牛看牌抢庄 
      {
        oddNum: 6838,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 1,
        useFulBet: 1,
        drew: 0,
        payout:0,
        firstScore:10672.508,
        loss:-1,
        finialScore:10671.508,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-看牌抢庄',
        endTime:2018,
        nnkpqz:[
          {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
          userArr:[
            {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
            {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
            {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
            {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
            ]
          }
        ],
      },
      //牛牛通比 
      {
        oddNum: 7023,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 1,
        useFulBet: 1,
        drew: 0,
        payout:0,
        firstScore:10716.578,
        loss:-1,
        finialScore:10715.578,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'牛牛体验场-通比',
        endTime:2018,
        nntb:[
          {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
          userArr:[
            {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
            {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
            {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
            {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
            ]
          }
        ],
      },
      // 抢庄牛牛-体验
      {
        oddNum: 14770,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'抢庄牛牛-体验',
        endTime:2018,
        qznn:[
          {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
          userArr:[
            {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
            {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
            {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
            {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
            ]
          }
        ],
      },
      // 百牛
      {
        oddNum: 11787,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 2324,
        useFulBet: 2324,
        drew: 0,
        payout:0,
        firstScore:24901.391,
        loss:-2324,
        finialScore:22577.391,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'百牛-体验场',
        endTime:2018,
        bn:[
          {drewPattern:"区域抽水",drew:'2%',
          betArr:[
            {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
            {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
            {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
            {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
            {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
            ]
          }
        ],
      },
      // 30秒
      {
        oddNum: 4907,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 100,
        useFulBet: 0,
        drew: 0,
        payout:100,
        firstScore:1700.045,
        loss:0,
        finialScore:1700.045,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'Zpian',
        type:'30秒-体验场',
        endTime:2018,
        sec30:[
          {drewPattern:"--",drew:'--',
          // 庄家的牌                     //庄点数
          bankerPoker:['101','Q1','81'],bankerNum:'8点',
          // 闲家的牌                     //闲点数
          playerPoker:['53','51','81'],bankerNum:'8点',
          // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
          banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
          // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
          winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
          }
        ],
      },
      // 金蟾0.1元场
      {
        oddNum: 14771,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'金蟾0.1元场',
        endTime:2018,
        jcData:[
          {
            fishArr:[
            {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
            {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
            {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
            {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
            {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
          }
        ]
      },
      // 龙虎
      {
        oddNum: 6214,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 92,
        useFulBet: 92,
        drew: 0,
        payout:184,
        firstScore:10338.227,
        loss:92,
        finialScore:10480.227,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'test',
        type:'龙虎-体验场',
        endTime:2018,
        lh:[
          {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
          // 赔率：庄赢    庄输     和局
          oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
          // 押注：庄赢    庄输     和局
          betBwin:'--',betBloss:'--',betSum:'--',
          // 赢分：庄赢    庄输     和局
          winBwin:'--',winBloss:'--',winSum:'--',
          // 龙虎数据
          dataArr:[
            {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
            // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
            // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
            // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
            winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
            },
            {poker:['62'],num:'6,红桃',betAll:7,
            // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
            // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
            // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
            winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
            }
          ],
          // 庄家的牌                     //庄点数
          bankerPoker:['101','Q1','81'],bankerNum:'8点',
          // 闲家的牌                     //闲点数
          playerPoker:['53','51','81'],bankerNum:'8点',
          // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
          banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
          // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
          winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
          }
        ],
      },
      // 李逵百炮场
      {
        oddNum: 14772,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'李逵百炮场',
        endTime:2018,
        lkData:[
          {
            fishArr:[
            {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
            {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
            {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
            {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:435.9,getFish:422.6,origin:13.744,now:0.444
          }
        ]
      },
      // 李逵千炮场
      {
        oddNum: 14773,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'李逵千炮场',
        endTime:2018,
        lkData:[
          {
            fishArr:[
            {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
            {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
            {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
            {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
            ],
            drewPattern:"每炮抽水",drew:'2.5%',
            bullet:435.9,getFish:422.6,origin:13.744,now:0.444
          }
        ]
      },
      // 奔驰宝马-体验场
      {
        oddNum: 14774,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'奔驰宝马-体验场',
        endTime:2018,
        bcData:[
          {
            drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
            multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
            bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
            win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
          }
        ]
      },
      // 飞禽走兽-平民
      {
        oddNum: 14775,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'飞禽走兽-平民',
        endTime:2018,
        fqData:[
          {
            drewPattern:'押注抽水',drew:'3%',
            mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
            mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
            specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
            MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
            betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
            winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
          }
        ]
      },
      // 炸金花-体验
      {
        oddNum: 14776,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'炸金花-体验',
        endTime:2018,
        zjhData:[
          {
            drewPattern:'赢分抽水',drew:'5%',UID:110118,
            user:[
              {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
              {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
              {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
            ],
            boutArr:[
              {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
              {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
              {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
            ]
          }
        ]
      },
      // 二八杠-体验
      {
        oddNum: 14777,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'二八杠-体验',
        endTime:2018,
        ebgData:[
          {
            drewPattern:'赢分抽水',drew:'5%',UID:110118,
            userData:[
              {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
              {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
              {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
              {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
            ]
          }
        ]
      },
      //港式五张-体验
      {
        oddNum: 14778,
        id: 1034,
        name: "BOTEST",
        line: "--",
        bet: 0,
        useFulBet: 0,
        drew: 0,
        payout:0,
        firstScore:5024,
        loss:1000,
        finialScore:6024,
        startTime:2018,
        recordNum:1034,
        UID:110118,
        account:'TEST',
        type:'港式五张-体验',
        endTime:2018,
        gswzData:[
          {
            drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
            user:[
              {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
              {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
              {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
              {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
              {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
            ],
            boutArr:[
              {bout:1,bottom:1,//回合，池底
              userArr:[
                {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                {UID:101117,combine:'散牌，Q',bet:'--'},
                {UID:100662,combine:'散牌，9',bet:'--'},
                {UID:101169,combine:'对子,K加注',bet:1},
                {UID:110118,combine:'散牌，J弃牌',bet:'--'}
              ]}
            ]
          }
        ]
      }
    ];
    this.typeGame = "全部"; //选择的游戏
    this.gameTyper="";//点击哪一个游戏的弹窗
    // 时间段的选择--------------------------------------------------------
    this.pickerOptions2 = {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    };
    let newDate=new Date().valueOf();
    let strDate = new Date();
    strDate.setHours(0);
    strDate.setMinutes(0);
    strDate.setSeconds(0);
    strDate.setMilliseconds(0);
    let arr = [];
    arr.push(strDate.valueOf())
    arr.push(newDate)
    this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
    this.value5Empty = 0; //时间段是否为空
    // 时间段的选择结束----------------------------------------------------
    //收益类型数组---------------------------------------------------------
    this.typeChoiceArr = [
      "全部",
      "上分-下分",
      "德扑游戏场1",
      "德扑游戏场2",
      "德扑游戏场3",
      "德扑游戏场4",
      "德扑游戏场5",
      "德扑游戏场6",
      "德扑定时赛",
      "德扑菜鸟场",
      "德扑普通场",
      "德扑精英场",
      "德扑卓越场",
      "德扑大师场",
      "德扑宗师场",
      "牛牛体验场-随机庄",
      "牛牛新手场-随机庄",
      "牛牛精英场-随机庄",
      "牛牛大师场-随机庄",
      "牛牛体验场-看牌抢庄",
      "牛牛新手场-看牌抢庄",
      "牛牛精英场-看牌抢庄",
      "牛牛大师场-看牌抢庄",
      "牛牛体验场-通比",
      "牛牛新手场-通比",
      "牛牛精英场-通比",
      "牛牛大师场-通比",
      "抢庄牛牛-体验",
      "抢庄牛牛-新手",
      "抢庄牛牛-精英",
      "抢庄牛牛-大师",
      "百牛-体验场",
      "百牛-初级场",
      "百牛-中级场",
      "百牛-高级场",
      "李逵百炮场",
      "李逵千炮场",
      "李逵万炮场",
      "30秒-体验场",
      "30秒-初级场",
      "30秒-中级场",
      "30秒-高级场",
      "金蟾0.1元场",
      "金蟾1元场",
      "金蟾10元场",
      "金蟾测试场",
      "龙虎-体验场",
      "龙虎-初级场",
      "龙虎-中级场",
      "龙虎-高级场",
      "奔驰宝马-体验场",
      "奔驰宝马-新手场",
      "奔驰宝马-精英场",
      "奔驰宝马-大师场",
      "飞禽走兽-平民",
      "飞禽走兽-小资",
      "飞禽走兽-老板",
      "飞禽走兽-贵族",
      "炸金花-体验",
      "炸金花-新手",
      "炸金花-精英",
      "炸金花-大师",
      "二八杠-体验",
      "二八杠-新手",
      "二八杠-精英",
      "二八杠-大师",
      "港式五张-体验",
      "港式五张-新手",
      "港式五张-精英",
      "港式五张-大师"
    ]; //收益类型数组结束--------------------------------------------------
    // 分页器
    this.currentPage3 = 5;
    this.showTable = true; //显示查询内容以及分页器以及导出按钮
  },
  methods: {
    // // 选择查找方式
    // handleFindWay(command) {
    //   this.findWay = command;
    // },
    // 选择游戏
    handletype(num) {
      this.typeGame = num;
    },
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
    //   用户UID验证
    UIDTest() {
      let reg = /^[1-9]*$/;
      let str = this.theUID;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.theUID = parseInt(this.theUID);
            }, 0);
          } else {
            setTimeout(() => {
              this.theUID = ~~this.theUID;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.theUID = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.theUID = ~~this.theUID;
        }, 0);
      } else {
        setTimeout(() => {
          this.theUID = 0;
        }, 0);
      }
    },
    //  游戏账号验证
    accountTest() {
      let reg = /^[1-9]*$/;
      let str = this.account;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.account = parseInt(this.account);
            }, 0);
          } else {
            setTimeout(() => {
              this.account = ~~this.account;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.account = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.account = ~~this.account;
        }, 0);
      } else {
        setTimeout(() => {
          this.account = 0;
        }, 0);
      }
    },
    //  单号验证
    oddNumTest1() {
      let reg = /^[1-9]*$/;
      let str = this.oddNum;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.oddNum = parseInt(this.oddNum);
            }, 0);
          } else {
            setTimeout(() => {
              this.oddNum = ~~this.oddNum;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.oddNum = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.oddNum = ~~this.oddNum;
        }, 0);
      } else {
        setTimeout(() => {
          this.oddNum = 0;
        }, 0);
      }
    },
    //  记录单号验证
    recordNumTest1() {
      let reg = /^[1-9]*$/;
      let str = this.recordNum;
      if (str.charAt(1) != 0) {
        if (reg.test(str.charAt(1))) {
          if (typeof parseInt(str) == "number") {
            setTimeout(() => {
              this.recordNum = parseInt(this.recordNum);
            }, 0);
          } else {
            setTimeout(() => {
              this.recordNum = ~~this.recordNum;
            }, 0);
          }
        } else {
          setTimeout(() => {
            this.recordNum = 0;
          }, 0);
        }
      } else if (str.charAt(0) != 0 && str.charAt(1) == 0) {
        setTimeout(() => {
          this.recordNum = ~~this.recordNum;
        }, 0);
      } else {
        setTimeout(() => {
          this.recordNum = 0;
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
    // 用户UID不为空
    theUIDIsEmpty() {
      if (this.theUID == 0 || this.theUID == "") {
        this.theUIDEmpty = 0;
      } else {
        this.theUIDEmpty = 1;
      }
      return Promise.resolve(this.theUIDEmpty);
    },
    // 账号不为空
    accountIsEmpty() {
      if (this.account == 0 || this.account == "") {
        this.accountEmpty = 0;
      } else {
        this.accountEmpty = 1;
      }
      return Promise.resolve(this.accountEmpty);
    },
    // 单号不为空
    oddNumIsEmpty() {
      if (this.oddNum == 0 || this.oddNum == "") {
        this.oddNumTest = 0;
      } else {
        this.oddNumTest = 1;
      }
      return Promise.resolve(this.oddNumTest);
    },
    // 记录单号不为空
    recordNumIsEmpty() {
      if (this.recordNum == 0 || this.recordNum == "") {
        this.recordNumTest = 0;
      } else {
        this.recordNumTest = 1;
      }
      return Promise.resolve(this.recordNumTest);
    },
    // 时间段不为空
    value5IsEmpty() {
      if (this.value5 == "" || this.value5 == null) {
        this.value5Empty = 0;
      } else {
        this.value5Empty = 1;
      }
      return Promise.resolve(this.value5Empty);
    },
    // 根据输入内容查找----------------------------------------------------------AJAX
    searchBy1() {
      let str = this.findWay;
      if (str == "所有用户") {
        this.idIsEmpty()
          .then(val => {
            return this.value5IsEmpty();
          })
          .then(val => {
            if (this.idEmpty == 0) {
              this.$alert("请输入代理ID", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.idEmpty == 1 && this.value5Empty == 0) {
              this.$alert("请选择时间段", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.idEmpty == 1 && this.value5Empty == 1) {
              let arr = this.value5;
              // 时间限制，暂不支持跨月查询，日期不可以超过本年本月本日，
              if (
                new Date(arr[1]).getMonth() !=
                new Date(arr[0]).getMonth()
              ) {
                this.showTable = false;
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let newDate=new Date().valueOf();
                let strDate = new Date();
                strDate.setHours(0);
                strDate.setMinutes(0);
                strDate.setSeconds(0);
                strDate.setMilliseconds(0);
                let arr = [];
                arr.push(strDate.valueOf())
                arr.push(newDate)
                this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                this.value5Empty = 0; //时间段是否为空
                // 超过本月查不到数据
              } else if (parseInt(new Date(arr[0]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[1]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[0]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[1]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[0]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getHours())>parseInt(new Date().getHours())
              ||parseInt(new Date(arr[1]).getMinutes())>parseInt(new Date().getMinutes())
              ||parseInt(new Date(arr[1]).getSeconds())>parseInt(new Date().getSeconds())
              ||parseInt(new Date(arr[1]).getMilliseconds())>parseInt(new Date().getMilliseconds())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let newDate=new Date().valueOf();
                  let strDate = new Date();
                  strDate.setHours(0);
                  strDate.setMinutes(0);
                  strDate.setSeconds(0);
                  strDate.setMilliseconds(0);
                  let arr = [];
                  arr.push(strDate.valueOf())
                  arr.push(newDate)
                  this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                  this.value5Empty = 0; //时间段是否为空
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击
                this.showTable = true;
                // 全部的游戏数据
                this.tableData = [
                  // 上分
                  {
                    oddNum: 14767,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'上分',
                    endTime:2018
                  },
                  //德扑游戏场1           
                  {
                    oddNum: 14768,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 4,
                    useFulBet: 4,
                    drew: 0,
                    payout:0,
                    firstScore:5028,
                    loss:-4,
                    finialScore:5024,
                    startTime:2018,
                    recordNum:5730,
                    UID:110118,
                    account:'TEST',
                    type:'德扑游戏场1',
                    endTime:2018,
                    data:[
                      {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
                      user:[
                        {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
                        {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
                        {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
                        {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
                        ],
                      boutArr:[
                        {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
                        {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
                        {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
                        {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
                        ]
                      },
                    ],
                  },
                  //牛牛体验场-随机庄 
                  {
                    oddNum: 14769,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-随机庄',
                    endTime:2018,
                    nnsj:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
                        {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
                        {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
                        {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛看牌抢庄 
                  {
                    oddNum: 6838,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10672.508,
                    loss:-1,
                    finialScore:10671.508,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-看牌抢庄',
                    endTime:2018,
                    nnkpqz:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
                        {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
                        {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
                        {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛通比 
                  {
                    oddNum: 7023,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10716.578,
                    loss:-1,
                    finialScore:10715.578,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-通比',
                    endTime:2018,
                    nntb:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
                        {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
                        {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
                        {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
                        ]
                      }
                    ],
                  },
                  // 抢庄牛牛-体验
                  {
                    oddNum: 14770,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'抢庄牛牛-体验',
                    endTime:2018,
                    qznn:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
                        {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
                        {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
                        {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
                        ]
                      }
                    ],
                  },
                  // 百牛
                  {
                    oddNum: 11787,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 2324,
                    useFulBet: 2324,
                    drew: 0,
                    payout:0,
                    firstScore:24901.391,
                    loss:-2324,
                    finialScore:22577.391,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'百牛-体验场',
                    endTime:2018,
                    bn:[
                      {drewPattern:"区域抽水",drew:'2%',
                      betArr:[
                        {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
                        {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
                        {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
                        {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
                        {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
                        ]
                      }
                    ],
                  },
                  // 30秒
                  {
                    oddNum: 4907,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 100,
                    useFulBet: 0,
                    drew: 0,
                    payout:100,
                    firstScore:1700.045,
                    loss:0,
                    finialScore:1700.045,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'Zpian',
                    type:'30秒-体验场',
                    endTime:2018,
                    sec30:[
                      {drewPattern:"--",drew:'--',
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 金蟾0.1元场
                  {
                    oddNum: 14771,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'金蟾0.1元场',
                    endTime:2018,
                    jcData:[
                      {
                        fishArr:[
                        {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
                        {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
                        {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
                        {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
                        {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
                      }
                    ]
                  },
                  // 龙虎
                  {
                    oddNum: 6214,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 92,
                    useFulBet: 92,
                    drew: 0,
                    payout:184,
                    firstScore:10338.227,
                    loss:92,
                    finialScore:10480.227,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'test',
                    type:'龙虎-体验场',
                    endTime:2018,
                    lh:[
                      {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
                      // 赔率：庄赢    庄输     和局
                      oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
                      // 押注：庄赢    庄输     和局
                      betBwin:'--',betBloss:'--',betSum:'--',
                      // 赢分：庄赢    庄输     和局
                      winBwin:'--',winBloss:'--',winSum:'--',
                      // 龙虎数据
                      dataArr:[
                        {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
                        // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        },
                        {poker:['62'],num:'6,红桃',betAll:7,
                        // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        }
                      ],
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 李逵百炮场
                  {
                    oddNum: 14772,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵百炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 李逵千炮场
                  {
                    oddNum: 14773,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵千炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 奔驰宝马-体验场
                  {
                    oddNum: 14774,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'奔驰宝马-体验场',
                    endTime:2018,
                    bcData:[
                      {
                        drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
                        multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
                        bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
                        win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
                      }
                    ]
                  },
                  // 飞禽走兽-平民
                  {
                    oddNum: 14775,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'飞禽走兽-平民',
                    endTime:2018,
                    fqData:[
                      {
                        drewPattern:'押注抽水',drew:'3%',
                        mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
                        mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
                        specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
                        MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
                        betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
                        winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
                      }
                    ]
                  },
                  // 炸金花-体验
                  {
                    oddNum: 14776,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'炸金花-体验',
                    endTime:2018,
                    zjhData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        user:[
                          {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
                          {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
                          {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
                        ],
                        boutArr:[
                          {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
                          {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
                          {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
                        ]
                      }
                    ]
                  },
                  // 二八杠-体验
                  {
                    oddNum: 14777,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'二八杠-体验',
                    endTime:2018,
                    ebgData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        userData:[
                          {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
                          {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
                          {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
                          {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
                        ]
                      }
                    ]
                  },
                  //港式五张-体验
                  {
                    oddNum: 14778,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'港式五张-体验',
                    endTime:2018,
                    gswzData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
                        user:[
                          {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
                          {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
                          {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
                          {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
                          {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
                        ],
                        boutArr:[
                          {bout:1,bottom:1,//回合，池底
                          userArr:[
                            {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                            {UID:101117,combine:'散牌，Q',bet:'--'},
                            {UID:100662,combine:'散牌，9',bet:'--'},
                            {UID:101169,combine:'对子,K加注',bet:1},
                            {UID:110118,combine:'散牌，J弃牌',bet:'--'}
                          ]}
                        ]
                      }
                    ]
                  }
                ];
              }
            }
          });
      } else if (str == "用户UID") {
        this.theUIDIsEmpty()
          .then(val => {
            return this.value5IsEmpty();
          })
          .then(val => {
            if (this.theUIDEmpty == 0) {
              this.$alert("请输入用户UID", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.theUIDEmpty == 1 && this.value5Empty == 0) {
              this.$alert("请选择时间段", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.theUIDEmpty == 1 && this.value5Empty == 1) {
              let arr = this.value5;
              // 时间限制，暂不支持跨月查询，日期不可以超过本年本月本日，
              if (
                new Date(arr[1]).getMonth() !=
                new Date(arr[0]).getMonth()
              ) {
                this.showTable = false;
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let newDate=new Date().valueOf();
                let strDate = new Date();
                strDate.setHours(0);
                strDate.setMinutes(0);
                strDate.setSeconds(0);
                strDate.setMilliseconds(0);
                let arr = [];
                arr.push(strDate.valueOf())
                arr.push(newDate)
                this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                this.value5Empty = 0; //时间段是否为空
                // 超过本月查不到数据
              } else if (parseInt(new Date(arr[0]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[1]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[0]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[1]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[0]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getHours())>parseInt(new Date().getHours())
              ||parseInt(new Date(arr[1]).getMinutes())>parseInt(new Date().getMinutes())
              ||parseInt(new Date(arr[1]).getSeconds())>parseInt(new Date().getSeconds())
              ||parseInt(new Date(arr[1]).getMilliseconds())>parseInt(new Date().getMilliseconds())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let newDate=new Date().valueOf();
                  let strDate = new Date();
                  strDate.setHours(0);
                  strDate.setMinutes(0);
                  strDate.setSeconds(0);
                  strDate.setMilliseconds(0);
                  let arr = [];
                  arr.push(strDate.valueOf())
                  arr.push(newDate)
                  this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                  this.value5Empty = 0; //时间段是否为空
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击
                this.showTable = true;
                // 全部的游戏数据
                this.tableData = [
                  // 上分
                  {
                    oddNum: 14767,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'上分',
                    endTime:2018
                  },
                  //德扑游戏场1           
                  {
                    oddNum: 14768,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 4,
                    useFulBet: 4,
                    drew: 0,
                    payout:0,
                    firstScore:5028,
                    loss:-4,
                    finialScore:5024,
                    startTime:2018,
                    recordNum:5730,
                    UID:110118,
                    account:'TEST',
                    type:'德扑游戏场1',
                    endTime:2018,
                    data:[
                      {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
                      user:[
                        {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
                        {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
                        {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
                        {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
                        ],
                      boutArr:[
                        {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
                        {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
                        {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
                        {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
                        ]
                      },
                    ],
                  },
                  //牛牛体验场-随机庄 
                  {
                    oddNum: 14769,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-随机庄',
                    endTime:2018,
                    nnsj:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
                        {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
                        {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
                        {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛看牌抢庄 
                  {
                    oddNum: 6838,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10672.508,
                    loss:-1,
                    finialScore:10671.508,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-看牌抢庄',
                    endTime:2018,
                    nnkpqz:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
                        {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
                        {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
                        {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛通比 
                  {
                    oddNum: 7023,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10716.578,
                    loss:-1,
                    finialScore:10715.578,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-通比',
                    endTime:2018,
                    nntb:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
                        {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
                        {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
                        {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
                        ]
                      }
                    ],
                  },
                  // 抢庄牛牛-体验
                  {
                    oddNum: 14770,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'抢庄牛牛-体验',
                    endTime:2018,
                    qznn:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
                        {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
                        {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
                        {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
                        ]
                      }
                    ],
                  },
                  // 百牛
                  {
                    oddNum: 11787,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 2324,
                    useFulBet: 2324,
                    drew: 0,
                    payout:0,
                    firstScore:24901.391,
                    loss:-2324,
                    finialScore:22577.391,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'百牛-体验场',
                    endTime:2018,
                    bn:[
                      {drewPattern:"区域抽水",drew:'2%',
                      betArr:[
                        {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
                        {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
                        {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
                        {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
                        {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
                        ]
                      }
                    ],
                  },
                  // 30秒
                  {
                    oddNum: 4907,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 100,
                    useFulBet: 0,
                    drew: 0,
                    payout:100,
                    firstScore:1700.045,
                    loss:0,
                    finialScore:1700.045,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'Zpian',
                    type:'30秒-体验场',
                    endTime:2018,
                    sec30:[
                      {drewPattern:"--",drew:'--',
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 金蟾0.1元场
                  {
                    oddNum: 14771,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'金蟾0.1元场',
                    endTime:2018,
                    jcData:[
                      {
                        fishArr:[
                        {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
                        {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
                        {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
                        {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
                        {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
                      }
                    ]
                  },
                  // 龙虎
                  {
                    oddNum: 6214,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 92,
                    useFulBet: 92,
                    drew: 0,
                    payout:184,
                    firstScore:10338.227,
                    loss:92,
                    finialScore:10480.227,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'test',
                    type:'龙虎-体验场',
                    endTime:2018,
                    lh:[
                      {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
                      // 赔率：庄赢    庄输     和局
                      oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
                      // 押注：庄赢    庄输     和局
                      betBwin:'--',betBloss:'--',betSum:'--',
                      // 赢分：庄赢    庄输     和局
                      winBwin:'--',winBloss:'--',winSum:'--',
                      // 龙虎数据
                      dataArr:[
                        {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
                        // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        },
                        {poker:['62'],num:'6,红桃',betAll:7,
                        // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        }
                      ],
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 李逵百炮场
                  {
                    oddNum: 14772,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵百炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 李逵千炮场
                  {
                    oddNum: 14773,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵千炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 奔驰宝马-体验场
                  {
                    oddNum: 14774,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'奔驰宝马-体验场',
                    endTime:2018,
                    bcData:[
                      {
                        drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
                        multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
                        bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
                        win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
                      }
                    ]
                  },
                  // 飞禽走兽-平民
                  {
                    oddNum: 14775,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'飞禽走兽-平民',
                    endTime:2018,
                    fqData:[
                      {
                        drewPattern:'押注抽水',drew:'3%',
                        mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
                        mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
                        specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
                        MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
                        betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
                        winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
                      }
                    ]
                  },
                  // 炸金花-体验
                  {
                    oddNum: 14776,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'炸金花-体验',
                    endTime:2018,
                    zjhData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        user:[
                          {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
                          {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
                          {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
                        ],
                        boutArr:[
                          {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
                          {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
                          {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
                        ]
                      }
                    ]
                  },
                  // 二八杠-体验
                  {
                    oddNum: 14777,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'二八杠-体验',
                    endTime:2018,
                    ebgData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        userData:[
                          {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
                          {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
                          {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
                          {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
                        ]
                      }
                    ]
                  },
                  //港式五张-体验
                  {
                    oddNum: 14778,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'港式五张-体验',
                    endTime:2018,
                    gswzData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
                        user:[
                          {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
                          {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
                          {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
                          {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
                          {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
                        ],
                        boutArr:[
                          {bout:1,bottom:1,//回合，池底
                          userArr:[
                            {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                            {UID:101117,combine:'散牌，Q',bet:'--'},
                            {UID:100662,combine:'散牌，9',bet:'--'},
                            {UID:101169,combine:'对子,K加注',bet:1},
                            {UID:110118,combine:'散牌，J弃牌',bet:'--'}
                          ]}
                        ]
                      }
                    ]
                  }
                ];
              }
            }
          });
      } else if (str == "游戏账号") {
        this.accountIsEmpty()
          .then(val => {
            return this.idIsEmpty();
          })
          .then(val => {
            return this.value5IsEmpty();
          })
          .then(val => {
            if (this.accountEmpty == 0) {
              this.$alert("请输入账号", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.accountEmpty == 1 && this.idEmpty == 0) {
              this.$alert("请输入代理ID", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.accountEmpty == 1 &&
              this.idEmpty == 1 &&
              this.value5Empty == 0
            ) {
              this.$alert("请选择时间段", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (
              this.accountEmpty == 1 &&
              this.idEmpty == 1 &&
              this.value5Empty == 1
            ) {
              let arr = this.value5;
              // 时间限制，暂不支持跨月查询，日期不可以超过本年本月本日，
              if (
                new Date(arr[1]).getMonth() !=
                new Date(arr[0]).getMonth()
              ) {
                this.showTable = false;
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let newDate=new Date().valueOf();
                let strDate = new Date();
                strDate.setHours(0);
                strDate.setMinutes(0);
                strDate.setSeconds(0);
                strDate.setMilliseconds(0);
                let arr = [];
                arr.push(strDate.valueOf())
                arr.push(newDate)
                this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                this.value5Empty = 0; //时间段是否为空
                // 超过本月查不到数据
              } else if (parseInt(new Date(arr[0]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[1]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[0]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[1]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[0]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getHours())>parseInt(new Date().getHours())
              ||parseInt(new Date(arr[1]).getMinutes())>parseInt(new Date().getMinutes())
              ||parseInt(new Date(arr[1]).getSeconds())>parseInt(new Date().getSeconds())
              ||parseInt(new Date(arr[1]).getMilliseconds())>parseInt(new Date().getMilliseconds())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let newDate=new Date().valueOf();
                  let strDate = new Date();
                  strDate.setHours(0);
                  strDate.setMinutes(0);
                  strDate.setSeconds(0);
                  strDate.setMilliseconds(0);
                  let arr = [];
                  arr.push(strDate.valueOf())
                  arr.push(newDate)
                  this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                  this.value5Empty = 0; //时间段是否为空
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击
                this.showTable = true;
                // 全部的游戏数据
                this.tableData = [
                  // 上分
                  {
                    oddNum: 14767,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'上分',
                    endTime:2018
                  },
                  //德扑游戏场1           
                  {
                    oddNum: 14768,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 4,
                    useFulBet: 4,
                    drew: 0,
                    payout:0,
                    firstScore:5028,
                    loss:-4,
                    finialScore:5024,
                    startTime:2018,
                    recordNum:5730,
                    UID:110118,
                    account:'TEST',
                    type:'德扑游戏场1',
                    endTime:2018,
                    data:[
                      {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
                      user:[
                        {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
                        {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
                        {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
                        {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
                        ],
                      boutArr:[
                        {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
                        {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
                        {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
                        {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
                        ]
                      },
                    ],
                  },
                  //牛牛体验场-随机庄 
                  {
                    oddNum: 14769,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-随机庄',
                    endTime:2018,
                    nnsj:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
                        {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
                        {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
                        {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛看牌抢庄 
                  {
                    oddNum: 6838,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10672.508,
                    loss:-1,
                    finialScore:10671.508,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-看牌抢庄',
                    endTime:2018,
                    nnkpqz:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
                        {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
                        {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
                        {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛通比 
                  {
                    oddNum: 7023,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10716.578,
                    loss:-1,
                    finialScore:10715.578,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-通比',
                    endTime:2018,
                    nntb:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
                        {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
                        {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
                        {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
                        ]
                      }
                    ],
                  },
                  // 抢庄牛牛-体验
                  {
                    oddNum: 14770,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'抢庄牛牛-体验',
                    endTime:2018,
                    qznn:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
                        {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
                        {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
                        {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
                        ]
                      }
                    ],
                  },
                  // 百牛
                  {
                    oddNum: 11787,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 2324,
                    useFulBet: 2324,
                    drew: 0,
                    payout:0,
                    firstScore:24901.391,
                    loss:-2324,
                    finialScore:22577.391,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'百牛-体验场',
                    endTime:2018,
                    bn:[
                      {drewPattern:"区域抽水",drew:'2%',
                      betArr:[
                        {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
                        {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
                        {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
                        {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
                        {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
                        ]
                      }
                    ],
                  },
                  // 30秒
                  {
                    oddNum: 4907,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 100,
                    useFulBet: 0,
                    drew: 0,
                    payout:100,
                    firstScore:1700.045,
                    loss:0,
                    finialScore:1700.045,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'Zpian',
                    type:'30秒-体验场',
                    endTime:2018,
                    sec30:[
                      {drewPattern:"--",drew:'--',
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 金蟾0.1元场
                  {
                    oddNum: 14771,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'金蟾0.1元场',
                    endTime:2018,
                    jcData:[
                      {
                        fishArr:[
                        {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
                        {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
                        {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
                        {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
                        {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
                      }
                    ]
                  },
                  // 龙虎
                  {
                    oddNum: 6214,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 92,
                    useFulBet: 92,
                    drew: 0,
                    payout:184,
                    firstScore:10338.227,
                    loss:92,
                    finialScore:10480.227,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'test',
                    type:'龙虎-体验场',
                    endTime:2018,
                    lh:[
                      {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
                      // 赔率：庄赢    庄输     和局
                      oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
                      // 押注：庄赢    庄输     和局
                      betBwin:'--',betBloss:'--',betSum:'--',
                      // 赢分：庄赢    庄输     和局
                      winBwin:'--',winBloss:'--',winSum:'--',
                      // 龙虎数据
                      dataArr:[
                        {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
                        // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        },
                        {poker:['62'],num:'6,红桃',betAll:7,
                        // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        }
                      ],
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 李逵百炮场
                  {
                    oddNum: 14772,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵百炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 李逵千炮场
                  {
                    oddNum: 14773,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵千炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 奔驰宝马-体验场
                  {
                    oddNum: 14774,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'奔驰宝马-体验场',
                    endTime:2018,
                    bcData:[
                      {
                        drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
                        multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
                        bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
                        win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
                      }
                    ]
                  },
                  // 飞禽走兽-平民
                  {
                    oddNum: 14775,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'飞禽走兽-平民',
                    endTime:2018,
                    fqData:[
                      {
                        drewPattern:'押注抽水',drew:'3%',
                        mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
                        mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
                        specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
                        MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
                        betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
                        winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
                      }
                    ]
                  },
                  // 炸金花-体验
                  {
                    oddNum: 14776,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'炸金花-体验',
                    endTime:2018,
                    zjhData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        user:[
                          {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
                          {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
                          {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
                        ],
                        boutArr:[
                          {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
                          {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
                          {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
                        ]
                      }
                    ]
                  },
                  // 二八杠-体验
                  {
                    oddNum: 14777,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'二八杠-体验',
                    endTime:2018,
                    ebgData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        userData:[
                          {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
                          {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
                          {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
                          {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
                        ]
                      }
                    ]
                  },
                  //港式五张-体验
                  {
                    oddNum: 14778,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'港式五张-体验',
                    endTime:2018,
                    gswzData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
                        user:[
                          {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
                          {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
                          {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
                          {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
                          {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
                        ],
                        boutArr:[
                          {bout:1,bottom:1,//回合，池底
                          userArr:[
                            {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                            {UID:101117,combine:'散牌，Q',bet:'--'},
                            {UID:100662,combine:'散牌，9',bet:'--'},
                            {UID:101169,combine:'对子,K加注',bet:1},
                            {UID:110118,combine:'散牌，J弃牌',bet:'--'}
                          ]}
                        ]
                      }
                    ]
                  }
                ];
              }
            }
          });
      } else if (str == "流水号") {
        this.oddNumIsEmpty()
          .then(val => {
            return this.value5IsEmpty();
          })
          .then(val => {
            if (this.oddNumTest == 0) {
              this.$alert("请输入单号", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.oddNumTest == 1 && this.value5Empty == 0) {
              this.$alert("请选择时间段", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.oddNumTest == 1 && this.value5Empty == 1) {
              let arr = this.value5;
              // 时间限制，暂不支持跨月查询，日期不可以超过本年本月本日，
              if (
                new Date(arr[1]).getMonth() !=
                new Date(arr[0]).getMonth()
              ) {
                this.showTable = false;
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let newDate=new Date().valueOf();
                let strDate = new Date();
                strDate.setHours(0);
                strDate.setMinutes(0);
                strDate.setSeconds(0);
                strDate.setMilliseconds(0);
                let arr = [];
                arr.push(strDate.valueOf())
                arr.push(newDate)
                this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                this.value5Empty = 0; //时间段是否为空
                // 超过本月查不到数据
              } else if (parseInt(new Date(arr[0]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[1]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[0]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[1]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[0]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getHours())>parseInt(new Date().getHours())
              ||parseInt(new Date(arr[1]).getMinutes())>parseInt(new Date().getMinutes())
              ||parseInt(new Date(arr[1]).getSeconds())>parseInt(new Date().getSeconds())
              ||parseInt(new Date(arr[1]).getMilliseconds())>parseInt(new Date().getMilliseconds())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let newDate=new Date().valueOf();
                  let strDate = new Date();
                  strDate.setHours(0);
                  strDate.setMinutes(0);
                  strDate.setSeconds(0);
                  strDate.setMilliseconds(0);
                  let arr = [];
                  arr.push(strDate.valueOf())
                  arr.push(newDate)
                  this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                  this.value5Empty = 0; //时间段是否为空
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击
                this.showTable = true;
                // 全部的游戏数据
                this.tableData = [
                  // 上分
                  {
                    oddNum: 14767,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'上分',
                    endTime:2018
                  },
                  //德扑游戏场1           
                  {
                    oddNum: 14768,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 4,
                    useFulBet: 4,
                    drew: 0,
                    payout:0,
                    firstScore:5028,
                    loss:-4,
                    finialScore:5024,
                    startTime:2018,
                    recordNum:5730,
                    UID:110118,
                    account:'TEST',
                    type:'德扑游戏场1',
                    endTime:2018,
                    data:[
                      {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
                      user:[
                        {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
                        {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
                        {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
                        {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
                        ],
                      boutArr:[
                        {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
                        {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
                        {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
                        {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
                        ]
                      },
                    ],
                  },
                  //牛牛体验场-随机庄 
                  {
                    oddNum: 14769,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-随机庄',
                    endTime:2018,
                    nnsj:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
                        {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
                        {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
                        {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛看牌抢庄 
                  {
                    oddNum: 6838,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10672.508,
                    loss:-1,
                    finialScore:10671.508,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-看牌抢庄',
                    endTime:2018,
                    nnkpqz:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
                        {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
                        {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
                        {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛通比 
                  {
                    oddNum: 7023,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10716.578,
                    loss:-1,
                    finialScore:10715.578,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-通比',
                    endTime:2018,
                    nntb:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
                        {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
                        {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
                        {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
                        ]
                      }
                    ],
                  },
                  // 抢庄牛牛-体验
                  {
                    oddNum: 14770,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'抢庄牛牛-体验',
                    endTime:2018,
                    qznn:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
                        {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
                        {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
                        {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
                        ]
                      }
                    ],
                  },
                  // 百牛
                  {
                    oddNum: 11787,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 2324,
                    useFulBet: 2324,
                    drew: 0,
                    payout:0,
                    firstScore:24901.391,
                    loss:-2324,
                    finialScore:22577.391,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'百牛-体验场',
                    endTime:2018,
                    bn:[
                      {drewPattern:"区域抽水",drew:'2%',
                      betArr:[
                        {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
                        {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
                        {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
                        {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
                        {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
                        ]
                      }
                    ],
                  },
                  // 30秒
                  {
                    oddNum: 4907,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 100,
                    useFulBet: 0,
                    drew: 0,
                    payout:100,
                    firstScore:1700.045,
                    loss:0,
                    finialScore:1700.045,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'Zpian',
                    type:'30秒-体验场',
                    endTime:2018,
                    sec30:[
                      {drewPattern:"--",drew:'--',
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 金蟾0.1元场
                  {
                    oddNum: 14771,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'金蟾0.1元场',
                    endTime:2018,
                    jcData:[
                      {
                        fishArr:[
                        {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
                        {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
                        {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
                        {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
                        {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
                      }
                    ]
                  },
                  // 龙虎
                  {
                    oddNum: 6214,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 92,
                    useFulBet: 92,
                    drew: 0,
                    payout:184,
                    firstScore:10338.227,
                    loss:92,
                    finialScore:10480.227,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'test',
                    type:'龙虎-体验场',
                    endTime:2018,
                    lh:[
                      {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
                      // 赔率：庄赢    庄输     和局
                      oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
                      // 押注：庄赢    庄输     和局
                      betBwin:'--',betBloss:'--',betSum:'--',
                      // 赢分：庄赢    庄输     和局
                      winBwin:'--',winBloss:'--',winSum:'--',
                      // 龙虎数据
                      dataArr:[
                        {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
                        // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        },
                        {poker:['62'],num:'6,红桃',betAll:7,
                        // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        }
                      ],
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 李逵百炮场
                  {
                    oddNum: 14772,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵百炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 李逵千炮场
                  {
                    oddNum: 14773,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵千炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 奔驰宝马-体验场
                  {
                    oddNum: 14774,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'奔驰宝马-体验场',
                    endTime:2018,
                    bcData:[
                      {
                        drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
                        multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
                        bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
                        win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
                      }
                    ]
                  },
                  // 飞禽走兽-平民
                  {
                    oddNum: 14775,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'飞禽走兽-平民',
                    endTime:2018,
                    fqData:[
                      {
                        drewPattern:'押注抽水',drew:'3%',
                        mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
                        mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
                        specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
                        MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
                        betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
                        winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
                      }
                    ]
                  },
                  // 炸金花-体验
                  {
                    oddNum: 14776,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'炸金花-体验',
                    endTime:2018,
                    zjhData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        user:[
                          {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
                          {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
                          {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
                        ],
                        boutArr:[
                          {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
                          {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
                          {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
                        ]
                      }
                    ]
                  },
                  // 二八杠-体验
                  {
                    oddNum: 14777,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'二八杠-体验',
                    endTime:2018,
                    ebgData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        userData:[
                          {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
                          {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
                          {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
                          {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
                        ]
                      }
                    ]
                  },
                  //港式五张-体验
                  {
                    oddNum: 14778,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'港式五张-体验',
                    endTime:2018,
                    gswzData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
                        user:[
                          {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
                          {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
                          {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
                          {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
                          {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
                        ],
                        boutArr:[
                          {bout:1,bottom:1,//回合，池底
                          userArr:[
                            {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                            {UID:101117,combine:'散牌，Q',bet:'--'},
                            {UID:100662,combine:'散牌，9',bet:'--'},
                            {UID:101169,combine:'对子,K加注',bet:1},
                            {UID:110118,combine:'散牌，J弃牌',bet:'--'}
                          ]}
                        ]
                      }
                    ]
                  }
                ];
              }
            }
          });
      } else if (str == "牌局编号") {
        this.recordNumIsEmpty()
          .then(val => {
            return this.value5IsEmpty();
          })
          .then(val => {
            if (this.recordNumTest == 0) {
              this.$alert("请输入记录单号", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.recordNumTest == 1 && this.value5Empty == 0) {
              this.$alert("请选择时间段", "提示", {
                confirmButtomText: "确定",
                callback: action => {}
              });
              this.showTable = false;
            } else if (this.recordNumTest == 1 && this.value5Empty == 1) {
              let arr = this.value5;
              // 时间限制，暂不支持跨月查询，日期不可以超过本年本月本日，
              if (
                new Date(arr[1]).getMonth() !=
                new Date(arr[0]).getMonth()
              ) {
                this.showTable = false;
                this.tableArr = []; //表格数据
                this.$alert("暂不支持跨月查询", "提示", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
                let newDate=new Date().valueOf();
                let strDate = new Date();
                strDate.setHours(0);
                strDate.setMinutes(0);
                strDate.setSeconds(0);
                strDate.setMilliseconds(0);
                let arr = [];
                arr.push(strDate.valueOf())
                arr.push(newDate)
                this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                this.value5Empty = 0; //时间段是否为空
                // 超过本月查不到数据
              } else if (parseInt(new Date(arr[0]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[1]).getMonth())>parseInt(new Date().getMonth())
              ||parseInt(new Date(arr[0]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[1]).getFullYear())>parseInt(new Date().getFullYear())
              ||parseInt(new Date(arr[0]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getDate())>parseInt(new Date().getDate())
              ||parseInt(new Date(arr[1]).getHours())>parseInt(new Date().getHours())
              ||parseInt(new Date(arr[1]).getMinutes())>parseInt(new Date().getMinutes())
              ||parseInt(new Date(arr[1]).getSeconds())>parseInt(new Date().getSeconds())
              ||parseInt(new Date(arr[1]).getMilliseconds())>parseInt(new Date().getMilliseconds())
              ) {
                  this.showTable = false;//隐藏数据框以及导表按钮
                  this.tableArr=[]
                  this.$alert("时间错误，请重新选择", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  let newDate=new Date().valueOf();
                  let strDate = new Date();
                  strDate.setHours(0);
                  strDate.setMinutes(0);
                  strDate.setSeconds(0);
                  strDate.setMilliseconds(0);
                  let arr = [];
                  arr.push(strDate.valueOf())
                  arr.push(newDate)
                  this.value5 = arr;//时间段的数组；第一项表示开始时间，第二项表示结束时间
                  this.value5Empty = 0; //时间段是否为空
              }else{
                this.searchButton();//查找按钮3秒内不能重复点击
                this.showTable = true;
                 // 全部的游戏数据
                this.tableData = [
                  // 上分
                  {
                    oddNum: 14767,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'上分',
                    endTime:2018
                  },
                  //德扑游戏场1           
                  {
                    oddNum: 14768,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 4,
                    useFulBet: 4,
                    drew: 0,
                    payout:0,
                    firstScore:5028,
                    loss:-4,
                    finialScore:5024,
                    startTime:2018,
                    recordNum:5730,
                    UID:110118,
                    account:'TEST',
                    type:'德扑游戏场1',
                    endTime:2018,
                    data:[
                      {drewPattern:"赢分抽水",drew:'5%',blind:'50/100',UID:110118,
                      user:[
                        {deal:1,UID:108775,betAll:0.5,win:'--',hand:['93','24']},
                        {deal:2,UID:103705,betAll:50,win:'50.25',hand:['31','61']},
                        {deal:3,UID:110118,betAll:'--',win:'--',hand:['J3','33']},
                        {deal:4,UID:107131,betAll:50,win:50.25,hand:['64','62']}
                        ],
                      boutArr:[
                        {bout:1,common:[],bottom:100.5,userBout:[{UID:108775,combine:'小盲高牌，9弃牌',bet:'0.5'},{UID:103705,combine:'大盲高牌，6ALLIN',bet:'50'},{UID:110118,combine:'高牌，J弃牌',bet:'--'},{UID:107131,combine:'对子，6ALLIN',bet:'50'}]},
                        {bout:2,common:["44",'52','73'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，7',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'对子，6',bet:'--'}]},
                        {bout:3,common:["44",'52','73','83'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8',bet:'--'}]},
                        {bout:4,common:["44",'52','73','83','A3'],bottom:'--',userBout:[{UID:108775,combine:'--',bet:'--'},{UID:103705,combine:'顺子，8赢',bet:'--'},{UID:110118,combine:'--',bet:'--'},{UID:107131,combine:'顺子，8赢',bet:'--'}]}
                        ]
                      },
                    ],
                  },
                  //牛牛体验场-随机庄 
                  {
                    oddNum: 14769,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-随机庄',
                    endTime:2018,
                    nnsj:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:108671,hand:['32','74','22','43','81'],open:'没牛，1倍输',pledge:6,bottom:1,origin:55.62,banker:'--'},
                        {UID:104112,hand:['54','82','73','Q2','94'],open:'牛九，2倍赢',pledge:3,bottom:1,origin:91.643,banker:'--'},
                        {UID:110118,hand:['21','A3','53','63','Q4'],open:'没牛，1倍输',pledge:1,bottom:1,origin:2291.689,banker:'--'},
                        {UID:101684,hand:['41','64','J2','91','23'],open:'牛一，1倍',pledge:1,bottom:1,origin:108.084,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛看牌抢庄 
                  {
                    oddNum: 6838,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10672.508,
                    loss:-1,
                    finialScore:10671.508,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-看牌抢庄',
                    endTime:2018,
                    nnkpqz:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:100372,hand:['24','34','53','62','54'],open:'牛一，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:109.320,banker:'--'},
                        {UID:109649,hand:['J2','103','101','41','81'],open:'牛二，1倍赢',pledge:1,qzmultiple:1,bottom:1,origin:104.147,banker:'--'},
                        {UID:110118,hand:['31','64','61','63','42'],open:'没牛，1倍输',pledge:1,qzmultiple:'--',bottom:1,origin:10672.508,banker:'--'},
                        {UID:107651,hand:['84','23','104','93','33'],open:'牛二，1倍输',pledge:1,qzmultiple:1,bottom:1,origin:47.043,banker:'是'}
                        ]
                      }
                    ],
                  },
                  //牛牛通比 
                  {
                    oddNum: 7023,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 1,
                    useFulBet: 1,
                    drew: 0,
                    payout:0,
                    firstScore:10716.578,
                    loss:-1,
                    finialScore:10715.578,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'牛牛体验场-通比',
                    endTime:2018,
                    nntb:[
                      {drewPattern:"赢分抽水",drew:'4%',limit:'否',UID:110118,
                      userArr:[
                        {UID:102175,hand:['23','22','64','51','73'],open:'牛二，1倍输',pledge:1,bottom:1,origin:43.009},
                        {UID:109161,hand:['103','24','J3','44','A2'],open:'没牛，1倍输',pledge:1,bottom:1,origin:73.821},
                        {UID:110118,hand:['Q3','41','63','31','83'],open:'牛一，1倍输',pledge:1,bottom:1,origin:10716.578},
                        {UID:103413,hand:['61','104','43','94','62'],open:'牛五，1倍赢',pledge:1,bottom:1,origin:17.146}
                        ]
                      }
                    ],
                  },
                  // 抢庄牛牛-体验
                  {
                    oddNum: 14770,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'抢庄牛牛-体验',
                    endTime:2018,
                    qznn:[
                      {drewPattern:"赢分抽水",drew:'5%',limit:'否',UID:110118,
                      userArr:[
                        {UID:109071,hand:['24','73','A1','91','81'],open:'开牛，2倍赢',pledge:8,qzPledge:1,bottom:1,origin:94.882,banker:'--'},
                        {UID:107438,hand:['21','82','J3','A4','94'],open:'牛牛，3倍赢',pledge:8,qzPledge:'--',bottom:1,origin:92.573,banker:'--'},
                        {UID:109085,hand:['92','32','61','63','J1'],open:'没牛，1倍输',pledge:8,qzPledge:2,bottom:1,origin:82.645,banker:'--'},
                        {UID:110118,hand:['71','84','54','A2','41'],open:'牛五，1倍输',pledge:1,qzPledge:3,bottom:1,origin:306.283,banker:'是'}
                        ]
                      }
                    ],
                  },
                  // 百牛
                  {
                    oddNum: 11787,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 2324,
                    useFulBet: 2324,
                    drew: 0,
                    payout:0,
                    firstScore:24901.391,
                    loss:-2324,
                    finialScore:22577.391,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'百牛-体验场',
                    endTime:2018,
                    bn:[
                      {drewPattern:"区域抽水",drew:'2%',
                      betArr:[
                        {hand:['A4','91','Q3','73','102'],result:'牛七，7倍，输',bet:95,win:855},
                        {hand:['K2','A3','93','83','33'],result:'牛一，1倍，输',bet:95,win:855},
                        {hand:['54','81','74','51','21'],result:'牛七，7倍，输',bet:85,win:765},
                        {hand:['104','J1','K4','32','41'],result:'牛七，7倍，输',bet:50,win:450},
                        {hand:['44','K1','62','J3','94'],result:'牛九，9倍'}
                        ]
                      }
                    ],
                  },
                  // 30秒
                  {
                    oddNum: 4907,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 100,
                    useFulBet: 0,
                    drew: 0,
                    payout:100,
                    firstScore:1700.045,
                    loss:0,
                    finialScore:1700.045,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'Zpian',
                    type:'30秒-体验场',
                    endTime:2018,
                    sec30:[
                      {drewPattern:"--",drew:'--',
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 金蟾0.1元场
                  {
                    oddNum: 14771,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'金蟾0.1元场',
                    endTime:2018,
                    jcData:[
                      {
                        fishArr:[
                        {name:"鱼王-小丑鱼",num:1},{name:'金蟾',num:1},{name:'剑鱼',num:1},{name:'银鲨',num:1},
                        {name:"金鲨",num:1},{name:'海龟',num:4},{name:'热带鱼',num:2},{name:'蝴蝶鱼',num:1},
                        {name:"孔雀鱼",num:3},{name:'灯笼鱼',num:1},{name:'蓝鱼',num:11},{name:'紫草鱼',num:3},
                        {name:"大眼鱼",num:12},{name:'刺鱼',num:6},{name:'小丑鱼',num:6},{name:'蜗牛鱼',num:40},
                        {name:"黄草鱼",num:15},{name:'小草鱼',num:19}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:904.5,getFish:671.7,origin:2052.044,now:1819.244
                      }
                    ]
                  },
                  // 龙虎
                  {
                    oddNum: 6214,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 92,
                    useFulBet: 92,
                    drew: 0,
                    payout:184,
                    firstScore:10338.227,
                    loss:92,
                    finialScore:10480.227,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'test',
                    type:'龙虎-体验场',
                    endTime:2018,
                    lh:[
                      {drewPattern:"--",drew:'--',limit:'否',isBanker:'否',//是否庄家
                      // 赔率：庄赢    庄输     和局
                      oddsBwin:1.96,oddsBloss:1.96,oddsSum:20,
                      // 押注：庄赢    庄输     和局
                      betBwin:'--',betBloss:'--',betSum:'--',
                      // 赢分：庄赢    庄输     和局
                      winBwin:'--',winBloss:'--',winSum:'--',
                      // 龙虎数据
                      dataArr:[
                        {poker:['Q2'],num:'Q,红桃,庄输',betAll:242,
                        // 赔率： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        oddsLong:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        betLong:92,betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 龙  龙黑桃  龙红桃  龙梅花  龙方片
                        winLong:184,winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        },
                        {poker:['62'],num:'6,红桃',betAll:7,
                        // 赔率： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        oddsHu:2,oddsSpade:3.92,oddsHeart:3.92,oddsClub:3.92,oddsDiamond:3.92,
                        // 押注： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        betLong:'--',betSpade:'--',betHeart:'--',betClub:'--',betDiamond:'--',
                        // 赢分： 虎  虎黑桃  虎红桃  虎梅花  虎方片
                        winLong:'--',winSpade:'--',winHeart:'--',winClub:'--',winDiamond:'--',
                        }
                      ],
                      // 庄家的牌                     //庄点数
                      bankerPoker:['101','Q1','81'],bankerNum:'8点',
                      // 闲家的牌                     //闲点数
                      playerPoker:['53','51','81'],bankerNum:'8点',
                      // 庄（1:1.95）//闲（1:2）和（1:8）庄对（1:11）闲对（1:11）是否庄家
                      banker:100,player:'--',sum:'--',bankerRight:'--',playerRight:'--',isBanker:'否',
                      // 赢分-庄（1:1.95）-闲（1:2）-和（1:8）-庄对（1:11）-闲对（1:11）
                      winBanker:'--',winPlayer:'--',winSum:'--',winBankerR:'--',winPlayerR:'--'
                      }
                    ],
                  },
                  // 李逵百炮场
                  {
                    oddNum: 14772,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵百炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-热带黄鱼',num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'金鲨鱼',num:4},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'狮头鱼',num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 李逵千炮场
                  {
                    oddNum: 14773,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'李逵千炮场',
                    endTime:2018,
                    lkData:[
                      {
                        fishArr:[
                        {name:"鱼王-热带紫鱼",num:1},{name:'鱼王-小黄鱼',num:1},{name:'大四喜-16倍',num:1},
                        {name:"金鲸鱼",num:3},{name:'海龟',num:1},{name:'铃铛鱼',num:1},
                        {name:"灯笼鱼",num:1},{name:'热带紫鱼',num:2},{name:'大眼金鱼',num:1},
                        {name:"小丑鱼",num:2},{name:'小黄鱼',num:4},{name:'热带黄鱼',num:4}
                        ],
                        drewPattern:"每炮抽水",drew:'2.5%',
                        bullet:435.9,getFish:422.6,origin:13.744,now:0.444
                      }
                    ]
                  },
                  // 奔驰宝马-体验场
                  {
                    oddNum: 14774,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'奔驰宝马-体验场',
                    endTime:2018,
                    bcData:[
                      {
                        drewPattern:'押注抽水',drew:'3.5%',banker:'否',awards:'路虎',
                        multiple:{luhu:4,jiebao:4,baoma:5,benchi:8,mashaladi:10,baoshijie:18,lanbojini:22,falali:33},
                        bet:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:200,falali:1200},
                        win:{luhu:'--',jiebao:'--',baoma:'--',benchi:'--',mashaladi:'--',baoshijie:'--',lanbojini:'--',falali:'--'}
                      }
                    ]
                  },
                  // 飞禽走兽-平民
                  {
                    oddNum: 14775,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'飞禽走兽-平民',
                    endTime:2018,
                    fqData:[
                      {
                        drewPattern:'押注抽水',drew:'3%',
                        mainAwardsAll:'熊猫',lampAwards:['--','--','--','--','--'],//主奖奖项，连灯奖项
                        mainMultipleAll:16,lampMultiple:['--','--','--','--','--'],//主奖倍数，连灯倍数
                        specialItemAll:'鲨鱼',Multiple:{feiqin:2,yanzi:4,gezi:6,kongque:16,laoying:24},//特殊项目，倍数
                        MultipleAll:'33/66',bet:['--',4,4,4,4],win:['--','--','--','--','--'],//倍数(银鲨/金鲨)，押注,赢分
                        betAll:'--',zsMultiple:{zoushou:2,tuzi:4,houzi:6,xiongmao:16,shizi:24},//押注,倍数
                        winAll:'--',winBet:['--','--','--','--','--'],winScore:['--','--','--','--','--'],//赢分，押注,赢分
                      }
                    ]
                  },
                  // 炸金花-体验
                  {
                    oddNum: 14776,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'炸金花-体验',
                    endTime:2018,
                    zjhData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        user:[
                          {order:1,UID:108684,hand:['51','33','24'],type:'特殊，5，方',betAll:1,winScore:'--',money:'--'},
                          {order:2,UID:104623,hand:['Q4','93','71'],type:'散牌，Q，黑',betAll:3,winScore:'--',money:'--'},
                          {order:3,UID:110118,hand:['K1','J1','23'],type:'散牌，K，方',betAll:5,winScore:9,money:'--'},
                        ],
                        boutArr:[
                          {order:1,bout:[{UID:108684,action:'锅底',bet:1,pkPlayer:'--'},{UID:104623,action:'锅底',bet:1,pkPlayer:'--'},{UID:110118,action:'锅底',bet:1,pkPlayer:'--'}]},
                          {order:2,bout:[{UID:108684,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:104623,action:'看牌跟注',bet:2,pkPlayer:'--'},{UID:110118,action:'看牌加注',bet:4,pkPlayer:'--'}]},
                          {order:3,bout:[{UID:108684,action:'--',bet:'--',pkPlayer:'--'},{UID:104623,action:'弃牌',bet:'--',pkPlayer:'--'},{UID:110118,action:'--',bet:'--',pkPlayer:'--'}]},
                        ]
                      }
                    ]
                  },
                  // 二八杠-体验
                  {
                    oddNum: 14777,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'二八杠-体验',
                    endTime:2018,
                    ebgData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',UID:110118,
                        userData:[
                          {UID:109334,hand:['22','43'],type:'二点半输',multiple:33,qzmultiple:'3',bottom:1,win:'--',banker:'--'},
                          {UID:109536,hand:['26','22'],type:'八点',multiple:'--',qzmultiple:100,bottom:1,win:57,banker:'是'},
                          {UID:109863,hand:['28','24'],type:'二点输',multiple:25,qzmultiple:100,bottom:1,win:'--',banker:'--'},
                          {UID:110118,hand:['27','21'],type:'八点赢',multiple:1,qzmultiple:'--',bottom:1,win:1,banker:'--'},
                        ]
                      }
                    ]
                  },
                  //港式五张-体验
                  {
                    oddNum: 14778,
                    id: 1034,
                    name: "BOTEST",
                    line: "--",
                    bet: 0,
                    useFulBet: 0,
                    drew: 0,
                    payout:0,
                    firstScore:5024,
                    loss:1000,
                    finialScore:6024,
                    startTime:2018,
                    recordNum:1034,
                    UID:110118,
                    account:'TEST',
                    type:'港式五张-体验',
                    endTime:2018,
                    gswzData:[
                      {
                        drewPattern:'赢分抽水',drew:'5%',bottomBet:'1',UID:110118,//抽水模式，抽水，底注，UID
                        user:[
                          {dealOrder:1,UID:102364,betAll:1,win:'--',hand:['91','Q3']},//发牌顺序，玩家UID，投注总计，赢分，手牌
                          {dealOrder:2,UID:101117,betAll:1,win:'--',hand:['101','Q4']},
                          {dealOrder:3,UID:100662,betAll:1,win:'--',hand:['84','92']},
                          {dealOrder:4,UID:101169,betAll:2,win:'--',hand:['K2','K1']},
                          {dealOrder:5,UID:110118,betAll:1,win:'--',hand:['J1','83']},
                        ],
                        boutArr:[
                          {bout:1,bottom:1,//回合，池底
                          userArr:[
                            {UID:102364,combine:'散牌，Q',bet:'--'},//UID，组合，下注
                            {UID:101117,combine:'散牌，Q',bet:'--'},
                            {UID:100662,combine:'散牌，9',bet:'--'},
                            {UID:101169,combine:'对子,K加注',bet:1},
                            {UID:110118,combine:'散牌，J弃牌',bet:'--'}
                          ]}
                        ]
                      }
                    ]
                  }
                ];
              }
            }
          });
      }
    },
    // 点击游戏弹出表格
    gameType(item){
      this.gameTyper=this.gameTyper==item?'':item;
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
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
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
  position: relative;
}
/* header */
.searchID {
  display: flex;
  margin: 0 auto;
  height: 34px;
  width: 700px;
}
.el-input {
  width: 180px;
}
.search {
  width: 700px;
  margin: 0 auto;
  margin-top: 20px;
}
.grid-content {
  margin-right: -8px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
}
/* 下拉菜单 */
.addChoice {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 110px;
  text-align: left;
  line-height: 32px;
}
.addChoice > p {
  width: 110px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addChoice > p > span {
  vertical-align: top;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  line-height: 32px;
}
/* 下拉菜单 */
.addChoice1 {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 32px;
  width: 190px;
  text-align: left;
  line-height: 32px;
}
.addChoice1 > p {
  width: 190px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.addChoice1 > p > span {
  vertical-align: top;
  display: inline-block;
  height: 32px;
  margin: 0;
  padding: 0;
  line-height: 32px;
}
/* 非输入框 */
.label {
  width: 100px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
.label1 {
  width: 32px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
.label2 {
  width: 384px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
.label3 {
  width: 48px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 22px;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-right: 0;
  border-left: 0;
}
/* 查找按钮 */
.button {
  line-height: 0px;
  height: 34px;
  width: 68px;
  padding-left: 18px;
}
/* 表格 */
.footer {
  position: relative;
  margin: 40px 20px;
}
.table {
  width: 100%;
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

.tableDate td {
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}
/* 点击跳转 */
.router {
  background-color: transparent;
  font-size: 16px;
  color: #5bc0de;
  cursor: pointer;
}
.router:hover {
  background-color: transparent;
  font-size: 16px;
  color: black;
}
/* 导出按钮 */
.toexcel {
  cursor: pointer;
  cursor: hand;
  width: 70px;
  height: 34px;
  margin-bottom: 10px;
}
/* 分页器 */
.page {
  width: 100%;
  margin-top: 20px;
}
/* 表格 */
.tableParent {
  margin-top: 10px;
  width: 100%;
}
/* 弹出框表格 */
.showDetail{
  width:100%;
}
.showDetail tr{
  width: 100%;
}
.showDetail td {
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  text-align: center;
  background-color: #fff;
}
.showTableTd{
  background-color: #428bca;
}
.clickBlock{
  width:100%;
}
/* 游戏账号输入框宽度 */
.inputWidth{
  width:120px;
}

</style>

