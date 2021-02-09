<template>
  <div class="SearchWithActivityAndDepartment">

    <form @submit.prevent="SearchWithActivityAndRegion">
      
      <!-- select activity -->
      <p> Select activity </p>
      <select v-model="selectedActivity" class="form-control">
        <option value="85.59A">Formation</option>
        <option value="86.10Z ">Santé</option>
      </select>
      <br/>
      <!-- select Departement -->
      <p> Select Departement</p>
      <select v-model="selectedDepartment" class="form-control">
        <option value="01">Ain</option>
        <option value="02">Aisne</option>
        <option value="03">Allier</option>
        <option value="04">Alpes-de-Haute-Provence</option>
        <option value="05">Hautes-Alpes</option>
      </select>
      <br/>

      <!-- select Type entreprise -->
      <p> Select Type entreprise</p>
      <select v-model="selectedType" class="form-control">
        <option value="PME">PME</option>
        <option value="ETI">Entreprise taille intermédiaire</option>
        <option value="GE">Grande entreprise</option>
      </select>
      <br/>

      <!-- submit-->
      <button type="submit" class="btn btn-info">
          Search
      </button>
    </form>
    <br/>

    Nombre d'entreprises : {{ nbResult  }}

    <br/>
    <!-- display request -> Search activity and region -->

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

  </div> <!-- end div -->
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

  export default {
    name: 'SearchWithActivityAndDepartment',
  data: function(){
      return {
          selectedActivity: '',
          selectedDepartment: '',
          selectedType: '',
          ListSiretActivityDepartment : '', // result 
          nbResult : '', // result 
      }
  },
  methods: {
    SearchWithActivityAndRegion: function(){

      console.log("SearchWithActivityAndRegion");
      // axios request 
      const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f';

      console.log(this.selectedActivity);
      console.log(this.selectedDepartment);

      axios.get('https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:' +this.selectedActivity+')AND(codeCommuneEtablissement:['+this.selectedDepartment+'000 TO '+this.selectedDepartment+'999])AND(categorieEntreprise:'+this.selectedType+')', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN,
          },
        })
        .then(res => {
          this.ListSiretActivityDepartment = res.data.etablissements;
          console.log(this.ListSiretActivityDepartment);

          this.nbResult = res.data.header.nombre;
        })
        .catch(err => {
          console.log("request non valide");
        })
      // end axios request 
    }, // end function
  }, // end methods

  } // end export 
</script>

<style>

.form-control {
  width : 30% ; 
  margin: auto; 
 
}

</style>
