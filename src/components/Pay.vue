<template> 
    <!--支付弹窗-->
    <div class='pay' ref="pay">
        <div>
            <span>确认付款</span>
            <a><span class="mui-icon mui-icon-closeempty close" @click="hidden()"></span></a>
        </div>
        <div ref='submsg'></div>
            <mt-button size="large" type="primary" class='paybth' @click="nowpay">立即付款</mt-button>
        </div>
</template>
<script>
import {Toast} from "mint-ui"
import { setTimeout } from 'timers';
export default{
    data(){
        
        return{
            zongji:0,
            a:0,
            code:1
        }
        
    },
     props:['total'],
    created(){
        
    },
    mounted(){
        this.load();
       
    },
    methods:{
        load(){ 
            
           setInterval(()=>{
            var div=this.$refs.pay;
            //console.log(div);
            //this.submsg=div.submsg;
            //console.log(div.getAttribute('a'));
            //console.log(div.getAttribute('submsg'));
            var submsg=this.$refs.submsg;
            submsg.innerHTML='¥'+div.getAttribute('submsg');
            // console.log(submsg.innerHTML);
           },300)   
        },

        //支付弹窗的显示隐藏事件
        hidden(){
            //通过$emit引用组件传过来的hidden事件
            this.$emit('hidden');

        },
        nowpay(){
            this.code=2;
            var postData=this.qs.stringify({
                code:this.code
            })
            var url='http://127.0.0.1:5000/successPay'
            this.axios.post(url,postData).then(result=>{
                if(result.data.code==1){
                    Toast(result.data.msg);
                    this.hidden();
                    window.history.go(0);
                    //  this.$router.push("/orderinfo?code=2");
                }
            })
        }
    }
}
</script>
<style>
.mui-icon.mui-icon-closeempty.close{
    margin-left:0;
    position:relative;
    margin-left:0;

}
.pay{
    width:100%;
    height:300px;
    position:fixed;
    bottom:0;
    background:#e4e2e2;

}
.pay div:nth-child(1){
    font-size:20px;
}
.pay div:nth-child(1)>span{
    margin-left:36px;
}
.pay div:nth-child(2){
    font-size:33px;
    margin-top:32px;
}
.paybth{
    position:fixed !important;
    bottom:0;
}
</style>   