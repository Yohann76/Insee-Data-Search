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

      <!-- select Type entreprise -->
      <p> Select Nb salarié</p>
      <select v-model="selectedEffectifs" class="form-control">
        <option value="01">1 ou 2 salariés</option>
        <option value="02">3 à 5 salariés</option>
        <option value="03">6 à 9 salariés</option>
        <option value="11">10 à 19 salariés</option>
        <option value="12">20 à 49 salariés</option>
        <option value="21">50 à 99 salariés</option>
        <option value="22">100 à 199 salariés</option>
        <option value="31">200 à 249 salariés</option>
        <option value="32">250 à 499 salariés</option>
        <option value="41">500 à 999 salariés</option>
        <option value="42">1 000 à 1 999 salariés</option>
        <option value="51">2 000 à 4 999 salariés</option>
        <option value="52">5 000 à 9 999 salariés</option>
        <option value="53">10 000 salariés et plus</option>
      </select>
      <br/>

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

    {{ infoRequest }}

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
          selectedEffectifs: '',
          ListSiretActivityDepartment : '', // result 
          nbResult : '', // result 
          infoRequest : '', // info 
      }
  },
  methods: {
    SearchWithActivityAndRegion: function(){

      // axios request 
      const TOKEN = '17e30c48-3d17-394d-b224-72611bcab21f';

      // exemple request : https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:85.59A)AND(codeCommuneEtablissement:[76000 TO 76999])AND(categorieEntreprise:PME)AND(trancheEffectifsUniteLegale:21)
      axios.get('https://api.insee.fr/entreprises/sirene/V3/siret?q=(activitePrincipaleUniteLegale:' +this.selectedActivity+')AND(codeCommuneEtablissement:['+this.selectedDepartment+'000 TO '+this.selectedDepartment+'999])AND(categorieEntreprise:'+this.selectedType+')AND(trancheEffectifsUniteLegale:'+this.selectedEffectifs+')', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+TOKEN,
          },
        })
        .then(res => {
          this.ListSiretActivityDepartment = res.data.etablissements;
          console.log(this.ListSiretActivityDepartment);

          this.nbResult = res.data.header.nombre;
          this.infoRequest = ''
        })
        .catch(err => {
          console.log("request non valide");
          this.infoRequest = 'Aucun établissement à été trouvé'
          this.ListSiretActivityDepartment = '';
          this.nbResult = '0';
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
