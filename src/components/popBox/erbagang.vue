<template>
  <!-- 二八杠 -->
  <div class="block">
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg" colspan="4">{{ebgData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg" colspan="4">{{ebgData[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">用户UID</td>
        <td class="popBoxBg" colspan="2">手牌</td>
        <td class="popBoxBg">牌型</td>
        <td class="popBoxBg">押倍</td>
        <td class="popBoxBg">抢庄倍数</td>
        <td class="popBoxBg">底分</td>
        <td class="popBoxBg">赢分</td>
        <td class="popBoxBg">庄家</td>
      </tr>
      <tr v-for="(item,index) in ebgData[0].userData" :key="index" style="height:90px;">
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.UID}}</td>
        <td
          colspan="2"
          :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'"
        >
          <span v-for="(ite,inde) in mahjongArr" :key="inde" >
            <span v-for="(itData,indeNum) in item.hand" :key="indeNum">
              <img
                :src="'../../../static/image/'+ite.img+'.png'"
                v-if="ite.name==itData"
                class="mahjongImg"
              >
            </span>
          </span>
        </td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.type}}</td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.multiple}}</td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.qzmultiple}}</td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.bottom}}</td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.win}}</td>
        <td :class="item.UID==ebgData[0].UID?'popBox_bg':'popBoxbg'">{{item.banker}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["ebgData"],
  data() {
    return {
      mahjongArr: [
        // 花色为条子
        { name: "11", img: "bamboo1" },
        { name: "12", img: "bamboo2" },
        { name: "13", img: "bamboo3" },
        { name: "14", img: "bamboo4" },
        { name: "15", img: "bamboo5" },
        { name: "16", img: "bamboo6" },
        { name: "17", img: "bamboo7" },
        { name: "18", img: "bamboo8" },
        { name: "19", img: "bamboo9" },
        // 花色为筒子
        { name: "21", img: "pin1" },
        { name: "22", img: "pin2" },
        { name: "23", img: "pin3" },
        { name: "24", img: "pin4" },
        { name: "25", img: "pin5" },
        { name: "26", img: "pin6" },
        { name: "27", img: "pin7" },
        { name: "28", img: "pin8" },
        { name: "29", img: "pin9" },
        // 花色为万子
        { name: "31", img: "man1" },
        { name: "32", img: "man2" },
        { name: "33", img: "man3" },
        { name: "34", img: "man4" },
        { name: "35", img: "man5" },
        { name: "36", img: "man6" },
        { name: "37", img: "man7" },
        { name: "38", img: "man8" },
        { name: "39", img: "man9" },
        // 红中，发财，白板
        { name: "41", img: "dragon-chun" },
        { name: "42", img: "dragon-green" },
        { name: "43", img: "dragon-haku" },
        // 东西南北
        { name: "51", img: "wind-east" },
        { name: "52", img: "wind-west" },
        { name: "53", img: "wind-south" },
        { name: "54", img: "wind-north" }
      ]
      // mahjong:[
      //     'bamboo1','bamboo2','bamboo3','bamboo4','bamboo5','bamboo6','bamboo7','bamboo8','bamboo9',
      //     'pin1','pin2','pin3','pin4','pin5','pin6','pin7','pin8','pin9',
      //     'man1','man2','man3','man4','man5','man6','man7','man8','man9',
      //     'dragon-chun','dragon-green','dragon-haku',
      //     'wind-east','wind-east','wind-south','wind-north'
      // ]
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
  height:34px;
  vertical-align: middle;
}
/* .mahjong {
  background-color: #fffbea;
  border: 1px solid #ddd;
  font-size: 16px;
  display:flex;
}
.mahjongbg{
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 16px;
  display:flex;
} */
</style>

