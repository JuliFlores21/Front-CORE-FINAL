import { createStore } from 'vuex';

const store = createStore({
    state: {
        authToken: localStorage.getItem('authToken') || null
    },
    mutations: {
        setAuthToken(state, token) {
            state.authToken = token;
            localStorage.setItem('authToken', token);
        },
        clearAuthToken(state) {
            state.authToken = null;
            localStorage.removeItem('authToken');
        }
    },
    actions: {
        login({ commit }, token) {
            commit('setAuthToken', token);
        },
        logout({ commit }) {
            commit('clearAuthToken');
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.authToken;
        }
    }
});

export default store;
