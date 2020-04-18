import sections from '@/components/section-types.js';

const state = {
    activeSection: sections.MEMBERS,
}

const mutations = {
    switchSection: (state, section) => state.activeSection = section,
}

const actions = {
    switchSection: ({commit}, section) => {
        if (Object.values(sections).includes(section)) {
            commit('switchSection', section)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
