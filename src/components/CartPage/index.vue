<template>
  <div class="bg-yellow-50">
    <div class="pt-32">
      <h1 class="text-center text-2xl font-bold text-gray-800">Your Cart</h1>
    </div>
    <div class="container mx-auto my-8">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/3 pr-8">
          <CartItemsList :cart="cart" @remove="removeProduct" />
        </div>
        <div class="md:w-1/3">
          <CartSummary :cart="cart" :shipping-fee="shippingFee" :total-cost="totalCost" @checkout="checkout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItemsList from './CartItemsList.vue';
import CartSummary from './CartSummary.vue';

export default {
  name: 'CartPage',
  components: {
    CartItemsList,
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
      this.$set(this.cart, index, { ...this.cart[index] });
      this.cart.splice(index, 1);
    },addToCart(product) {
      // Ensure the cart is being updated here as well.
      // This method should be correctly implemented to update the 'cart' data property.
      this.cart.push({ ...product, quantity: 1 });
    },
    checkout() {
      // Implement your checkout logic here
    },
  },
};
</script>

<style></style>
