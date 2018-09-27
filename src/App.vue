<template>
  <v-app>
    <v-toolbar app dark :clipped-left="true">
      <v-toolbar-side-icon @click.stop="togggleDrawer()"></v-toolbar-side-icon>     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <blog-drawer-left></blog-drawer-left>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import UI from '@/components/ui';

export default {
  name: 'App',
  components: {
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