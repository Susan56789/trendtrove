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
              <button @click="handleCartAction(product)" :class="cartButtonClass">
                <i :class="cartButtonIcon"></i> {{ cartButtonText }}
              </button>

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
      cart: this.getCartFromStorage() || [],
      wishlist: [],
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
    removeFromCartButton() {
      this.removeFromCart(this.product);
    },
    handleCartAction(product) {
      if (this.isProductInCart(product)) {
        this.removeFromCart(product);
      } else {
        this.addToCart(product);
      }
    },
    addToWishlist(product) {
      // Check if product is defined and has the required properties
      if (product && product.ProductName && product.Price && product.ProductID) {
        // Check if the product is already in the local wishlist
        if (this.isProductInWishlist(product)) {
          // Display an alert or handle the case where the product is already in the wishlist
          alert('Product already in wishlist');
        } else {
          // If not in the local wishlist, add to local wishlist
          this.wishlist.push(product); // Update the local wishlist
          // Perform a request to add the product to the server-side wishlist
          axios.post('http://localhost:3000/addToWishlist', product)
            .then(response => {
              console.log(response.data);
              // Display success alert or perform any additional actions
              alert('Successfully added to wishlist');
            })
            .catch(error => {
              console.error(error);
            });
        }
      } else {
        console.error('Invalid product data for wishlist:', product);
      }
    },

    isProductInWishlist(product) {
      // Check if the product is already in the local wishlist
      return this.wishlist.some(item => item.ProductID === product.ProductID);
    },

    addToCart(product) {
      // Check if the product is valid
      if (!product || !product.ProductName || !product.Price) {
        console.error('Invalid product data for cart:', product);
        return;
      }

      // Check if the product is already in the cart
      if (this.isProductInCart(product)) {
        // Display an alert for a product already in the cart
        alert('Product already in cart');
        return;
      }

      // If not in the cart, add it
      this.cart.push(product); // Update the cart locally
      this.saveCartToStorage(); // Save the cart to localStorage

      // Perform a request to add the product to the server-side cart
      axios.post('http://localhost:3000/addToCart', product)
        .then(response => {
          console.log(response.data);
          // Display success alert or perform additional actions if needed
          alert('Successfully added to cart');
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
          // Handle the error, show an error message, or perform additional actions if needed
        });
    },

    removeFromCart(product) {
      // Remove the product from the local cart
      this.cart = this.cart.filter(item => item.ProductID !== product.ProductID);
      this.saveCartToStorage(); // Save the updated cart to localStorage
      // Additional logic to remove from the server-side cart can be added here if needed
    },

    saveCartToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    getCartFromStorage() {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    },

    isProductInCart(product) {
      // Check if the product is not undefined and has the required properties
      if (product && product.ProductID) {
        // Check if the cart is not undefined
        if (this.cart) {
          // Check if the product is already in the local cart
          return this.cart.some(item => item.ProductID === product.ProductID);
        } else {
          console.error('Cart is undefined');
          return false; // Handle the case where the cart is undefined
        }
      } else {
        console.error('Invalid product data for cart:', product);
        return false; // Handle the case where the product is undefined or missing required properties
      }
    },
    emptyCart() {
      // Clear both the local storage and the local cart
      localStorage.removeItem('cart');
      this.cart = [];
    },



  },
  computed: {
    productsOnSale() {
      return this.products.filter((product) => product.Price > product.DiscountedPrice && product.DiscountedPrice > 0);
    },
    cartButtonClass() {
      return [
        'flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white duration-100 hover:bg-indigo-600',
        { 'bg-indigo-500': !this.isProductInCart(this.product), 'bg-red-500': this.isProductInCart(this.product) },
      ];
    },

    cartButtonIcon() {
      return this.isProductInCart(this.product) ? 'fas fa-cart-arrow-down' : 'fas fa-cart-plus';
    },

    cartButtonText() {
      return this.isProductInCart(this.product) ? '' : '';
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