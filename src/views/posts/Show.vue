<template>
    <v-container>
        <v-layout column>
            <div class="display-2">{{ post.title }}</div>
            <div class="caption">{{ post.createdAt | moment("LL") }}</div>
            <div v-html="post.body"></div>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            post: {}
        }
    },
    async beforeCreate(){
        let { data } = await axios.get(`/api/posts/${this.$route.params.id}`);
        this.post = data;
    }
}
</script>
