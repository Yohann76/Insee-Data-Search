<template>
  <div class="home">
    <BaseComponent title="Application Template"/>
    <br/>
    <p> {{ title }} </p>
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>

    {{ InseeAPI }}

  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'

  export default {
    name: 'Home',
    components: {
      BaseComponent
    },
  data: function(){
      return {
          APImessageGreeting: '',
          InseeAPI: ''
      }
  },
  methods: {
    testMethods(e) {
      console.log("testMethods");
    }
  },
  created: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  insee: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.InseeAPI = gObject.greeting; 
  },
  }

</script>
