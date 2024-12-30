import {createRouter, createWebHistory} from 'vue-router';
import Body from '@/components/Body.vue';
import Content from "@/components/Content.vue";
import App from "@/App.vue";
import Community from "@/view/Community.vue";
import Business from "@/view/Business.vue";
import Home from "@/view/Home.vue";
import NotFound from "@/view/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            name: 'Home',
            component: Home,
            redirect: '/home',
            children: [
                {
                    path: '/business',
                    name: 'Business',
                    component: Business,
                },
                {
                    path: '/community',
                    name: 'Community',
                    component: Community,
                },
                {
                    path: '/',
                    name: 'Home1',
                    component: Content,
                    children: [
                        {
                            path: '/home/category/:cId',
                            name: 'CategoryProducts',
                            component: Body,
                            props: true,
                            children: [
                                {
                                    path: '/home',
                                    name: 'main',
                                    redirect: '/home/category/featured'                                },
                                {
                                    path: '/home/category/',
                                    name: 'index',
                                    redirect: '/home/category/featured'
                                },
                                {
                                    path: '/home/category/featured',
                                    name: 'featured',
                                    component: () => import('@/components/CategoriesDetail/featured.vue')
                                },
                                {
                                    path: '/home/category/shoes',
                                    name: 'shoes',
                                    component: () => import('@/components/CategoriesDetail/shoes.vue')
                                },
                                {
                                    path: '/home/category/clothing',
                                    name: 'clothing',
                                    component: () => import('@/components/CategoriesDetail/clothing.vue')
                                },
                                {
                                    path: '/home/category/digital',
                                    name: 'digital',
                                    component: () => import('@/components/CategoriesDetail/digital.vue')
                                },
                                {
                                    path: '/home/category/makeup',
                                    name: 'makeup',
                                    component: () => import('@/components/CategoriesDetail/makeup.vue')
                                }
                            ]
                        },
                    ]
                },
                {
                    path: '/productDetail',
                    name: 'ProductDetail',
                    redirect: NotFound,
                    children: [
                        {
                            // 使用动态路由参数，以更灵活地匹配不同产品详情
                            path: ':productCategory/:productName/:productPrice',
                            name: 'ProductDetailPage',
                            component: () => import('@/components/ProductDetail/detail.vue'),
                            // 可以在这里添加一些额外的路由元信息（例如页面标题等，根据需求来定）
                            meta: {
                                title: '产品详情页'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: "/:catchAll(.*)",
            name: 'NotFound',
            component: NotFound,
        },

    ],
    watch: {
        // 监听路由是否变化
        '$route'(to, from) {
            if (to.params.cId != from.params.cId) {
                this.id = to.params.cId; // 把最新id赋值给定义在data中的id
                this.init(); // 重新调用加载数据方法
            }
        }
    },
});

export default router;