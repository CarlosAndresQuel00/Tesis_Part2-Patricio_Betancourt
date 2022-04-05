import api from '../../api/index';

const state = () => ({
    loginApiStatus: "",
});
   
const getters = {
    getLoginApiStatus(state) {
        return state.loginApiStatus;
    },
};
   
const actions = {
    async loginApi({ commit }, payload) {
        const response = await api.post('/login', payload);
        console.log(response.data.token);
        if (response.data.token) {
            commit("setLoginApiStatus", "success");
        } else {
            commit("setLoginApiStatus", "failed");
        }
    },
};
   
const mutations = {
    setLoginApiStatus(state, data) {
        state.loginApiStatus = data;
    },
};
   
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};