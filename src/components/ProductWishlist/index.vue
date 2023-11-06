<template>
    <div class="container mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4">Wishlist</h1>
        <div v-if="wishlist.length === 0" class="text-gray-600">Your wishlist is empty.</div>


        <div v-else>
            <div v-for="item in wishlist" :key="item.id" class="flex items-center justify-between py-2 border-b">
                <div class="flex items-center">
                    <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover mr-4">
                    <span class="text-lg">{{ item.name }}</span>
                </div>
                <div class="flex items-center">
                    <span class="text-lg font-bold">${{ item.price }}</span>
                    <button @click="addToCart(item)"
                        class="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                        Add to Cart
                    </button>
                    <button @click="removeFromWishlist(item.id)" class="ml-4 text-red-500 hover:text-red-700">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { wishlistData } from "./wishlistData.js";
export default {
    name: 'ProductWishlist',
    data() {
        return {
            wishlist: wishlistData,
        };

    },
    methods: {
        addToCart(item) {
            // Implement the logic to add item to cart here
            console.log(`Added ${item.name} to cart!`);
        },
        removeFromWishlist(itemId) {
            this.wishlist = this.wishlist.filter(item => item.id !== itemId);
        },
    },
};



</script>