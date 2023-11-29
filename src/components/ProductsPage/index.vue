<template>
    <div class="flex items-center justify-center bg-yellow-50 p-32 h-screen">
        <router-view /> <!-- This is where your page components will be rendered -->
        <ProductList />
    </div>
</template>

<script>
import ProductList from './ProductList.vue';
export default {
    name: 'ProductsPage',
    components: {
        ProductList
    },

};
</script>