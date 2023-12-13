<template>
  <div>
    <article class="rounded-xl bg-yellow-50 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div class="mt-1 p-2">
        <div class="image-container relative flex items-end overflow-hidden rounded-xl">
          <img :src="product.image" :alt="product.name" class="mx-auto h-200 w-200 object-cover mb-4" />
          <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <!-- Rating star SVG here -->
            </svg>
            <span class="ml-1 text-sm text-gray-700">{{ product.rating }}</span>
          </div>
        </div>
        <h2 class="text-slate-700">{{ product.name }}</h2>
        <p class="mt-1 text-sm text-slate-400">{{ product.description }}</p>
        <div class="mt-3 flex items-end justify-between">
          <!-- Price and Add to Cart button here -->
        </div>
      </div>
    </article>
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
    addToCart() {
      this.$emit('addToCart', this.product);
    },
  },
};
</script>

<style scoped>
.image-container img {
  max-width: 100%;
  max-height: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>
