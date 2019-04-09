<template>
<div>
    <mt-header fixed title='我的收藏'>
        <a slot="left" @click="fanhui">
            <mt-button icon="back">返回</mt-button>
        </a>
        </mt-header>
        <div class='app-cart'> 
        <div  v-for="(item,i) of list" :key="i" :data-pid="list[i].pid" class='cart cart1'>
            <!-- 图片 -->
            <div class='img tt'>
            <img :src="`http://127.0.0.1:5000/img/${item.img}`" alt="">
            </div>
            <div class='guige guige1'>
            <router-link  :to="`/proinfo?id=${item.pid}`">
                <span class='title'>{{item.title}}</span> 
            </router-link>  
            <span class='price'>￥{{item.price}}</span>
            </div>
            <div class="shanchu">
            <mt-button @click="delshoucang" :data-pid="list[i].pid">删除</mt-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {Toast} from "mint-ui"
export default{
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.load();
    },
    methods:{
        fanhui(){
            window.history.go(-1);
        },
        load(){
            var url="http://127.0.0.1:5000/getshoucang";
            this.axios.get(url).then(result=>{
                if(result.data.code==1){
                    this.list=result.data.data;
                    console.log(this.list);
                }
            })
        },
        delshoucang(e){
            var id=e.target.dataset.pid;
            //console.log(pid);
            var postData=this.qs.stringify({
                id:id
            })
            var url="http://127.0.0.1:5000/delshoucang";
            this.axios.post(url,postData).then(result=>{
                if(result.data.code==1){
                    Toast(result.data.data);
                    window.history.go(0);
                }
            })
        }
    }
}
</script>
<style>
.img.tt{
    margin-left:10px !important;
}
.cart.cart1{
    height:112px;
    width:100%;
    overflow:hidden;
}
.shanchu{
    display:inline-block;
    width:55px;
    height:112px;
    position:absolute;
    background-color:red;
}
.guige.guige1{
    width:181px;
    margin-left:139px;
}
.shanchu .mint-button--default{
    background-color:#d23525;
}
</style>