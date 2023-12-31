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
                <!-- <p class="text-gray-500">{{ item.Prod_Description }}</p> -->
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

      axios.get('http://localhost:3000/api/getCartItems')
        .then(response => {

          this.cartItems = response.data.map(item => ({
            ...item,
            quantity: 1,
          }));

        })
        .catch(error => {
          console.error(error);
        });
    },
    isValidNumber(value) {
      return typeof value === 'number' && !isNaN(value) && isFinite(value);
    },
    increaseQuantity(index) {
      if (this.isValidNumber(this.cartItems[index].quantity)) {
        this.cartItems[index].quantity++;
      } else {
        console.error('Invalid quantity:', this.cartItems[index].quantity);
      }
    },
    decreaseQuantity(index) {
      if (this.isValidNumber(this.cartItems[index].quantity) && this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        console.error('Invalid quantity or quantity is already 1:', this.cartItems[index].quantity);
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
      // Implement your checkout logic here
      // This could involve sending the cartItems to the server for further processing
      console.log('Checkout logic goes here');
    },
  },
  created() {
    this.fetchCartItems();
  },
};
</script>
