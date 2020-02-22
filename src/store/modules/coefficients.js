import {coefficientsApi} from '@/api/api'


const state = {
  coefficients: [],
  errorMessage: null,
};

const mutations = {
  setCoefficients: (state, coefficients) => state.coefficients = coefficients,
  resetCoefficients: state => state.coefficients = [],
  updateCoefficient: (state, updatedCoefficient) => {
    let coefficientIndex = state.coefficients.findIndex(coefficient => coefficient.id === updatedCoefficient.id)
    let updatedCoefficients = [...state.coefficients]
    updatedCoefficients[coefficientIndex] = updatedCoefficient
    state.coefficients = updatedCoefficients
  },
  setErrorMessage: (state, message) => state.errorMessage = message,
  resetErrorMessage: (state) => state.errorMessage = null,
};

const actions = {
  async getCoefficients({commit, rootState}, ) {
    const partyId = rootState.parties.selectedPartyId
    const result = await coefficientsApi.get({party_id: partyId});
    if (result.status !== 200) {
      throw Error(`Failed to fetch coefficients, response code: ${result.status}, body: ${result.body}`)
    }
    let coefficients = result.body
    commit('setCoefficients', coefficients)
  },



  async updateCoefficient({commit}, coefficient) {
    const result = await coefficientsApi.update({id: coefficient.id}, coefficient)
    if (result.status !== 200) {
      commit('setErrorMessage', `Failed to update the coefficient! Status: ${result.status}, body: ${result.body}`)
      return
    }
    const updatedCoefficient = await result.json()
    commit('updateCoefficient', updatedCoefficient);
    return updatedCoefficient
  }
};

const getters = {
  coefficientsCount: state => state.coefficients.length,
  coefficientsSum: state => state.coefficients.reduce((result, coeff) => result + coeff.coefficient, 0),

  getCoefficientsBy: state => (field, value) => {
    return state.coefficients.filter(coefficient => coefficient[field] === value)
  },
  getCoefficientsByMember: (state, getters) => memberId => getters.getCoefficientsBy('member_id', memberId),
  getCoefficientsByExpense: (state, getters) => expenseId => getters.getCoefficientsBy('expense_id', expenseId),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}