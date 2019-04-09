<template>
    <div>
        <mt-header fixed>
            <router-link :to="`/`" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
            
        <div class="good-products" v-infinite-scroll="loadImg" infinite-scroll-disabled="loading" infinite-scroll-distance="2">
            <a @click="top" ><span fixed class="mui-icon-extra mui-icon-extra-top"></span></a>
            <div  class="good-item" v-for="(item,i) of list" :key="i">
             <router-link :to="`/proinfo?id=${item.id}`"> 
                <img :src="`http://127.0.0.1:5000/img/${item.img}`" alt="">
            </router-link>
                <div>
                <span>{{item.title}}</span>
                </div>
                <div>
                <span>￥{{item.price}}</span>
                </div>
            </div>
            
            <!-- <mt-button type="primary" size="large" @click="loadImg">加载更多</mt-button> -->
        </div>
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            pid:this.$route.query.pid,
            list:[],
            pno:0  
        }
    },
    created(){
        //  this.loadImg();
    },
    methods:{
        loadImg(){
            this.loading=true;
            var pid=this.pid;
            setTimeout(()=>{
            this.pno++;
            var url="http://127.0.0.1:5000/products?pid="+pid+"&pno="+this.pno;
            this.axios.get(url).then(result=>{
                // console.log(result.data.data);
                 var arr=this.list.concat(result.data.data)
                this.list=arr;
            })
            
            this.loading=false;
            });
            
        },
        top(){
             var curTop=document.documentElement.scrollTop || document.body.scrollTop;
             //console.log(curTop);
            document.documentElement.scrollTop=0;
        }

    }
}

</script>
<style>
    .good-products{
        display:flex;
        flex-wrap:wrap;
        justify-content: space-between;
        margin-top:43px;
    }
    .good-products .good-item{
        width:49%;
         /* display:flex;  */
         /* flex-direction: column;  */
         border:1px solid #dcd6d6;
    }
    .good-products .good-item img{
        width:100%;
    }
    .good-item>div:nth-child(3){
        text-align:left;
    }
    .good-item>div:nth-child(3)>span{
        color:red;
    }
    .good-item>div:nth-child(2)>span{
        display:block;
        width:100%;
        white-space:nowrap; 
        overflow: hidden;
        text-overflow:ellipsis;
        color:#656565;
    }
    .mint-header{
        background-color:#fff !important;
        color:#000;
    }
    .mint-button-icon{
        color:#000;
        font-size:26px;
        margin-top:-7px;

    }
    label{
        color:#000;
        font-size:16px;
        margin-top:10px;

    }
    .mui-icon-extra{
        position:fixed;
        bottom:30px;
        right:0;
        display:none;
    }
</style>


