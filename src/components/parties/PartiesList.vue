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

<template>
  <div>
    <h2 class="title">
      Список вечеринок
    </h2>
    <div class="party-list">
      <party-item class="party-item" v-for="party in partySummaries" v-bind:party="party" v-bind:key="party.id"/>
    </div>
  </div>
</template>

<style scoped>
.party-list {
  overflow: auto;
  white-space: nowrap;
}

.party-item {
  display: inline-block;
  margin-right: 20px;
}
</style>
