<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>

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
          selectedActivity: '',
          selectedDepartment: '',
          ListSiretActivityDepartment : '', // result 
      }
  },
  methods: {
    SearchWithActivityAndRegion: function(){

      console.log("SearchWithActivityAndRegion");
      // axios request 
      const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f';

      console.log(this.selectedActivity);
      console.log(this.selectedDepartment);

      axios.get('https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:' +this.selectedActivity+')AND(codeCommuneEtablissement:['+this.selectedDepartment+'000 TO '+this.selectedDepartment+'999])', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN,
          },
        })
        .then(res => {
          this.ListSiretActivityDepartment = res.data.etablissements;
          console.log(this.ListSiretActivityDepartment);
        })
        .catch(err => {
          console.log("request non valide");
        })
      // end axios request 
    },
  }, // end methods
  created: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  } // end export 
</script>
