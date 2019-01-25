<template>
<!-- 账号信息 -->
    <div class="newAgency">
        <!-- 账号姓名 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="2"><div class="content">账号</div></el-col>
                <el-col :span="4"><el-input v-model="msgAccount" :disabled="true"></el-input></el-col>
                <el-col :span="2"><div class="content" style="borderRight:0;borderLeft:0;marginLeft:-2px">姓名</div></el-col>
                <el-col :span="3"><el-input v-model="msgName":disabled="true"></el-input></el-col>
                <el-col :span="2"><div class="content"style="borderRight:0;borderLeft:0;marginLeft:-2px">ID</div></el-col>
                <el-col :span="4"><el-input v-model="msgID" :disabled="true"></el-input></el-col>
                <el-col :span="3"><div class="content"style="borderRight:0;borderLeft:0;marginLeft:-2px">后台等级</div></el-col>
                <el-col :span="4"><el-input v-model="msgLevel" :disabled="true"></el-input></el-col>
            </el-row>
        </div>
        <!-- 上限额度 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="4"><div class="content"  style="borderRight:0;">上限额度(RMB)</div></el-col>
                <el-col :span="20"><el-input v-model="msgMax"  :disabled="true"></el-input></el-col>
            </el-row>
        </div>
        <!-- 兑换比率以及币种 -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="4"><div class="content"  style="borderRight:0;">上分兑换比率</div></el-col>
                <el-col :span="4"><el-input v-model="msgTop"  :disabled="true"></el-input></el-col>
                <el-col :span="4"><div class="content"  style="borderLeft:0;marginLeft:-2px">下分兑换比率</div></el-col>
                <el-col :span="5"><el-input v-model="msgBottom"  :disabled="true"></el-input></el-col>
                <el-col :span="3"><div class="content"  style="borderLeft:0;marginLeft:-2px">币种</div></el-col>
                <el-col :span="4"><el-input v-model="msgCurrency"  :disabled="true"></el-input></el-col>
            </el-row>
        </div>
        <!-- API KEY -->
        <div class="blank">
            <el-row :span="24">
                <el-col :span="4"><div class="content"  style="borderRight:0;">API KEY</div></el-col>
                <el-col :span="20"><el-input v-model="msgMax"  :disabled="true"></el-input></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      msgAccount: "", //账号
      msgName: "", //姓名
      msgID: "", //ID
      msgLevel: "", //后台等级
      msgMax: "", //上限额度
      msgTop: "", //上分兑换比率
      msgBottom: "", //下分兑换比率
      msgCurrency: "", //币种
      msgAPI: "", //API
    };
  },
  created() {
    let info = JSON.parse(sessionStorage.getItem("info")); //账号的信息
    this.msgAccount = info.account; //账号
    this.msgName = info.name; //姓名
    this.msgID = info.ID; //ID
    this.msgLevel = info.level; //后台等级
    this.msgMax = info.maxLimit; //上限额度
    this.msgTop = info.top; //上分兑换比率
    this.msgBottom = info.bottom; //下分兑换比率
    this.msgCurrency = info.currency; //币种
    this.msgAPI = info.APIKEY; //API
  }
};
</script>
<style scoped>
.newAgency {
  margin: 0 auto;
  width: 700px;
  margin-top: 60px;
}
.blank {
  margin-bottom: 20px;
}
.content {
  margin-right: -2px;
  min-height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  color: #555;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

