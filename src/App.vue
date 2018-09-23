<template>
  <v-app>
    <blog-drawer-left></blog-drawer-left>    
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="togggleDrawer()"></v-toolbar-side-icon>     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <blog-users-view/>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import UI from './components/ui';
import Views from './components/views';

export default {
  name: 'App',
  components: {
    ...Views,
    ...UI
  },
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  methods:{
    togggleDrawer(){
      this.$root.$emit('toggle:drawer:left', true);
    }
  }
};
</script>
