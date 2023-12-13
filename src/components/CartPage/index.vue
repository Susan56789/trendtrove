<template>
  <div class="bg-yellow-50">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Your Cart</h1>
    </div>
    <div class="container mx-auto my-8">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/3 pr-8">
          <CartItemsList :cart="cart" @updateCart="updateCart"  />
        </div>
        <div class="md:w-1/3">
          <template v-if="isCartEmpty">
            <div class="text-center text-gray-500">
             <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" class="fill-current text-yellow-300" />
  <path d="M15.5 14a2.5 2.5 0 0 1-5 0" class="stroke-current" />
  <path d="M12 3a9 9 0 0 1 9 9" class="stroke-current" />
  <path d="M6.5 14a2.5 2.5 0 0 1 5 0" class="stroke-current" />
</svg>

            </div>
            <router-link to="/shop" class="bg-green-500 text-white mt-10 px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
  Continue Shopping
</router-link>
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
     updateCart(cart) {
      this.cart = cart;
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
