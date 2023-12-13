<template>
  <div>
    <div>{{ product.name }} - {{ product.price }} - Quantity: {{ product.quantity }}</div>
    <button @click="decrementQuantity">-</button>
    <button @click="incrementQuantity">+</button>
    <button @click="remove">Remove</button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({}),
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
    remove() {
      // Emit an event to notify the parent component to remove this product
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
/* ... your styles ... */
</style>
