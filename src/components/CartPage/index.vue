<template>
  <div class="bg-yellow-50">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Your Cart</h1>
    </div>
    <div class="container mx-auto my-8">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/3 pr-8">
          <CartItemsList :cart="cart" @remove="removeProduct" />
        </div>
        <div class="md:w-1/3">
          <template v-if="isCartEmpty">
            <div class="text-center text-gray-500">
              Your cart is empty.
            </div>
            <a href="/shop" class="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
              Continue Shopping
            </a>
          </template>
          <template v-else>
            <CartSummary :cart="cart" :shipping-fee="shippingFee" :total-cost="totalCost" @checkout="checkout" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItemsList from './CartItemsList.vue';
import CartSummary from './CartSummary.vue';

export default {
name: 'CartPage',
  components: {
    CartItemsList,
    CartSummary,
  },
  data() {
    return {
      cart: [],
      shippingFee: 5,
    };
  },
  computed: {
    isCartEmpty() {
      return this.cart.length === 0;
    },
    totalCost() {
      return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
    },
  },
  methods: {
    removeProduct(index) {
      this.$set(this.cart, index, { ...this.cart[index] }); // Ensure reactivity
      this.cart.splice(index, 1);
    },
    checkout() {
      // Implement your checkout logic here
    },
  },
};
</script>

<style>
/* ... your existing styles ... */
</style>
