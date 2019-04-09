<template>
 <div>
        <mt-header fixed title='我的订单'>
            <a @click="fanhui" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
  <div class="page-navbar">
    <!-- navbar -->
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="8" ><span @click="tz1(8)">全部</span></mt-tab-item>
      <mt-tab-item id="1"><span @click="tz1(1)">待付款</span> </mt-tab-item>
      <mt-tab-item id="2"><span @click="tz1(2)">待发货</span> </mt-tab-item>
      <mt-tab-item id="3"><span @click="tz1(3)">待收货</span></mt-tab-item>
      <mt-tab-item id="4"><span @click="tz1(4)">待评价</span></mt-tab-item>
    </mt-navbar>

 
	<!-- tabcontainer -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="8">
          
       <div v-for="(sz,i) of  shuzu" :key="i" class='ddan'>
            <div class='weipay'>等待付款</div>
           <div v-for="(item,j) of sz" :key="j" class='order' :data-sum='item.sum'>
            <div class='pro_img'>
            <img :src="item.img" alt="">
            </div>
            <div class='pro_info'>
            <p class='title'>{{item.title}}</p>
            <span class='color'>{{item.color}}</span>
            <span>{{item.size}}</span>
            *<span>{{item.num}}</span>
            </div>
            <div class='pro_total0'>
            <span>￥{{item.price*item.num}}</span>
            </div>
        </div>
        <div class='order_heji'  >
            <span>共{{sz.length}}件商品</span>&nbsp;
            <!-- <span>合计:¥{{total1}}</span> -->
            <span>合计:¥{{shuzu[i][0].sum}}</span>
        </div>
        <div class='orderbtn'  >
            <!-- <mt-button size='small' @click="quxaioOrder">取消订单</mt-button> -->
            <input type="button" value='取消订单' :data-order="shuzu[i][0].order_id"  @click="quxaioOrder">
            <!-- <button size='small'><span :data-sum="shuzu[i][0].sum"  @click='fukuan'>付款</span></button> -->
            <input type="button" value='付款' :data-sum="shuzu[i][0].sum"  @click='fukuan'>
        </div> 
        </div>
        <!-- <div class='weipay'  v-show="list.length>0?true:false">等待付款</div>
       <div v-for="(item,i) of list" :key="i" class='order' v-show="list.length>0?true:false">
            <div class='pro_img'>
            <img :src="item.img" alt="">
            </div>
            <div class='pro_info'>
            <p class='title'>{{item.title}}</p>
            <span class='color'>{{item.color}}</span>
            <span>{{item.size}}</span>
            *<span>{{item.num}}</span>
            </div>
            <div class='pro_total0'>
            <span>￥{{item.price*item.num}}</span>
            </div>
        </div>
        <div class='order_heji'   v-show="list.length>0?true:false">
            <span>共{{list.length}}件商品</span>&nbsp;
            <span>合计:¥{{total1}}</span>
        </div>
        <div class='orderbtn'  v-show="list.length>0?true:false">
            <mt-button size='small' @click="quxaioOrder">取消订单</mt-button>
            <mt-button size='small' @click='fukuan'>付款</mt-button>
        </div> -->
        <pay @hidden='hiddenShow' v-show="pay_pop_up" :submsg='total'></pay>
        
       <div v-for="(sz,i) of shuzu1" :key="i" v-show="shuzu1.length>0?true:false" class='ddan'>
           <div class='weipay'  v-show="shuzu1.length>0?true:false">等待发货</div>
           <div v-for="(item,j) of sz" :key="j" class='order'>
            <div class='pro_img'>
            <img :src="item.img" alt="">
            </div>
            <div class='pro_info'>
            <p class='title'>{{item.title}}</p>
            <span class='color'>{{item.color}}</span>
            <span>{{item.size}}</span>
            *<span>{{item.num}}</span>
            </div>
            <div class='pro_total1'>
            <span>￥{{item.price*item.num}}</span>
            </div>
        </div>
        <div class='order_heji'   v-show="shuzu1.length>0?true:false">
            <span>共{{sz.length}}件商品</span>&nbsp;
            <!-- <span>合计:¥{{total}}</span> -->
            <span>合计:¥{{shuzu1[i][0].sum}}</span>
            
        </div>
        <div class='orderbtn'  v-show="shuzu1.length>0?true:false">
            <mt-button size='small' @click="tixing">提醒发货</mt-button>
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
    
       <div v-for="(sz,i) of shuzu" :key="i" v-show="(shuzu.length>0)&&(code==1)?true:false">
            <div class='weipay'  v-show="(shuzu.length>0)&&(code==1)?true:false">等待付款</div>
           <div v-for="(item,j) of sz" :key="j" class='order' >
            <div class='pro_img'>
            <img :src="item.img" alt="">
            </div>
            <div class='pro_info'>
            <p class='title'>{{item.title}}</p>
            <span class='color'>{{item.color}}</span>
            <span>{{item.size}}</span>
            *<span>{{item.num}}</span>
            </div>
            <div class='pro_total2'>
            <span>￥{{item.price*item.num}}</span>
            </div>
        </div>
        <div class='order_heji'   v-show="(shuzu.length>0)&&(code==1)?true:false">
            <span>共{{sz.length}}件商品</span>&nbsp;
            <!-- <span>合计:¥{{total2}}</span> -->
            <span>合计:¥{{shuzu[i][0].sum}}</span>
        </div>
        <div class='orderbtn'  v-show="(shuzu.length>0)&&(code==1)?true:false">
            <!-- <mt-button size='small' @click="quxaioOrder">取消订单</mt-button> -->
            <input type="button" value='取消订单' :data-order="shuzu[i][0].order_id"   @click="quxaioOrder">
            <!-- <mt-button size='small' @click='fukuan'>付款</mt-button> -->
            <input type="button" value='付款' :data-sum="shuzu[i][0].sum"  @click='fukuan'>
        </div>
        <pay @hidden='hiddenShow' v-show="pay_pop_up" :submsg='total'></pay>
        </div>
        </mt-tab-container-item>
      <mt-tab-container-item id="2">
        
       <div v-for="(sz,i) of shuzu1" :key="i" v-show="(shuzu1.length>0)&&(code==2)?true:false">
           <div class='weipay'  v-show="(shuzu1.length>0)&&(code==2)?true:false">等待发货</div>
           <div v-for="(item,j) of sz" :key="j" class='order'>
            <div class='pro_img'>
            <img :src="item.img" alt="">
            </div>
            <div class='pro_info'>
            <p class='title'>{{item.title}}</p>
            <span class='color'>{{item.color}}</span>
            <span>{{item.size}}</span>
            *<span>{{item.num}}</span>
            </div>
            <div class='pro_total3'>
            <span>￥{{item.price*item.num}}</span>
            </div>
        </div>
        <div class='order_heji'   v-show="(shuzu1.length>0)&&(code==2)?true:false">
            <span>共{{sz.length}}件商品</span>&nbsp;
            <!-- <span>合计:¥{{total3}}</span> -->
            <span>合计:¥{{shuzu1[i][0].sum}}</span>
        </div>
        <div class='orderbtn'  v-show="(shuzu1.length>0)&&(code==2)?true:false">
            <mt-button size='small' @click="tixing">提醒发货</mt-button>
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
   <div>
        
    </div>

</div>

</template>
 
<script>
import pay from '@/components/Pay.vue'
import {Toast} from "mint-ui"
export default {
  name: 'page-navbar',
 
  data() {
    return {
      selected:""+this.$route.query.code,
      code:this.$route.query.code,
      list:[],
      total:0,
      pay_pop_up:false,
      list1:[],
      total1:0,
      total2:0,
      total3:0 ,
      shuzu:[],
      shuzu1:[],
      }
  },
   components:{
        pay
    },
  created(){
    // console.log(this.shuzu);
      this.load();
  },
  methods:{
      fanhui(){
            window.history.go(-1);
        },
      load(){
          if(this.code==8){
              var url='http://127.0.0.1:5000/pay?code=1';
            this.axios.get(url).then(result=>{
              this.list=result.data.data;
             var arr=this.list;
            var url1='http://127.0.0.1:5000/order_id?code=1'
            this.axios.get(url1).then(result=>{
                var arr1=result.data.data;
                for(var a=0;a<arr1.length;a++){
                 var j=0;
                 var array=[];
                 for(var b=0;b<arr.length;b++){
                     if(arr1[a].order_id==arr[b].order_id){

                       array.push(arr[b]);
                        j++;
                     }
                 }
                 this.shuzu.push(array);
                }
            })
            //   this.$nextTick(function(){
            //     var spans=document.querySelectorAll(".ddan");
            //     var sum=0;
            //     console.log(spans)
            //     for(var span of spans){
            //         var price=parseInt(span.innerHTML.slice(1));
            //         sum+=price;
            //         // console.log(sum);
            //     }
            //     console.log(sum);
            //     this.total1=sum;
            //     // console.log(this.total);
            // })
          })

            var url='http://127.0.0.1:5000/pay?code=2';
            this.axios.get(url).then(result=>{
              this.list=result.data.data;
             var arr=this.list;
            var url1='http://127.0.0.1:5000/order_id?code=2'
            this.axios.get(url1).then(result=>{
                var arr1=result.data.data;
                for(var a=0;a<arr1.length;a++){
                 var j=0;
                 var array=[];
                 for(var b=0;b<arr.length;b++){
                     if(arr1[a].order_id==arr[b].order_id){

                       array.push(arr[b]);
                        j++;
                     }
                 }
                 this.shuzu1.push(array);
                }
            })

        //   var url='http://127.0.0.1:5000/pay?code=2';
        //     this.axios.get(url).then(result=>{
        //       this.list1=result.data.data;
            //   console.log(this.list1)
            //   this.$nextTick(function(){
            //     var spans=document.querySelectorAll(".pro_total1>span");
            //     var sum=0;
            //     // console.log(spans)
            //     for(var span of spans){
            //         var price=parseInt(span.innerHTML.slice(1));
            //         sum+=price;
            //         // console.log(sum);
            //     }
            //     // console.log(sum);
            //     this.total=sum;
            //     // console.log(this.total);
            // })
            })
          }
          else if(this.code==1){
           var url='http://127.0.0.1:5000/pay?code=1';
            this.axios.get(url).then(result=>{
              this.list=result.data.data;
             var arr=this.list;
            var url1='http://127.0.0.1:5000/order_id?code=1'
            this.axios.get(url1).then(result=>{
                var arr1=result.data.data;
                for(var a=0;a<arr1.length;a++){
                 var j=0;
                 var array=[];
                 for(var b=0;b<arr.length;b++){
                     if(arr1[a].order_id==arr[b].order_id){

                       array.push(arr[b]);
                        j++;
                     }
                 }
                 this.shuzu.push(array);
                }
            })
            //   this.$nextTick(function(){
            //     var spans=document.querySelectorAll(".pro_total2>span");
            //     var sum=0;
            //     // console.log(spans)
            //     for(var span of spans){
            //         var price=parseInt(span.innerHTML.slice(1));
            //         sum+=price;
            //         // console.log(sum);
            //     }
            //     // console.log(sum);
            //     this.total2=sum;
            // })
          })
          }else if(this.code==2){
         var url='http://127.0.0.1:5000/pay?code=2';
            this.axios.get(url).then(result=>{
              this.list=result.data.data;
             var arr=this.list;
            var url1='http://127.0.0.1:5000/order_id?code=2'
            this.axios.get(url1).then(result=>{
                var arr1=result.data.data;
                for(var a=0;a<arr1.length;a++){
                 var j=0;
                 var array=[];
                 for(var b=0;b<arr.length;b++){
                     if(arr1[a].order_id==arr[b].order_id){

                       array.push(arr[b]);
                        j++;
                     }
                 }
                 this.shuzu1.push(array);
                }
            })

            //   this.$nextTick(function(){
            //     var spans=document.querySelectorAll(".pro_total3>span");
            //     var sum=0;
            //     // console.log(spans)
            //     for(var span of spans){
            //         var price=parseInt(span.innerHTML.slice(1));
            //         sum+=price;
            //         // console.log(sum);
            //     }
            //     // console.log(sum);
            //     this.total3=sum;
            // })
          })
          }
      },
      fukuan(e){
          //支付弹窗框显示（组件引用的弹出框）
                this.pay_pop_up=true;
                this.total=e.target.dataset.sum;
                //console.log(this.total);
      },
       //支付弹窗框隐藏（传给组件一个点击事件）
        hiddenShow(){
            let that=this;
            that.pay_pop_up=false;
            this.show=true;
        },
        tixing(){
            Toast("提醒发货成功");
        },
        quxaioOrder(e){
            console.log(e.target);
            var postData=this.qs.stringify({
                code:this.code,
                order_id:e.target.dataset.order
            })
            var url="http://127.0.0.1:5000/delOrder";
            this.axios.post(url,postData).then(result=>{
                if(result.data.code==1){
                    Toast(result.data.msg);
                    window.history.go(0);
                }
            })
        },
        tz1(a){
            this.code=a;
            // console.log(11);
            this.load();
        }
  }
};
</script>

<style>
.mint-tab-item-label{
    font-size:15px !important;
}
.mint-navbar{
    margin-top:40px;
}
.order{
    /* display:flex; */
    /* margin-bottom:10px; */
    /* border-bottom:1px solid #e5e5e5; */
    background: #fff;
}
.pro_img{
    width:30%;
    height:110px;
}
.pro_img img{
    width:92%;
    height:101px;
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
    padding-left:13px;
}
.pro_info .color{
    margin:0;
    padding:14px;
}
.pro_info span{
    font-size:14px;
}
.pro_total{
    padding:10px;
    color:red;
}
.weipay{
    color:red;
    text-align:right;
    font-size:17px;
}
.orderbtn{
    text-align:right;
}
.order_heji{
     text-align:right;
}
.order_heji span:nth-child(1){
    font-size:18px;
}
.order_heji span:nth-child(2){
    font-size:18px;
    margin-right:7px;
}
.orderbtn button{
border-radius:50px;
border:1px solid #ada6a6;
}
.orderbtn button:nth-child(2){
    margin-right:10px;
    margin-left:10px;
}
.mint-tab-item-label>a{
    color:#000;
}
.mint-tab-container-item{
    background:#f5f3f3;
}
.mint-tab-container-item>div{
    background:#fff;
    border-radius:14px;
    margin:12px 5px 0 5px;
}
.pro_total0{
    margin-top:15px;
}
label{
    color:#000;
    font-size:16px;
    margin-top:7px;
}
.orderbtn input[type='button']{
    border-radius:50px;
    color:#000;
    font-size:16px;
    /* margin-top:7px; */
    border:1px solid #ada6a6;
    height:33px;
}
</style>