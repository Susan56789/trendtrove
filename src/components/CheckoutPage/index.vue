<template>
    <div class="bg-yellow-50 pt-32">
        <div class="flex bg-white rounded-md shadow-2xl p-5">
            <!-- User Details Form -->
            <div class="w-1/2">
                <form @submit.prevent="submitOrder" class="mb-8">
                    <div class="form-group mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
                        <input type="text" id="name" v-model="userData.name" required
                            class="mt-1 p-2 w-full border rounded-md" />
                    </div>

                    <div class="form-group mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" v-model="userData.email" required
                            class="mt-1 p-2 w-full border rounded-md" />
                    </div>

                    <!-- Add more fields as needed (address, phone, location) -->
                    <div class="form-group mb-4">
                        <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
                        <input type="text" id="address" v-model="userData.address"
                            class="mt-1 p-2 w-full border rounded-md" />
                    </div>

                    <div class="form-group mb-4">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
                        <input type="text" id="phone" v-model="userData.phone" class="mt-1 p-2 w-full border rounded-md" />
                    </div>

                    <div class="form-group mb-4">
                        <label for="location" class="block text-sm font-medium text-gray-700">Location:</label>
                        <input type="text" id="location" v-model="userData.location"
                            class="mt-1 p-2 w-full border rounded-md" />
                    </div>


                </form>
            </div>
            <!-- Display order summary -->
            <div class="order-summary w-1/2 ml-4">
                <h2 class="text-2xl mb-4">Order Summary</h2>
                <ul>
                    <li v-for="(item, index) in localCartItems" :key="index" class="mb-2">
                        {{ item.ProductName }} ({{ item.quantity }}) - KES. {{ formatNumber(item.quantity *
                            (item.DiscountedPrice || item.Price)) }}
                    </li>
                    <li class="mb-2">Shipping Fee - KES. {{ formatNumber(shippingFee) }}</li>
                </ul>

                <hr class="my-2">

                <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold">Total</p>
                    <p class="text-lg">KES. {{ formatNumber(cartTotal + shippingFee) }}</p>
                </div>
                <button type="submit" class="btn-submit bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Submit Order
                </button>


                <!-- Display success message after order submission -->
                <div v-if="orderSubmitted" class="success-message mt-8">
                    <p>Your order has been submitted successfully!</p>
                    <button @click="clearCart" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
  
<script>
import axios from 'axios';
export default {
    name: "CheckoutPage",
    props: {
        cartItems: {
            type: Array,
            default: () => [],

        },
    },
    data() {
        return {
            localCartItems: [],
            userData: {
                name: '',
                email: '',
                address: '',
                phone: '',
                location: '',
            },
            orderSubmitted: false,
        };
    },
    created() {
        const cartItemsJson = this.$route.query.cartItems;
        this.localCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
        console.log("Received cartItems:", this.localCartItems);
    },
    computed: {

        shippingFee() {

            return 300;
        },

        cartTotal() {
            if (!this.localCartItems) {
                return 0; // or handle this case appropriately
            }

            return this.localCartItems.reduce((total, item) => {
                return total + (item.quantity * (item.DiscountedPrice || item.Price));
            }, 0);
        },
    },
    methods: {
        formatNumber(value) {
            return value.toLocaleString();
        },
        submitOrder() {
            // Validate user data before submitting the order
            if (this.validateUserData()) {
                // Assuming the server endpoint for order submission is 'http://localhost:3000/api/submitOrder'
                const orderData = {
                    user: this.userData,
                    cartItems: this.localCartItems.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                    })),
                    shippingFee: this.shippingFee,
                    total: this.cartTotal + this.shippingFee,
                };

                // Send the order data to the server for processing
                axios
                    .post("https://worldempiresafaris.co.ke/api/submitOrder", orderData)
                    .then((response) => {
                        console.log("Order submitted:", response.data);
                        // Set orderSubmitted to true to display success message
                        this.orderSubmitted = true;
                    })
                    .catch((error) => {
                        console.error("Order submission failed:", error);
                        // Handle errors, such as displaying an error message to the user
                    });
            } else {
                console.error("Invalid user data. Please fill in all required fields.");
            }
        },
        validateUserData() {
            // Implement validation logic for user data
            return this.userData.name && this.userData.email; // Add more conditions as needed
        },
        clearCart() {
            // Assuming the server endpoint for clearing the cart is 'http://localhost:3000/api/clearCart'
            axios.delete('https://worldempiresafaris.co.ke/api/clearCart')
                .then(response => {
                    console.log('Cart cleared:', response.data);
                    // Clear the local cartItems array
                    this.$router.push('/cart'); // Redirect to the cart page after clearing the cart
                })
                .catch(error => {
                    console.error('Cart clearing failed:', error);
                    // Handle errors, such as displaying an error message to the user
                });
        },
    },
};
</script>
  

<style scoped>
/* Add your styling using Tailwind CSS */
</style>