<template>
  <div class="home">
    <BaseComponent title="Application Template"/>
    <br/>
    <p> {{ title }} </p>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'

  export default {
    name: 'Home',
    components: {
      BaseComponent
    }
  }
</script>
