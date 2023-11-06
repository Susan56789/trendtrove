<template>
    <div>
        <PageNavbar />
        <router-view /> <!-- This is where your page components will be rendered -->
        <PageFooter />
    </div>
</template>
  
<script>

import PageFooter from './PageFooter.vue';
import PageNavbar from './PageNavbar.vue';

export default {
    components: {
        PageNavbar,
        PageFooter
    },
    // Layout component logic goes here
}
</script>
  
<style scoped>
/* Layout component styles go here */
</style>