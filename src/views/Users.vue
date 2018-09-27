<template>
    <v-container>
        <v-layout row>
            <div class="display-1">Users</div>
            <v-spacer></v-spacer>
            <v-btn @click.stop="dialog = true" color="primary">New User</v-btn>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="$store.state.users.data"
            hide-actions
            class="elevation-1 mt-4 mb-2">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.role }}</td>
                <td class="text-xs-right">   
                    <v-btn flat icon @click.stop="editUser(props.item)">
                        <v-icon small>
                            edit
                        </v-icon>
                    </v-btn>
                    <v-btn flat icon @click.stop="confirmDeleteUser(props.item)">
                        <v-icon small>
                            delete
                        </v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

    

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-form ref="form" v-model="valid">
                <v-card>
                    <v-card-title class="title">New User</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="user.name" placeholder="Name" :rules="[rules.required]" :autofocus="autofocus"/>
                        <v-text-field v-model="user.email" placeholder="Email" :rules="[rules.required, rules.email]"/>
                        <v-select v-model="user.role" :items="rolesKeys" box label="Permissão" :rules="[rules.required]"></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click.stop="closeDialog()" flat>Cancelar</v-btn>
                        <v-btn @click.stop="submit()" flat color="primary">Confirmar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
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
                    <v-btn @click.stop="destroyUser(user)" flat color="error">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { clone } from 'lodash';
import { required, email } from 'vuelidate/lib/validators';

import UserTypes from '../types/user.types';

export default {
    data(){
        return {
            user: {},
            valid: false,
            dialog: false,
            confirmation: false,
            autofocus: false,
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
        this.$store.dispatch('users/query');
    },        
    methods: {
        async submit(){
            if(!this.valid) return false;
            this.user.id ? await this.updateUser() : await this.createUser();
            this.$refs.form.reset();
        },
        createUser(){            
            this.$store.dispatch('users/create', this.user);
            this.user = {}; // clear instance
            this.dialog = false; // close dialog
        },
        updateUser(){            
            this.$store.dispatch('users/update', this.user);
            this.user = {}; // clear instance
            this.dialog = false; // close dialog
        },
        destroyUser(){            
            this.$store.dispatch('users/destroy', this.user);
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
            this.$refs.form.reset();
        },
        closeDeleteUser(){
            this.user = {};
            this.confirmation = false;
            this.$refs.form.reset();
        }
    },
    watch: {
        dialog(){
            return this.dialog ? this.autofocus = true : this.autofocus = false;
        }
    },
    computed:{
        rolesKeys(){
            return Object.keys(this.roles);
        }
    }
}
</script>
