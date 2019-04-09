<template>
<div class='app'>
    <mt-header fixed title='购物车'>
            <a @click="fanhui" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
            <mt-button  slot="right" @click='del'>管理</mt-button>
    </mt-header>
    <div class='app-cart'> 
        <div  v-for="(item,i) of list" :key="i" :data-pid="list[i].pid" class='cart'>
            <div class='checkbox'>
            <input type="checkbox" class='ch' @click="check">
            </div>
            <!-- 图片 -->
            <div class='img'>
            <img :src="`http://127.0.0.1:5000/img/${item.img}`" alt="">
            </div>
            <div class='guige'>
            <router-link  :to="`/proinfo?id=${item.pid}`">
                <span class='title'>{{item.title}}</span> 
            </router-link>  
            <router-link :to="`proinfo?id=${item.pid}`">
            <p>
            <span :data-color="list[i].color"  ref='opp'>{{item.color}}</span>
            <span :data-size="list[i].size" class='size'>{{item.size}}</span>
            </p>
            </router-link>
            <span class='price'>￥{{item.price}}</span>
            <input type="button" value='-' class='jian' @click="jian">
            <span class='num'  :data-total='item.total' >{{item.num}}</span>
            <input type="button" value='+' class='add' @click="add">
            </div>
        </div>
    </div>
    <!-- <div class='bottom'>
        <div class='qx'> 
        <input type="checkbox" class='all' @click="all">
        <span>全选</span>
         </div>
         <div class='total'>合计:￥<span>0</span></div>
        <div class='button'>
        <input type="button" value='结算' class='btn' @click='order'>
       </div>
    </div>
        <div class='bottom hide'>
        <div class='qx'> 
        <input type="checkbox" class='all' @click="all">
        <span>全选</span>
         </div>
        <div class='button1'>
        <input type="button" value='删除' class='btn' @click='delItem'>
       </div>
    </div> -->
    
      <div class='bottom'>
        <div class='qx'> 
        <input type="checkbox" class='all' @click="all">
        <span>全选</span>
         </div>

         <div class=''>
         <div class='total'><span>合计:￥</span><span>0</span></div>
        <div class='button'>
        <input type="button" value='结算' class='btn' @click='order'>
       </div>
       </div>


        <div  class='hide'>
        <div class='button1'>
        <input type="button" value='删除' class='btn' @click='delItem'>
       </div>
       </div>
    </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import { setTimeout, setInterval } from 'timers';
export default {
    data(){
        return{
            list:[],
            // list1:[],
            // listImg:false
        }
    },
    created(){
        
       this.loadCart2();
        
        // this.check();
    },
    mounted(){
        //  this.loadCart_img();
        this.loadCart();
        
    },
    methods:{
        loadCart(){
        //    console.log(111);
            var url='http://127.0.0.1:5000/getCart';
            this.axios.get(url).then(result=>{
                if(result.data.code==-1){
                    // Toast("请先登录");
                    // setTimeout(()=>{
                        this.$router.push("/login");
                    // },3000)
                }else{
                this.list=result.data.data;
                }
            })
           
             
        },
         loadCart2(){
                setTimeout(()=>{
                this.loadCart();
                },500);
        },
        jian(e){
            var num=e.target;
             var span=e.target.nextElementSibling;
            var n=span.innerHTML;
            if(n>1){
                n--;
            }
            span.innerHTML=n;
            var pid=span.parentNode.parentNode.dataset.pid;
            console.log(pid);
            var p=span.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild;
            var color=p.firstElementChild.dataset.color;
            var size=p.lastElementChild.dataset.size;
            var url="http://127.0.0.1:5000/updateCart?pid="+pid+"&color="+color+"&size="+size+"&num="+n;
            this.axios.get(url).then(result=>{
                 if(result.data.code==1){
                    console.log(result.data.msg);
                 }
            })
            var cbs=document.querySelectorAll(".ch:checked");
            var total=document.querySelector(".total>span:nth-child(2)");
            var sum=0;
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                 var p=parent.lastElementChild.children[2].innerHTML.slice(1);
                //  console.log(p);
                var num=parent.lastElementChild.children[4].innerHTML;
                // console.log(num);
                sum=sum+p*num;
            }
            total.innerHTML=sum;
        },
        add(e){
            var num=e.target;
             var span=e.target.previousElementSibling;
            var n=parseInt(span.innerHTML);
            var total=span.dataset.total;
            if(n<total){
                n+=1;
            }else{
                Toast("库存不足");
            }
             span.innerHTML=n;
             var pid=span.parentNode.parentNode.dataset.pid;
            //  console.log(pid);
             var p=span.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild;
            var color=p.firstElementChild.dataset.color;
            var size=p.lastElementChild.dataset.size;
            var url="http://127.0.0.1:5000/updateCart?pid="+pid+"&color="+color+"&size="+size+"&num="+n;
            this.axios.get(url).then(result=>{
                 if(result.data.code==1){
                     console.log(result.data.msg);
                 }
            })
            var cbs=document.querySelectorAll(".ch:checked");
            var total=document.querySelector(".total>span:nth-child(2)");
            var sum=0;
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                 var p=parent.lastElementChild.children[2].innerHTML.slice(1);
                //  console.log(p);
                var num=parent.lastElementChild.children[4].innerHTML;
                // console.log(num);
                sum=sum+p*num;
            }
            total.innerHTML=sum;
        },
        all(e){
            var checkAll=e.target;
            // console.log(checkAll);
            var cbs=document.querySelectorAll(".app-cart .checkbox .ch");
            // console.log(cb);
            for(var cb of cbs){
                cb.checked=checkAll.checked;
            }
            var cbs=document.querySelectorAll(".ch:checked");
            console.log(cbs);
            var total=document.querySelector(".total>span:nth-child(2)");
            console.log(total);
            var sum=0;
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                 var p=parent.lastElementChild.children[2].innerHTML.slice(1);
                  console.log(p);
                var num=parent.lastElementChild.children[4].innerHTML;
                // console.log(num);
                sum=sum+p*num;
            }
            total.innerHTML=sum;
        },
        check(e){
            console.log(11);
            var checkbox=e.target;
            var checkAll=document.querySelector(".qx .all");
            console.log(checkAll)
            if(checkbox.checked==false){
                checkAll.checked=false;
                console.log(22);
            }else{
                console.log(33);
                var unchecked=document.querySelectorAll(".ch:not(:checked)");
                console.log(unchecked.length);
                if(unchecked.length==0){
                    checkAll.checked=true;
                }else{
                    checkAll.checked=false;
                }
            }
            var cbs=document.querySelectorAll(".ch:checked");
            var total=document.querySelector(".total>span:nth-child(2)");
            var sum=0;
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                 var p=parent.lastElementChild.children[2].innerHTML.slice(1);
                //  console.log(p);
                var num=parent.lastElementChild.children[4].innerHTML;
                // console.log(num);
                sum=sum+p*num;
            }
            total.innerHTML=sum;
        },
        del(){
            var bottom1=document.querySelector(".bottom div:nth-child(2)");
             var bottom2=document.querySelector(".bottom div:nth-child(3)");
            var bottom=bottom1.className;
            bottom1.className=bottom2.className;
            bottom2.className=bottom;
        },
        delItem(){
             var cbs=document.querySelectorAll(".app-cart .checkbox .ch:checked");
            //  console.log(cbs);
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                var pid=parent.dataset.pid;
                 var p=parent.lastElementChild.children[1];
                 var color=p.firstElementChild.firstElementChild.dataset.color;
                 var size=p.firstElementChild.lastElementChild.dataset.size;
                var url='http://127.0.0.1:5000/delItem?pid='+pid+"&color="+color+"&size="+size;
                this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        var parentNode=document.getElementsByClassName("app-cart")[0];
                        // console.log(parentNode);
                        parentNode.removeChild(parent);
                        console.log(result.data.msg);
                        //  this.loadCart();
                    }
                })
            }
        },
        order(){
        var cbs=document.querySelectorAll(".app-cart .checkbox .ch:checked");
            //  console.log(cbs);
            if(cbs.length>0){
            for(var cb of cbs){
                var parent=cb.parentNode.parentNode;
                var pid=parent.dataset.pid;
                 var p=parent.lastElementChild.children[1];
                 var color=p.firstElementChild.firstElementChild.dataset.color;
                 var size=p.firstElementChild.lastElementChild.dataset.size;
                 var price=parent.lastElementChild.children[2].innerHTML.slice(1);
                var num=parent.lastElementChild.children[4].innerHTML;
                // console.log(parent);
                var img=parent.children[1].firstElementChild.getAttribute("src");
                var title=parent.lastElementChild.firstElementChild.firstElementChild.innerHTML;
                // console.log(title);
                var url='http://127.0.0.1:5000/order';
                var postData=this.qs.stringify({
                    pid:pid,
                    color:color,
                    size:size,
                    price:price,
                    num:num,
                    img:img,
                    title:title
                })


                this.axios.post(url,postData).then(result=>{
                
                        console.log(result.data.msg);
                        // var url='http://127.0.0.1:5000/delItem?pid='+pid+"&color="+color+"&size="+size;
                        // this.axios.get(url).then(result=>{
                        // if(result.data.code==1){
                        // console.log(result.data.msg);
                        //  this.loadCart();

                        setTimeout(()=>{
                            this.$router.push("/order");
                        },1000)
                        

                })
                        
                //     }
                // })
            }
        }
        },
        fanhui(){
            window.history.go(-1);
        }
    }
}
</script>
<style>
    .mint-header-title{
        color:#000;
        font-size:18px;
    }
    .app-cart{
        margin-top:40px;
        text-align:left;
    }
    .cart{
        position:relative;
        margin-bottom:10px;
    }
    .guige{
        display:inline-block;
        width:220px;
        margin-left:150px;
        margin-top:10px;
    }
    .guige span{
        margin-top:10px;
        margin-bottom:0;
    }
    .app-cart .img{
        margin-top:0px !important;
         position:absolute; 
         margin-left:25px;
    } 
    .title{
         display:inline-block; 
         width:100%; 
        white-space:nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
        color:black;
    }
    .guige span{
        margin-bottom:5px;
        font-size:15px;
        margin-top:5px;
    }
    .checkbox{
        display:inline-block;
         position:absolute; 
         top:calc(50% - 10px);
        
    }
    .ch{
        width:20px;
        height:20px;
        margin-right:5px;
        vertical-align:middle;
    }
    .img img{
        width:7rem !important;
        height:7rem;
        border-radius:5px;
    }
    .price{
        display:inline-block;
        margin-top:5px;
        color:red;
    }
    .jian{
        margin-left:60px;
    }
  
    .num{
        vertical-align: middle;
        text-align:center;
        width:25px;
    }
    .bottom{
        position:fixed;
        bottom:0;
         height:48px; 
         background:#fafafa;
         width:100%;
         text-align:left;
         display:flex;
    }
    .bottom .button{
        margin-left:100px;
    }
    .bottom div{
        display:flex;
        align-items:center;
    }
    .bottom div:nth-child(1){
        width:30%;
    }
    .total{
        width:50%;
        color:red;
    }
     .btn{
       width:100px;
       height:48px;
       background:#ef5757 !important;
       border:0;
       outline:0;
       font-size:18px;
    }
    .all{
        width:20px;
        height:20px;
        margin-left:15px;
    }
    .bottom span:nth-child(2){
        display:inline-block;
        /* margin-left:15px; */
        /* margin-top:-10px; */
    }
   .hide{
       display:none !important;
   }
   .button1{
       margin-left:212px;
   }
   .qx span{
       width:35px;
   }
   .total span:nth-child(1){
       width:63px;
   }
   .total{
       margin-left:30px;
   }
   .qx{
       width:30%;
   }
   .bottom div:nth-child(2){
       width:70%;
   }
   .bottom .total{
       width:65% !important;
   }
   .bottom .button{
       width:35%  !important;
       margin:0 auto;
       /* margin-left:0; */
   }
   
</style>

