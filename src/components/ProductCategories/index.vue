<template>
    <div>
        <h1 class="text-3xl font-semibold mb-4">{{ category.name }} Products</h1>
        <div v-for="(product, index) in products" :key="index" class="border p-4 mb-4">
            <h2 class="text-lg font-semibold mb-2">{{ product.name }}</h2>
            <p>{{ product.description }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ProductCategories',
    props: {
        category: Object, // The selected category object passed as a prop
        products: Array    // Array of products in the selected category passed as a prop
    }
};
</script>
  
<style scoped>
/* Add Tailwind CSS classes or your custom styles here */
</style>
  