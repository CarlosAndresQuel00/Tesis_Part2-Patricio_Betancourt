import api from "../api/index";
import cookie from 'js-cookie'
 
const jwtInterceptor = api;
 
jwtInterceptor.interceptors.request.use((config) => {
    return config;
});
 
jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            await api.post('/login', {
                "identity": cookie.get("userIdentity"),
                "password": cookie.get("userPassword")
            }).then((response) => {
                api.post('/logout')
                .catch((err) => {
                    return Promise.reject(err);
                });
                cookie.remove("isAuthenticated");
                cookie.remove("userIdentity");
                cookie.remove("userPassword");
                if(response && response.data){
                    return api(error.config);
                }else{
                    return Promise.reject(error);
                }
            });
        } else {
            return Promise.reject(error);
        }
    }
);
 
export default jwtInterceptor;