<template>
  <div>
    <div v-if="isCartEmpty" class="text-center text-gray-500">
      Your cart is empty.
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
    cart: [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 1,
      image: 'https://picsum.photos/200',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      quantity: 2,
    },
    ],
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
