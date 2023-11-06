import { createRouter, createWebHistory } from 'vue-router';


const routes = [

    {
        path: '/',
        component: () => import('./components/PageLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/HomePage.vue')
            },
            {
                path: '/about',
                component: () => import('./components/AboutPage.vue')
            },
            {
                path: '/contact',
                component: () => import('./components/ContactPage.vue')
            },

            {
                path: '/cart',
                component: () => import('./components/CartPage/index.vue')
            },
            {
                path: '/shop',
                component: () => import('./components/ProductsPage/index.vue')
            },
            {
                path: '/product/:id',
                component: () => import('./components/ProductPage/index.vue')
            },
            {
                path: '/checkout',
                component: () => import('./components/CheckoutPage/index.vue')
            },
            {
                path: '/order',
                component: () => import('./components/OrderPage/index.vue')
            },
            {
                path: '/wishlist',
                component: () => import('./components/ProductWishlist/index.vue')
            }, {
                path: '/login',
                component: () => import('./components/LoginPage.vue')
            }

        ]
    },

];




const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;