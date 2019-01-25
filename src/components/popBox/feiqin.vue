<template>
  <!-- 飞禽走兽 -->
  <div class="block">
    <table>
      <tr>
        <td class="popBoxBg" style="textAlign:left;paddingLeft:10px">抽水模式</td>
        <td class="popBoxbg" colspan="4">{{fqData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg" colspan="3">{{fqData[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="10" style="textAlign:left;paddingLeft:10px">开奖结果</td>
      </tr>
      <tr>
        <td class="popBoxBg"  style="textAlign:left;paddingLeft:10px">主奖奖项</td>
        <td class="popBoxbg">{{fqData[0].mainAwardsAll}}</td>
        <td class="popBoxBg" colspan="2">连灯奖项
          <span class="word">注1</span>
        </td>
        <td class="popBoxbg">{{fqData[0].lampAwards[0]}}</td>
        <td class="popBoxbg">{{fqData[0].lampAwards[1]}}</td>
        <td class="popBoxbg">{{fqData[0].lampAwards[2]}}</td>
        <td class="popBoxbg">{{fqData[0].lampAwards[3]}}</td>
        <td class="popBoxbg">{{fqData[0].lampAwards[4]}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" style="textAlign:left;paddingLeft:10px">主奖倍数</td>
        <td class="popBoxbg">{{fqData[0].mainMultipleAll}}</td>
        <td class="popBoxBg" colspan="2">连灯倍数</td>
        <td class="popBoxbg">{{fqData[0].lampMultiple[0]}}</td>
        <td class="popBoxbg">{{fqData[0].lampMultiple[1]}}</td>
        <td class="popBoxbg">{{fqData[0].lampMultiple[2]}}</td>
        <td class="popBoxbg">{{fqData[0].lampMultiple[3]}}</td>
        <td class="popBoxbg">{{fqData[0].lampMultiple[4]}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="10" style="textAlign:left;paddingLeft:10px">押注明细</td>
      </tr>
      <tr>
        <td class="popBoxBg" rowspan="2" style="textAlign:left;paddingLeft:10px">特殊项目</td>
        <td class="popBox_Bg" rowspan="2">{{fqData[0].specialItemAll}}</td>
        <td class="popBoxBg" colspan="2">飞禽项目</td>
        <td class="popBox_Bg">飞禽</td>
        <td class="popBox_Bg">燕子</td>
        <td class="popBox_Bg">鸽子</td>
        <td class="popBox_Bg">孔雀</td>
        <td class="popBox_Bg">老鹰</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2" >倍数</td>
        <td class="popBox_Bg">{{fqData[0].Multiple.feiqin}}</td>
        <td class="popBox_Bg">{{fqData[0].Multiple.yanzi}}</td>
        <td class="popBox_Bg">{{fqData[0].Multiple.gezi}}</td>
        <td class="popBox_Bg">{{fqData[0].Multiple.kongque}}</td>
        <td class="popBox_Bg">{{fqData[0].Multiple.laoying}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" rowspan="2" style="textAlign:left;paddingLeft:10px">倍数(银鲨/金鲨)
          <span class="word">注2</span>
        </td>
        <td class="popBoxbg" rowspan="2">{{fqData[0].MultipleAll}}</td>
        <td class="popBoxBg" colspan="2" >押注</td>
        <td class="popBoxbg">{{fqData[0].bet[0]}}</td>
        <td class="popBoxbg">{{fqData[0].bet[1]}}</td>
        <td class="popBoxbg">{{fqData[0].bet[2]}}</td>
        <td class="popBoxbg">{{fqData[0].bet[3]}}</td>
        <td class="popBoxbg">{{fqData[0].bet[4]}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">赢分</td>
        <td class="popBoxbg">{{fqData[0].win[0]}}</td>
        <td class="popBoxbg">{{fqData[0].win[1]}}</td>
        <td class="popBoxbg">{{fqData[0].win[2]}}</td>
        <td class="popBoxbg">{{fqData[0].win[3]}}</td>
        <td class="popBoxbg">{{fqData[0].win[4]}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" rowspan="2" style="textAlign:left;paddingLeft:10px">押注</td>
        <td class="popBoxbg" rowspan="2">{{fqData[0].betAll}}</td>
        <td class="popBoxBg" colspan="2">走兽项目</td>
        <td class="popBox_Bg">走兽</td>
        <td class="popBox_Bg">兔子</td>
        <td class="popBox_Bg">猴子</td>
        <td class="popBox_Bg">熊猫</td>
        <td class="popBox_Bg">狮子</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">倍数</td>
        <td class="popBox_Bg">{{fqData[0].zsMultiple.zoushou}}</td>
        <td class="popBox_Bg">{{fqData[0].zsMultiple.tuzi}}</td>
        <td class="popBox_Bg">{{fqData[0].zsMultiple.houzi}}</td>
        <td class="popBox_Bg">{{fqData[0].zsMultiple.xiongmao}}</td>
        <td class="popBox_Bg">{{fqData[0].zsMultiple.shizi}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" rowspan="2" style="textAlign:left;paddingLeft:10px">赢分</td>
        <td class="popBoxbg" rowspan="2">{{fqData[0].winAll}}</td>
        <td class="popBoxBg" colspan="2">押注</td>
        <td class="popBoxbg">{{fqData[0].winBet[0]}}</td>
        <td class="popBoxbg">{{fqData[0].winBet[1]}}</td>
        <td class="popBoxbg">{{fqData[0].winBet[2]}}</td>
        <td class="popBoxbg">{{fqData[0].winBet[3]}}</td>
        <td class="popBoxbg">{{fqData[0].winBet[4]}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" colspan="2">赢分</td>
        <td class="popBoxbg">{{fqData[0].winScore[0]}}</td>
        <td class="popBoxbg">{{fqData[0].winScore[1]}}</td>
        <td class="popBoxbg">{{fqData[0].winScore[2]}}</td>
        <td class="popBoxbg">{{fqData[0].winScore[3]}}</td>
        <td class="popBoxbg">{{fqData[0].winScore[4]}}</td>
      </tr>
    </table>
    <div class="footer">
      <p>※註1：主獎項若是【金鲨】觸發送３個隨機連燈獎項；若是【銀鲨】則觸發送１個隨機連燈獎項。</p>
      <p>※註2：鯊魚押注項對應中獎倍數為：主獎獎項【金鲨】為66倍；主獎獎項【銀鲨】為33倍。</p>
      <p>※註3：【贏分】只顯示正贏分。</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["fqData"]
};
</script>
<style scoped>
.block{
  width:100%;
}
.block table{
  width:100%;
}
.word {
  display: inline-block;
  font-size: 12px;
}
.footer p {
  text-align: left;
  margin: 6px;
  font-size: 14px;
}
td{
  height:34px;
  vertical-align: middle;
}
</style>
