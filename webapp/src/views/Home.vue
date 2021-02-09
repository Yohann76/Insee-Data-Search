<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>

    <!--  ---------------------------- Search SIREN ---------------------------- -->
    <h2> Recherche par numéro de Siren :  </h2>

    <!-- siren form-->
    <form @submit.prevent="SearchSiren">
      <input type="text" v-model="SirenData"> 
      <button type="submit">
          Search
      </button>
    </form>

    <!-- https://api.insee.fr/entreprises/sirene/V3/siren/005520135 -->
    <!-- display siren request -->

    <p>
      {{ SirenRes.categorieEntreprise }}  
      {{ SirenRes.dateCreationUniteLegale }}
    </p> 
    <!-- <p>{{ SirenRes.periodesUniteLegale[0].activitePrincipaleUniteLegale }} </p> --> 


    <!--  ---------------------------- End Search SIREN ---------------------------- -->


    <!--  ---------------------------- Search activity and region ---------------------------- -->

    <h2> Ensemble des centres de formations en Normandie </h2>

    <h2> Recherche par activité et région :  </h2>

    <form @submit.prevent="SearchWithActivityAndRegion">
      
      <!-- select activity -->
      <p> Select activity </p>
      <select v-model="selectedActivity">
        <option value="85.59A">Formation</option>
        <option value="86.10Z ">Santé</option>
      </select>
      <br/>
      <span>Sélectionné : {{ selectedActivity }}</span>
      <br/>
      <br/>
      <!-- Todo : select region -->
      <p> Select Departement</p>
      <select v-model="selectedRegion">
        <option value="76">Normandie</option>
        <option value="16">Bretagne</option>
      </select>
      <br/>
      <span>Sélectionné : {{ selectedRegion }}</span>

      <br/>
      <br/>
      <!-- submit-->
      <button type="submit">
          Search
      </button>
    </form>
    <br/>

    <!-- display request -->

    <!-- {{ ListSiretActivityDepartment }} --> 
        <div class="container"> 
      <table class="table">
        <tbody>
          <div v-for="item in ListSiretActivityDepartment" :key="item">
            <tr>
              <th scope="row"> # </th>
              <td>{{ item.siren }}</td>
              <td>{{ item.siret }}</td>
              <td>{{ item.uniteLegale.denominationUniteLegale }} </td>
              <td>{{ item.adresseEtablissement.libelleCommuneEtablissement }} </td>
              <td>{{ item.uniteLegale.activitePrincipaleUniteLegale }} </td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>

    <!-- 
    https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999]) // formation adulte && 76 
    -->

    <div class="container"> 
      <table class="table">
        <tbody>
          <div v-for="item in InseeAPI" :key="item">
            <tr>
              <th scope="row"> # </th>
              <td>{{ item.siren }}</td>
              <td>{{ item.siret }}</td>
              <td>{{ item.uniteLegale.denominationUniteLegale }} </td>
              <td>{{ item.adresseEtablissement.libelleCommuneEtablissement }} </td>
              <td>{{ item.uniteLegale.activitePrincipaleUniteLegale }} </td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
    
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
import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      BaseComponent
    },
  data: function(){
      return {
          APImessageGreeting: '',
          InseeAPI: '', // result request api test
          SirenRes: '', // result siren request 
          SirenData: '',
          selectedActivity: '',
          selectedDepartment: '',
          ListSiretActivityDepartment : '', // result 
      }
  },
  methods: {
    testMethods(e) {
      console.log("testMethods");
    },
    SearchSiren: function() {
      const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f'; // Token Test

      axios.get('https://api.insee.fr/entreprises/sirene/V3/siren/' +this.SirenData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN,
          },
        })
        .then(res => {
          this.SirenRes = res.data.uniteLegale;
          console.log(this.SirenRes);
        })
        .catch(err => {
          console.log("request non valide");
        })
    },
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
  createdtest: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  // methods for get siren : region && activity
  createdDemo: async function(){
     console.log ("IDS")
     /*
     const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f'; // Token Test
     const BASEURL = 'https://api.insee.fr/entreprises/sirene/V3';
     const ENDPOINT = '/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999])';

     axios.create({
           baseURL: BASEURL,
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+TOKEN,
           }
       })
       .get(ENDPOINT)
       .then(res => {
               console.log(res.data.etablissements);
               this.InseeAPI = res.data.etablissements;
       }
    ); // end axios
    */
  }, // end created
  
  } // end export 
</script>
