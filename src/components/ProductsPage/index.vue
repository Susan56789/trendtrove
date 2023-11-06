<template>
    <div>
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