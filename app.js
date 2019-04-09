const mysql=require("mysql");
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
// 1.1引入模块express-session
const session=require("express-session");
const multer=require("multer");
const fs=require("fs");
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"shop",
    connectionLimit:20
})
var server=express();
server.use(cors({
    origin:["http://127.0.0.1:5050","http://localhost:5050","http://127.0.0.1:8081","http://localhost:8081"],
    credentials:true
})) 
// 1.2配置信息
server.use(
    session({
        secret:"128为随机字符串",//128为随机字符串 安全字符串
        resave:false,//每次更新 更新session值
        saveUninitialized:true,//初始化保存数据
        cookie:{
            maxAge:1000*60*60*24 //cookie赋值session工作保存时间
        }
    })
)
server.use(express.static("public"))
server.use(bodyParser.urlencoded({
    extended:false
}))
server.listen(5000);
server.get("/banner",(req,res)=>{
    var arr=[
        {id:1,img_url:"http://127.0.0.1:5000/img/lunbo1.jpg"},
        {id:2,img_url:"http://127.0.0.1:5000/img/lunbo2.jpg"},
        {id:3,img_url:"http://127.0.0.1:5000/img/lunbo3.jpg"},
        {id:4,img_url:"http://127.0.0.1:5000/img/lunbo4.jpg"},
    ];
    res.send({code:1,data:arr});
})
server.get("/menu",(req,res)=>{
    var arr=[
        {id:1,img_url:"http://127.0.0.1:5000/img/daohang1.jpg"},
        {id:2,img_url:"http://127.0.0.1:5000/img/daohang2.jpg"},
        {id:3,img_url:"http://127.0.0.1:5000/img/daohang3.jpg"},
        {id:4,img_url:"http://127.0.0.1:5000/img/daohang7.jpg"},
        {id:5,img_url:"http://127.0.0.1:5000/img/daohang5.jpg"},
        {id:6,img_url:"http://127.0.0.1:5000/img/daohang8.jpg"}
        // {id:7,img_url:"http://127.0.0.1:5000/img/daohang7.jpg"},
        // {id:8,img_url:"http://127.0.0.1:5000/img/daohang8.jpg"}

    ];
    res.send({code:1,data:arr});
})
server.get("/products",(req,res)=>{
    var pno=req.query.pno;
    var page_size=req.query.page_size;
    var pid=req.query.pid;
    if(!pno){pno=1;}
    if(!page_size){page_size=6;}
    var sql="select id,title,img,price from products where pid=? limit ?,?";
    var offset=(pno-1)*page_size;
    page_size=parseInt(page_size);
    pool.query(sql,[pid,offset,page_size],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/selproducts",(req,res)=>{
    var pno=req.query.pno;
    var page_size=req.query.page_size;
    var title=req.query.title;
    if(!pno){pno=1;}
    if(!page_size){page_size=6;}
    var sql=`select id,title,img,price from products where title like ? limit ?,?`;
    var offset=(pno-1)*page_size;
    page_size=parseInt(page_size);
    pool.query(sql,['%'+title+'%',offset,page_size],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/pro_info",(req,res)=>{
    var id=req.query.id;
    var sql="select lg,price,title from products where id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
        res.send({code:1,data:result});
        }
    })
})
server.get("/getPro_img",(req,res)=>{
    var pid=req.query.id;
    var sql="select img1,img2,img3,img4,img5 from pro_info where pid=?";
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/getPro_color",(req,res)=>{
    var pid=req.query.id;
     var sql="select pro.pid,p.price,pro.color from products p,pro_desc pro where p.id=pro.pid and pro.pid=? group by pro.color";
    // var sql="select pid,color from pro_desc  where pid=? group by color";
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/getPro_desc",(req,res)=>{
    var pid=req.query.id;
    var color=req.query.color;
    var sql='select id,color,img,size from pro_desc where pid=? and color=?';
    pool.query(sql,[pid,color],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/getPro_num",(req,res)=>{
    var pid=req.query.id;
    var color=req.query.color;
    var size=req.query.size;
    var sql='select id,color,size,num from pro_desc where pid=? and color=? and size=?';
    pool.query(sql,[pid,color,size],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.post("/reg",(req,res)=>{
var uname=req.body.uname;
var upwd=req.body.upwd;
var reg=/^1[34578]\d{9}$/;
var reg1=/^\w{8,20}$/;
if(!reg.test(uname)){
    res.send({code:-1,msg:"手机号格式不正确"});
    return;
}
if(!reg1.test(upwd)){
    res.send({code:-1,msg:"请设置8-20位登录密码"});
    return;
}
var sql='select id from user where uname=? and upwd=?';
pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
        res.send({code:-1,msg:"该用户已经存在"});
    }else{
        var sql='insert into user values(null,?,?)';
        pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
        res.send({code:1,msg:"注册成功"});
    }
})
    }
})
})
server.get("/login",(req,res)=>{
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    var sql='select id from user where uname=? and upwd=?';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var uid=result[0].id;
            req.session.uid=uid;//保存到session对象中
            // console.log(req.session.uid);
            res.send({code:1,msg:"登录成功"})
        }else{
            res.send({code:-1,msg:"登录失败"})
        }
    })
})
server.post("/loginout",(req,res)=>{
    req.session.uid='';
    res.send({code:1,msg:"退出成功"});
})
server.post("/addCart",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"登录超时，请重新登录"});
        return;
    }
    var pid=req.body.pid;
    var color=req.body.color;
    var size=req.body.size;
    var num=req.body.sum;
    var sql2='select * from cart where pid=? and uid=? and color=? and size=?';
    pool.query(sql2,[pid,uid,color,size],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
        var num1=result[0].num;
        //var id=result[0].id;
        var sql=`update cart set num=${num1}+${num} where uid=? and pid=?`;
        pool.query(sql,[uid,pid,num1,num],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
        res.send({code:1,msg:"添加成功"});
        }else{
        res.send({code:-1,msg:"添加失败"});
        }
        })   
        }else{
        var sql1='select title,price from products where id=?';
        pool.query(sql1,[pid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                var title=result[0].title;
                var price=result[0].price;
                var sql5='select img,num from pro_desc where pid=? and size=? and color=?';
                pool.query(sql5,[pid,size,color],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        var img=result[0].img;
                        var total=result[0].num;
                        var sql='insert into cart(id,pid,uid,color,size,num,title,price,img,total) values(null,?,?,?,?,?,?,?,?,?)';
                        pool.query(sql,[pid,uid,color,size,num,title,price,img,total],(err,result)=>{
                        if(err) throw err;
                        if(result.affectedRows>0){
                        res.send({code:1,msg:"添加成功"});
                        }else{
                        res.send({code:-1,msg:"添加失败"});
                    }
                })
                    }
                })
            }
        })
        }
        })     
})
server.get("/getCart",(req,res)=>{
    var uid=req.session.uid;
    // console.log(uid);
    // 如果用户没有登录
    if(!uid){
        res.send({code:-1,data:"请登录"});
        return;
    }
    var sql='select pid,color,size,num,title,price,img,total from cart where uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
             res.send({code:1,data:result});
        }
    })
})
server.get("/updateCart",(req,res)=>{
    var uid=req.session.uid;
    var pid=req.query.pid;
    var color=req.query.color;
    var size=req.query.size;
    var num=req.query.num;
    var sql='update cart set num=? where uid=? and pid=? and color=? and size=?';
    pool.query(sql,[num,uid,pid,color,size],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"});
        }else{
            res.send({code:-1,msg:"修改失败"});
        }
    })
})
server.get("/delItem",(req,res)=>{
    var uid=req.session.uid;
    var pid=req.query.pid;
    var color=req.query.color;
    var size=req.query.size;
    var sql='delete from cart where uid=? and pid=? and color=? and size=?';
    pool.query(sql,[uid,pid,color,size],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"});
        }
    })
})
server.post("/order",(req,res)=>{
    var uid=req.session.uid;
    var pid=req.body.pid;
    var color=req.body.color;
    var size=req.body.size;
    var num=req.body.num;
    var img=req.body.img;
    var title=req.body.title;
    var price=req.body.price;
    var s='select * from pro_order where uid=? and code=?';
    pool.query(s,[uid,0],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var ssql='delete from pro_order where uid=? and code=?';
            pool.query(ssql,[uid,0],(err,result)=>{
                if(err) throw err;
                if(result.affected>0){
                }
            })
        }else{
            var sql1='select * from pro_order where pid=? and color=? and size=? and uid=? and code=?';
             pool.query(sql1,[pid,color,size,uid,0],(err,result)=>{
            if(err) throw err;
            if(result.length==0){
                var sql=`insert into pro_order(id,uid,pid,color,size,num,img,title,price,order_time,sum) values(null,?,?,?,?,?,?,?,?,now(),?)`;
                pool.query(sql,[uid,pid,color,size,num,img,title,price,price*num],(err,result)=>{
                    if(err) throw err;
                    if(result.affectedRows>0){
                        res.send({code:1,msg:"插入成功"});
                    }else{
                        res.send({code:-1,msg:"订单已存在"});
                    }
                })
            }
             })
        }
    })

})

server.get("/getOrder",(req,res)=>{
    var uid=req.session.uid;
    var sql='select id,pid,uid,color,size,num,img,title,price,order_id from pro_order where uid=? and code=? ';
    pool.query(sql,[uid,0],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:"查询失败"});
        }
    })
})
// 添加收货地址
server.post("/addAddress",(req,res)=>{
    var uid=req.session.uid;
    var uname=req.body.uname;
    var address=req.body.address;
    var emailId=req.body.emailId;
    var phone=req.body.phone;
    var moren=req.body.moren;
    var reg1=/^1[34578]\d{9}$/;
    if(!reg1.test(phone)){
        res.send({code:-1,msg:"联系电话格式不正确"});
        return;
    }
    var reg2=/^[0-9]{6}$/;
    if(!reg2.test(emailId)){
        res.send({code:-1,msg:"邮编格式不正确"});
        return;
    }
    var sql='insert into address values(null,?,?,?,?,?,?)';
    pool.query(sql,[uid,uname,address,emailId,phone,moren],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"添加成功"});
        }
    })
})
server.get("/getAddress",(req,res)=>{
    var uid=req.session.uid;
    var sql='select uname,phone,address from address where uid=?   and moren=?';
    pool.query(sql,[uid,1],(err,result)=>{
        if(err) throw err;
         if(result.length>0){
            res.send({code:1,data:result});
         }else{
             var sql='select uname,phone,address from address where uid=? limit ?,?';
             pool.query(sql,[uid,0,1],(err,result)=>{
                 if(err) throw err;
                 if(result.length>0){
                     res.send({code:1,data:result});
                 }
             })
         }
    })
})
// 获得所有收货地址
server.get("/addresslist",(req,res)=>{
    var uid=req.session.uid;
    var sql='select id,uname,phone,address,moren from address where uid=? order by moren desc';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
})
// 获得指定的地址
server.get("/getAddress1",(req,res)=>{
    var uid=req.session.uid;
    var id=req.query.id;
    var sql='select uname,phone,address,emailId,moren from address where uid=? and id=?';
    pool.query(sql,[uid,id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})
// 修改收货地址
server.post("/updateAddress",(req,res)=>{
    var uid=req.session.uid;
    var id=req.body.id;
    var uname=req.body.uname;
    var address=req.body.address;
    var emailId=req.body.emailId;
    var phone=req.body.phone;
    var moren=req.body.moren;
    var reg1=/^1[34578]\d{9}$/;
    if(!reg1.test(phone)){
        res.send({code:-1,msg:"联系电话格式不正确"});
        return;
    }
    var reg2=/^[0-9]{6}$/;
    if(!reg2.test(emailId)){
        res.send({code:-1,msg:"邮编格式不正确"});
        return;
    }
    if(moren==1){
        var sql='update address set moren=? where uid=?';
        pool.query(sql,[0,uid],(err,result)=>{
            if(err) throw err;
        })
    }
    var sql='update address set uname=?,address=?,emailId=?,phone=?,moren=? where uid=? and id=?';
    pool.query(sql,[uname,address,emailId,phone,moren,uid,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"更新成功"});
        }else{
            res.send({code:-1,msg:"更新失败"});
        }
    })
})
server.get("/delAddress",(req,res)=>{
    var uid=req.session.uid;
    var id=req.query.id;
    var sql='delete from address where uid=? and id=?';
    pool.query(sql,[uid,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"})
        }
    })
})
server.post("/updatemoren",(req,res)=>{
    var uid=req.session.uid;
    var id=req.body.id;
    var moren=req.body.moren;
    if(moren==1){
        var sql='update address set moren=? where uid=?';
        pool.query(sql,[0,uid],(err,result)=>{
            if(err) throw err;
        })
    }
    var sql='update address set moren=? where uid=? and id=?';
    pool.query(sql,[moren,uid,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"});
        }
    })
})
// 提交订单
server.post("/submitOrder",(req,res)=>{
    var uid=req.session.uid;
    var code=req.body.code;
    var sum=[]
    var order_id=parseInt(Math.random()*9999999999999999);
    console.log(order_id);
    var sql1="select * from pro_order where uid=? and code=?";
    pool.query(sql1,[uid,0],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='update pro_order set code=?,order_id=? where uid=? and code=?';
            pool.query(sql,[code,order_id,uid,0],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    var sql='select * from pro_order where uid=? and order_id=?'
                    pool.query(sql,[uid,order_id],(err,result)=>{
                        if(err) throw err;
                        console.log(result);
                        if(result.length>1){
                            var sum=0;
                            for(var i=0;i<result.length;i++){
                                sum+=parseInt(result[i].sum);
                            }
                            console.log(sum);
                            var sql='update pro_order set sum=? where uid=? and order_id=?';
                            pool.query(sql,[sum,uid,order_id],(err,result)=>{
                                if(err) throw err;
                                if(result.affectedRows>0){
                                    res.send({code:1,msg:"提交订单成功"});
                                }
                            })
                        }
                    })

                }
            })
        }
    })
    
})
server.get("/pay",(req,res)=>{
    var uid=req.session.uid;
    var code=req.query.code;
    var sql='select * from pro_order where uid=? and code=?';
    pool.query(sql,[uid,code],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
//付款成功
server.post("/successPay",(req,res)=>{
    var uid=req.session.uid;
    var code=req.body.code;
    var sql='update pro_order set code=? where uid=?';
    pool.query(sql,[code,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
           
            var sql=`update pro_desc p,pro_order o set p.num=p.num-o.num where p.pid=o.pid and p.color=o.color and p.size=o.size and uid=?`
            pool.query(sql,[uid],(err,result)=>{
                if(err) throw(err);
            })
            res.send({code:1,msg:"付款成功"});
        }
    })
})
//添加商品到收藏中
server.post("/shoucang",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var id=req.body.id;
    var sql1='select * from shoucang where uid=? and pid=?';
    pool.query(sql1,[uid,id],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            var sql='insert into shoucang values(?,?,?)';
            pool.query(sql,[null,uid,id],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"收藏成功"});
                }
            })
        }
    })
   
})
//获得收藏的商品
server.get("/getsc",(req,res)=>{
    var uid=req.session.uid;
    var id=req.query.id;
    var sql='select * from shoucang where uid=? and pid=?';
    pool.query(sql,[uid,id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
server.get("/getshoucang",(req,res)=>{
    var uid=req.session.uid;
    var sql='select s.pid,p.title,p.price,p.img from shoucang s,products p where s.uid=? and s.pid=p.id';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
//取消商品收藏
server.post("/delshoucang",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var id=req.body.id;
    var sql1='select * from shoucang where uid=? and pid=?';
    pool.query(sql1,[uid,id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='delete from shoucang where uid=? and pid=?';
            pool.query(sql,[uid,id],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"取消收藏成功"});
                }
            })
        }
    })
    
})



server.post("/addOrder",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"登录超时，请重新登录"});
        return;
    }
    var pid=req.body.pid;
    var color=req.body.color;
    var size=req.body.size;
    var num=req.body.sum;
        var sql1='select title,price from products where id=?';
        pool.query(sql1,[pid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                var title=result[0].title;
                var price=result[0].price;
                var sql5='select img,num from pro_desc where pid=? and size=? and color=?';
                pool.query(sql5,[pid,size,color],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        var img='http://127.0.0.1:5000/img/'+result[0].img;
                        var total=result[0].num;
                       var sql6='select * from pro_order where pid=? and color=? and size=? and uid=? and code=?';
                       pool.query(sql6,[pid,color,size,uid,0],(err,result)=>{
                           if(err) throw err;
                           if(result.length==0){
                            var sql='insert into pro_order(id,pid,uid,color,size,num,title,price,img,order_time,sum) values(null,?,?,?,?,?,?,?,?,now(),?)';
                            pool.query(sql,[pid,uid,color,size,num,title,price,img,price*num],(err,result)=>{
                                // var sql='insert into pro_order(id,pid,uid,color,size,num,title,price,img,order_time) values(null,?,?,?,?,?,?,?,?,?)';
                                // pool.query(sql,[pid,uid,color,size,num,title,price,img,order_time],(err,result)=>{
                                if(err) throw err;
                                if(result.affectedRows>0){
                                res.send({code:1,msg:"添加成功"});
                                }else{
                                res.send({code:-1,msg:"添加失败"});
                            }
                        })
                           }else{
                            res.send({code:-2,msg:"订单已存在"});
                           }
                       })
                        
                     
                    }
                })
            }
        })
 })

server.get("/isLogin",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"})
    }
})
// 取消订单
server.post("/delOrder",(req,res)=>{
    var uid=req.session.uid;
    var code=req.body.code;
    var order_id=req.body.order_id;
    var sql="select * from pro_order where uid=? and code=? and order_id=?";
    pool.query(sql,[uid,code,order_id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
        var sql='delete from  pro_order where uid=? and code=? and order_id=?';
        pool.query(sql,[uid,code,order_id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修取消订单成功"});
        }else{
            res.send({code:-1,msg:"取消订单失败"});
        }
    })
        }
    })  
})
          
    server.get("/order_id",(req,res)=>{
    var uid=req.session.uid;
    var code=req.query.code;
    var sql='select * from pro_order where uid=? and code=?  group by order_id';
    pool.query(sql,[uid,code],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }
    })
})
// 创建multer模块对象
var upload=multer({dest:'img/touxiang'})
// 1：接收post请求 /uploadFile
server.post("/loadFile",upload.single("mypic"),(req,res)=>{
    var uid=req.session.uid;
    var src=req.file.originalname;
    var i=src.lastIndexOf(".");
    var suff=src.substring(i);
    var ft=new Date().getTime();
    var fr=Math.floor(Math.random()*9999);
    var des=ft+fr+suff;
    var newFile=__dirname+'/public/img/touxiang/'+des;
    fs.renameSync(req.file.path,newFile);
    //res.send({code:1,msg:"上传成功"});
    var sql='update  user set avatar=? where id=?';
    pool.query(sql,[des,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"上传成功"});
        }
    })
})
