import {transfersApi} from '@/api/api'


const state = {
  transfers: [],
  errorMessage: null,
};

const mutations = {
  setTransfers: (state, transfers) => state.transfers = transfers,
  resetTransfers: state => state.transfers = [],
  addTransfer: (state, transfer) => state.transfers.push(transfer),
  removeTransfer: (state, transferId) => state.transfers.splice(
    state.transfers.findIndex(transfer => transfer.id === transferId),
    1
  ),
  updateTransfer: (state, updatedTransfer) => {
    let transferIndex = state.transfers.findIndex(transfer => transfer.id === updatedTransfer.id)
    let updatedTransfers = [...state.transfers]
    updatedTransfers[transferIndex] = updatedTransfer
    state.transfers = updatedTransfers
  },
  setErrorMessage: (state, message) => state.errorMessage = message,
  resetErrorMessage: (state) => state.errorMessage = null,
};

const actions = {
  async getTransfers({commit, rootState}, ) {
    const partyId = rootState.parties.selectedPartyId
    const result = await transfersApi.get({party_id: partyId});
    if (result.status !== 200) {
      throw Error(`Failed to fetch transfers, response code: ${result.status}, body: ${result.body}`)
    }
    let transfers = result.body
    commit('setTransfers', transfers)
  },

  async createTransfer({commit}, newTransfer) {
    const result = await transfersApi.save({}, newTransfer)
    if (result.status !== 201) {
      commit('setErrorMessage', `Failed to create new transfer! Status: ${result.status}, body: ${result.body}`)
      return
    }
    const createdTransfer = await result.json()
    commit('addTransfer', createdTransfer);
    return createdTransfer
  },

  async removeTransfer({commit}, transferId) {
    const result = await transfersApi.delete({id: transferId})
    if (result.status !== 204) {
      commit('setErrorMessage', `Failed to remove transfer! Status: ${result.status}, body: ${result.body}`)
      return
    }
    commit('removeTransfer', transferId)
  },

  async updateTransfer({commit}, updatedTransfer) {
    const result = await transfersApi.update({id: updatedTransfer.id}, updatedTransfer)

    if (result.status !== 200) {
      commit('setErrorMessage', `Failed to update transfer! Status: ${result.status}, body: ${result.body}`)
      return
    }
    let updatedTransferFromServer = result.body
    commit('updateTransfer', updatedTransferFromServer)
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}