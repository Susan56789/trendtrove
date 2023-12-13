<template>
  <div>
    <!-- Cart summary details here -->
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
    shippingFee: {
      type: Number,
      default: 5,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    checkout() {
      this.$emit('checkout');
    },
  },
};
</script>

<style></style>
