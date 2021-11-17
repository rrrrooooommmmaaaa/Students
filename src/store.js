import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        theme: 0,
        user: null,
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        toggleTheme: (state) => state.theme = state.theme + 1 > 1 ? 0 : 1,
        setUser: (state, user) => state.user = user,
    },
    getters: {
        getCount: (state) => state.count,
        getTheme: (state) => state.theme,
        getUser: (state) => state.user,
    }
})

export default store