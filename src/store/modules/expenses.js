import {expensesApi} from '@/api/api'


const state = {
  expenses: [],
  errorMessage: null,
};

const mutations = {
  setExpenses: (state, expenses) => state.expenses = expenses,
  resetExpenses: state => state.expenses = [],
  addExpense: (state, expense) => state.expenses.push(expense),
  removeExpense: (state, expenseId) => state.expenses.splice(
    state.expenses.findIndex(expense => expense.id === expenseId),
    1
  ),
  updateExpense: (state, updatedExpense) => {
    let expenseIndex = state.expenses.findIndex(expense => expense.id === updatedExpense.id)
    let updatedExpenses = [...state.expenses]
    updatedExpenses[expenseIndex] = updatedExpense
    state.expenses = updatedExpenses
  },
  setErrorMessage: (state, message) => state.errorMessage = message,
  resetErrorMessage: (state) => state.errorMessage = null,
};

const actions = {
  async getExpenses({commit, rootState}, ) {
    const partyId = rootState.parties.selectedPartyId
    const result = await expensesApi.get({party_id: partyId});
    if (result.status !== 200) {
      throw Error(`Failed to fetch expenses, response code: ${result.status}, body: ${result.body}`)
    }
    let expenses = result.body
    commit('setExpenses', expenses)
  },

  async createExpense({commit}, newExpense) {
    const result = await expensesApi.save({}, newExpense)
    if (result.status !== 201) {
      commit('setErrorMessage', `Failed to create new expense! Status: ${result.status}, body: ${result.body}`)
      return
    }
    const createdExpense = await result.json()
    commit('addExpense', createdExpense);
    return createdExpense
  },

  async removeExpense({commit}, expenseId) {
    const result = await expensesApi.delete({id: expenseId})
    if (result.status !== 204) {
      commit('setErrorMessage', `Failed to remove expense! Status: ${result.status}, body: ${result.body}`)
      return
    }
    commit('removeExpense', expenseId)
  },

  async updateExpense({commit}, updatedExpense) {
    const result = await expensesApi.update({id: updatedExpense.id}, updatedExpense)

    if (result.status !== 200) {
      commit('setErrorMessage', `Failed to update expense! Status: ${result.status}, body: ${result.body}`)
      return
    }
    let updatedExpenseFromServer = result.body
    commit('updateExpense', updatedExpenseFromServer)
  },
};
const getters = {
  expensesCount: state => state.expenses.length,

  getExpenseById: state => expenseId => {
    return state.expenses.find(expense => expense.id === expenseId)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}