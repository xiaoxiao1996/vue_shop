<template>
<div>
    <mt-header fixed title='修改密码'>
        <a slot="left" @click="fanhui">
            <mt-button icon="back">返回</mt-button>
        </a>
    </mt-header>
    <div class='setupwd'>
        <input type="password" v-model="upwd" placeholder="请输入当前登录密码">
        <input type="password" v-model="upwd1" placeholder="确认新密码">
        <div>必须是6-20个英文字母、数字(除空格)</div>
        <mt-button size="large" type="danger" @click="updateupwd">确认</mt-button>
    </div>
    
</div>
</template>
<script>
import {Toast} from "mint-ui"
export default{
    data(){
        return{
           upwd:"",
           upwd1:""
        }

    },
    created(){
    },
    methods:{
        fanhui(){
            window.history.go(-1);
        },
        updateupwd(){
            var postData=this.qs.stringify({
                upwd:this.upwd,
                upwd1:this.upwd1
            })
            var url="http://127.0.0.1:5000/updateupwd";
            this.axios.post(url,postData).then(result=>{
                Toast(result.data.msg);
                if(result.data.code==1){
                    this.$router.push("/login");
                }
            })
        }
    }
}
</script>
<style>
.setupwd{
    margin-top:50px;
}
</style>