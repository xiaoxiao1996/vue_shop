import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/Index.vue'
import Product from './components/Products.vue'
import Cart from './components/Cart.vue'
import My from './components/My.vue'
import Products_info from './components/Products_info.vue'
import Products1 from './components/Products1.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Order from './components/Order.vue'
import Address from './components/Address.vue'
import AddressList from './components/AddressList.vue'
import updateAddress from './components/AddressUpdate.vue'
import pay from './components/Pay.vue'
import orderinfo from './components/Orderinfo.vue'
import shoucang from './components/Shoucang.vue'
import zhanghao from './components/Zhanghao.vue'
import setpwd from './components/Setpwd.vue'
import orderxq from './components/Orderxq.vue'
import avatar from './components/Avatar.vue'
import Mint from 'mint-ui'
import'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.use(Router)
import {Switch} from "mint-ui";
Vue.component(Switch.name,Switch);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import { Navbar, TabItem } from 'mint-ui';

export default new Router({
  routes: [
    {path:'/',component:Index},
    {path:"/product",component:Product},
    {path:"/cart",component:Cart},
    {path:"/my",component:My},
    {path:"/proinfo",component:Products_info},
    {path:"/serachProducts",component:Products1},
    {path:"/register",component:Register},
    {path:"/login",component:Login},
    {path:"/order",component:Order},
    {path:"/address",component:Address},
    {path:"/addressList",component:AddressList},
    {path:"/updateAddress",component:updateAddress},
    {path:"/pay",component:pay},
    {path:"/orderinfo",component:orderinfo},
    {path:"/shoucang",component:shoucang},
    {path:"/zhanghao",component:zhanghao},
    {path:"/setpwd",component:setpwd},
    {path:"/orderxq",component:orderxq},
    {path:"/avatar",component:avatar},
  ]
})
