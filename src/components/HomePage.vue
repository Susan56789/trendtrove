<template>
    <PageBase />

    <div class="bg-gray-900 text-white py-16">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold mb-4">Welcome to Our Shop</h1>
            <p class="text-lg mb-8">Discover amazing products at great prices.</p>
            <a href="/products" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Explore Products
            </a>
        </div>
    </div>

    <PageFooter />
</template>
  
<script>
import PageBase from '@/components/PageBase/index.vue';
import PageFooter from './PageFooter.vue';
export default {
    name: "HomePage",
    components: {
        PageBase,
        PageFooter
    },

};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>
  