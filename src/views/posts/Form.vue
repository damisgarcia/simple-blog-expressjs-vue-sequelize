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
import S from 'string';
import { required } from 'vuelidate/lib/validators';
import { isUndefined } from 'lodash';

import axios from 'axios';

import PostTypes from '@/types/post.types';

export default {
    props: ['id','title'],
    data(){
        return {
            valid: false,
            post: {
                body: ''
            },
            rules: {
                required: value => required(value) || "Required"
            },
            statuses: PostTypes.statuses
        }
    },
    async beforeCreate(){
        if(!isUndefined(this.$route.params.id)){
            let { data } = await axios.get(`/api/posts/${this.$route.params.id}`);
            this.post = data;
        }
    },
    methods: {
        submit(){
            let body = S(this.post.body).stripTags().s;

            if(!this.valid || !body.length){
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
