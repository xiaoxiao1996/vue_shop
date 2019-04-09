<template>
  <div>
    <mt-header fixed>
            <router-link :to="`/`" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 头像那一层 -->
    <div class='avator'>
        <!-- 头像 -->
      <router-link :to="`/avatar`">
            <img src="img/avatar.png" alt="">
      </router-link> 
        <span id='uname' v-html='uname' ></span>
        <span></span>
    </div>
    <!-- 订单 -->
    <div class="my-order">
        <div class='all-order'>
           <router-link :to="`/orderinfo?code=8`">
           <span class="mui-icon-extra mui-icon-extra-order"></span>
           <span>我的订单</span>
            </router-link>
            
        </div>
        <div class='order'>
            <ul>
                <li>
                    <router-link :to="`/orderinfo?code=1`">
                    <span class="mui-icon-extra mui-icon-extra-card"></span>
                    <p>待付款</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="`/orderinfo?code=2`"> 
                    <span class="mui-icon-extra mui-icon-extra-dictionary"></span>
                    <p>待发货</p>
                    </router-link> 
                </li>
                <li>
                    <router-link :to="`/orderinfo?code=3`"> 
                    <span class="mui-icon-extra mui-icon-extra-express"></span>
                    <p>待收货</p>
                   </router-link> 
                </li>
                <li>
                    <router-link :to="`/orderinfo?code=4`"> 
                    <span class="mui-icon mui-icon-chat"></span>
                    <p>待评价</p>
                     </router-link> 
                </li>
            </ul>
    </div>
    </div>
    <!-- 修改个人信息 -->
    <div class='info'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<router-link :to="`/addressList`" class="mui-navigate-right">我的收货地址</router-link>
			</li>
		</ul>
       </div>
       
       <!-- 我的收藏 -->
       <div class='info'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<router-link :to="`/shoucang`" class="mui-navigate-right">我的收藏</router-link>
			</li>
		</ul>
       </div>
       <!-- 账号与安全 -->
       <div class='info'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<router-link :to="`/zhanghao`" class="mui-navigate-right">账号与安全</router-link>
			</li>
		</ul>
       </div>
       <!-- 退出当前账户 -->
       <div class='info' @click='loginout'> 
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
				<a  class="mui-navigate-right">退出当前账户</a>
			</li>
		</ul>
       </div>
 </div>

</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            uname:sessionStorage.getItem("uname")
        }
    },
    created(){
        this.onload();
    },
    methods:{
        onload(){
            var url="http://127.0.0.1:5000/isLogin";
            this.axios.get(url).then(result=>{
                if(result.data.code=-1){
                    Toast(result.data.msg);
                    this.$router.push("/login");
                    return;
                }
            })
            //var name=sessionStorage.getItem("uname");
             //var name=document.getElementById("uname");

            var uname=this.uname;
            if(!uname){
                this.uname="<a href='#/login'>请登录</a>";
               // name.innerHTML="<router-link :to='/login'>请登录</router-link>";
               //this.$router.push("/login");

            }
        },
        loginout(){
            var uname=sessionStorage.setItem("uname",'');
            var url='http://127.0.0.1:5000/loginout';
            this.axios.post(url).then(result=>{
                //
                if(result.data.code==1){
                console.log("退出成功");
                window.history.go(0);
                this.$router.push("/login");
                }
            })

        }
    }
}
</script>
<style>

.avator{
    margin-top:30px;
    text-align:left;
    background-color:rgba(13,13,13,0.02);
}
.avator img{
    margin:20px auto 10px 10px;
    width:80px;
    height:80px;
}
.all-order{
    text-align:left;
     padding-top:20px; 
    /* margin-left:10px; */
    padding-bottom:21px;
    border-bottom:1px solid #8a7e7e;
    
}
.all-order a{
color:#5f6163;
}
.all-order span:nth-child(1){
    margin-left:10px;
}
.all-order span:nth-child(2){
    margin-left:7px;
}
.all-order .mui-icon-extra{
    position:relative;
    bottom:0;
}
.my-order{
    background:#fff;
}
.order ul li .mui-icon-extra{
    position:relative;
    bottom:0;
    
}
.order ul{
    list-style: none;
    margin-bottom:0;
    padding-left:0;
    width:100%;
}
.order ul:after{
    clear:both;
    content:"";
    display:block;
}
.order ul li{
    float:left;
    width:25%;
    height:50px;
    /* margin-left:5px; */
    /* margin-top:20px; */
    margin-bottom:15px;
    margin-top:20px;
}
.order ul li>span:nth-child(1){
    margin-left:8px;
}
.order:after{
    clear:both;
    content:"";
    display:block;
}
.info{
    margin-top:20px
}
.order a{
    color:#5f6163
}
</style>


