<template>
  <div id="app">
    <router-view></router-view>
    <ScrollToTopButton />
  </div>
</template>

<script>
import ScrollToTopButton from './components/ScrollToTopButton.vue';

export default {
  name: 'App',
  components: {
    ScrollToTopButton
  }
};
</script>

<style>
/* Add your styles here */
</style>
