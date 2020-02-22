<template>
  <div id="app">
    <app-header/>
    <party-form/>
    <parties-list/>
    <details-area/>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'

  import store from './store'
  import PartiesList from '@/components/parties/PartiesList.vue'
  import AppHeader from '@/components/AppHeader.vue'
  import PartyForm from '@/components/parties/PartyForm.vue'
  import DetailsArea from '@/components/DetailsArea.vue'

  export default {
    store,

    components: {
      AppHeader,
      PartiesList,
      PartyForm,
      DetailsArea,
    },

    methods: {
      ...mapActions('parties', [
        'initPartySummaries',
      ]),
    },

    mounted() {
      this.initPartySummaries()
    },
    
    computed: {
      ...mapState('parties', [
        'partySummaries',
        'activeParty'
      ]),
    },
  }
</script>

<style>
  @import "styles.scss";
</style>
