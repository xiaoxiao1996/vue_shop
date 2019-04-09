<template>
   <div class="app-login">
    <mt-header title="登录" fixed>
        <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
       <div class='login'>
        账号<input type="text" placeholder="请输入手机号" v-model="uname">
        密码<input type="password" placeholder="请输入密码" v-model='upwd'>
        <input type="text" id='input' v-model='inputcode'>
        <input type="button" id='code' @click='createCode()' v-model='code'>
        <mt-button size="large" type="danger" @click="login">登录</mt-button>
        <router-link :to="`/register`">注册</router-link>&nbsp;&nbsp;
        <router-link :to="`/login`">登录</router-link>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            uname:"",
            upwd:"",
            code:[],
            inputcode:""
        }
    },
    created(){
        this.createCode();
    },
    methods:{
        createCode(){
            var codeLength=4;
            var code1=[]
            //var codeV=document.getElementById('code');
            var random=new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
            for(var i=0;i<codeLength;i++){
                var index=Math.floor(Math.random()*36);
                code1+=random[index];
            }
            //codeV.value=code;
            //console.log(this.code);
            this.code=code1;
           // console.log(this.code);
        },
        login(){
           
            
            var uname=this.uname;
            var upwd=this.upwd;
            if(uname==''){
                Toast("手机号不能为空");
                return;
            }
            if(upwd==''){
                Toast("密码不能为空");
                return;
            }
            var inputcode=this.inputcode.toUpperCase();
             //var oValue=document.getElementById('input').value.toUpperCase();
            if(inputcode==''){
            Toast("请输入验证码");
            return;
            }else if(inputcode!=this.code){
                Toast("验证码不正确，请重新输入");
               inputcode='';
                this.createCode();
                return;
            }
            var url='http://127.0.0.1:5000/login?uname='+uname+"&upwd="+upwd;
            this.axios.get(url).then(result=>{
                Toast(result.data.msg);
                if(result.data.code==1){
                sessionStorage.setItem("uname",uname);
                //console.log(sessionStorage.getItem("reg"));
                if(sessionStorage.getItem("reg")=='reg'){
                    this.$router.push("/my");
                }else{
                    window.history.back(-1);
                }
                }
            })
        }
    }
}
</script>
<style>
.app-login{
    text-align:left;
}
.login{
    margin-top:55px;
}
.app-login .mint-header{
    color:#000;
    font-size:16px;
}
    .app-login input[type]{
        width:90%;
    }
    #code,#input{
        width:50% !important;
        /* text-align:left; */
    }
    #code{
        font-family:Arial;
        font-style:italic;
        font-weight:bold;
        border:0;
        letter-spacing:2px;
        color:blue;
        font-size:20px;
    }
    #code{
        height:40px;
    }
</style>


