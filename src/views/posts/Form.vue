<template>
    <v-container>
        <div class="display-1">{{title}}</div>
        <v-form ref="form" v-model="valid">
            <v-text-field v-model="post.title" placeholder="Title" :rules="[rules.required]"/>
            <v-select v-model="post.status" :items="statusesKeys" box label="Status" :rules="[rules.required]"></v-select>
            <wysiwyg v-model="post.body" />
            <v-layout>
                <v-spacer></v-spacer>
                <v-btn to="/posts" flat>Cancelar</v-btn>
                <v-btn @click.stop="submit()" flat color="primary">Confirmar</v-btn>                
            </v-layout>
            </v-form>
    </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { isUndefined, clone } from 'lodash';

import PostTypes from '@/types/post.types';

export default {
    props: ['id','title'],
    data(){
        return {
            valid: false,
            post: {},
            rules: {
                required: value => required(value) || "Required"
            },
            statuses: PostTypes.statuses
        }
    },
    created(){
        if(!isUndefined(this.$route.params.id)){
            let data = this.$store.state.posts.data[this.$route.params.id];
            this.post = clone(data);
        }
    },
    methods: {
        submit(){
            if(!this.valid && !this.post.body){
                return false;
            }
            if(!isUndefined(this.$route.params.id)){
                this.$store.dispatch('posts/update', { index: this.$route.params.id, data: this.post });
                this.$router.go(-1);
            } else{
                this.$store.dispatch('posts/create', this.post);
                this.$router.go(-1);
            }
        }
    },
    computed: {
        statusesKeys(){
            return Object.keys(this.statuses);
        }
    }
}
</script>
