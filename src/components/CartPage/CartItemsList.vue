<template>
  <div>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <CartItem
        v-for="(product, index) in cart"
        :key="index"
        :product="product"
        @remove="removeProduct(index)"
        @updateQuantity="updateQuantity(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    removeProduct(index) {
      this.$emit('remove', index);
    },
    updateQuantity(index, newQuantity) {
  // Create a copy of the cart array
  const updatedCart = [...this.cart];

  // Update the quantity of the product in the copied cart
  updatedCart[index].quantity = newQuantity;

  // Emit an event to notify the parent component about the change in the cart
  this.$emit('updateCart', updatedCart);
},

  },
  components: {
    CartItem,
  },
};
</script>

<style scoped>
/* ... your existing styles ... */
</style>
