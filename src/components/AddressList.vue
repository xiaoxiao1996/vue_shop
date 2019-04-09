<template>
<div>
        <mt-header fixed title='我的收货地址'>
            <a slot="left" @click="fanhui">
                <mt-button icon="back">返回</mt-button>
            </a>
            <router-link :to="`/address`" slot="right" >
            <mt-button  >添加新地址</mt-button>
            </router-link>
        </mt-header>
        <div id='addList'>
            <div v-for="(item,i) of list" :key="i">
            <span class='uname'>{{item.uname}}</span>
            <span>{{item.phone}}</span>
            <p class='address'>{{item.address}}</p><hr>
            <span v-if="item.moren==1">
         
                <div class='radio check' @click='setmoren' :data-moren="item.moren" :data-id="item.id"></div>
                <span>设为默认地址</span>
            </span> 
            <span v-else> 
      
            <div class='radio notcheck' @click='setmoren' :data-moren="item.moren" :data-id="item.id"></div>
            <span >设为默认地址</span>
            </span> 
            <router-link :to="`/updateAddress?id=${item.id}`"><span class="mui-icon mui-icon-compose">编辑</span></router-link>
			<a><span class="mui-icon mui-icon-trash" @click='delAddress' :data-id="item.id">删除</span></a>
            </div>
        </div>
</div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            list:[],
            moren:0
        }
    },
    created(){
        this.loadAddress();
    },
    methods:{
        loadAddress(){
            var url='http://127.0.0.1:5000/addresslist';
            this.axios.get(url).then(result=>{
                // console.log(result.data.data);
                this.list=result.data.data;
            })
        },
        setmoren(e){
            var moren=e.target.dataset.moren;
            //console.log(moren)
             if(moren==1){
                 this.moren=0;
             }else{
                 this.moren=1;
             }
             //console.log(this.moren);
             var id=e.target.dataset.id;
            // console.log(id);
            var postData=this.qs.stringify({
                id:id,
                moren:this.moren
            })
            var url='http://127.0.0.1:5000/updatemoren'
            this.axios.post(url,postData).then(result=>{
                //console.log(result);
                Toast(result.data.msg);
                this.$router.go(0);
            })

        },
        delAddress(e){
            var id=e.target.dataset.id;
            // console.log(id);
            var url='http://127.0.0.1:5000/delAddress?id='+id;
            this.axios.get(url).then(result=>{
                // console.log(result);
                if(result.data.code==1){
                    console.log(result);
                    this.loadAddress();

                }
            })
        },
        fanhui(){
            window.history.go(-1);
        }
    }
}
</script>
<style>
#addList{
    margin-top:40px;
}
#addList>div{
    /* border:1px solid #000; */
    background:#fbfafa;
    width:100%;
    text-align:left;
    margin-bottom:10px;
}
#addList .uname{
    display:inline-block;
    padding:21px;
}
#addList .address{
    margin-left:20px;
    font-size:18px;
}
#addList .radio{
    display:inline-block;
    width:25px;
    height:25px;
    margin-left:18px;
    border:1px solid #ddd;
    border-radius:50%;
}
.mui-icon.mui-icon-compose{
    padding-left:79px;
    font-size:19px;
    display:inline-block;
    margin-top:-10px;
}
.mui-icon.mui-icon-trash{
    padding-left:20px;
    font-size:19px;
    display:inline-block;
}
.radio1::before{
    content:'\EA01';
    color:#c9c9c9;
    font-size:23px;
    display:block;
}
.check{
    background:red;
}
.notcheck{

}
</style>


