import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import Capacity from '../views/Capacity/index.vue'
import Paigong from '../views/Paigong/index.vue'
import StartWork from '../views/StartWork/index.vue'
import Import from '../views/Import/index.vue'
import ReporWork from '../views/ReporWork/index.vue'
import Material from '../views/Material/index.vue'
import Fqc from '../views/Fqc/index.vue'
import Routing from '../views/Routing/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/capacity', name: 'capacity', component: Capacity},
    {path: '/paigong', name: 'paigong', component: Paigong},
    {path: '/startWork', name: 'startWork', component: StartWork},
    {path: '/import', name: 'import', component: Import},
    {path: '/reporWork', name: 'reporWork', component: ReporWork},
    {path: '/material', name: 'material', component: Material},
    {path: '/material', name: 'material', component: Material},
    {path: '/fqc', name: 'fqc', component: Fqc},
    {path: '/routing', name: 'routing', component: Routing},
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
