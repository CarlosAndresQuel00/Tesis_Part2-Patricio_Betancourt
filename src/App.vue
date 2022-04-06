<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ml-auto" v-if="getUserProfile.id === 0">
						<li class="nav-item">
							<router-link to="/login" class="nav-link">Login</router-link>
						</li>
					</ul>
					<ul class="navbar-nav ml-auto" v-else>
						<li class="nav-item">
							<router-link to="/dashboard" class="nav-link">Dashboard</router-link>
						</li>
						<li class="nav-item">
							<button type="button" class="btn btn-link text-decoration-none text-body" @click="logout()">
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<img alt="Vue logo" src="./assets/logo.png">
		<router-view />
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
	name: "App",
	computed: {
		...mapGetters('auth', {
			getUserProfile: "getUserProfile",
			getLogout: "getLogout",
		})
	},
	methods: {
		...mapActions("auth", {
			userLogout: "userLogout",
		}),
		...mapMutations("auth", {
			setLogout: "setLogout",
			setUserProfile: "setUserProfile",
		}),
		async logout() {
			await this.userLogout();
			if (this.getLogout) {
				const resetUser = {
					id: 0,
					identity: "",
				};
				this.setUserProfile(resetUser);
				this.setLogout(false);
				this.$router.replace('/login'); // Go back login page
				// this.$router.go();   // Refresh page
			}
		},
	},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
