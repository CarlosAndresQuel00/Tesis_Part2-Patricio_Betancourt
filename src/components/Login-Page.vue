<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-4 mt-5">
                <form>
                    <div class="form-group">
                        <label for="identity" class="form-label">Cédula:</label>
                        <input type="text" class="form-control" id="identity" v-model="identity"/>
                    </div>
                    <div class="mb-3">	
                        <div class="form-group">
                            <label for="password" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="password" v-model="password"/>
                        </div>
                    </div>
                        
                    <button type="button" @click="login()">
						<span v-show="!loading">Login</span>
						<span v-show="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			identity: "",
			password: "",
			loading: false
		};
	},
	computed: {
		...mapGetters("auth", {
			getLoginApiStatus: "getLoginApiStatus",
		}),
	},
	methods: {
		...mapActions("auth", {
			actionLoginApi: "loginApi",
		}),
		async login() {
			const payload = {
				identity: this.identity,
				password: this.password,
			};
			if(payload.identity !== "" && payload.password !== ""){
				this.loading = true;
				await this.actionLoginApi(payload);
				if(this.getLoginApiStatus == "success"){
					this.loading = false;
					this.$router.replace("/dashboard");
				}else{
					alert("failed")
					this.loading = false;
				}
			}
		},
	},
}
</script>