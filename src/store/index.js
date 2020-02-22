import Vue from 'vue'
import Vuex from 'vuex'

import parties from './modules/parties'
// import members from './modules/members'
// import expenses from './modules/expenses'
// import transfers from './modules/transfers'
// import coefficients from './modules/coefficients'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    parties,
    // members,
    // expenses,
    // transfers,
    // coefficients,
  },

  state: {
    // membersInit: false,
    // expensesInit: false,
    // transfersInit: false,
  },

  mutations: {
    // startMembersInit: (state) => state.membersInit = true,
    // finishMembersInit: (state) => state.membersInit = false,
    // startExpensesInit: (state) => state.expensesInit = true,
    // finishExpensesInit: (state) => state.expensesInit = false,
    // startTransfersInit: (state) => state.transfersInit = true,
    // finishTransfersInit: (state) => state.transfersInit = false,
  }
})