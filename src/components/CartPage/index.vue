<template>
    <div class="bg-yellow-50">
      <div class="pt-32">
        <h1 class="text-center text-2xl font-bold text-gray-800">Your Cart</h1>
      </div>
      <div class="container mx-auto my-8">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-2/3 pr-8">
            <div v-if="isCartEmpty" class="text-center text-gray-500">
              Your cart is empty.
            </div>
            <div v-else>
              <CartItem v-for="(product, index) in cart" :key="index" :product="product" @remove="removeProduct" />
            </div>
          </div>
          <div class="md:w-1/3">
            <CartSummary :cart="cart" :shipping-fee="shippingFee" :total-cost="totalCost" @checkout="checkout" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CartItem from './CartItem.vue';
  import CartSummary from './CartSummary.vue';
  
  export default {
    name: 'CartPage',
    components: {
      CartItem,
      CartSummary,
    },
    data() {
      return {
        cart: [],
        shippingFee: 5,
      };
    },
    computed: {
      isCartEmpty() {
        return this.cart.length === 0;
      },
      totalCost() {
        return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
      },
    },
    methods: {
      removeProduct(index) {
        this.cart.splice(index, 1);
      },
      checkout() {
        // Implement your checkout logic here
      },
    },
  };
  </script>
  
  <style></style>
  