<template>
  <!-- 港式五张 -->
  <div class="block">
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg">{{gswzData[0].drewPattern}}</td>
        <td class="popBoxBg" colspan="3">抽水</td>
        <td class="popBoxbg">{{gswzData[0].drew}}</td>
        <td class="popBoxBg" colspan="4">底注</td>
        <td class="popBoxbg">{{gswzData[0].bottomBet}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">发牌顺序</td>
        <td
          class="popBoxBg"
          colspan="2"
          v-for="(item,index) in gswzData[0].user"
          :key="index"
        >{{item.dealOrder}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">玩家UID</td>
        <td
          colspan="2"
          :class="item.UID==gswzData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in gswzData[0].user"
          :key="index"
        >{{item.UID}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">投注总计</td>
        <td
          colspan="2"
          :class="item.UID==gswzData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in gswzData[0].user"
          :key="index"
        >{{item.betAll}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">赢分</td>
        <td
          colspan="2"
          :class="item.UID==gswzData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in gswzData[0].user"
          :key="index"
        >{{item.wind}}</td>
      </tr>
      <tr style="height:100px;">
        <td class="popBoxBg" colspan="2">手牌</td>
        <td
          colspan="2"
          :class="item.UID==gswzData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in gswzData[0].user"
          :key="index"
          style="paddingLeft:48px;"
        >
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in item.hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
              >
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <td class="popBoxBg">回合</td>
        <td class="popBoxBg">池底</td>
        <td colspan="2" class="popBoxBg" v-for="(item,index) in gswzData[0].user" :key="index">
          <div class="flex2">
            <p>组合</p>
            <p class="flexBorder">下注</p>
          </div>
        </td>
      </tr>
      <tr v-for="(ite,inde) in gswzData[0].boutArr" :key="inde">
        <td class="popBoxbg">{{ite.bout}}</td>
        <td class="popBoxbg">{{ite.bottom}}</td>
        <td
          colspan="2"
          :class="itData.UID==gswzData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(itData,ind) in ite.userArr"
          :key="ind"
        >
          <div class="flex2">
            <p>{{itData.combine}}</p>
            <p class="flexBorder">{{itData.bet}}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["gswzData"],
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
.pokerImg{
  margin-left:-48px;
}
td{
  height:34px;
  vertical-align: middle;
}
.flex2{
  display:flex;
  height:34px;
}
.flex2 p{
  line-height: 34px;
  flex:2;
}
.flexBorder{
  border-left:1px solid #ddd;
}
</style>
