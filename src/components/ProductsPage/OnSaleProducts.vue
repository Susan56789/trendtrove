<template>
  <div class="bg-yellow-50 overflow-x-auto">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Today's Offer</h1>
    </div>
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <article class="rounded-xl bg-white p-3 bg-yellow-50">
        <a href="#">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="product in productsOnSale" :key="product.id"
              class="p-2 border rounded shadow-lg hover:shadow-xl hover:transform hover:scale-105 mb-4">
              <div class="image-container relative flex items-end overflow-hidden rounded-xl">
                <button v-if="product.amountSaved > 0"
                  class="save-button sm:absolute sm:top-0 sm:right-0 bg-green-500 text-white p-2 duration-100 hover:bg-green-700 rounded-full">
                  SAVE<br />{{ formatNumber(product.amountSaved) }}
                </button>
                <img :src="product.ImagePath" :alt="product.ProductName"
                  class="mx-auto w-full h-full object-cover mb-2" />
                <div class="absolute bottom-2 left-2 inline-flex items-center rounded-lg bg-white p-1 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
                </div>
              </div>
              <h2 class="text-slate-700 text-xs">{{ product.ProductName }}</h2>
              <p class="mt-1 text-xxs text-slate-400">{{ product.Description }}</p>
              <div class="mt-2 flex items-end justify-between">
                <p class="text-green-500 font-semibold text-xxs">KES. {{ formatNumber(product.DiscountedPrice) }}</p>
                <div
                  class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-2 py-1 text-white duration-100 hover:bg-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-3 w-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <button @click="addToCart" class="text-xxs w-full">Add to cart</button>
                </div>
                <button @click="addToWishlist"
                  class="bg-green-500 text-white px-1 py-0.5 rounded-lg text-xxs duration-100 hover:bg-green-700">
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
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data || [];
        this.calculateAmountSavedForEachProduct();

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, calculateAmountSavedForEachProduct() {
      this.products.forEach((product) => {
        if (product && typeof product.Price === 'number' && typeof product.DiscountedPrice === 'number') {
          product.amountSaved = product.Price - product.DiscountedPrice;
        } else {
          console.error('Invalid Price or DiscountedPrice for a product:', product);
        }
      });
    }, formatNumber(value) {
      // Use toLocaleString to format the number with comma separators
      return value.toLocaleString();
    },

    addToCart(product) {
      // Emit an event to add the product to the cart
      this.$emit('addToCart', product);
    },
    addToWishlist(product) {
      // Emit an event to add the product to the wishlist
      this.$emit('addToWishlist', product);
    },
  },
  computed: {
    productsOnSale() {
      return this.products.filter((product) => product.Price > product.DiscountedPrice && product.DiscountedPrice > 0);
    },

  },
};
</script>

<style scoped>
.save-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #48bb78;
  /* Adjust the background color */
  color: #fff;
  /* Adjust the text color */
  padding: 0.5rem;
  /* Adjust the padding */
  border-radius: 50%;
  /* Make it circular */
}

/* Media query to apply the styles only for devices with a width of 640 pixels or larger */
@media (min-width: 640px) {
  .save-button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
  }
}
</style>