<template>
  <v-app>
    <drawer-left :drawer="drawer"></drawer-left>    
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <HelloWorld/>
    </v-content>
    <drawer-right :drawer="rightDrawer"></drawer-right>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import HelloWorld from './components/HelloWorld';
import DrawerLeft from './components/ui/drawers/DrawerLeft';
import DrawerRight from './components/ui/drawers/DrawerRight';

export default {
  name: 'App',
  components: {
    HelloWorld,
    DrawerLeft,
    DrawerRight
  },
  data () {
    return {
      drawer: false,
      rightDrawer: false,
      clipped: false,
      fixed: false,    
      miniVariant: false,      
      title: 'Vuetify.js'
    }
  }
};
</script>
