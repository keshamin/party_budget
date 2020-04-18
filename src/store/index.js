import Vue from 'vue'
import Vuex from 'vuex'

import parties from './modules/parties'
import app from './modules/app'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    parties,
    app,
  },
})