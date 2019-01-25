<template>
  <!-- 德扑游戏 -->
  <div class="block">
    <table>
      <tr>
        <td colspan="2" class="popBoxBg">抽水模式</td>
        <td colspan="2" class="popBoxbg">{{data[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg">{{data[0].drew}}</td>
        <td class="popBoxBg">大盲/小盲</td>
        <td class="popBoxbg">{{data[0].blind}}</td>
      </tr>
      <tr>
        <td colspan="4" class="popBoxBg">发牌顺序</td>
        <td class="popBoxBg" v-for="(item,index) in data[0].user" :key="index">{{item.deal}}</td>
      </tr>
      <tr>
        <td colspan="4" class="popBoxBg">玩家UID</td>
        <td
          :class="item.UID==data[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in data[0].user"
          :key="index"
        >{{item.UID}}</td>
      </tr>
      <tr>
        <td colspan="4" class="popBoxBg">投注总计</td>
        <td
          :class="item.UID==data[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in data[0].user"
          :key="index"
        >{{item.betAll}}</td>
      </tr>
      <tr>
        <td colspan="4" class="popBoxBg">赢分</td>
        <td
          :class="item.UID==data[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in data[0].user"
          :key="index"
        >{{item.win}}</td>
      </tr>
      <tr>
        <td colspan="4" class="popBoxBg">手牌</td>
        <td
          :class="item.UID==data[0].UID?'popBox_bghand':'popBoxbghand'"
          v-for="(item,index) in data[0].user"
          :key="index"
        >
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in item.hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <td class="popBoxBg">回合</td>
        <td colspan="2" class="popBoxBg">公牌</td>
        <td class="popBoxBg">池底</td>
        <td v-for="(item,index) in data[0].user" :key="index" style="padding:0;">
          <span  class="circle">
            <span class="boutWord">组合</span>
            <span class="boutWord">下注</span>
          </span>
        </td>
      </tr>
      <tr v-for="(itemData,indexData) in data[0].boutArr" :key="indexData" style="height:110px;">
        <!-- 回合 -->
        <td class="popBoxbg">{{itemData.bout}}</td>
        <!-- 公牌 -->
        <td class="popBoxbg" style="width:140px;paddingLeft:80px;paddingTop:12px;" colspan="2">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in itemData.common" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 池底 -->
        <td class="popBoxbg">{{itemData.bottom}}</td>
        <!-- 组合下注 -->
        <td  v-for="(ite,inde) in itemData.userBout" :key="inde" :class="ite.UID==data[0].UID?'popBox_bg1':'popBoxbg1'"
         style="padding:0;">
          <div  class="circle1">
            <p :style="ite.UID==data[0].UID?'backgroundColor:#fffbea':''">{{ite.combine}}</p>
            <p :style="ite.UID==data[0].UID?'backgroundColor:#fffbea':''" class="boutWord1">{{ite.bet}}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      pokerArr: [
        { name: "21", img: "21" },
        { name: "22", img: "22" },
        { name: "23", img: "23" },
        { name: "24", img: "24" },
        { name: "31", img: "31" },
        { name: "32", img: "32" },
        { name: "33", img: "33" },
        { name: "34", img: "34" },
        { name: "41", img: "41" },
        { name: "42", img: "42" },
        { name: "43", img: "43" },
        { name: "44", img: "44" },
        { name: "51", img: "51" },
        { name: "52", img: "52" },
        { name: "53", img: "53" },
        { name: "54", img: "54" },
        { name: "61", img: "61" },
        { name: "62", img: "62" },
        { name: "63", img: "63" },
        { name: "64", img: "64" },
        { name: "71", img: "71" },
        { name: "72", img: "72" },
        { name: "73", img: "73" },
        { name: "74", img: "74" },
        { name: "81", img: "81" },
        { name: "82", img: "82" },
        { name: "83", img: "83" },
        { name: "84", img: "84" },
        { name: "91", img: "91" },
        { name: "92", img: "92" },
        { name: "93", img: "93" },
        { name: "94", img: "94" },
        { name: "101", img: "101" },
        { name: "102", img: "102" },
        { name: "103", img: "103" },
        { name: "104", img: "104" },
        { name: "J1", img: "111" },
        { name: "J2", img: "112" },
        { name: "J3", img: "113" },
        { name: "J4", img: "114" },
        { name: "Q1", img: "121" },
        { name: "Q2", img: "122" },
        { name: "Q3", img: "123" },
        { name: "Q4", img: "124" },
        { name: "K1", img: "131" },
        { name: "K2", img: "132" },
        { name: "K3", img: "133" },
        { name: "K4", img: "134" },
        { name: "A1", img: "141" },
        { name: "A2", img: "142" },
        { name: "A3", img: "143" },
        { name: "A4", img: "144" },
        { name: "151", img: "151" },
        { name: "152", img: "152" }
      ]
    };
  }
};
</script>
<style scoped>
.block{
  width:100%;
}
.block table{
  width:100%;
}
td{
  height: 34px;
  line-height: 34px;
  text-align: left;
  padding-left:10px;
  vertical-align: middle;
}
/* 手牌 */
/* 白色 */
.popBoxbghand {
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 16px;
  height:65px;
  padding-top:10px;
  padding-left:60px;
}
/* 米黄 */
.popBox_bghand {
  background-color: #fffbea;
  border: 1px solid #ddd;
  font-size: 16px;
  height:65px;
  padding-left:60px;
  padding-top:10px;
}
/* 组合下注 */
/* 白色 */
.popBoxbg1 {
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 16px;
}
/* 米黄 */
.popBox_bg1 {
  background-color: #fffbea;
  border: 1px solid #ddd;
  font-size: 16px;
}
.circle {
  background-color: #428bca;
  color: #fff;
  font-size: 16px;
  display: flex;
}
.circle1 {
  background-color: #fff;
  display: flex;
  height: 110px;
  text-align: center;
}
.boutWord {
  display:inline-block;
  width: 100%;
  height:100%;
  padding-left: 10px;
  border-left: 1px solid #ddd;
}
/* p 公用样式统一 */
.circle1 p{
  flex: 2; /*父级flex 后 子集除固定部分外 使用 flex: number; 分割*/
  height: 110px;
  line-height: 110px;
  padding-left: 10px;
}
.circle1 .boutWord1 {
  border-left: 1px solid #ddd;
}
</style>
