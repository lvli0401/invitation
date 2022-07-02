import { lazy } from 'react';
// 基于路由进行代码分割     
// 经测试可进行路由懒加载
// https://zh-hans.reactjs.org/docs/code-splitting.html#route-based-code-splitting
const router = [
    {
        path: "/",
        component: lazy(() => import('../pages/index/index')),
        exact: true,
        children: []
    }
]
export default router