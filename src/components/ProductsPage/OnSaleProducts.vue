<template>
  <div class="bg-yellow-50 overflow-x-auto">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Today's Offer</h1>
    </div>
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <article class="rounded-xl bg-white p-3 bg-yellow-50">

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="product in productsOnSale" :key="product.id"
            class="p-2 border rounded shadow-lg hover:shadow-xl hover:transform hover:scale-105 mb-4">
            <div class="image-container relative flex items-end overflow-hidden rounded-xl">
              <button v-if="product.amountSaved > 0"
                class="save-button sm:absolute sm:top-0 sm:right-0 bg-green-500 text-white p-2 duration-100 hover:bg-green-700 rounded-full">
                SAVE<br />{{ formatNumber(product.amountSaved) }}
              </button>
              <router-link :to="'/product/' + product.ProductName">
                <img :src="product.ImagePath" :alt="product.ProductName"
                  class="mx-auto w-full h-full object-cover mb-2" />
              </router-link>
              <div class="absolute bottom-2 left-2 inline-flex items-center rounded-lg bg-white p-1 shadow-md">
                <i class="fas fa-star text-yellow-400"></i>
                <span class="ml-1 text-sm text-gray-700">{{ product.Rating }}</span>
              </div>
            </div>
            <h2 class="text-slate-700 text-xs">{{ product.ProductName }}</h2>

            <div class="mt-2 flex items-end justify-between">
              <router-link :to="'/product/' + product.ProductName">
                <p class="text-green-500 font-semibold text-xxs">KES. {{ formatNumber(product.DiscountedPrice) }}</p>
              </router-link>
              <div
                class="flex items-center space-x-1.5 rounded-lg bg-indigo-500 px-2 py-1 text-white duration-100 hover:bg-indigo-600">

                <button @click="addToCartButton(product)" class="text-sm"> <i class="fas fa-cart-plus"></i></button>

              </div>
              <button @click="addToWishlistButton(product)"
                class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                <i class="fas fa-heart"></i>
              </button>

            </div>

          </div>
        </div>

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

    addToWishlistButton(product) {
      this.addToWishlist(product);
    },
    addToCartButton(product) {
      this.addToCart(product);
    },
    addToWishlist(product) {
      // Check if product is defined and has the required properties
      if (product && product.ProductName && product.Price /* Add other required properties */) {
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
      if (product && product.ProductName && product.Price /* Add other required properties */) {
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