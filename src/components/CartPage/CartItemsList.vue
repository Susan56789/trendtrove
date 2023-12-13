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
      // Use a local cartData data property to manage the state internally
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
      // Update the local cartData property
      this.cartData = cart;
      console.log('Parent cart updated:', this.cartData);

      // Emit an event to notify the parent component about the change in the cart
      this.$emit('updateCart', this.cartData);
    },
    removeProduct(index) {
      this.$emit('remove', index);
    },
    updateQuantity(index, newQuantity) {
      // Create a copy of the cart array
      const updatedCart = [...this.cartData];

      // Update the quantity of the product in the copied cart
      updatedCart[index].quantity = newQuantity;

      // Update the local cartData property
      this.cartData = updatedCart;

      // Emit an event to notify the parent component about the change in the cart
      this.$emit('updateCart', this.cartData);
    },
  },
  components: {
    CartItem,
  },
};
</script>
