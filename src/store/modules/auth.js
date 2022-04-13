import api from '../../api/index';
import jwtInterceptor from '../../shared/jwtInterceptor';
import cookie from 'js-cookie'

const state = () => ({
    loginApiStatus: "",
    userProfile:{
        id:0,
        identity:"",
    },
    logOut: false
});
   
const getters = {
    getLoginApiStatus(state) {
        return state.loginApiStatus;
    },
    getUserProfile(state){
        return state.userProfile;
    },
    getLogout(state){
        return state.logOut;
    }
};
   
const actions = {
    async loginApi({ commit }, payload) {
        const response = await api.post('/login', payload);
        if (response.data.token) {
            commit("setLoginApiStatus", "success");
            cookie.set("isAuthenticated", true);
            cookie.set("userIdentity", payload.identity);
            cookie.set("userPassword", payload.password);
        } else {
            commit("setLoginApiStatus", "failed");
        }
    },
    async userProfile({commit}){
        const response = await jwtInterceptor.get('/user');
        if(response && response.data){
            commit("setUserProfile", response.data)
        }
    },
    async userLogout({commit}){
        const response = await api.post('/logout')
        if(response && response.data){
            commit("setLogout", true)
            cookie.remove("isAuthenticated");
            cookie.remove("userIdentity");
            cookie.remove("userPassword");
        }
        else{
            commit("setLogout", false)
        }
    }
};
   
const mutations = {
    setLoginApiStatus(state, data) {
        state.loginApiStatus = data;
    },
    setUserProfile(state, data){
        const userProfile = {
            id: data.id,
            identity: data.identity,
        };
        state.userProfile = userProfile;
    },
    setLogout(state, payload){
        state.logOut = payload;
    }
};
   
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};