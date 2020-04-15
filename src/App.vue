<template>
  <div id="app">
    <app-header/>
    <section class="section has-background-light">
      <party-form/>
      <parties-list/>
      <details-area/>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

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

<style lang="scss">
  @import "styles.scss";
</style>
