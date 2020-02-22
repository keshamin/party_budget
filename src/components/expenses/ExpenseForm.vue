<template>
  <div>
    Новый расход<br>
    <label>
      Название:<br>
      <input type="text" v-model="expenseName"><br>
    </label>
    <label>
      Сумма:<br>
      <input type="number" v-model="expenseAmount"><br>
    </label>
    <label>
      Кто заплатил:<br>
      <select v-model="expenseMadeById">
        <option v-for="member in activeParty.members" v-bind:value="member.id">
          {{ member.name }}
        </option>
      </select><br>
    </label>

    <input type="button" value="Создать" @click="createExpenseHandler" placeholder="Имя">
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import Expense from '@/model/expense'

  export default {
    name: "ExpenseForm",
    data() {
      return {
        expenseName: '',
        expenseAmount: 0,
        expenseMadeById: null,
      }
    },
    computed: {
      ...mapState('parties', ['activeParty'])
    },
    methods: {
      ...mapActions('parties', ['addExpense']),

      async createExpenseHandler() {
        let expense = Expense.create({
          party: this.activeParty,
          name: this.expenseName,
          amount: this.expenseAmount,
          paidById: this.expenseMadeById
        })
        
        this.addExpense(expense)
        this.resetInputs()
      },

      resetInputs() {
        this.expenseName = ''
        this.expenseAmount = 0
        this.expenseMadeById = null
      }
    }
  }
</script>

<style scoped>

</style>