<!-- CartItem.vue -->
<template>
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4">
      <div class="bg-white p-6 rounded shadow">
        <div class="w-16 h-16 bg-gray-300 rounded-full mr-4">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold">{{ product.name }}</h3>
          <p class="text-green-500 font-semibold">${{ product.price }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex justify-between items-center mt-2">
            <button @click="decreaseQuantity" class="px-3 py-1 bg-gray-200 rounded-full">-</button>
            <span class="mx-2">{{ product.quantity }}</span>
            <button @click="increaseQuantity" class="px-3 py-1 bg-gray-200 rounded-full">+</button>
          </div>
          <div>
            <span class="font-semibold">Total:</span> ${{ (product.quantity * product.price).toFixed(2) }}
          </div>
        </div>
        <button @click="removeProduct" class="mt-4 text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,
    },
    methods: {
      removeProduct() {
        this.$emit('remove', this.product);
      },
      decreaseQuantity() {
        if (this.product.quantity > 1) {
          this.$emit('decrease', this.product);
        }
      },
      increaseQuantity() {
        this.$emit('increase', this.product);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add Tailwind styles here if needed */
  </style>
  