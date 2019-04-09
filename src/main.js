import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import {Header,InfiniteScroll,Search,Button,Swipe,SwipeItem} from "mint-ui"
import axios from "axios"
import qs from "qs"
Vue.prototype.qs=qs;
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
Vue.config.productionTip=false;
// Vue.component(Header.name,Header)
Vue.component(Header.name,Header);
Vue.use(InfiniteScroll);
Vue.component(Search.name,Search)
Vue.component(Button.name,Button)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
