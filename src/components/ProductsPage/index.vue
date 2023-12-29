<template>
  <div class="bg-yellow-50">
    <router-view />
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

      this.cart = cart;

    },
  },

};
</script>