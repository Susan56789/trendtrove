<template>
  <div>
    <h2>Cart Summary</h2>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
      Your cart is empty.
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
