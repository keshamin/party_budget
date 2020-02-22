import {membersApi} from '@/api/api'


const state = {
  members: [],
  errorMessage: null,
};

const mutations = {
  setMembers: (state, members) => state.members = members,
  resetMembers: state => state.members = [],
  addMember: (state, member) => state.members.push(member),
  removeMember: (state, memberId) => state.members.splice(
    state.members.findIndex(member => member.id === memberId),
    1
  ),
  updateMember: (state, updatedMember) => {
    let memberIndex = state.members.findIndex(member => member.id === updatedMember.id)
    let updatedMembers = [...state.members]
    updatedMembers[memberIndex] = updatedMember
    state.members = updatedMembers
  },
  setErrorMessage: (state, message) => state.errorMessage = message,
  resetErrorMessage: (state) => state.errorMessage = null,
};

const actions = {
  async getMembers({commit, rootState}, ) {
    const partyId = rootState.parties.selectedPartyId
    const result = await membersApi.get({party_id: partyId});
    if (result.status !== 200) {
      throw Error(`Failed to fetch members, response code: ${result.status}, body: ${result.body}`)
    }
    let members = result.body
    commit('setMembers', members)
  },

  async createMemberWithoutMutation({commit}, newMember) {
    const result = await membersApi.save({}, newMember)
    if (result.status !== 201) {
      commit('setErrorMessage', `Failed to create new member! Status: ${result.status}, body: ${result.body}`)
      return
    }
    return await result.json()
  },

  async createMemberWithRefresh({dispatch}, newMember) {
    // action that saves mutations: one set-mutation instead of add + reset + set.
    await dispatch('createMemberWithoutMutation', newMember)
    await dispatch('getMembers')
  },

  async createMember({commit, dispatch}, newMember) {
    const createdMember = await dispatch('createMemberWithoutMutation', newMember)
    commit('addMember', createdMember);
    return createdMember
  },

  async removeMemberWithoutMutation({commit}, memberId) {
    const result = await membersApi.delete({id: memberId})
    if (result.status !== 204) {
      commit('setErrorMessage', `Failed to remove member! Status: ${result.status}, body: ${result.body}`)
    }
  },

  async removeMemberWithRefresh({dispatch}, memberId) {
    await dispatch('removeMemberWithoutMutation', memberId)
    await dispatch('getMembers')
  },

  async removeMember({commit, dispatch}, memberId) {
    await dispatch('removeMemberWithoutMutation', memberId)
    commit('removeMember', memberId)
  },

  async updateMember({commit}, member) {
    const result = await membersApi.update({id: member.id}, member)
    if (result.status !== 200) {
      commit('setErrorMessage', `Failed to update the member! Status: ${result.status}, body: ${result.body}`)
      return
    }
    const updatedMember = await result.json()
    commit('updateMember', updatedMember);
    return updatedMember
  }
};

const getters = {
  membersCount: state => state.members.length,
  getMemberById: state => memberId => {
    return state.members.find(member => member.id === memberId)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}