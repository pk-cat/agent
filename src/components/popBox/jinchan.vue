<template>
  <!-- 金蟾 -->
  <div class="block">
    <div class="spanParent">
      <span v-for="(item,index) in JCarr" :key="index" class="spanImg">
        <span v-for="(ite,inde) in jcData[0].fishArr" :key="inde">
          <span style="display:block">
            <img
              v-if="item.name==ite.name"
              :src="'../../../static/image/'+item.img+'.png'"
              class="jcImg"
            >
          </span>
          <span v-if="item.name==ite.name">{{ite.name+':'+ite.num}}</span>
        </span>
      </span>
    </div>
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg">{{jcData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg">{{jcData[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">子弹消耗(分数)</td>
        <td class="popBoxBg">捕鱼收获(分数)</td>
        <td class="popBoxBg">初始分数</td>
        <td class="popBoxBg">当前分数</td>
      </tr>
      <tr>
        <td class="popBoxbg">{{jcData[0].bullet}}</td>
        <td class="popBoxbg">{{jcData[0].getFish}}</td>
        <td class="popBoxbg">{{jcData[0].origin}}</td>
        <td class="popBoxbg">{{jcData[0].now}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ["jcData"],
  data() {
    return {
      JCarr: [
        { name: "鱼王-小丑鱼", img: "JCyuwang" },
        { name: "金蟾", img: "JCjinchan" },
        { name: "剑鱼", img: "JCjianyu" },
        { name: "银鲨", img: "JCyinsha" },
        { name: "金鲨", img: "JCjinsha" },
        { name: "海龟", img: "JChaigui" },
        { name: "热带鱼", img: "JCredaiyu" },
        { name: "蝴蝶鱼", img: "JChudieyu" },
        { name: "孔雀鱼", img: "JCkongqueyu" },
        { name: "灯笼鱼", img: "JCdenglongyu" },
        { name: "蓝鱼", img: "JClanyu" },
        { name: "紫草鱼", img: "JCzicaoyu" },
        { name: "大眼鱼", img: "JCdayanyu" },
        { name: "刺鱼", img: "JCciyu" },
        { name: "小丑鱼", img: "JCxiaochouyu" },
        { name: "蜗牛鱼", img: "JCwoniuyu" },
        { name: "黄草鱼", img: "JChuangcaoyu" },
        { name: "小草鱼", img: "JCxiaocaoyu" }
      ]
    };
  }
};
</script>
<style scoped>
.spanParent{
  text-align: left;
  margin-bottom: 10px;
}
.spanImg{
  display: inline-block;
}
.block{
  width:100%;
  background-color: #cecece;
}
.block table{
  width: 100%;
}
td{
  height:34px;
  vertical-align: middle;
}
</style>
