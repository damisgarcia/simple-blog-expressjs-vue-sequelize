<template>
    <v-container>
        <div class="display-1">Users</div>
        <v-data-table
            :headers="headers"
            :items="users"
            hide-actions
            class="elevation-1 mt-4 mb-2">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td class="text-xs-right">                
                    <v-icon
                        small
                        class="mr-2"
                        @click.stop="editUser(props.item)">
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click.stop="destroyUser(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>

        <v-btn @click.stop="dialog = true" color="primary">New User</v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="display-1">New User</v-card-title>
                <v-card-text>
                    <v-text-field v-model="user.name" placeholder="Name" />
                    <v-text-field v-model="user.email" placeholder="Email" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.stop="closeDialog()" flat>Cancelar</v-btn>
                    <v-btn @click.stop="submit()" flat color="primary">Criar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { findIndex } from 'lodash';
import UserResource from '../../services/UserResource';

export default {
    data(){
        return {
            dialog: false,
            user: {},
            users: Array,
            headers: [
                { text: 'Name', value: 'name'},
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'name', sortable: false, align: 'right', }
            ]
        };
    },
    beforeCreate(){
        this.resource = UserResource(this);
    },
    async created(){
        // get: /users
        let payload = await this.resource.query();
        this.users = await payload.json();
    },
    methods: {
        async submit(){
            this.user.id ? await this.createUser() : await this.updateUser()
        },
        async createUser(){
            let payload = await this.resource.create({ user: this.user });
            let data = await payload.json();

            this.users.push(data);
            this.user = {}; // clear instance
            this.dialog = false; // close dialog
        },
        async updateUser(){
            let payload = await this.resource.update({ id: this.user.id },{ user: this.user });
            let data = await payload.json();

            this.user = {}; // clear instance
            this.dialog = false; // close dialog
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
        editUser(user){
            this.user = user;
            this.dialog = true;
        },
        closeDialog(){
            this.user = {};
            this.dialog = false;
        }
    }
}
</script>
