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
                <td>{{ props.item.role }}</td>
                <td class="text-xs-right">                
                    <v-icon
                        small
                        class="mr-2"
                        @click.stop="editUser(props.item)">
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click.stop="confirmDeleteUser(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>

        <v-btn @click.stop="dialog = true" color="primary">New User</v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="title">New User</v-card-title>
                <v-card-text>
                    <v-text-field v-model="user.name" placeholder="Name" :rules="[rules.required]"/>
                    <v-text-field v-model="user.email" placeholder="Email" :rules="[rules.required, rules.email]"/>
                    <v-select v-model="user.role" :items="rolesKeys" box label="Permissão" :rules="[rules.required]"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.stop="closeDialog()" flat>Cancelar</v-btn>
                    <v-btn @click.stop="submit()" flat color="primary">Confirmar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmation" persistent max-width="500px">
            <v-card>
                <v-card-title class="title">Destroy User</v-card-title>
                <v-card-text>
                    <div class="subtitle">You really destroy this user?</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click.stop="closeDeleteUser()" flat>Cancelar</v-btn>
                    <v-btn @click.stop="confirmDestroy(user)" flat color="danger">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import Vue from 'vue';
import { required, email } from 'vuelidate/lib/validators';

import { findIndex, clone } from 'lodash';

import UserResource from '../../services/UserResource';

import UserTypes from '../../types/user.types';

export default {
    data(){
        return {
            dialog: false,
            confirmation: false,
            user: {},
            users: [],
            roles: UserTypes.roles,
            headers: [
                { text: 'Name', value: 'name'},
                { text: 'Email', value: 'email' },
                { text: 'Role', value: 'role' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'right', }
            ],
            rules: {
                required: value => required(value) || 'Required.',
                email: value => email(value) || 'Email invalid.'
            },
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
            this.user.id ? this.updateUser() : await await this.createUser();
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

            let indexOf = findIndex(this.users, { id: this.user.id });

            Vue.set(this.users, indexOf, data);

            this.user = {}; // clear instance
            this.dialog = false; // close dialog
        },
        async confirmDestroy(){
            let payload = await this.resource.delete({id: this.user.id});
            
            await payload.json();

            let indexOf = findIndex(this.users, { id: this.user.id });
            this.users.splice(indexOf, 1);

            this.closeDeleteUser();
        },
        editUser(user){
            this.user = clone(user);
            this.dialog = true;
        },
        confirmDeleteUser(user){
            this.confirmation = true;
            this.user = clone(user);
        },
        closeDialog(){
            this.user = {};
            this.dialog = false;
        },
        closeDeleteUser(){
            this.user = {};
            this.confirmation = false;
        }
    },
    computed:{
        rolesKeys(){
            return Object.keys(this.roles);
        }
    }
}
</script>
