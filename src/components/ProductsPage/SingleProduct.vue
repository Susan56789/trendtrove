<template>
  <div>
    <article class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div class="mt-1 p-2">
        <div class="image-container relative flex items-end overflow-hidden rounded-xl">
          <img :src="product.ImagePath" :alt="product.ProductName" class="mx-auto h-200 w-200 object-cover mb-4" />
          <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
          </div>
        </div>
        <h2 class="text-slate-700">{{ product.ProductName }}</h2>
        <p class="mt-1 text-sm text-slate-400">{{ product.Description }}</p>
        <div class="mt-3 flex items-end justify-between">
          <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
            formatNumber(product.DiscountedPrice) }} </p>
          <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <button @click="addToCart" class="text-sm">Add to Cart</button>
          </div>
          <button @click="addToWishlist"
            class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
            Add to Wishlist
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },

  },
  methods: {
    formatNumber(value) {
      // Use toLocaleString to format the number with comma separators
      return value.toLocaleString();
    },
    addToCart() {
      this.$emit('addToCart', this.product);
    },
    addToWishlist() {
      this.$emit('addToWishlist', this.product);
    },
  },
};
</script>

<style scoped>
.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>
