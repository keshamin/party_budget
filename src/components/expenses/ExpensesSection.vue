<template>
  <div>
    <expenses-list/>
    <expense-form/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import ExpensesList from "./ExpensesList";
  import ExpenseForm from "./ExpenseForm";

  export default {
    name: "ExpensesSection",
    components: {ExpenseForm, ExpensesList},
  }
</script>

<style scoped>

</style>