<template>
  <v-app>
    <drawer-left :drawer="drawer"></drawer-left>    
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <UsersView/>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import DrawerLeft from './components/ui/drawers/DrawerLeft';

import UsersView from './components/views/User';

export default {
  name: 'App',
  components: {
    UsersView,
    DrawerLeft
  },
  data () {
    return {
      title: 'Vuetify.js',
      drawer: false
    }
  }
};
</script>
