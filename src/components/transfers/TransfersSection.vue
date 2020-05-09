<template>
<table class="table is-fullwidth expense-table">
  <tr>
    <th>Кто</th>
    <th>Кому</th>
    <th>Сколько</th>
    <th>Заметка</th>
    <th></th>
  </tr>
  <transfers-item v-for="transfer in activeParty.transfers" :transfer="transfer" :key="transfer.id"/>
  <transfers-form/>
</table>
  <!-- <ul>
    <transfers-item v-for="transfer in activeParty.transfers" :transfer="transfer" :key="transfer.id"/>
  </ul> -->
</template>

<script>
  import {mapState} from 'vuex'

  import TransfersItem from "./TransfersItem";
  import TransfersForm from './TransfersForm';

  export default {
    name: "TransfersSection",
    components: {TransfersItem, TransfersForm},
    computed: {
      ...mapState('parties', ['activeParty']),
    }
  }
</script>

<style scoped>

</style>