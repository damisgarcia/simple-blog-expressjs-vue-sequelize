<template>
    <v-container>
        <v-layout row wrap>
            <div class="display-1">Posts</div>            
            <v-spacer></v-spacer>
            <v-btn @click.stop="dialog = true" color="primary" to="posts/new">New Post</v-btn>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="$store.state.posts.data"
            hide-actions
            class="elevation-1 mt-4 mb-2">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.body }}</td>
                <td>{{ props.item.status }}</td>
                <td class="text-xs-right">                
                    <v-btn flat icon :to="{ name: 'editPost', params: { id: props.index } }">
                        <v-icon small>edit</v-icon>
                    </v-btn>
                    <v-btn flat icon :to="{ name: 'editPost', params: { id: props.index } }">
                        <v-icon small>delete</v-icon>
                    </v-btn>                    
                </td>
            </template>
        </v-data-table>
        

        <!-- <v-dialog v-model="confirmation" persistent max-width="500px">
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
        </v-dialog> -->
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            headers: [
                { text: 'Title', value: 'title'},
                { text: 'Body', value: 'body' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'right', }
            ]
        }
    }
}
</script>