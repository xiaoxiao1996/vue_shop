<template>
    <div class='app'>
        <mt-header fixed title='修改收货地址'>
            <router-link :to="`/addressList`" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
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
                <mt-switch v-model='value' @change='turn'></mt-switch>
            </div>
            <!-- </div> -->
        </div>
        <div class='fixed'>
              <input type="button" value="确定" class='submit' @click='updateAddress'>
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
            moren:0,
            id:this.$route.query.id
        }
    },
    created(){
        this.loadAddress()
    },
    methods:{
        loadAddress(){
            var url='http://127.0.0.1:5000/getAddress1?id='+this.id;
            this.axios.get(url).then(result=>{
                 console.log(result.data.data);
                this.uname=result.data.data[0].uname;
                this.phone=result.data.data[0].phone;
                this.address=result.data.data[0].address;
                this.emailId=result.data.data[0].emailId;
                if(result.data.data[0].moren==1){
                    this.value=true;
                }else{
                    this.value=false;
                }
            })
        },
        turn(){
             console.log(11)
             console.log(this.value);
             console.log(this.moren);
            //var value=this.value;
            if(this.value){
                this.moren=1
            }else{
                this.moren=0;
            }
            // console.log(this.moren);
        },
        updateAddress(){
            // console.log(this.moren);
           var postData=this.qs.stringify({
                uname:this.uname,
                address:this.address,
                emailId:this.emailId,
                phone:this.phone,
                moren:this.moren,
                id:this.$route.query.id,
            })
            var url='http://127.0.0.1:5000/updateAddress';
            this.axios.post(url,postData).then(result=>{
                console.log(result.data.msg);
                 if(result.data.code==1){
                     this.$router.go(-1)
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


