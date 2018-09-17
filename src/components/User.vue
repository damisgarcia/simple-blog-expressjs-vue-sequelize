<template>
    <div>
        <h2>Users</h2>
        <hr/>
        <ul>
            <li v-for="(u, index) in users" v-bind:key="index">
                {{ renderUserName(u) }}
                <button @click="destroyUser(u)">Deletar</button>
            </li>
        </ul>
        <form @submit.prevent="createUser()">
            <input v-model="user.name" placeholder="Name" />
            <input v-model="user.email" placeholder="Email" />
            <button type="submit">Novo Usuário</button>
        </form>
    </div>
</template>

<script>
import { findIndex } from 'lodash';
import UserResource from '../services/UserResource';

export default {
    name: 'User',
    data(){
        return {
            user: {},
            users: Array
        };
    },
    beforeCreate(){
        this.resource = UserResource(this);
        // this.user = new this.resource;
    },
    mounted(){
        console.log(this.resource);
    },
    async created(){
        // get: /users
        let payload = await this.resource.query();
        this.users = await payload.json();
    },
    methods: {
        async createUser(){
            let payload = await this.resource.create({ user: this.user });
            let data = await payload.json();

            this.users.push(data);
            this.user = {}; // clear instance
        },
        async destroyUser(user){
            if(!confirm('You really?')){
                return false;
            }

            let payload = await this.resource.delete({id: user.id});
            
            await payload.json();

            let indexOf = findIndex(this.users, { id: user.id });
            this.users.splice(indexOf, 1);
        },
        renderUserName(user){
            return `${user.name} ${user.email}`;
        }
    }
}
</script>

