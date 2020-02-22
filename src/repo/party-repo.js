import Party from '@/model/party'
import Coefficient from '../model/coefficient'

export default {
  PARTY_PREFIX: 'PARTY_',

  buildPartyKey: function(partyId) {
    return `${this.PARTY_PREFIX}${partyId}`
  },

  retrievePartyByKey: function(partyKey) {
    let partyFromStorage = JSON.parse(localStorage.getItem(partyKey))
    return new Party(partyFromStorage)
  },

  retrievePartyById: function(partyId) {
    return this.retrievePartyByKey(this.buildPartyKey(partyId))
  },

  genPartyId: function() {
    for (var num = 1; Object.keys(localStorage).includes(this.buildPartyKey(num)); num++) {}
    return num
  },

  saveParty: function(party) {
    localStorage.setItem(this.buildPartyKey(party.id), JSON.stringify(party))
  },

  removeParty: function(partyId) {
    localStorage.removeItem(this.buildPartyKey(partyId))
  },

  genMemberId: function(party) {
    let memberIds = Array.from(party.members, member => member.id)
    for (var num = 1; memberIds.includes(num); num++) {}
    return num
  },

  addMember: function(party, member) {
    party.members.push(member)
    this.saveParty(party)
  },

  updateMember: function(party, member) {
    let memberIdx = Object.entries(party.members).filter(entry => entry[1].id === member.id)[0][0]
    party.members[memberIdx] = member
    this.saveParty(party)
  },

  removeMember: function(party, memberId) {
    let memberIdx = Object.entries(party.members).filter(entry => entry[1].id === memberId)[0][0]
    
    party.members.splice(memberIdx, 1)
    
    const toRemoveIdx = Object.entries(party.coefficients).filter(e => e[1].memberId === memberId).map(e => e[0])
    toRemoveIdx.forEach(index => party.members.splice(index))

    this.saveParty(party)
  },

  genExpenseId: function(party) {
    let expenseIds = Array.from(party.expenses, expense => expense.id)
    for (var num = 1; expenseIds.includes(num); num++) {}
    return num
  },

  addExpense: function(party, expense) {
    party.expenses.push(expense)
    this.saveParty(party)
  },

  updateExpense: function(party, updatedExpense) {
    let expenseIdx = party.expenses.findIndex(expense => expense.id === updatedExpense.id)
    party.expenses[expenseIdx] = updatedExpense
    this.saveParty(party)
  },

  removeExpense: function(party, expenseId) {
    let expenseIdx = party.expenses.findIndex(expense => expense.id === expenseId)
    party.expenses.splice(expenseIdx, 1)
    this.saveParty(party)
  },

  genTransferId: function(party) {
    let transferIds = Array.from(party.transfers, transfer => transfer.id)
    for (var num = 1; transferIds.includes(num); num++) {}
    return num
  },

  addTransfer: function(party, transfer) {
    party.transfers.push(transfer)
    this.saveParty(party)
  },

  updateTransfer: function(party, updatedTransfer) {
    let transferIdx = party.transfers.findIndex(transfer => transfer.id === updatedTransfer.id)
    party.transfers[transferIdx] = updatedTransfer
    this.saveParty(party)
  },

  removeTransfer: function(party, transferId) {
    let transferIdx = party.transfers.findIndex(transfer => transfer.id === transferId)
    party.transfers.splice(transferIdx, 1)
    this.saveParty(party)
  }
}
