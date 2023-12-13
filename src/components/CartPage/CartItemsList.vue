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
