<template>
  <div>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
     <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="transparent" stroke="black" stroke-width="2"/>
</svg>

    </div>
    <div v-else>
      <ul>
        <CartItem
          v-for="(product, index) in cartData"
          :key="index"
          :product="product"
          @remove="removeProduct(index)"
          @updateQuantity="updateQuantity(index, $event)"
        />
      </ul>
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
  data() {
    return {
      cartData: this.cart,
    };
  },
  computed: {
    isCartEmpty() {
      return this.cartData.length === 0;
    },
  },
  methods: {
    updateCart(cart) {
      this.cartData = cart;
      this.$emit('updateCart', this.cartData);
    },
    removeProduct(index) {
      this.$emit('remove', index);
    },
    updateQuantity(index, newQuantity) {
      const updatedCart = [...this.cartData];
      updatedCart[index].quantity = newQuantity;
      this.cartData = updatedCart;
      this.$emit('updateCart', this.cartData);
    },
  },
  components: {
    CartItem,
  },
};
</script>
