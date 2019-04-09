<template>
<div>
    <mt-header fixed title='账号与安全'>
        <a slot="left" @click="fanhui">
            <mt-button icon="back">返回</mt-button>
        </a>
    </mt-header>
    <div class='info1 one'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<a  class="mui-navigate-right">会员名<span class="huiyuanming">{{uname}}</span></a>
                            
			</li>

		</ul>
       </div>
       <!-- 修改手机号码 
       <div class='info1'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<router-link :to="``" class="mui-navigate-right">修改手机号码</router-link>
			</li>
		</ul>
       </div>-->
       <!-- 设置登录密码 -->
       <div class='info1'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<router-link  class="mui-navigate-right" :to="`/setpwd`">设置登录密码</router-link>
			</li>
		</ul>
       </div>
</div>
</template>
<script>
export default{
    data(){
        return{
            uname:sessionStorage.getItem("uname")
        }

    },
    created(){
    },
    methods:{
        fanhui(){
            window.history.go(-1);
        }
    }
}
</script>
<style>
.info1.one{
    margin-top:50px;
}
.info1{
    margin-bottom:10px;
}
.info1.one li:nth-child(1)>a::after{
    content:"";
}
.info1.one li:nth-child(1){
    padding-right:0px;
    width:100%;
}
.info1.one li:nth-child(1)>a{
    padding-right:0;
    margin-right:0;
}
.huiyuanming{
    margin-left:210px;
}
</style>