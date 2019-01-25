<template>
  <!-- 百牛 -->
  <div class="block">
    <!-- 表格 -->
    <table>
      <tr>
        <td colspan="2" class="popBoxBg">抽水模式</td>
        <td colspan="2" class="popBoxbg">{{bn[0].drewPattern}}</td>
        <td colspan="3" class="popBoxBg">抽水</td>
        <td colspan="4" class="popBoxbg">{{bn[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">押注项</td>
        <td colspan="2" class="popBoxBg">天</td>
        <td colspan="2" class="popBoxBg">地</td>
        <td colspan="2" class="popBoxBg">玄</td>
        <td colspan="2" class="popBoxBg">黄</td>
        <td colspan="2" class="popBoxBg">庄家</td>
      </tr>
      <!-- 开牌 -->
      <tr>
        <td rowspan="2" class="popBoxBg">开牌</td>
        <!-- 天 -->
        <td rowspan="2" colspan="2" class="popBoxbg">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in bn[0].betArr[0].hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 地 -->
        <td rowspan="2" colspan="2" class="popBoxbg">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in bn[0].betArr[1].hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 玄 -->
        <td rowspan="2" colspan="2" class="popBoxbg">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in bn[0].betArr[2].hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 黄 -->
        <td rowspan="2" colspan="2" class="popBoxbg">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in bn[0].betArr[3].hand" :key="ind">
              <img
                :src="'../../../static/image/'+ite.img+'.jpg'"
                v-if="ite.name==it"
                class="pokerImg"
                style="marginLeft:-48px"
              >
            </span>
          </span>
        </td>
        <!-- 庄家 -->
        <td rowspan="2" colspan="2" class="popBoxbg">
          <span v-for="(ite,inde) in pokerArr" :key="inde">
            <span v-for="(it,ind) in bn[0].betArr[4].hand" :key="ind">
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
      <tr></tr>
      <!-- 开牌结果 -->
      <tr>
        <td class="popBoxBg">开牌结果</td>
        <!-- 天 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[0].result}}</td>
        <!-- 地 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[1].result}}</td>
        <!-- 玄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[2].result}}</td>
        <!-- 黄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[3].result}}</td>
        <!-- 庄家 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[4].result}}</td>
      </tr>
      <!-- 押注 -->
      <tr >
        <td  class="popBoxBg">押注</td>
        <!-- 天 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[0].bet}}</td>
        <!-- 地 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[1].bet}}</td>
        <!-- 玄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[2].bet}}</td>
        <!-- 黄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[3].bet}}</td>
        <!-- 庄家 -->
        <td rowspan="2" colspan="1" class="popBoxBg">是否庄家</td>
        <td rowspan="2" colspan="1" class="popBoxbg">是</td>
      </tr>
      <!-- 赢分 -->
      <tr >
        <td rowspan="2" class="popBoxBg">赢分</td>
        <!-- 天 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[0].win}}</td>
        <!-- 地 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[1].win}}</td>
        <!-- 玄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[2].win}}</td>
        <!-- 黄 -->
        <td colspan="2" class="popBoxbg">{{bn[0].betArr[3].win}}</td>
      </tr>
    </table>
    <!-- 备注 -->
    <div class="footer">
        <p>※注1：【赢分】若为正值赢分为未抽水的赢分。</p>
        <p>※注2：若当庄玩家，【押注分数】为该局其他玩家的总押注量；【赢分】显示【负值】表示庄家赔付。</p>
        <p style="marginLeft:30px;">计算：</p>
        <p style="marginLeft:50px;">正【赢分】= 押注项目的押注 x 庄家的牌倍数</p>
        <p style="marginLeft:50px;">负【赢分】= -押注项目的押注 x 押注项目的牌倍数</p>
        <p>※注3：若非当庄玩家，【赢分】正值表示赢分，负值表示输分。</p>
        <p style="marginLeft:30px;">计算：</p>
        <p style="marginLeft:50px;">正【赢分】= 押注项目的押注 x 押注项目的牌倍数</p>
        <p style="marginLeft:50px;">负【赢分】= -押注项目的押注 x 庄家的牌倍数</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bn"],
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
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
}
.footer p{
    margin: 8px;
}
</style>
