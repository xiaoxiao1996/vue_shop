<template>
<div class="app-home">
    <!-- <mt-search :value.sync="value"></mt-search> -->
    <input type="text" v-model='value' class='search'> 
    <router-link :to="`/serachProducts?title=${value}`"><input type="button" value="搜索" class='sousuo'></router-link>
    <!-- <mt-search v-model='value' cancel-text='取消' aria-placeholder="搜索" @click="selProducts">
    </mt-search> -->
    <mt-swipe  :auto="4000">
    <mt-swipe-item v-for="item of list">
        <img :src="item.img_url" alt="">
    </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		<!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,i) of menulist"> -->
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
            <router-link :to="`/product?pid=1`" >
		        <img src="img/daohang1.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
             <router-link :to="`/product?pid=2`" >
		        <img src="img/daohang2.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
             <router-link :to="`/product?pid=3`" >
		        <img src="img/daohang3.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
             <router-link :to="`/product?pid=4`" >
		        <img src="img/daohang7.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
             <router-link :to="`/product?pid=3`" >
		        <img src="img/daohang5.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" >
             <router-link :to="`/product?pid=4`" >
		        <img src="img/daohang6.jpg" alt="">
		    <!-- <div class="mui-media-body">Home</div> -->
            </router-link>
        </li>
    </ul>
    <!-- <div>
        <a href=""><img src="img/t1.jpg" alt=""></a>
        <a href=""><img src="img/t2.jpg" alt=""></a>
    </div> -->
    <div class="mt-2">
        <h3>2019 新春上新</h3>
        <div>
            <router-link :to="`/product?pid=1`" ><img src="img/sx1.jpg" alt=""></router-link>
            <router-link :to="`/product?pid=2`" ><img src="img/sx2.jpg" alt=""></router-link>
        </div>
        <div>
            <router-link :to="`/product?pid=4`" ><img src="img/sx3.jpg" alt=""></router-link>
            <router-link :to="`/product?pid=3`" ><img src="img/sx4.jpg" alt=""></router-link>
            <router-link :to="`/product?pid=1`" ><img src="img/sx5.jpg" alt=""></router-link>
        </div>
    </div> -->
    <nav class="mui-bar mui-bar-tab">
			<router-link :to="`/`"  class="mui-tab-item" href="#tabbar" >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link :to="`/cart`"  class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <!-- <span class="mui-badge">9</span> -->
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link :to="`/my`" class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
			<!-- <a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a> -->
		</nav>
</div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            // menulist:[],
            value:""
        }
    },
    created(){
         this.loadImg();
         this.loadMenu();
    },
    methods:{
        loadImg(){
            var url="http://127.0.0.1:5000/banner";
            this.axios.get(url).then(result=>{
                //console.log(result);
                this.list=result.data.data;
            })
        },
        loadMenu(){
            var url="http://127.0.0.1:5000/menu";
            this.axios.get(url).then(result=>{
                this.menulist=result.data.data;
                // console.log(result.data.data);
            })
        },
        /*
        jump(){
            this.$router.push("/product")
        }*/
        
    }
    
}
</script>
<style>
#app{
    /* text-align:left !important; */
}
.app-home .mint-swipe{
    height:200px;
}
.app-home .mint-swipe img{
    width:100%;
}
.app-home .mui-grid-9 img{
       width:100%;  
     height:100%; 
}
.app-home .mui-grid-view.mui-grid-9{
    background-color:#fff;
}
.mint-search{
    height:45px !important;
}
.mint-searchbar{
    width:100%;
     background-color:#f9f0f0 !important; 
}
.mint-searchbar-inner{
    width:128px;
    height:40px;
}
input[type='search']{
    margin-top:15px;
    background-color:rgba(0,0,0,0) !important;

}
.search{
    margin-bottom:0px !important;
    width:85% !important;
    height:35px !important;
    border-radius:5px !important;
    background-color:rgba(0,0,0,0) !important;
}
.sousuo{
    height:35px;
    background-color:rgba(0,0,0,0) !important;
    outline:0;
    border:0 !important;
}
a:not([href]):not([tabindex]){
    font-size:16px;
}
.mt-2 img{
    padding:5px;
}
</style>


