import Party from '@/model/party'
import PartySummary from '@/model/party-summary'
import Repo from '@/repo/party-repo'
import Member from '@/model/member'
import Coefficient from '@/model/coefficient'

const state = {
  partySummaries: [],
  activeParty: null,
};

const mutations = {
  setActiveParty: (state, party) => state.activeParty = party,
  resetActiveParty: (state) => state.activeParty = null,

  setPartySummaries: (state, partySummaries) => state.partySummaries = partySummaries,
  resetPartySummaries: (state) => state.partySummaries = [],
  appendPartySummary: (state, partySummary) => state.partySummaries.push(partySummary),
  removePartySummary: (state, partyId) => {
    state.partySummaries.splice(state.partySummaries.indexOf(state.partySummaries.filter(party => party.id === partyId)[0]), 1)
  },

  addMember: (state, newMember) => state.activeParty.members.push(newMember),
  removeMember: (state, memberId) => {state.activeParty.members.splice(
    state.activeParty.members.indexOf(
      state.activeParty.members.filter(mem => mem.id === memberId)
    )
  )},
  updateMember: (state, updatedMember) => {
    const memberIdx = state.activeParty.members.findIndex(member => member.id === updatedMember.id)
    state.activeParty.expenses.splice(memberIdx, 1, updatedMember)
  },

  addExpense: (state, newExpense) => state.activeParty.expenses.push(newExpense),
  removeExpense: (state, expenseId) => {state.activeParty.expenses.splice(
    state.activeParty.expenses.findIndex(expense => expense.id === expenseId)
  )},
  updateExpense: (state, updatedExpense) => {
    const expenseIdx = state.activeParty.expenses.findIndex(expense => expense.id === updatedExpense.id)
    state.activeParty.expenses.splice(expenseIdx, 1, updatedExpense)
  },

  addTransfer: (state, newTransfer) => state.activeParty.transfers.push(newTransfer),
  removeTransfer: (state, transferId) => {state.activeParty.transfers.splice(
    state.activeParty.transfers.findIndex(transfer => transfer.id === transferId)
  )},
  updateTransfer: (state, updatedTransfer) => {
    const transferIdx = state.activeParty.transfers.findIndex(transfer => transfer.id === updatedTransfer.id)
    state.activeParty.transfers.splice(transferIdx, 1, updatedTransfer)
  },

  addCoefficient: (state, newCoefficient) => {state.activeParty.coefficients.push(newCoefficient)},
  removeCoefficient: (state, coefficientId) => {state.activeParty.coefficients.splice(
    state.activeParty.coefficients.findIndex(coefficient => coefficient.id === coefficientId)
  )},
  updateCoefficient: (state, updatedCoefficient) => {
    const coefficientIdx = state.activeParty.coefficients.findIndex(coefficient => 
      coefficient.memberId === updatedCoefficient.memberId && coefficient.expenseId === updatedCoefficient.expenseId
    )
    state.activeParty.coefficients.splice(coefficientIdx, 1, updatedCoefficient)
  },
};

const actions = {
  initPartySummaries({commit}) {
    let summaries = []

    for (var partyKey of Object.keys(localStorage).filter(key => key.startsWith(Repo.PARTY_PREFIX))) {
      let party = Repo.retrievePartyByKey(partyKey)
      let partySummary = new PartySummary(party)
      summaries.push(partySummary)
    }

    commit('setPartySummaries', summaries)
  },

  selectParty({commit}, partyId) {
    commit('setActiveParty', Repo.retrievePartyById(partyId))
  },

  createParty({commit, dispatch}, partyName) {
    let party = Party.create(partyName)
    Repo.saveParty(party)
    commit('appendPartySummary', new PartySummary(party))
    dispatch('selectParty', party.id)
  },

  removeParty({commit}, partyId) {
    Repo.removeParty(partyId)
    commit('removePartySummary', partyId)
    commit('resetActiveParty')
  },

  updateParty({dispatch}, updatedParty) {
    Repo.saveParty(updatedParty)
    dispatch('selectParty', updatedParty.id)
    dispatch('initPartySummaries')
  },

  async getMemberById({rootState}, memberId) {
    return await rootState.parties.activeParty.members.find(member => member.id === memberId)
  },

  addMember({commit, rootState}, memberName) {
    let activeParty = rootState.parties.activeParty
    let member = Member.create({party: activeParty, name: memberName})

    commit('addMember', member)
    for (let expense of activeParty.expenses) {
      commit('addCoefficient', new Coefficient({
        memberId: member.id,
        expenseId: expense.id,
        coeff: 1
      }))
    }

    Repo.saveParty(activeParty)
  },

  removeMember({commit, rootState}, memberId) {
    let activeParty = rootState.parties.activeParty

    commit('removeMember', memberId)
    activeParty.coefficients.filter(coef => coef.memberId === memberId).forEach(coef => {
      commit('removeCoefficient', coef.id)
    })

    activeParty.expenses.filter(exp => exp.paidById === memberId).forEach(exp => {
      commit('removeExpense', exp.id)
    })

    activeParty.transfers.filter(trans => trans.senderId === memberId || trans.receiverId === memberId).forEach(
      exp => {commit('removeTransfer', exp.id)}
    )

    Repo.saveParty(activeParty)
  },

  updateMember({commit, rootState}, updatedMember) {
    commit('updateMember', updatedMember)
    Repo.saveParty(rootState.parties.activeParty)
  },

  addExpense({commit, rootState}, newExpense) {
    let activeParty = rootState.parties.activeParty
    commit('addExpense', newExpense)
    
    for (let member of activeParty.members) {
      commit('addCoefficient', new Coefficient({
        memberId: member.id,
        expenseId: newExpense.id,
        coeff: 1
      }))
    }

    Repo.saveParty(activeParty)
  },

  removeExpense({commit, rootState}, expenseId) {
    let activeParty = rootState.parties.activeParty

    commit('removeExpense', expenseId)
    activeParty.coefficients.filter(coef => coef.expenseId === expenseId).forEach(coef => {
      commit('removeCoefficient', coef.id)
    })
    Repo.saveParty(activeParty)
  },

  updateExpense({commit, rootState}, updatedExpense) {
    let activePartyDeepCopy = JSON.parse(JSON.stringify(rootState.parties.activeParty))
    Repo.updateExpense(activePartyDeepCopy, updatedExpense)
    commit('updateExpense', updatedExpense)
  },

  addTransfer({commit, rootState}, newTransfer) {
    let activePartyDeepCopy = JSON.parse(JSON.stringify(rootState.parties.activeParty))
    Repo.addTransfer(activePartyDeepCopy, newTransfer)
    commit('addTransfer', newTransfer)
  },

  removeTransfer({commit, rootState}, transferId) {
    let activePartyDeepCopy = JSON.parse(JSON.stringify(rootState.parties.activeParty))
    Repo.removeTransfer(activePartyDeepCopy, transferId)
    commit('removeTransfer', transferId)
  },

  updateTransfer({commit, rootState}, updatedTransfer) {
    let activePartyDeepCopy = JSON.parse(JSON.stringify(rootState.parties.activeParty))
    Repo.updateTransfer(activePartyDeepCopy, updatedTransfer)
    commit('updateTransfer', updatedTransfer)
  },

  updateCoefficients({commit, rootState}, updatedCoefficients) {
    updatedCoefficients.forEach(coeff => commit('updateCoefficient', coeff))
    Repo.saveParty(rootState.parties.activeParty)
  }

};

const getters = {
  membersCount: state => state.activeParty.members.length,
  getMemberById: state => memberId => state.activeParty.members.find(mem => mem.id === memberId),

  getExpenseById: state => expenseId => state.activeParty.expenses.find(exp => exp.id === expenseId),

  coefficientsSum: state => state.activeParty.coefficients.reduce((result, coeff) => result + coeff.coefficient, 0),
  getCoefficientsBy: state => (field, value) => {
    return state.activeParty.coefficients.filter(coef => coef[field] === value)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
