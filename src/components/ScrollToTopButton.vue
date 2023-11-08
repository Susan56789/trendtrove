<template>
    <div v-show="isVisible" @click="scrollToTop" class="fixed bottom-6 right-6 cursor-pointer">
        <i
            class="fas fa-arrow-up fixed bottom-6 right-6 bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded"></i>
    </div>
</template>
  
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
    name: "ScrollToTopButton",
    setup() {
        const isVisible = ref(false);

        const handleScroll = () => {
            isVisible.value = window.scrollY > 200;
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
        });

        onBeforeUnmount(() => {
            window.removeEventListener("scroll", handleScroll);
        });

        return {
            isVisible,
            scrollToTop,
        };
    },
};
</script>
  
<style scoped>
/* Add FontAwesome CSS */
@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
  