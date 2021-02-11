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
    
        <div id="accordion">

          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <!-- {{ item.uniteLegale.denominationUniteLegale }} -->
                  {{ SirenRes.siren }}
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">

              <div class="card-body">
                <p> Siren : {{ SirenRes.categorieEntreprise }}   </p> <br/>
                <p> Date création : {{ SirenRes.dateCreationUniteLegale }}  </p> <br/>
                <p> Tranche Effectifs :{{ SirenRes.trancheEffectifsUniteLegale }} </p> <br/>

                <!-- <p> Numéro D'activité : {{ SirenRes.periodesUniteLegale[0].activitePrincipaleUniteLegale }} </p> -->

                <!-- <p> Dénomination :{{ SirenRes.periodesUniteLegale[0].denominationUniteLegale }} </p> <br/> --> 
                 
                <!-- Siren Ex : 779311604 -->
                <br/>
              </div>

            </div>

          </div>
        </div>
      
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
