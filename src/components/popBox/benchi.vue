<template>
  <!-- 奔驰宝马 -->
  <div class="block">
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg" colspan="3">{{bcData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg" colspan="3">{{bcData[0].drew}}</td>
        <td class="popBoxBg">是否庄家</td>
        <td class="popBoxbg" colspan="2">{{bcData[0].banker}}</td>
      </tr>
      <tr>
        <td class="popBoxBg" rowspan="4">奖项</td>
        <td class="popBox_Bg" rowspan="4">{{bcData[0].awards}}</td>
        <td class="popBoxBg">押注项目</td>
        <td class="popBox_Bg">路虎</td>
        <td class="popBox_Bg">捷豹</td>
        <td class="popBox_Bg">宝马</td>
        <td class="popBox_Bg">奔驰</td>
        <td class="popBox_Bg">玛莎拉蒂</td>
        <td class="popBox_Bg">保时捷</td>
        <td class="popBox_Bg">兰博基尼</td>
        <td class="popBox_Bg">法拉利</td>
      </tr>
      <tr>
        <td class="popBoxBg">倍数</td>
        <td class="popBox_Bg">{{bcData[0].multiple.luhu}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.jiebao}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.baoma}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.benchi}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.mashaladi}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.baoshijie}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.lanbojini}}</td>
        <td class="popBox_Bg">{{bcData[0].multiple.falali}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">押注
          <span class="word">注1</span>
        </td>
        <td class="popBoxbg">{{bcData[0].bet.luhu}}</td>
        <td class="popBoxbg">{{bcData[0].bet.jiebao}}</td>
        <td class="popBoxbg">{{bcData[0].bet.baoma}}</td>
        <td class="popBoxbg">{{bcData[0].bet.benchi}}</td>
        <td class="popBoxbg">{{bcData[0].bet.mashaladi}}</td>
        <td class="popBoxbg">{{bcData[0].bet.baoshijie}}</td>
        <td class="popBoxbg">{{bcData[0].bet.lanbojini}}</td>
        <td class="popBoxbg">{{bcData[0].bet.falali}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">赢分</td>
        <td class="popBoxbg">{{bcData[0].win.luhu}}</td>
        <td class="popBoxbg">{{bcData[0].win.jiebao}}</td>
        <td class="popBoxbg">{{bcData[0].win.baoma}}</td>
        <td class="popBoxbg">{{bcData[0].win.benchi}}</td>
        <td class="popBoxbg">{{bcData[0].win.mashaladi}}</td>
        <td class="popBoxbg">{{bcData[0].win.baoshijie}}</td>
        <td class="popBoxbg">{{bcData[0].win.lanbojini}}</td>
        <td class="popBoxbg">{{bcData[0].win.falali}}</td>
      </tr>
    </table>
    <div class="footer">
      <p>※註1：若玩家成功上庄，【押注】數值為當局其他玩家的押注量；【贏分】顯示【負值】表示庄家賠負。</p>
      <p>※註2：若玩家未上庄，【贏分】只顯示正贏分。</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["bcData"]
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
.word {
  display: inline-block;
  font-size: 12px;
}
.footer{
  margin-top:10px;
}
.footer p {
  text-align: left;
  margin: 8px;
}
</style>
