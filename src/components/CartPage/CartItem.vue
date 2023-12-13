<template>
  <div>
    <!-- ... your existing template code ... -->
    <button @click="decrementQuantity">-</button>
    <span>{{ product.quantity }}</span>
    <button @click="incrementQuantity">+</button>
    <!-- ... your existing template code ... -->
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    decrementQuantity() {
      if (this.product.quantity > 1) {
        // Decrease the quantity and emit the updated quantity
        this.$emit('updateQuantity', this.product.quantity - 1);
      }
    },
    incrementQuantity() {
      // Increase the quantity and emit the updated quantity
      this.$emit('updateQuantity', this.product.quantity + 1);
    },
    // ... your other methods ...
  },
};
</script>

<style scoped>
/* ... your existing styles ... */
</style>
