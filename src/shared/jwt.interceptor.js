import api from "../api/index";
 
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
            var response = await api.post(
                '/refresh'
            ).catch((err) => {
                return Promise.reject(err);
            });
            if(response && response.data){
                return api(error.config);
            }
            else{
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);
 
export default jwtInterceptor;