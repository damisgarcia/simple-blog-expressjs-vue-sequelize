<template>
    <v-navigation-drawer
      persistent
      :mini-variant="false"
      :clipped="true"
      v-model="$store.state.ui.drawer"
      enable-resize-watcher
      fixed
      app
    >      
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :to="item.route"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: "drawer-left",
    data() {
        return{
            items: [
              {
                title: 'Home Screen',
                route: '/'
              },
              {
                title: 'About',
                route: '/about'
              },
              {
                title: 'Blog',
                route: '/posts'
              },
              {
                title: 'Users',
                route: '/users'
              },
              {
                title: 'Posts',
                route: '/posts'
              }
            ]            
        }
    },
    beforeCreate(){
      this.$root.$on('toggle:drawer:left', () => {
        this.$store.dispatch('ui/toggleDrawer');
      });
    },
}
</script>
