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
                component: () => import('./components/ProductPage/index.vue'),
                props: true
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
            },
            {
                path: '/sale',
                component: () => import('./components/ProductsPage/OnSaleProducts.vue')
            },
            {
                path: 'myaccount',
                component: () => import('./components/UserPage/index.vue')
            },
            {
                path: '/signup',
                component: () => import('./components/UserPage/CreateAccount.vue')
            },

            {
                path: '/passwordreset',
                component: () => import('./components/UserPage/ForgotPassword.vue')
            },
            {
                path: '/myaccount/update',
                component: () => import('./components/UserPage/AccountUpdate.vue')
            },
            {
                path: "/category/:id",
                component: () => import("./components/ProductCategories/index.vue"),
                props: true
            }

        ]
    },

];




const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;