<!-- CartSummary.vue -->
<template>
    <div class="bg-white p-6 rounded shadow">
      <div v-for="(product, index) in cart" :key="index" class="flex justify-between mb-2">
        <span>{{ product.name }} ({{ product.quantity }} x ${{ product.price.toFixed(2) }})</span>
        <span>${{ (product.quantity * product.price).toFixed(2) }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span>Shipping Fee</span>
        <span>${{ shippingFee.toFixed(2) }}</span>
      </div>
      <div v-if="cart.length > 0">
        <div class="flex justify-between border-t pt-2 mt-4">
          <span class="font-semibold">Total</span>
          <span class="text-xl">${{ (totalCost + shippingFee).toFixed(2) }}</span>
        </div>
        <button class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" @click="checkout">
          Checkout
        </button>
      </div>
      <div v-else>
        <router-link to="/shop" class="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          Shop Now
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: Array,
      shippingFee: Number,
      totalCost: Number,
    },
    methods: {
      checkout() {
        this.$emit('checkout');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind styles here if needed */
  </style>
  