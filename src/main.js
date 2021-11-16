import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'

import store from './store'

const routes = [
    { path: '/', component: Students },
    { path: '/student-info/:id', component: StudentInfo, props: true },
]

const router = new VueRouter({
    routes,
})

Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store,
})