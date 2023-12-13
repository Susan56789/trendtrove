<template>
  <div>
    <!-- Cart item details here -->
    <button @click="removeFromCart">Remove</button>
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
    removeFromCart() {
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
/* ... your existing styles ... */
</style>
