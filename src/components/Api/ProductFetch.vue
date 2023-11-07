<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ProductFetch',
    data() {
        return {
            items: []
        };
    },
    mounted() {
        axios.get('/api/data')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>
  