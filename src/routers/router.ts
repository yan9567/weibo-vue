/*  import VueRouter from "vue-router"
*   这样写会有错：ambiguous indirect export: default，意思是vue-router模块没有模认的导出
*   解决方法：
*   import * as VueRouter from 'vue-router' ==》用 as
*   或
*   import {createRouter, createWebHashHistory} from 'vue-router' ==》 指定功能
*/
import * as VueRouter from 'vue-router'


const routes = [
    { path: '/', component: import("../components/layouts/MainContent.vue") },
    { path: '/logs', component: import("../components/Logos.vue") },
    { path: '/login', component: import("../components/Login.vue")},
    {
        //404
        path: '/:pathMatch(.*)*',
        component: () => "/"
    },
];

const router = VueRouter.createRouter(
    {
        history: VueRouter.createWebHashHistory(),
        routes: routes,
    }
)

export default router;
