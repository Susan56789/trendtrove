<template>
    <div class="bg-yellow-50 overflow-x-auto">
      <div class="pt-32">
        <h1 class="text-center text-2xl font-bold text-gray-800">Today's Offer</h1>
      </div>
      <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        <article class="rounded-xl bg-white p-3 bg-yellow-50 ">
          <a href="#">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="product in productsOnSale" :key="product.id"
                   class="p-4 border rounded shadow-lg hover:shadow-xl hover:transform hover:scale-105 sm:mx-2">
                <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                  <img :src="product.image" :alt="product.name" class="mx-auto w-full h-full object-cover mb-4" />
                  <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
                         fill="currentColor">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="ml-1 text-sm text-gray-700">{{ product.rating }}</span>
                  </div>
                </div>
                <h2 class="text-slate-700">{{ product.name }}</h2>
                <p class="mt-1 text-sm text-slate-400">{{ product.description }}</p>
                <div class="mt-3 flex items-end justify-between">
                  <p class="text-gray-500 line-through">KES. {{ formatNumber(product.price) }}</p>
                  <p class="text-green-500 font-semibold">KES. {{ formatNumber(product.discountedPrice) }}</p>
                  <div class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                    </svg>
                    <button @click="addToCart" class="text-sm w-full sm:w-auto">Add to cart</button>
                  </div>
                  <button @click="addToWishlist"
                          class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </template>
  
  
<script>
import products from './products.json';

export default {
    data() {
        return {
            products: products,
        };
    }, methods: {
        formatNumber(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        addToCart() {
            // Emit an event to add the product to the cart
            this.KES.emit('addToCart', this.product);
        },
        addToWishlist() {
            // Emit an event to add the product to the wishlist
            this.KES.emit('addToWishlist', this.product);
        },
    },
    computed: {
        productsOnSale() {
            return this.products.filter((product) => product.price > product.discountedPrice);
        },
    },
};
</script>
  