import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        theme: 0,
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        toggleTheme: (state) => state.theme = state.theme + 1 > 1 ? 0 : 1,
    },
    getters: {
        getCount: (state) => state.count,
        getTheme: (state) => state.theme,
    }
})

export default store