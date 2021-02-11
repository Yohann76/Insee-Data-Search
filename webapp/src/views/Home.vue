<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>
    
    <h2> Recherche par activité et département </h2>
    <SearchWithActivityAndDepartment/> <!-- SearchSiren Component -->
    <!-- request -->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999]) // formation adulte && 76 -->
    
  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'
import SearchWithActivityAndDepartment from '../components/SearchWithActivityAndDepartment.vue'

  export default {
    name: 'Home',
    components: {
      BaseComponent,
      SearchWithActivityAndDepartment,
    },
  data: function(){
      return {
          APImessageGreeting: '',
      }
  },
  methods: {
    methodsTest: function(){
      console.log("MethodsTest");
    },
  }, // end methods
  created: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  } // end export 
</script>

<style>

.btn-info {
  margin-left : 10px ; 
}

</style>
