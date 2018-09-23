<template>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
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
            clipped: false,
            miniVariant: false,
            items: [{
                icon: 'bubble_chart',
                title: 'Inspire'
            }],
        }
    },
    mounted(){
      this.$root.$on('toggle:drawer:left', () => {
        console.log('Drawer');
        this.drawer = !this.drawer;
      });
    },
    computed: {
        isVisible(){
            return this.drawer
        }
    }    
}
</script>
