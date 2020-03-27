<template>
  <div class="parties-list row">
    <party-item v-for="party in partySummaries" v-bind:party="party" v-bind:key="party.id"/>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import PartyItem from './PartyItem.vue'

  export default {
    name: "PartiesList",
    components: {
      PartyItem
    },
    computed: {
      ...mapState('parties', [
        'partySummaries',
        'activeParty'
      ])
    },
    methods: {
      ...mapActions('parties', ['selectParty']),
      selectFirstParty() {
        if (this.activeParty === null && this.partySummaries.lenght > 0) {
          this.selectParty(this.partySummaries[0].id)
        }
      },
    },
    mounted() {
      this.selectFirstParty()
    },
  }
</script>

<style scoped>

.parties-list {
  padding: 5px 10px;
}

</style>
