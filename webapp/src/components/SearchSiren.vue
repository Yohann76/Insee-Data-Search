<template>
    <div class="searchSiren">
        <!-- siren form-->
        <form @submit.prevent="SearchSiren">
            <input type="text" v-model="SirenData" class="form-control">
            <br/> <br/>
            <button type="submit" class="btn btn-info">
                Search
            </button>
        </form>
        <br/>
        <!-- display siren request -->
        <br/> 
        <p>
            {{ SirenRes.categorieEntreprise }}  
            {{ SirenRes.dateCreationUniteLegale }}
        </p> 
        <!-- <p>{{ SirenRes.periodesUniteLegale[0].activitePrincipaleUniteLegale }} </p> --> 
    </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

  export default {
    name: 'SearchSiren',
  data: function(){
      return {
          SirenRes: '', // result siren request 
          SirenData: '',
      }
  },
  methods: {
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
  }, // end methods
  
  } // end export 
</script>

<style>

.form-control {
  width : 30% ; 
  margin: auto; 
 
}

</style>
