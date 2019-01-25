<template>
  <!-- 李逵 -->
  <div class="block">
    <!-- 图片 -->
    <div class="spanParent">
      <span v-for="(item,index) in JCarr" :key="index" class="spanImg">
        <span v-for="(ite,inde) in lkData[0].fishArr" :key="inde">
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
    <!-- 表格 -->
    <table>
      <tr>
        <td class="popBoxBg">抽水模式</td>
        <td class="popBoxbg">{{lkData[0].drewPattern}}</td>
        <td class="popBoxBg">抽水</td>
        <td class="popBoxbg">{{lkData[0].drew}}</td>
      </tr>
      <tr>
        <td class="popBoxBg">子弹消耗(分数)</td>
        <td class="popBoxBg">捕鱼收获(分数)</td>
        <td class="popBoxBg">初始分数</td>
        <td class="popBoxBg">当前分数</td>
      </tr>
      <tr>
        <td class="popBoxbg">{{lkData[0].bullet}}</td>
        <td class="popBoxbg">{{lkData[0].getFish}}</td>
        <td class="popBoxbg">{{lkData[0].origin}}</td>
        <td class="popBoxbg">{{lkData[0].now}}</td>
      </tr>
    </table>

  </div>
</template>
<script>
export default {
  props: ["lkData"],
  data() {
    return {
      JCarr: [
        { name: "鱼王-热带紫鱼", img: "lkYwRdzy" },
        { name: "鱼王-热带黄鱼", img: "lkYwRdhy" },
        { name: "鱼王-小黄鱼", img: "lkYwXhy" },
        { name: "大四喜-16倍", img: "lkDsx16" },
        { name: "金鲸鱼", img: "lkJinjingyu" },
        { name: "金鲨鱼", img: "lkJinshayu" },
        { name: "海龟", img: "lkHaigui" },
        { name: "铃铛鱼", img: "lkLingdangyu" },
        { name: "灯笼鱼", img: "lkDenglongyu" },
        { name: "狮头鱼", img: "lkShitouyu" },
        { name: "热带紫鱼", img: "lkRedaiziyu" },
        { name: "大眼金鱼", img: "lkDayanjinyu" },
        { name: "小丑鱼", img: "lkXiaochouyu" },
        { name: "小黄鱼", img: "lkXiaohuangyu" },
        { name: "热带黄鱼", img: "lkRedaihuangyu" }
      ]
    };
  }
};
</script>
<style scoped>
.block{
  width:100%;
  background-color: #cecece;
}
.spanParent{
  text-align: left;
  margin-bottom: 10px;
}
.spanImg{
  display:inline-block;
}
.block table{
  width:100%;
}
td{
  vertical-align: middle;
  height:34px;
}
</style>
