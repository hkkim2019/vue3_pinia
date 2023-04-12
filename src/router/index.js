import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/test', component:() => import('../components/Test.vue')},
    { path: '/test2', component:() => import('../components/Test2.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router }