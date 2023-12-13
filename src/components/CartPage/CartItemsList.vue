<template>
  <div>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <CartItem v-for="(product, index) in cart" :key="index" :product="product" @remove="removeProduct(index)" />
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
  },
  components: {
    CartItem,
  },
};
</script>

<style></style>
