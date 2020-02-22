<template>
  <ul>
    <transfers-item v-for="transfer in activeParty.transfers" :transfer="transfer" :key="transfer.id"/>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  import TransfersItem from "./TransfersItem";

  export default {
    name: "TransfersList",
    components: {TransfersItem},
    computed: {
      ...mapState('parties', ['activeParty']),
    }
  }
</script>

<style scoped>

</style>