<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>
    
    <h2> Recherche par numéro de Siren :  </h2>
    <SearchSiren/> <!-- SearchSiren Component -->
    <!-- request -->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siren/005520135 -->


    <h2> Recherche par activité et département </h2>
    <SearchWithActivityAndDepartment/> <!-- SearchSiren Component -->
    <!-- request -->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999]) // formation adulte && 76 -->
    

    <h2> Ensemble des entreprises FR dans la santé, avec un CA suppérieur à 120 Millions  </h2>
    <!-- 
      https://api.insee.fr/entreprises/sirene/V3/siret?q=activitePrincipaleUniteLegale:86.10Z  // activité = activités hospitalières
    -->
    <h2> PME dans un rayon de 300km de Fecamp qui ont + de 150 salariés </h2>
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=codeCommuneEtablissement:76400 -->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=categorieEntreprise:PME --> <!-- Recherche par PME-->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=trancheEffectifsUniteLegale:12  // nb salarié ?--> 
    <!-- test all data-->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siret?q=(categorieEntreprise:PME)AND(codeCommuneEtablissement:76400)&=trancheEffectifUniteLegal:11 -->

  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'
import SearchSiren from '../components/SearchSiren.vue'
import SearchWithActivityAndDepartment from '../components/SearchWithActivityAndDepartment.vue'
import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      BaseComponent,
      SearchSiren,
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
