<template>
    <div class='app'>
        <mt-header fixed title='确认订单'>
            <a @click="fanhui" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
            <mt-button  slot="right" ></mt-button>
        </mt-header>
        <!--用户不存在收货地址 -->
        <p class='address-bd first'></p>
        <div v-if="this.address==null">
        <div class='addr' >
            <router-link :to="`/address`">
                <span class="mui-icon mui-icon-plusempty"></span>收货地址
            </router-link>
        </div>
        </div>
        <!-- 用户存在地址 -->
        <div  v-if="this.address!=null">
            <div class='addr1'>
                <div>{{address.uname}}</div>
                <div>{{address.phone}}</div>
                <div>{{address.address}}</div> 
            </div>
            <div class='icon address' @click='addressList'></div>
        </div>
        <p class='address-bd last'></p>
        <!-- 订单列表 -->
        <div>
            <div v-for="(item,i) of list" :key="i" class='order' :data-id="item.pid"  :data-color="item.color" :data-size="item.size" ref='pid'>
                <div class='pro_img'>
                <img :src="item.img" alt="">
                </div>
                <div class='pro_info'>
                <p class='title'>{{item.title}}</p>
                <span class='color'>{{item.color}}</span>
                <span>{{item.size}}</span>
                 *<span>{{item.num}}</span>
                 </div>
                 <div class='pro_total'>
                 <span>￥{{item.price*item.num}}</span>
                 </div>
            </div>
        </div>
        <!-- 底部固定 -->
        <div class='buy' v-show="show">
            <div>合计：<span class='price'>￥{{total}}</span>
        </div>
            <div><input type="button" value="提交订单" class='submit' @click='submitOrder'></div>
        </div>
        <pay @hidden='hiddenShow' v-show="pay_pop_up" :submsg='total'></pay>
    </div>
</template>
<script>
//引入组件
import pay from '@/components/Pay.vue'
export default {
    data(){
        return{
            list:[],
            total:0,
            address:{uname:null},
            // toggleClass1:{
            //     hide:false
            // },
            // toggleClass:{
            //     hide:false
            // },
            code:0,
            pay_pop_up:false,
            show:true
        }
    },
    components:{
        pay
    },
    created(){
        this.load();
        this.loadAddress();
    },
    mounted(){

    },
    methods:{
        load(){
            var url='http://127.0.0.1:5000/getOrder';
            this.axios.get(url).then(result=>{
                if(result.data.code==1){
                    this.list=result.data.data;
                    // console.log(this.list);
                 this.$nextTick(function(){
                var spans=document.querySelectorAll(".pro_total>span");
                var sum=0;
                console.log(spans)
                for(var span of spans){
                    var price=parseInt(span.innerHTML.slice(1));
                    sum+=price;
                    // console.log(sum);
                }
                // console.log(sum);
                this.total=sum;
                // var pid=this.$refs.pid;
                // //console.log(pid);
            })
                }

            })
        },
        loadAddress(){
            var url='http://127.0.0.1:5000/getAddress';
            this.axios.get(url).then(result=>{
                //  console.log(result)
                this.address=result.data.data[0]; 
                //  if(result.data.data.length==0){
                //      this.toggleClass1 = {
                //          hide:false
                //      };
                //      this.toggleClass = {
                //          hide:true
                //      };
                //  }else{
                //      this.toggleClass1 = {
                //          hide:true
                //      };
                //      this.toggleClass = {
                //          hide:false
                //      };
                //  }
                //      console.log(this.toggleClass);
                //      console.log(this.toggleClass1);
            })
        },
        addressList(){
            this.$router.push("/addressList")
        },
        submitOrder(){
            this.code=1;
            var postData=this.qs.stringify({
                code:this.code
            })
            var url='http://127.0.0.1:5000/submitOrder';
            this.axios.post(url,postData).then(result=>{
                if(result.data.code==1){
                 console.log(result.data.msg);
                var pid=this.$refs.pid;
                console.log(pid);
                if(pid.length>0){
                for(var cb of pid){
                    var pid=cb.dataset.id;
                    // console.log(pid);
                     var color=cb.dataset.color;
                     var size=cb.dataset.size;
                var url='http://127.0.0.1:5000/delItem?pid='+pid+"&color="+color+"&size="+size;
               this.axios.get(url).then(result=>{
                if(result.data.code==1){
                console.log(result.data.msg);
                //  this.loadCart();
                }
               })
                }
                }
                //console.log(11);
                //支付弹窗框显示（组件引用的弹出框）
                this.pay_pop_up=true;
                this.show=false;
                // this.$router.push("/orderinfo?code=1");
                }
            })

        },
        //支付弹窗框隐藏（传给组件一个点击事件）
        hiddenShow(){
            let that=this;
            that.pay_pop_up=false;
            this.show=true;
        },
        fanhui(){
            window.history.go(-1);
        },

    }
}
</script>
<style>
.addr{
    /* margin-top:40px; */
    height:90px;
    border:1px solid #d0cccc;
    margin-bottom:10px;
    display: flex;
    justify-content: center;
    align-items:center;
    color:#000 !important;
}
.order{
    display:flex;
    margin-bottom:10px;
    /* border-bottom:1px solid #e5e5e5; */
    background: #ebeaea;
}
.pro_img{
    width:30%;
    height:110px;
}
.pro_img img{
    width:100%;
    height:110px;
    border-radius:5px;
}
.pro_info{
    width:50%;
    text-align:left;
}
.pro_info .title{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    font-size:15px;
    padding:10 10px 0 10px; 
    white-space: normal;
    margin-top:10px;
    /* box-sizing: border-box; */
}
.pro_info .color{
    margin:0;
    padding:10px;
}
.pro_info span{
    font-size:14px;
}
.pro_total{
    padding:10px;
    color:red;
}
.buy{
    background:#fbf8f8;
    display:flex;
    position:fixed;
    bottom:0;
    height:48px;
    width:100%;
    justify-content: center;
    align-items:center;
}
.buy div{
width:50%;    
height:48px;
    display:flex;
    justify-content: center;
    align-items:center;
}
.submit{
    background:#ca3737 !important;
    border:0;
    outline:0;
    width:100%;
    height:48px;
    font-size:18px;

}
.hide{
    display:none;
}
.show{
    display:block;
}
.addr1{
    margin-top:8px;
    height:90px;
    width:88%;
    display:inline-block;
    /* border:1px solid #d0cccc; */
    margin-bottom:10px;
    color:#000 !important;
    text-align:left;
    margin-left:-20px;
}
.addr1 div:nth-child(1){
    display:inline-block;
    margin-top:16px;
    margin-left:10px;
}
.addr1 div:nth-child(2){
    display:inline-block;
    margin-left:175px;
}
.addr1 div:nth-child(3){
    display:block;
    margin-top:10px;
    margin-left:10px;
}
.address-bd{
    width:100%;
    height:3px;
    background:url("http://127.0.0.1:5000/img/mine_order_envelope_bg_02.jpg") repeat;
    background-size:auto 3px;
}
.address-bd.first{
    margin-top:40px;
    margin-bottom:0;
}
.icon.address{
    width:20px;
    height:20px;
    border:1px solid #666262;
    border-width:2px 2px 0 0;
    display:inline-block;
    /* margin-top:50%; */
    padding-top:-20px;
    transform: rotate(45deg);


}

</style>

