<template>
  <div>
    <article class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div class="mt-1 p-2">
        <div class="image-container relative flex items-end overflow-hidden rounded-xl">
          <router-link :to="'/product/' + product.ProductName">
            <img :src="product.ImagePath" :alt="product.ProductName" class="mx-auto h-200 w-200 object-cover mb-4" />
            <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
              <i class="fas fa-star text-yellow-400"></i>
              <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
            </div>
          </router-link>
        </div>
        <h2 class="text-slate-700">{{ product.ProductName }}</h2>

        <div class="mt-3 flex items-end justify-between">
          <router-link :to="'/product/' + product.ProductName">
            <p v-if="product.DiscountedPrice" class="text-green-500 font-semibold">KES. {{
              formatNumber(product.DiscountedPrice) }} </p>
            <p v-else class="text-green-500 font-semibold">KES. {{ formatNumber(product.Price) }}</p>
          </router-link>
          <div
            class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
            <button @click="addToCartButton" class="text-sm"> <i class="fas fa-cart-plus"></i></button>
          </div>
          <button @click="addToWishlistButton"
            class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },

  },
  methods: {
    formatNumber(value) {

      return value.toLocaleString();
    },
    addToWishlistButton() {
      this.addToWishlist(this.product);
    },
    addToCartButton() {
      this.addToCart(this.product);
    },
    addToWishlist(product) {
      // Check if product is defined and has the required properties
      if (product && product.ProductName && product.Price && product.ProductID) {
        axios.post('http://localhost:3000/addToWishlist', product)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Invalid product data for wishlist:', product);
      }
    },
    addToCart(product) {
      // Check if product is defined and has the required properties
      if (product && product.ProductName && product.Price) {
        axios.post('http://localhost:3000/addToCart', product)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Invalid product data for cart:', product);
      }
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
