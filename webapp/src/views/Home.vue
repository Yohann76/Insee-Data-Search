<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>

    {{ InseeAPI }}

  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'
import axios from 'axios'

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
  createdtest: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  created: async function(){
      console.log ("insee method as executed")

     const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f '; // Token Test
     const BASEURL = 'https://api.insee.fr/entreprises/sirene/V3/';
     const ENDPOINT = '/siren';

     axios.create({
           baseURL: BASEURL,
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+TOKEN
           }
       })
       .get(ENDPOINT)
       .then(res => {
               console.log(res.data.unitesLegales);
       });
  },

  } // end export 
</script>
