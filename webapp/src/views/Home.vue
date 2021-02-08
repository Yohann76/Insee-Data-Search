<template>
  <div class="home">
    <BaseComponent/>
    <br/>
   
    {{ APImessageGreeting }}
    <h1> IDS calculator </h1>

    <h2> Recherche par numéro de Siren :  </h2>

    <!-- <input v-model="SirenData" placeholder="Siren"> 
    <p>Siren is: {{ SirenData }}</p> --> 
    <!-- <button v-click="sirenFormRequest">Search</button> -->

    <form @submit.prevent="SearchSiren">
      <input type="text" v-model="SirenData"> 
      <button type="submit">
          Search
      </button>
    </form>
    <p>Siren is: {{ SirenData }}</p>  

    {{ SirenRes }}
     
    <!-- https://api.insee.fr/entreprises/sirene/V3/siren/005520135 -->
    

    <h2> Ensemble des centres de formations en Normandie <!-- Todo : create form for select activite and department--> </h2>
    <!-- 
    https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999]) // formation adulte && 76 
    -->

    <!-- good request -->
    
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
          InseeAPI: '',
          Domaine: '',
          department: '',
          SirenData: '',
          SirenRes: '',
      }
  },
  methods: {
    testMethods(e) {
      console.log("testMethods");
    },
    SearchSiren: function() {
      console.log(this.SirenData); 

     const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f'; // Token Test
     const BASEURL = 'https://api.insee.fr/entreprises/sirene/V3';
     const ENDPOINT =  '/{this.SirenData}';
     
     axios.create({
           baseURL: BASEURL,
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+TOKEN,
               //'Access-Control-Allow-Origin': '*'
           }
       })
       .get(ENDPOINT)
       .then(res => {
               console.log(res);
               this.SirenRes = res
       }
    ); // end axios

    
      /*
      axios.post('https://api.insee.fr/entreprises/sirene/V3/siren/{{SirenData}}', {SirenData: this.SirenData})
        .then(res => {
          // do something with res
        })
        .catch(err => {
          // catch error});
        })
        */
    },
  }, // end methods
  createdtest: async function(){
      const gResponse = await fetch("http://localhost:5000/greeting");
      const gObject = await gResponse.json();
      this.APImessageGreeting = gObject.greeting; // greeting1 for other request in JSON
  },
  // methods for get siren : region && activity
  created: async function(){
     // console.log ("insee method as executed")

     const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f'; // Token Test
     const BASEURL = 'https://api.insee.fr/entreprises/sirene/V3';
     const ENDPOINT = '/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999])';

     axios.create({
           baseURL: BASEURL,
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+TOKEN
           }
       })
       .get(ENDPOINT)
       .then(res => {
               console.log(res.data.etablissements);
               this.InseeAPI = res.data.etablissements
       }
    ); // end axios
  }, // end created

  } // end export 
</script>
