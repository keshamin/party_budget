<template>
<table class="table is-fullwidth expense-table" style="table-layout:fixed;">
  <tr>
    <th>Расход</th>
    <th>Сумма</th>
    <th>Оплативший участник</th>
    <th></th>
  </tr>
  <expense-item v-for="expense in activeParty.expenses" :expense="expense" :key="expense.id"/>
  <expense-form/>
</table>
</template>

<script>
  import {mapState} from 'vuex'

  import ExpenseItem from './ExpenseItem'
  import ExpenseForm from './ExpenseForm'

  export default {
    name: "ExpensesSection",
    components: {
      ExpenseItem,
      ExpenseForm
    },
    computed: {
      ...mapState('parties', ['activeParty']),
    }
  }
</script>

<style lang="scss">
@import 'styles.scss';

table.expense-table {

  @include mobile {
    font-size: 1.1rem;
  }

  td p, th p {
    // width: 25%;
    display: inline-block;
    overflow-wrap: break-word;
  }

  div.select {
    max-width: 8rem;
  }

  input, select {
    font-size: inherit !important;
  }
  button {
    font-size: inherit !important;
  }

  select {
    padding-top: calc(0.5em - 1px) !important;
    padding-bottom: calc(0.5em - 1px) !important;
  }
}
</style>
