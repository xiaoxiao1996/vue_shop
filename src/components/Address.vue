<template>
    <div class='app'>
        <mt-header fixed title='添加收货地址'>
            <a slot="left">
                <mt-button icon="back" @click="fanhui">返回</mt-button>
            </a>
            <mt-button  slot="right" ></mt-button>
        </mt-header>
        <div class='app-address'>
            <div> 收货人</div>
            <div>
            <input type="text" placeholder='姓名' v-model="uname">
            </div>
            <div>收货地址</div>
            <div>
                <input type="text" placeholder='请详细录入街道/路段' v-model="address">
            </div>
            <div>邮编</div>
            <div>
                <input type="text" placeholder='邮政编码' v-model="emailId">
            </div>
            <div>联系电话</div>
            <div>
                <input type="text" placeholder='请准确录入收件人号码' v-model='phone'>
            </div>
            <!-- <div class='last'> -->
            <div class='moren'>设为默认地址</div>
            <div class='kaiguan'>
                <mt-switch v-model='value' @change="turn"></mt-switch>
            </div>
            <!-- </div> -->
        </div>
        <div class='fixed'>
              <input type="button" value="确定" class='submit' @click='addAddress'>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            value:false,
            uname:"",
            address:"",
            emailId:"",
            phone:"",
            moren:0
        }
    },
    created(){

    },
    methods:{
        fanhui(){
            window.history.go(-1);
        },
        turn(){
            // console.log(this.value);
            var value=this.value;
            if(value){
                this.moren=1
            }else{
                this.moren=0;
            }
        },
        addAddress(){
            // console.log(this.moren);
            if(!this.uname){
                Toast("收货人不能为空");
                return;
            }
            if(!this.address){
                Toast("收货地址不能为空");
                return;
            }
            if(!this.phone){
                Toast("联系电话不能为空");
                return;
            }
            var url='http://127.0.0.1:5000/addAddress';
            var postData=this.qs.stringify({
                uname:this.uname,
                address:this.address,
                emailId:this.emailId,
                phone:this.phone,
                moren:this.moren
            })
            this.axios.post(url,postData).then(result=>{
                Toast(result.data.msg);
                if(result.data.code==1){
                    this.$router.go(-1);
                }
            })
        }
    }
}
</script>
<style>
.app-address{
    margin-top:40px;
}
.app-address div{
    display:inline-block;
    text-align:left;
}
.app-address div:nth-child(2n+1){
    width:19%;
}
.app-address div:nth-child(2n){
    width:81%;
}
.moren{
    width:102px !important;
}
.kaiguan{
    width:76px !important;
   margin-left:195px;
}
.kaiguan label{
    margin:0;
}
.last{
    width:100%;
    display:flex;
    justify-content: space-between;
} 
.fixed{
    position:fixed;
    bottom:0;
    height:40px;
    width:100%;
}
</style>


