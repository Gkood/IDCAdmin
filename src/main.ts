import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

//基本样式
import './style/main.scss'

//i18n
import i18n from './lang'

// @ts-ignore
import _ from 'lodash';
//全局lodash
Vue.prototype._ = _;

//全局组件注册
import Layout from './layout/Layout.vue'
import IdcOpen from './components/IdcOpen.vue'
Vue.component('Layout', Layout)
Vue.component('IdcOpen', IdcOpen)

Vue.use(PiniaVuePlugin)

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key: string, value: string) => i18n.t(key, value)
})

VXETable.setup({
  size: 'mini', // 全局尺寸
  version: 0,
  //@ts-ignore
  i18n: (key:string, args:any) => i18n.t(key, args),
})
Vue.use(VXETable)

new Vue({
  router,
  pinia: createPinia(),
  i18n,
  render: (h) => h(App)
}).$mount('#app')
