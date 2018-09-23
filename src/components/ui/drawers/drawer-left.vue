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
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
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
            drawer: false,
            items: [{
                icon: 'bubble_chart',
                title: 'Inspire'
            }],
        }
    },
    mounted(){
      this.$root.$on('toggle:drawer:left', () => {
        this.$store.dispatch('ui/toggleDrawer');
      });
    }    
}
</script>
