<template>
  <!-- 炸金花 -->
  <div class="block">
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg">{{zjhData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg">{{zjhData[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">顺序</td>
        <td class="popBoxBg" v-for="(item,index) in zjhData[0].user" :key="index">{{item.order}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">用户UID</td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
        >{{item.UID}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">手牌</td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
          style="paddingLeft:48px;paddingTop:4px"
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
        <td class="popBoxBg">牌型
          <span class="word">注1</span>
        </td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
        >{{item.type}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">投注总计</td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
        >{{item.betAll}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">赢分</td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
        >{{item.winScore}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">喜钱</td>
        <td
          :class="item.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(item,index) in zjhData[0].user"
          :key="index"
        >{{item.money}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">回合</td>
        <td class="popBoxBg" v-for="(item,index) in zjhData[0].user" :key="index">
          <div class="flex3">
            <p >动作</p>
            <p class="flexBorder">投注</p>
            <p class="flexBorder">PK玩家</p>
          </div>
        </td>
      </tr>
      <tr v-for="(item,index) in zjhData[0].boutArr" :key="index">
        <td class="popBoxbg">{{item.order}}</td>
        <td
          :class="ite.UID==zjhData[0].UID?'popBox_bg':'popBoxbg'"
          v-for="(ite,inde) in item.bout"
          :key="inde"
        >
          <div class="flex3">
            <p >{{ite.action}}</p>
            <p class="flexBorder">{{ite.bet}}</p>
            <p class="flexBorder">{{ite.pkPlayer}}</p>
          </div>
        </td>
      </tr>
    </table>
    <div class="footer">
      <p>※註1：牌型格式：【牌型】,【牌最大數字】, 【花色】</p>
      <p>※註2：牌型大小：豹子 > 同花順 > 金花 > 順子 > 對子 > 散牌。</p>
      <p>特殊牌型( 不同花色235 ) > 豹子，但與其他牌型則以散牌規則比牌</p>
      <p>※註3：牌數字大小：A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2</p>
      <p>※註4：花色大小：黑桃 > 紅心 > 梅花 > 方片，簡稱：黑、紅、梅、方</p>
      <p>※註5：黃底色表示玩家自己</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["zjhData"],
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
p{
  margin: 0;
}
.word {
  display: inline-block;
  font-size: 12px;
}
.footer {
  text-align: left;
}
.footer p {
  margin: 8px;
}
.pokerImg{
  margin-left:-48px;
}
td{
  height:34px;
  vertical-align: middle;
  padding-left:10px;
}
.flex3{
  display: flex;
  height: 34px;
}
.flex3 p{
  flex:3;
  line-height:34px;
  margin: 0px !important;
}
.flexBorder{
  border-left:1px solid #ddd;
}
</style>
