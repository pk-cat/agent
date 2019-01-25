<template>
    <!-- 游戏收益统计 -->
    <div class="parent">
        <table>
            <tr class="tableBoxtr">
                <td>游戏名称</td>
                <td>投注总额</td>
                <td>派彩总额</td>
                <td>税收总额</td>
                <td>当日盈收</td>
                <td>前日盈收</td>
                <td>本月盈收</td>
                <td>总盈收</td>
            </tr>
            <tr class="tableBoxtd" v-for="(item,index) in yxsytjData" :key="index">
                <td>{{item.gName}}</td>
                <td>{{item.gBet}}</td>
                <td>{{item.gPayout}}</td>
                <td>{{item.gRevenue}}</td>
                <td>{{item.gProfits}}</td>
                <td>{{item.gYesProfits}}</td>
                <td>{{item.monthProfits}}</td>
                <td>{{item.allProfits}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props:['yxsytjData']
}
</script>

<style scoped>
/* 弹出框表格 */
.parent {
  width: 100%;
}
.parent table{
  width: 100%;  
}
.tableBoxtr td{
  background-color: #d9edf7;
}
td{
    height:40px;
    vertical-align: middle;
    border:1px solid #ddd;
}
.tableBoxtd td{
  background-color: #fff;
}
</style>
