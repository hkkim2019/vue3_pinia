import { createRouter, createWebHistory } from 'vue-router'

import Test from '../components/Test.vue'
import Test2 from '../components/Test2.vue'

const routes = [
    { path: '/test', component:Test},
    { path: '/test2', component:Test2},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router }