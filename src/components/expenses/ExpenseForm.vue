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
        const validationResult = this.validate()

        if (!validationResult.valid) { return }

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
      },

      validate() {
        let result = {valid: null, errors: []}
        if (!this.expenseName.length > 0) {
          result.errors.push('Название расхода не может быть пустым!')
        }

        if (!this.expenseAmount > 0) {
          result.errors.push('Сумма расхода должна быть больше 0!')
        }

        if (this.expenseMadeById === null) {
          result.errors.push('Выберите оплатившего участника!')
        }

        result.valid = result.errors.length > 0 ? false : true
        return result
      },
    }
  }
</script>

<template>
<tbody>
  <tr>
    <td colspan="4" style="border: unset">
      Новый расход
    </td>
  </tr>
  <tr>
    <td>
      <input type="text" class="input" placeholder="Название" v-model.trim="expenseName">
    </td>
    <td>
      <input type="text" class="input" v-model.number="expenseAmount">
    </td>
    <td>
      <div class="select">
        <select v-model="expenseMadeById">
          <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
            {{ member.name }}
          </option>
        </select>
      </div>
    </td>
    <td>
      <button class="button" @click="createExpenseHandler">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span class="is-hidden-mobile">Добавить</span>
        </button>
    </td>
  </tr>
</tbody>
  <!-- <div>
    Новый расход<br>
    <label>
      Название:<br>
      <input type="text" v-model="expenseName"><br>
    </label>
    <label>
      Сумма:<br>
      <input type="number" v-model.number="expenseAmount"><br>
    </label>
    <label>
      Кто заплатил:<br>
      <select v-model="expenseMadeById">
        <option v-for="member in activeParty.members" v-bind:value="member.id" :key="member.id">
          {{ member.name }}
        </option>
      </select><br>
    </label>

    <input type="button" value="Создать" @click="createExpenseHandler" placeholder="Имя">
  </div> -->
</template>

<style scoped lang="scss">
@import 'styles.scss';

.icon {
  @include mobile {
    margin: 0 auto !important;
  }
}

tr:last-child td {
  border-bottom: 1px solid rgb(219, 219, 219) !important;
}


</style>