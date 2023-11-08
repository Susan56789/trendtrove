<template>
    <div class="container mx-auto p-8">
        <div class="pt-32 ">
            <h1 class="text-center text-2xl font-bold text-gray-800">My Wishlist</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in products" :key="product.id" class="bg-white p-4 shadow rounded-lg">
                <img :src="product.thumbnail" :alt="product.name" class="mb-4 rounded-lg">
                <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
                <p v-if="product.discountedPrice" class="text-gray-500 line-through">$ {{ product.price }}</p>
                <p v-if="product.discountedPrice" class="text-green-500 font-semibold">$ {{ product.discountedPrice
                }}</p>
                <p v-else class="text-green-500 font-semibold">$ {{ product.price }}</p>
                <button @click="addToCart(product)" class="flex items-center space-x-1.5 rounded-lg bg-indigo-500
                        px-4 py-1.5 text-white duration-100 hover:bg-indigo-600">
                    Add to Cart
                </button>
                <button @click="removeFromWishlist(product.id)"
                    class="bg-green-500 text-white px-2 py-1.5 rounded-lg duration-100 hover:bg-green-700">
                    Remove from Wishlist
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductWishlist",
    data() {
        return {
            products: [
                { id: 1, name: "Product 1", price: 20, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 2, name: "Product 2", price: 25, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 3, name: "Product 3", price: 30, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 4, name: "Product 4", price: 35, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 5, name: "Product 5", price: 40, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 6, name: "Product 6", price: 45, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 7, name: "Product 7", price: 50, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 8, name: "Product 8", price: 55, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 9, name: "Product 9", price: 60, thumbnail: "/products/rednikeshoe.jpg" },
                { id: 10, name: "Product 10", price: 65, thumbnail: "/products/rednikeshoe.jpg" }
            ],
            wishlist: [],
            cart: [],
        };
    },
    methods: {
        addToCart(product) {
            this.cart.push(product);
        },
        removeFromWishlist(productId) {
            this.wishlist = this.wishlist.filter(product => product.id !== productId);
        },
    },
};
</script>

<style>
/* Add your custom styles here */
</style>


