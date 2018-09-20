<template>
    <v-navigation-drawer
        temporary
        :right="right"
        :value="isVisible"
        :hide-overlay="true"
        fixed
        app
        >
        <v-list>
            <v-list-tile @click="right = !right">
            <v-list-tile-action>
                <v-icon>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'drawer-right',
    props: ['drawer'],
    data(){
        return {
            clipped: false,
            right: true
        }
    },
    computed: {
        isVisible(){
            return this.drawer
        }
    }
}
</script>
