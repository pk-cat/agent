<template>
    <!-- 账号管理 -->
    <div class="accountManage">
        <!-- 路由入口 -->
        <div class="nav">
            <router-link :class="this.$route.path=='/aNewAgency'?'route-isactive':'route'" style="color:#fff" to='/aNewAgency'>新建代理</router-link>
            <router-link :class="this.$route.path=='/aNewBack'?'route-isactive':'route'" style="color:#fff" to='/aNewBack'>新建后台账号</router-link>
            <router-link :class="this.$route.path=='/aChangePwd'?'route-isactive':'route'" style="color:#fff" to='/aChangePwd'>改密码</router-link>
            <router-link :class="this.$route.path=='/aAccountState'?'route-isactive':'route'" style="color:#fff" to='/aAccountState'>账号信息</router-link>
            <router-link :class="this.$route.path=='/aBackAccount'?'route-isactive':'route'" style="color:#fff" to='/aBackAccount'>后台账号</router-link>
            <router-link :class="this.$route.path=='/aResetPwd'?'route-isactive':'route'" style="color:#fff" to='/aResetPwd'>重置代理商密码</router-link>
        </div>
        <!-- 路由出口 -->
        <div class="navOut">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.accountManage{
    margin-left:24px;
    margin-right:24px;
}
/* 导航入口 */
.nav{
    height:48px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
.route{
    background-color: #7f9aa2;
    height:24px;
    line-height: 22px;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    display: inline-block;
    padding: 10px 14px;
    text-decoration: none;
}
.route:hover{
    background-color: #5bc0de;
    height:24px;
    line-height: 22px;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    display: inline-block;
    padding: 10px 14px;
    text-decoration: none;
}
.route-isactive{
    background-color: #5bc0de;
    height:24px;
    line-height: 22px;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    display: inline-block;
    padding: 10px 14px;
    text-decoration: none;
}
.navOut{
    margin-top:34px;
}
</style>
