<template>
    <div class="app-reg">
    <mt-header title="登录" fixed>
        <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class='reg'>
        账号<input type="text" placeholder="请输入手机号" v-model="uname">
        密码<input type="password" placeholder="请设置8-20位登录密码" v-model='upwd'>
        <input type="text" id='input' v-model='inputcode'>
        <input type="button" id='code' @click='createCode()' v-model='code'>
        <span>注册即为同意<a href="">&lt;&lt;用户注册协议&gt;&gt;</a></span>
        <mt-button size="large" type="primary" @click="reg">注册</mt-button>
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
            console.log(this.code);
        },
        reg(){
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
            var postData=this.qs.stringify({
                uname:uname,
                upwd:upwd
            })
            var url='http://127.0.0.1:5000/reg';
            this.axios.post(url,postData).then(result=>{
                Toast(result.data.msg);
                if(result.data.code==1){
                 sessionStorage.setItem("reg","reg");
                this.$router.push("/login");
                }
            })

        }
    }
}
</script>
<style>
.app-reg{
    text-align:left;
}
.reg{
    margin-top:55px;
}
.app-reg .mint-header{
    color:#000;
    font-size:16px;
}
    .app-reg input[type]{
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

