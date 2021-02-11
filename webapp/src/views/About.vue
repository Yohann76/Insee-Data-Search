<template>
  <div class="about">
    <BaseComponent title="Application Template"/>

    <h2> Recherche par numéro de Siren :  </h2>
    <SearchSiren/> <!-- SearchSiren Component -->
    <!-- request -->
    <!-- https://api.insee.fr/entreprises/sirene/V3/siren/005520135 -->

  </div>
</template>

<script>
// @ is an alias to /src
import BaseComponent from '../components/BaseComponent.vue'
import SearchSiren from '../components/SearchSiren.vue'

  export default {
    name: 'About',
    components: {
      BaseComponent,
      SearchSiren,
    }
  }
</script>