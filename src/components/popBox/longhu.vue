<template>
  <!-- 龙虎 -->
  <div class="block">
    <!-- 表格 -->
    <table>
      <tr>
        <td colspan="2" class="popBoxBg">抽水模式</td>
        <td colspan="3" class="popBoxbg">{{lh[0].drewPattern}}</td>
        <td colspan="2" class="popBoxBg">抽水</td>
        <td colspan="3" class="popBoxbg">{{lh[0].drew}}</td>
        <td colspan="2" class="popBoxBg">是否限红</td>
        <td colspan="2" class="popBoxbg">{{lh[0].limit}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">开奖项目</td>
        <td class="popBoxBg">龙区开牌</td>
        <td colspan="3" class="popBoxBg">龙区点数</td>
        <td class="popBoxBg">龙押注总额</td>
        <td class="popBoxBg">虎区开牌</td>
        <td colspan="3" class="popBoxBg">虎区点数</td>
        <td class="popBoxBg">虎押注总额</td>
        <td rowspan="3" class="popBoxBg">是否庄家</td>
        <td rowspan="3" colspan="2" class="popBoxBg">{{lh[0].isBanker}}</td>
      </tr>
      <!-- 牌型-->
      <tr>
        <td rowspan="2" class="popBoxBg">牌型</td>
        <!-- 龙区开牌 -->
        <td rowspan="2" class="popBoxbg" style="paddingLeft:30px;">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in lh[0].dataArr[0].poker" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 龙区点数 -->
        <td rowspan="2" class="popBoxbg">{{lh[0].dataArr[0].num}}</td>
        <!-- 龙押注总额 -->
        <td rowspan="2" colspan="3" class="popBoxbg">{{lh[0].dataArr[0].betAll}}</td>
        <!-- 虎区开牌 -->
        <td rowspan="2" class="popBoxbg" style="paddingLeft:30px;">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in lh[0].dataArr[1].poker" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 虎区点数 -->
        <td rowspan="2" class="popBoxbg">{{lh[0].dataArr[1].num}}</td>
        <!-- 虎押注总额 -->
        <td rowspan="2" colspan="3" class="popBoxbg">{{lh[0].dataArr[1].betAll}}</td>
      </tr>
      <tr></tr>
      <tr>
        <td class="popBoxBg">押注项目</td>
        <td class="popBoxBg">庄赢</td>
        <td class="popBoxBg">庄输</td>
        <td class="popBoxBg">和局</td>
        <td class="popBoxBg">龙</td>
        <td class="popBoxBg">虎</td>
        <td class="popBoxBg">龙黑</td>
        <td class="popBoxBg">龙红</td>
        <td class="popBoxBg">龙梅</td>
        <td class="popBoxBg">龙方</td>
        <td class="popBoxBg">虎黑</td>
        <td class="popBoxBg">虎红</td>
        <td class="popBoxBg">虎梅</td>
        <td class="popBoxBg">虎方</td>
      </tr>
      <!-- 赔率 -->
      <tr>
        <td class="popBoxBg">赔率</td>
        <!-- 庄赢 -->
        <td class="popBoxBg">{{lh[0].oddsBwin}}</td>
        <!-- 庄输 -->
        <td class="popBoxBg">{{lh[0].oddsBloss}}</td>
        <!-- 和局 -->
        <td class="popBoxBg">{{lh[0].oddsSum}}</td>
        <!-- 龙 -->
        <td class="popBoxBg">{{lh[0].dataArr[0].oddsLong}}</td>
        <!-- 虎 -->
        <td class="popBoxBg">{{lh[0].dataArr[1].oddsHu}}</td>
        <!-- 龙黑 -->
        <td class="popBoxBg">{{lh[0].dataArr[0].oddsSpade}}</td>
        <!-- 龙红 -->
        <td class="popBoxBg">{{lh[0].dataArr[0].oddsHeart}}</td>
        <!-- 龙梅 -->
        <td class="popBoxBg">{{lh[0].dataArr[0].oddsClub}}</td>
        <!-- 龙方 -->
        <td class="popBoxBg">{{lh[0].dataArr[0].oddsDiamond}}</td>
        <!-- 虎黑 -->
        <td class="popBoxBg">{{lh[0].dataArr[1].oddsSpade}}</td>
        <!-- 虎红 -->
        <td class="popBoxBg">{{lh[0].dataArr[1].oddsHeart}}</td>
        <!-- 虎梅 -->
        <td class="popBoxBg">{{lh[0].dataArr[1].oddsClub}}</td>
        <!-- 虎方 -->
        <td class="popBoxBg">{{lh[0].dataArr[1].oddsDiamond}}</td>
      </tr>
      <!-- 押注 -->
      <tr>
        <td class="popBoxBg">押注</td>
        <!-- 庄赢 -->
        <td class="popBoxbg">{{lh[0].betBwin}}</td>
        <!-- 庄输 -->
        <td class="popBoxbg">{{lh[0].betBloss}}</td>
        <!-- 和局 -->
        <td class="popBoxbg">{{lh[0].betSum}}</td>
        <!-- 龙 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].betLong}}</td>
        <!-- 虎 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].betHu}}</td>
        <!-- 龙黑 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].betSpade}}</td>
        <!-- 龙红 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].betHeart}}</td>
        <!-- 龙梅 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].betClub}}</td>
        <!-- 龙方 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].betDiamond}}</td>
        <!-- 虎黑 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].betSpade}}</td>
        <!-- 虎红 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].betHeart}}</td>
        <!-- 虎梅 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].betClub}}</td>
        <!-- 虎方 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].betDiamond}}</td>
      </tr>
      <!-- 赢分 -->
      <tr>
        <td class="popBoxBg">赢分</td>
        <!-- 庄赢 -->
        <td class="popBoxbg">{{lh[0].winBwin}}</td>
        <!-- 庄输 -->
        <td class="popBoxbg">{{lh[0].winBloss}}</td>
        <!-- 和局 -->
        <td class="popBoxbg">{{lh[0].winSum}}</td>
        <!-- 龙 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].winLong}}</td>
        <!-- 虎 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].winHu}}</td>
        <!-- 龙黑 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].winSpade}}</td>
        <!-- 龙红 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].winHeart}}</td>
        <!-- 龙梅 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].winClub}}</td>
        <!-- 龙方 -->
        <td class="popBoxbg">{{lh[0].dataArr[0].winDiamond}}</td>
        <!-- 虎黑 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].winSpade}}</td>
        <!-- 虎红 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].winHeart}}</td>
        <!-- 虎梅 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].winClub}}</td>
        <!-- 虎方 -->
        <td class="popBoxbg">{{lh[0].dataArr[1].winDiamond}}</td>
      </tr>
    </table>
    <!-- 备注 -->
    <div class="footer">
        <p>※註1：若玩家成功上庄，【押注】數值為當局其他玩家的押注量；【贏分】顯示【負值】表示庄家賠付。</p>
        <p>※註2：若玩家未上庄，【贏分】只顯示正贏分。</p>
        <p>※註3：【庄贏】：假若開龍贏，該局【龍】的押注總額小於【虎】的押注總額，則為【庄贏】。</p>
        <p>※註4：【庄輸】：假若開龍贏，該局【龍】的押注總額大於【虎】的押注總額，則為【庄輸】。</p>
        <p>※註5：牌數字大小：K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2> A</p>
        <p>※註6：花色大小：黑桃 > 紅心 > 梅花 > 方片，簡稱：黑、紅、梅、方</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["lh"],
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
