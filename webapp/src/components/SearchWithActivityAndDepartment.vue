<template>
  <div class="SearchWithActivityAndDepartment">
    <form @submit.prevent="SearchWithActivityAndRegion">
      
      <!-- select activity -->
      <p> Select activity </p>
      <select v-model="selectedActivity" class="form-control">
        <option value="85.59A">Formation</option>
        <option value="86.10Z ">Santé</option>
        <option value="NAP600">testOptionActivity</option>
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
        <option value="06">Alpes-Maritimes</option>
        <option value="07">Ardèche</option>
        <option value="08">Ardennes</option>
        <option value="09">Ariège</option>
        <option value="10">Aube</option>
        <option value="11">Aude</option>
        <option value="12">Aveyron</option>
        <option value="13">Bouches-du-Rhône</option>
        <option value="14">Calvados</option>
        <option value="15">Cantal</option>
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

      <div v-for="item in ListSiretActivityDepartment" :key="item">

        <!-- test -->
        <div id="accordion">

          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <!-- {{ item.uniteLegale.denominationUniteLegale }} -->
                  {{ item.siren }}
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">

              <div class="card-body">
                <p> Siren : {{ item.siren }} </p> <br/>
                <p> Siret : {{ item.siret }} </p> <br/>
                <p> Dénomination : {{ item.uniteLegale.denominationUniteLegale }} </p> <br/>
                <p> Libelle Commune : {{ item.adresseEtablissement.libelleCommuneEtablissement }}</p> <br/>
                <p> Numéro Activité Principale : {{ item.uniteLegale.activitePrincipaleUniteLegale }} </p> <br/>

                <p> Adresse Etablissement : 
                {{ item.adresseEtablissement.numeroVoieEtablissement }} 
                {{ item.adresseEtablissement.typeVoieEtablissement }} 
                {{ item.adresseEtablissement.libelleVoieEtablissement }} 
                {{ item.adresseEtablissement.libelleCommuneEtablissement }} 
                {{ item.adresseEtablissement.codePostalEtablissement }} 
                </p> <br/>

                
              </div>

            </div>

          </div>
        </div>
        <br/><br/>
      </div>

    </div> <!-- end container -->

  </div> <!-- end div  SearchWithActivityAndDepartment-->
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

#headingOne {
  background-color: #17a2b8;
  
}

.btn-link {
  color : white; 
}

</style>
