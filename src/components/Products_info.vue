<template>
   <div class="home">
          <mt-header fixed>
            <a @click="tz" slot="left">
                <mt-button icon="back">返回</mt-button>
            </a>
        </mt-header>
        <div class="app-home top">
        <mt-swipe  :auto="4000" class="swipe1">
        <mt-swipe-item >
            <img :src="`http://127.0.0.1:5000/img/${list.lg}`" alt="">
        </mt-swipe-item>
        <mt-swipe-item >
            <img :src="`http://127.0.0.1:5000/img/${list.lg}`" alt="">
        </mt-swipe-item>
        <mt-swipe-item >
            <img :src="`http://127.0.0.1:5000/img/${list.lg}`" alt="">
        </mt-swipe-item>
        </mt-swipe>
       <div class="price">
           <span>￥</span>
           <span>{{list.price}}</span>
           <span>￥499</span>
           <span>降价通知</span>
        </div>
       <span class='s1'>{{list.title}}</span>
       <a class="a">
       <img src="img/xiazai.png">
       </a>
        <div class="bz">
            <div class="bz_left">
            <img src="img/bz1.png">
            <span>7天退货</span><br>
            <img src="img/bz2.png">
            <span>由入驻商家发货</span>
            </div>
            <div class="bz_right">
            <img src="img/bz3.png">
            <span>免运费</span>
            </div>
       </div>
        <div> 
           <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a @click="add" class="mui-navigate-right">选择尺寸&nbsp;&nbsp;颜色&nbsp;&nbsp;数量</a>
				</li>
                <li class="mui-table-view-cell">
					<a href="#account" class="mui-navigate-right">用户评价</a>
				</li>
			</ul>
       </div>
       <!-- 商品颜色 数量弹窗 -->
       <div class="tanchuang">
           <div>
               <a><span class="mui-icon mui-icon-closeempty"  @click="close"></span></a>
               <div class='img'>
               <img  :src="`http://127.0.0.1:5000/img/${list4[0].img}`" alt="" >
               </div>
               <div class="pricee">
               <p>￥{{list3[0].price}}</p>
               <p :data-total='list5[0].num' ref='ap'>库存:
                   {{list5[0].num}}</p>
               </div>
           </div>
           <div class="choose">
               <p>颜色</p>
               <div class="color">
               <span v-for="(item,i) of list3" :key="i" @click="chickk" class="" :data-color='list3[i].color' :data-pid='list3[i].pid' ref='color'>{{list3[i].color}}</span>
               </div>
           </div>
           <div class="">
               <p>尺码</p>
                <div class="size">
                    <span v-for="(item,i) of list4" :key="i"  class="" @click="chs" :data-size='list4[i].size' ref='size'>{{list4[i].size}}</span>
                </div>
           </div>
           <div>购买数量
               <mt-button @click='jian'>-</mt-button>
               <input type="text" v-model='num'>
               <mt-button @click='jia'>+</mt-button>
           </div>
           <mt-button size="large" type="danger" @click="addSuccess" id="queding">确定</mt-button>
       </div>
       <!-- 商品详情图片 -->
       <div class="pro">
        <img v-for="(item,i)  of list2" :key="i" :src="`http://127.0.0.1:5000/img/${list2[i]}`" alt="">
        <!-- <img :src="`http://127.0.0.1:5000/img/${list2.img2}`" alt=""> 
        <img :src="`http://127.0.0.1:5000/img/${list2.img3}`" alt="">
        <img :src="`http://127.0.0.1:5000/img/${list2.img4}`" alt="">
        <img :src="`http://127.0.0.1:5000/img/${list2.img5}`" alt="">  -->
        <img src="img/price.jpg" alt="">  
       </div>
        </div>
       <!-- 底部加入购物车固定定位 -->
       <!-- <div class="tab"> -->
           <nav class="mui-bar mui-bar-tab">
			<a :class="[object]" data-id="id" @click="shoucang" ref="shoucang">
				<span class="mui-icon mui-icon-extra mui-icon-extra-heart"></span>
				<span class="mui-tab-label">收藏</span>
			</a>
			<router-link class="mui-tab-item" :to="`/cart`">
			    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<a class="mui-tab-item" href="javascript:;">
                <mt-button type="primary" @click="add">加入购物车</mt-button>
			</a>
			<a class="mui-tab-item" href="javascript:;">
                <mt-button type="danger" @click="add1">立即购买</mt-button>
			</a>
		</nav>
       <!-- </div> -->

    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            id:this.$route.query.id,
            list:{lg:""},
            list2:{},
            list3:[{price:0}],
            color:"",
            size:"",
            list4:[{img:""}],
            list5:[{num:0}],
            num:1,
            object:{
                'mui-tab-item':true,
                'mui-active':false

            }
        }
    },
    created(){
        this.load();
        this.pro_info();
    },
    methods:{
        load(){
            var id=this.id;
            var postData=this.qs.stringify({
                    id:this.id
                })
            var url="http://127.0.0.1:5000/pro_info?id="+id;
            this.axios.get(url).then(result=>{
                this.list=result.data.data[0];
                // console.log(result.data.data);
            })
            var a=this.$refs.shoucang;
            console.log(a);
            var url="http://127.0.0.1:5000/getsc?id="+id;
            this.axios.get(url).then(result=>{
                if(result.data.code==1){
                    this.object["mui-active"]=true;
                }
            })
        },
        tz(){
            window.history.back(-1);
        },
        pro_info(){
            var pid=this.id;
            var url="http://127.0.0.1:5000/getPro_img?id="+pid;
            this.axios.get(url).then(result=>{
                this.list2=result.data.data[0];
                
                // console.log(result.data.data[0]);
            })
        },
        add(){
            var tanchuang=document.getElementsByClassName("tanchuang")[0];
            var nav=document.getElementsByClassName("mui-bar")[0];
            // console.log(nav);
            nav.style.display="none";
            tanchuang.style.display="block";
            //得到商品的价钱还有颜色
            var pid=this.id;
            var url="http://127.0.0.1:5000/getPro_color?id="+pid;
            this.axios.get(url).then(result=>{
                this.list3=result.data.data;
                //设置初始时选中第一个
                var span=document.querySelector(".color span:nth-child(1)");
                //setTimeout(()=>{console.log(span.innerHTML);},100);
                span.className="checked";
                //this.color=span.innerHTML;
                setTimeout(()=>{
                    this.color=span.innerHTML;
                    // console.log(this.color);
                    var url="http://127.0.0.1:5000/getPro_desc?id="+pid+"&color="+this.color;
                    this.axios.get(url).then(result=>{
                        this.list4=result.data.data;
                        // console.log(this.list4);
                    })
                },100);
                var span1=document.querySelector(".size span:nth-child(1)");
                span1.className="checked";
                
                setTimeout(()=>{
                    this.size=span1.innerHTML;
                    //  console.log(this.size);
                     var url="http://127.0.0.1:5000/getPro_num?id="+pid+"&color="+this.color+"&size="+this.size;
                    this.axios.get(url).then(result=>{
                        this.list5=result.data.data;
                        // console.log(this.list5);
                    })
                    
                },200);

            })

        },
        add1(){
            //var btn=this.$refs.queding;
            //btn.setAttribute("queding",'1');
            //console.log(btn);
            var tanchuang=document.getElementsByClassName("tanchuang")[0];
            var nav=document.getElementsByClassName("mui-bar")[0];
            // console.log(nav);
            nav.style.display="none";
            tanchuang.style.display="block";
            //得到商品的价钱还有颜色
            var pid=this.id;
            var url="http://127.0.0.1:5000/getPro_color?id="+pid;
            this.axios.get(url).then(result=>{
                this.list3=result.data.data;
                //设置初始时选中第一个
                var span=document.querySelector(".color span:nth-child(1)");
                //setTimeout(()=>{console.log(span.innerHTML);},100);
                span.className="checked";
                //this.color=span.innerHTML;
                setTimeout(()=>{
                    this.color=span.innerHTML;
                    // console.log(this.color);
                    var url="http://127.0.0.1:5000/getPro_desc?id="+pid+"&color="+this.color;
                    this.axios.get(url).then(result=>{
                        this.list4=result.data.data;
                        // console.log(this.list4);
                    })
                },100);
                var span1=document.querySelector(".size span:nth-child(1)");
                span1.className="checked";
                
                setTimeout(()=>{
                    this.size=span1.innerHTML;
                    //  console.log(this.size);
                     var url="http://127.0.0.1:5000/getPro_num?id="+pid+"&color="+this.color+"&size="+this.size;
                    this.axios.get(url).then(result=>{
                        this.list5=result.data.data;
                        // console.log(this.list5);
                    })
                    
                },200);

            })
             var btn=document.getElementById("queding");
            //console.log(btn);
            btn.setAttribute("queding","1");
            console.log(btn);
        },
        close(){
             var tanchuang=document.getElementsByClassName("tanchuang")[0];
            var nav=document.getElementsByClassName("mui-bar")[0];
            //console.log(tanchuang);
            tanchuang.style.display="none";
            nav.style.display="block";
        },
        chickk(e){
            //console.log(this.color);
            var s=e.target;
           // console.log(s);
             var spans=document.querySelectorAll(".color span");
             //console.log(spans);
            for(var span of spans){
                if(span.className!=null){
                    span.className="";
                    //this.color=span.innerHTML;
                }
            }
            s.className="checked";
            //this.color=s.innerHTML;
            var ss=s.innerHTML;
           // console.log(this.color);
           if(ss!=this.color){
               this.color=ss;
               //console.log(this.color);
                var pid=this.id;
                var url="http://127.0.0.1:5000/getPro_desc?id="+pid+"&color="+this.color;
                //console.log(url);
                    this.axios.get(url).then(result=>{
                        this.list4=result.data.data;
                        //  console.log(this.list4);
             })
               var spans=document.querySelectorAll(".size span");
            //    console.log(spans);
               for(var span of spans){
                if(span.className!=null){
                    span.className="";
                    //this.color=span.innerHTML;
                }
            }
            var span1=document.querySelector(".size span:nth-child(1)");
            span1.className="checked";
            //console.log(span1);
            setTimeout(()=>{
                this.size=span1.innerHTML;
                //console.log(this.size);
                var pid=this.id;
                var url="http://127.0.0.1:5000/getPro_num?id="+pid+"&color="+this.color+"&size="+this.size;
                    this.axios.get(url).then(result=>{
                        this.list5=result.data.data;
                        // console.log(this.list5);
            })
            },300)
           }
           
        },
        chs(e){
            //console.log(this.color);
            var s=e.target;
           // console.log(s);
             var spans=document.querySelectorAll(".size span");
             //console.log(spans);
            for(var span of spans){
                if(span.className!=null){
                    span.className="";
                    //this.color=span.innerHTML;
                }
            }
            s.className="checked";
            this.size=s.innerHTML;
           var pid=this.id;
           var url="http://127.0.0.1:5000/getPro_num?id="+pid+"&color="+this.color+"&size="+this.size;
                    this.axios.get(url).then(result=>{
                        this.list5=result.data.data;
                        // console.log(this.list4);
            })
         
        },
        jian(){
            if(this.num>1){
                this.num--;
            }
        },
        jia(){
            var c=this.$refs.ap
            //console.log(c)
            var total=c.dataset.total;
            //console.log(total);
            if(this.num<total){
                this.num++;
            }else{
                Toast("库总数量不足");
            }
        },
        addSuccess(e){
            var queding=e.target.getAttribute("queding");
            //console.log(queding);
            if(queding==1){
            //console.log(111);
            //var pid=e.target.dataset.id;
            //console.log(pid);
            var cd=this.$refs.color;
            var cc=this.$refs.size;
            var c=this.$refs.ap;
            
           // console.log(sum);
            //console.log(cd);
            for(var item of cd){
                if(item.className=='checked'){
                    // var color=item.color;
                    // console.log(color);
                    //console.log(111);
                    //console.log(item.innerHTML);
                    var color=item.dataset.color;
                    var pid=item.dataset.pid;
                    // console.log(pid);
                    // console.log(color);
                    
                }
            }
            for(var item of cc){
                if(item.className=='checked'){
                    // var color=item.color;
                    // console.log(color);
                    //console.log(111);
                    //console.log(item.innerHTML);
                    var size=item.dataset.size;
                    // console.log(size);
                }
            }
            var sum=this.num;
            console.log(sum);
            var uname=sessionStorage.getItem("uname");
            //console.log(uname);
            // if(uname==null){
            //     Toast("请登录");
            //     this.$router.push("/login");
            // }else{
            //     console.log(uname);
            // }

            var url='http://127.0.0.1:5000/addOrder';
            var postData=this.qs.stringify({
                pid:pid,
                uname:uname,
                color:color,
                size:size,
                sum:sum
            })
            // var postData='pid='+pid+'&uname='+uname+"&color="+color+"&size="+size+"&sum="+sum;
            this.axios.post(url,postData).then(result=>{
                
                if(result.data.code==-1){
                    Toast(result.data.msg);
                     this.$router.push("/login");
                }
                setTimeout(()=>{
                    if(result.data.code!=-1){
                     var tanchuang=document.getElementsByClassName("tanchuang")[0];
                    var nav=document.getElementsByClassName("mui-bar")[0];
                    nav.style.display="block";
                    tanchuang.style.display="none";
                    this.$router.push("/order");
                    }
                },1000)
                
            })
            }else{
                var cd=this.$refs.color;
            var cc=this.$refs.size;
            var c=this.$refs.ap;
            
           // console.log(sum);
            //console.log(cd);
            for(var item of cd){
                if(item.className=='checked'){
                    // var color=item.color;
                    // console.log(color);
                    //console.log(111);
                    //console.log(item.innerHTML);
                    var color=item.dataset.color;
                    var pid=item.dataset.pid;
                    // console.log(pid);
                    // console.log(color);
                    
                }
            }
            for(var item of cc){
                if(item.className=='checked'){
                    // var color=item.color;
                    // console.log(color);
                    //console.log(111);
                    //console.log(item.innerHTML);
                    var size=item.dataset.size;
                    // console.log(size);
                }
            }
            var sum=this.num;
            console.log(sum);
            var uname=sessionStorage.getItem("uname");
            //console.log(uname);
            // if(uname==null){
            //     Toast("请登录");
            //     this.$router.push("/login");
            // }else{
            //     console.log(uname);
            // }

            var url='http://127.0.0.1:5000/addCart';
            var postData=this.qs.stringify({
                pid:pid,
                uname:uname,
                color:color,
                size:size,
                sum:sum
            })
            // var postData='pid='+pid+'&uname='+uname+"&color="+color+"&size="+size+"&sum="+sum;
            this.axios.post(url,postData).then(result=>{
                Toast(result.data.msg);
                if(result.data.code==-1){
                     this.$router.push("/login");
                }
                setTimeout(()=>{
                    if(result.data.code==1){
                     var tanchuang=document.getElementsByClassName("tanchuang")[0];
                    var nav=document.getElementsByClassName("mui-bar")[0];
                    nav.style.display="block";
                    tanchuang.style.display="none";

                    }
                },1000)
                
            })
            }
        },
        shoucang(){
            var a=this.$refs.shoucang;
                console.log(a);
                var postData=this.qs.stringify({
                    id:this.id
                })
            if(this.object["mui-active"]==true){
                this.object["mui-active"]=false;
                var url="http://127.0.0.1:5000/delshoucang";
                this.axios.post(url,postData).then(result=>{
                    Toast(result.data.msg);
                    if(result.data.code==-1){
                         this.$router.push("/login");
                    } 
                if(result.data.code==1){
                    console.log(result.data.msg);
                    window.history.go(0);
                }
                })
            }else{
            var url="http://127.0.0.1:5000/shoucang";
                this.axios.post(url,postData).then(result=>{
                    Toast(result.data.msg);
                    if(result.data.code==-1){
                         this.$router.push("/login");
                    }else if(result.data.code==1){
                            window.history.go(0);
                    }
            })
            
        }
        
    }
    }
}
</script>
<style>

.top{
    margin-top:40px;
    border-bottom:1px solid #000;
}
.app-home .swipe1{
     height:500px; 
}
.app-home .mint-swipe img{
    width:100%;
    height:100%;
    position:relative;
}
.app-home .price{
    margin:0;
    width:100%;
    color:red;
    text-align:left !important;
    background-color:#fefefe;
    opacity:0.8;
    height:50px;
    /* position:absolute; */
    z-index:10;
    /* margin-top:-50px; */
}
.price span{
    display:inline-block;
    margin-left:20px;
    margin-top:12px;
    font-size:20px;
}
.price>span:nth-child(2){
    margin-left:0;
    font-size:26px;
}
.price>span:nth-child(3){
    color:#999;
    margin-left:5px;
    text-decoration:line-through;
}
.price>span:nth-child(4){
    margin-left:115px;
    color:#606366;
    border:1px solid #606366;
    line-height:28px;
    border-radius:4px;
}
.app-home.top .s1{
    display:inline-block;
    color:#4e4e4e !important;
    font-size:14px;
    text-align:left;
    
    margin:0;
    margin-top:20px;
    width:75%;
}
.a>img{
   vertical-align:bottom !important;
   margin-left:25px;
}
.bz img{
    width:24px;
    height:24px;
    margin-bottom:5px;
    margin-right:5px;
}
.bz_left{
    position:relative;
    width:50%;
    display:inline-block;
    text-align:left;
     margin-top:15px;
     color:#aeaeae;
     font-size:14px;
}
.bz_right{
    position:relative;
    display:inline-block;
    width:40%;
    color:#aeaeae;
     font-size:14px;
     top:-30px;
     text-align:left;
}
.tab{
     position:fixed; 
    bottom:0;
}
.mui-bar-tab{
    height:45px !important;
}
.mui-table-view{
    text-align:left;
}
.pro{
    margin-bottom:50px;
}
.pro img{
    width:100%;
}
.tanchuang{
    position:fixed;
    /* height:400px; */
    width:100%;
    /* border:1px solid red; */
    /* top:267px; */
    bottom:0;
    display:none;
    background-color:#efeff4;
    text-align:left;
}
.mint-button--normal{
    width:100% !important;
    height:100% !important;
    border-radius:0 !important;
    padding:0;
}
.mui-icon.mui-icon-closeempty{
    margin-left:320px;
    /* width:35px; */
    /* height:35px; */
    font-size:44px;
    margin-top:-10px;
    position:fixed;
}
.tanchuang>div{
    margin:15px 0px;
    border-bottom:1px solid #000;
}
.tanchuang p{
    color:#000;
}
.tanchuang>div:nth-child(2) span{
    display:inline-block;
    width:90px;
    height:38px;
    color:#000;
    background:#e4e2e2;
    margin:0px 5px 15px 5px;
    text-align:center;
    border-radius:5px;
    padding-top:8px;
    padding-bottom:5px;  
}

.tanchuang>div:nth-child(4){
    border-bottom:0;
}
.tanchuang>div:nth-child(4)>button{
    width:46px !important;
}
.tanchuang>div:nth-child(4)>button:nth-child(1){
    text-align:left;
    margin-left:126px;
}
.tanchuang>div:nth-child(4)>input{
    width:15%;
    text-align:center;
    
}
.color,.size{
    margin-left:20px;
}
.mint-button--large{
    height:50px !important;
}
.pricee{
    margin:0;
    /* color:red !important; */
    font-size:20px;
    display:inline-block;
}
/* .pricee p{
    display:block;
} */
.pricee>p:nth-child(1){
    color:red;
    font-size:18px;
    margin:0;
}
.pricee p:nth-child(2){
    margin-top:5px;
    color:#000;
}
.num{
    display:inline-block;
}
.checked{
    background-color:#e04645 !important;
    color:#fff !important;
}
.img{
    margin-top:-40px;
    /* width:5rem; */
    display:inline-block;
}
.img img{
    width:4.5rem;
}
.size span{
    display:inline-block;
    width:90px;height:38px;
    text-align:center;
    margin:0px 5px 10px 5px;
    margin-bottom:10px;
    background-color:#e4e2e2;
    padding-top:8px;
    border-radius:5px;
}
.mui-table-view-cell a{
    text-decoration:none;
}
.mui-tab-item.mui-active{
    color:blue !important;
}
</style>

