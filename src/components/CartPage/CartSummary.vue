<template>
  <div>
    <h2>Cart Summary</h2>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="transparent" stroke="black" stroke-width="2"/>
</svg>

    </div>
    <div v-else>
      <ul>
        <li v-for="(product, index) in cart" :key="index">
          {{ product.name }} - Quantity: {{ product.quantity }} - Total: {{ product.quantity * product.price }}
        </li>
      </ul>
      <p>Total Quantity: {{ totalQuantity }}</p>
      <p>Total Price: {{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isCartEmpty() {
      return this.cart.length === 0;
    },
    totalQuantity() {
      return this.cart.reduce((total, product) => total + product.quantity, 0);
    },
    totalPrice() {
      return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
    },
  },
};
</script>

<style scoped>
/* ... your styles ... */
</style>
