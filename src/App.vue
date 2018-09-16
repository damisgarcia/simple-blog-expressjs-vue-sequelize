<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <User></User>
  </div>
</template>

<script>
import User from './components/User.vue'

export default {
  name: 'app',
  components: {
    User
  }  
}
</script>