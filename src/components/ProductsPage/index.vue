<template>
    <div class="bg-yellow-50">
        <router-view /> <!-- This is where your page components will be rendered -->
        <ProductList @updateCart="updateCart" />
    </div>
</template>

<script>
import ProductList from './ProductList.vue';
export default {
    name: 'ProductsPage',
    components: {
        ProductList
    },
    data() {
    return {
      cart: [],
    };
  },
  methods: {
    updateCart(cart) {
      // Update the parent component's cart
      this.cart = cart;
      console.log('Parent cart updated:', this.cart);
    },
  },

};
</script>