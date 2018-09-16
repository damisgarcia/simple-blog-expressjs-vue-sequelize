<template>
    <div>
        <img :src="user.avatarUrl" />
        <h1>{{ renderUserName(user) }}</h1>
        <h2>Users</h2>
        <hr/>
        <ul>
            <li v-for="(u, index) in users" v-bind:key="index">{{ renderUserName(u) }}</li>
        </ul>
    </div>
</template>

<script>
import UserResource from '../services/UserResource';
export default {
    name: 'User',
    data(){
        return {
            user: Object,
            users: Array
        };
    },
    beforeCreate(){
        this.resource = UserResource(this);
    },
    async created(){
        // get: /users
        let query = await this.resource.query();
        this.users = await query.json();
        // get: /users/:id
        let get = await this.resource.get({ id: 1 });
        this.user = await get.json();
    },
    methods: {
        renderUserName(user){
            return `${user.firstName} ${user.lastName}`;
        }
    }
}
</script>

