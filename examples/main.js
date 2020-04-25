import Vue from 'vue'
import Test from './Test.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElFilter from '../packages'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ElFilter);

new Vue({
  render: h => h(Test),
}).$mount('#app')
