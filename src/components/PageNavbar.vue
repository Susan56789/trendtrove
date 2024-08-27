<template>
  <nav class="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between py-4">
        <div class="flex items-center">
          <a href="/" aria-label="logo" class="flex items-center space-x-2">
            <img :src="imageUrl" class="w-12 h-12" alt="tailus logo" width="48" height="48">
            <span class="text-2xl font-bold text-yellow-900">Trend <span class="text-yellow-700">Trove</span></span>
          </a>
        </div>

        <div class="hidden lg:flex items-center space-x-6">
          <a v-for="item in navItems" :key="item.href" :href="item.href"
            class="text-sm font-medium text-gray-600 hover:text-yellow-700 transition duration-150 ease-in-out">
            {{ item.name }}
          </a>
          <div class="flex items-center space-x-2 border-l border-yellow-200 pl-6">
            <a href="/signup"
              class="px-4 py-2 text-sm font-semibold text-yellow-800 rounded-full hover:bg-yellow-100 transition duration-150 ease-in-out">
              Sign up
            </a>
            <a href="/login"
              class="px-4 py-2 text-sm font-semibold text-yellow-900 bg-yellow-300 rounded-full hover:bg-yellow-400 transition duration-150 ease-in-out">
              Login
            </a>
          </div>
        </div>

        <button @click="toggleMobileMenu" class="lg:hidden" aria-label="Toggle menu">
          <svg class="w-6 h-6 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a v-for="item in navItems" :key="item.href" :href="item.href"
          class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-md transition duration-150 ease-in-out">
          {{ item.name }}
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-yellow-200">
        <div class="flex items-center px-5">
          <a href="/signup"
            class="block px-3 py-2 text-base font-medium text-yellow-800 hover:bg-yellow-100 rounded-md transition duration-150 ease-in-out">
            Sign up
          </a>
          <a href="/login"
            class="ml-4 block px-3 py-2 text-base font-medium text-yellow-900 bg-yellow-300 hover:bg-yellow-400 rounded-md transition duration-150 ease-in-out">
            Login
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '../assets/logo2.png'

export default {
  name: "PageNavbar",
  data() {
    return {
      imageUrl: Logo,
      isMobileMenuOpen: false,
      navItems: [
        { name: 'Shop', href: '/shop' },
        { name: "Today's Deals", href: '/sale' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Cart', href: '/cart' },
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  }
}
</script>