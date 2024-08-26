<template>
    <div class="flex justify-center space-x-4 mt-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>
export default {
    name: 'ShopPagination',
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
        };
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.$emit('changePage', page);
            }
        },
    },
};
</script>