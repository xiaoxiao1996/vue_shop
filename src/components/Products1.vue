<template>
     <div>
        <mt-header fixed>
            <router-link :to="`/`" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
            
        <div class="good-products" v-infinite-scroll="selProducts" infinite-scroll-disabled="loading" infinite-scroll-distance="2">
            <a @click="top" ><span fixed class="mui-icon-extra mui-icon-extra-top"></span></a>
            <div  class="good-item" v-for="item of list">
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
            value:this.$route.query.title,
            list:[],
            pno:0
        }
    },
    created(){
        // this.selProducts();
        
    },
    methods:{
         selProducts(){
            this.loading=true;
            // var pid=this.pid;
            var value=this.value;
            setTimeout(()=>{
            this.pno++;
            var url="http://127.0.0.1:5000/selproducts?title="+value+"&pno="+this.pno;
            this.axios.get(url).then(result=>{
                // console.log(result.data.data);
                 var arr=this.list.concat(result.data.data)
                this.list=arr;
            })
            this.loading=false;
            });
            
        },
        /*
        selProducts(){
            var value=this.value;
            var url="http://127.0.0.1:5000/selproducts?title="+value;
            this.axios.get(url).then(result=>{
                this.list=result.data.data;
            })
        },*/
        top(){
             var curTop=document.documentElement.scrollTop || document.body.scrollTop;
             //console.log(curTop);
            document.documentElement.scrollTop=0;
        }
    }
}
</script>
<style>

</style>


