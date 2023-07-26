/*  import VueRouter from "vue-router"
*   这样写会有错：ambiguous indirect export: default，意思是vue-router模块没有模认的导出
*   解决方法：
*   import * as VueRouter from 'vue-router' ==》用 as
*   或
*   import {createRouter, createWebHashHistory} from 'vue-router' ==》 指定功能
*/
import * as VueRouter from 'vue-router'

//重要：必须用() => import(...) 函数式导入，直接写import(...)在开发下有效，打包了就不生效！！！
const routes = [
    { path: '/', component: () => import("../components/WeiboContainer.vue") },  //这里是路由懒加载，使访问更加高效
    { 
        path: '/login', 
        component: () => import("../components/Login.vue"), 
        props: (route: { query: { code: string | undefined }; }) => ({ code: route.query.code }) //把query做为props参数传给组件
    },
    { path: '/profile', component: () => import("../components/Profile.vue") },
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
