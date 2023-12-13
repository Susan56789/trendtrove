<template>
    <div>
      <!-- Your CartItem template here -->
      <button @click="remove">Remove</button>
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
      remove() {
        this.$emit('remove');
      },
    },
  };
  </script>
  
  <style scoped></style>
  