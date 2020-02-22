<template>
  <ul>
    <expense-item v-for="expense in activeParty.expenses" :expense="expense" :key="expense.id"/>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'

  import ExpenseItem from "./ExpenseItem";
  export default {
    name: "ExpensesList",
    components: {ExpenseItem},
    computed: {
      ...mapState('parties', ['activeParty']),
    }
  }
</script>

<style scoped>

</style>