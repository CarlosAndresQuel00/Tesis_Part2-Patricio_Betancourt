<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<router-link to="/login" class="nav-link">Login</router-link>
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
export default {
  name: "App",
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
