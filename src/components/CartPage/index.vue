<template>
  <div class=" bg-yellow-50 pt-32 ">
    <div class="flex bg-white rounded-md shadow-2xl p-5">
      <!-- Cart Items -->
      <div class="w-3/4">
        <h1 class="text-2xl mb-4">Your Cart</h1>
        <ul v-if="cartItems.length > 0" class="space-y-4">
          <li v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="item.ImagePath" :alt="item.ProductName" class="h-16 w-16 object-cover mr-4" />
              <div>
                <p class="text-lg">{{ item.ProductName }}</p>

                <div class="flex items-center mt-2">
                  <button @click="decreaseQuantity(index)" class="text-gray-500 px-2">-</button>
                  <span class="mx-2">{{ isValidNumber(item.quantity) ? item.quantity : 0 }}</span>
                  <button @click="increaseQuantity(index)" class="text-gray-500 px-2">+</button>
                  <button @click="removeItem(index)" class="text-red-500 px-2 ml-2">Remove</button>
                </div>
              </div>
            </div>
            <p class="text-lg">KES. {{ formatNumber(item.quantity * (item.DiscountedPrice || item.Price)) }}</p>
          </li>
        </ul>
        <p v-else class="text-gray-500">No items in the cart.</p>
      </div>

      <!-- Total/Checkout -->
      <div v-if="cartItems.length > 0" class="w-1/4 ml-4">
        <div class="bg-gray-100 p-4 rounded h-full flex flex-col justify-between">
          <h2 class="text-xl mb-2">Total</h2>
          <ul class="space-y-2">
            <li v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between">
              <span>{{ item.ProductName }} ({{ item.quantity }})</span>
              <span>KES. {{ formatNumber(item.quantity * (item.DiscountedPrice || item.Price)) }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Shipping Fee</span>
              <span>KES. {{ formatNumber(shippingFee) }}</span>
            </li>
          </ul>
          <hr class="my-2">
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold">Total</p>
            <p class="text-lg">KES. {{ formatNumber(cartTotal + shippingFee) }}</p>
          </div>
          <button @click="checkout" class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Checkout
          </button>
          <button @click="clearCart" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: [],
      shippingFee: 300,
    }
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.quantity * (item.DiscountedPrice || item.Price));
      }, 0);
    }
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString();
    },
    fetchCartItems() {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/getCartItems')
          .then(response => {
            this.cartItems = response.data.map(item => ({
              ...item,
              quantity: 1,
            }));

          })
          .catch(error => {
            console.error(error);
            reject(error); // Reject the promise in case of an error
          });
      });
    },

    isValidNumber(value) {
      return typeof value === 'number' && !isNaN(value) && isFinite(value);
    },
    async updateQuantityInDatabase(productId, newQuantity) {
      try {
        const response = await axios.put(`http://localhost:3000/products/${productId}`, {
          quantity: newQuantity,
        });

        console.log('Quantity updated in the database:', response.data);
      } catch (error) {
        console.error('Failed to update quantity in the database:', error);
        // Handle errors appropriately
      }
    },
    increaseQuantity(index) {
      if (this.isValidNumber(this.cartItems[index].quantity)) {
        const productId = this.cartItems[index].id;

        // Update the quantity locally
        this.cartItems[index].quantity++;

        // Send a request to update the quantity in the database
        this.updateQuantityInDatabase(productId, this.cartItems[index].quantity);
      } else {
        console.error('Invalid quantity:', this.cartItems[index].quantity);
      }
    },

    decreaseQuantity(index) {
      if (this.isValidNumber(this.cartItems[index].quantity) && this.cartItems[index].quantity > 1) {
        const productId = this.cartItems[index].id; // Assuming each product has a unique identifier

        // Update the quantity locally
        this.cartItems[index].quantity--;

        // Send a request to update the quantity in the database
        this.updateQuantityInDatabase(productId, this.cartItems[index].quantity);
      } else {
        console.error('Invalid quantity or minimum quantity reached:', this.cartItems[index].quantity);
      }
    },

    removeItem(index) {
      const itemId = this.cartItems[index].id;

      // Send a request to remove the item from the cart in the database
      axios.delete(`http://localhost:3000/api/removeCartItem/${itemId}`)
        .then(response => {
          console.log(response.data);

          // Remove the item from the local cartItems array
          this.cartItems.splice(index, 1);
        })
        .catch(error => {
          console.error(error);
        });
    },
    clearCart() {
      // Send a request to clear the entire cart in the database
      axios.delete('http://localhost:3000/api/clearCart')
        .then(response => {
          console.log(response.data);

          // Clear the local cartItems array
          this.cartItems = [];
        })
        .catch(error => {
          console.error(error);
        });
    },
    checkout() {
      // Ensure there are items in the cart before proceeding
      if (this.cartItems.length === 0) {
        console.error('Cannot proceed with checkout. Cart is empty.');
        return;
      }

      // Extract the actual array from the Proxy object
      const cartItemsArray = Array.from(this.cartItems);

      // Navigate to the checkout page with the cart items
      this.$router.push({ name: 'Checkout', query: { cartItems: JSON.stringify(cartItemsArray) } });
    },


  },
  created() {
    this.fetchCartItems()

  },
}
</script>
