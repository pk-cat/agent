<template>
  <!-- 30秒 -->
  <div class="block">
    <!-- 表格 -->
    <table>
      <tr>
        <td colspan="3" class="popBoxBg">抽水模式</td>
        <td colspan="3" class="popBoxbg">{{sec30[0].drewPattern}}</td>
        <td colspan="3" class="popBoxBg">抽水</td>
        <td colspan="3" class="popBoxbg">{{sec30[0].drew}}</td>
      </tr>
      <tr>
        <td colspan="2" class="popBoxBg">庄家的牌</td>
        <td class="popBoxBg">庄点数</td>
        <td colspan="2" class="popBoxBg">闲家的牌</td>
        <td class="popBoxBg">闲点数</td>
        <td class="popBoxBg">庄(1:1.95)</td>
        <td class="popBoxBg">闲(1:2)</td>
        <td class="popBoxBg">和(1:8)</td>
        <td class="popBoxBg">庄对(1:11)</td>
        <td class="popBoxBg">闲对(1:11)</td>
        <td class="popBoxBg">是否庄家</td>
      </tr>
      <!-- 牌和点数 -->
      <tr>
        <!-- 庄家的牌 -->
        <td rowspan="2" colspan="2" class="popBoxbg" style="paddingLeft:20px;">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in sec30[0].bankerPoker" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 庄点数 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].bankerNum}}</td>
        <!-- 闲家的牌 -->
        <td rowspan="2" colspan="2" class="popBoxbg" style="paddingLeft:20px;">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in sec30[0].playerPoker" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 闲点数 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].playerNum}}</td>
        <!-- 庄 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].banker}}</td>
        <!-- 闲 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].player}}</td>
        <!-- 和 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].sum}}</td>
        <!-- 庄对 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].bankerRight}}</td>
        <!-- 闲对 -->
        <td rowspan="2" class="popBoxbg">{{sec30[0].playerRight}}</td>
        <!-- 是否庄家 -->
        <td rowspan='3' class="popBoxbg">{{sec30[0].isBanker}}</td>
      </tr>
      <tr></tr>
      <tr>
        <td class="popBoxBg" colspan="6">赢分</td>
        <!-- 庄 -->
        <td class="popBoxbg">{{sec30[0].winBanker}}</td>
        <!-- 闲 -->
        <td class="popBoxbg">{{sec30[0].winPlayer}}</td>
        <!-- 和 -->
        <td class="popBoxbg">{{sec30[0].winSum}}</td>
        <!-- 庄对 -->
        <td class="popBoxbg">{{sec30[0].winBankerR}}</td>
        <!-- 闲对 -->
        <td class="popBoxbg">{{sec30[0].winPlayerR}}</td>
      </tr>
    </table>
    <!-- 备注 -->
    <div class="footer">
        <p>※註1：若玩家成功上庄，【押注】數值為當局其他玩家的押注量；【贏分】顯示【負值】表示庄家賠付。</p>
        <p>※註2：若玩家未上庄，【贏分】只顯示正贏分。</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sec30"],
  data() {
    return {
      // 扑克图片
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
.block {
  width: 100%;
}
.block table {
  width: 100%;
}
td {
  height: 34px;
  vertical-align: middle;
}
/* 备注部分 */
.footer{
    margin-top: 14px;
    font-size: 14px;
    text-align: left;
}
.footer p{
    margin: 8px;
}
</style>
