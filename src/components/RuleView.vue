<template>
	<v-container>
    <v-layout
      wrap
			justify-center>
      <v-flex xs12 md6>
				<v-card class="rounded-card" flat>
					<v-card-title primary-title class="layout justify-center mb-0 pb-0 primary--text">
						<h2>Thể lệ cuộc thi</h2>
					</v-card-title>
					<v-card-text class="pt-2" style="text-align: justify">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
					</v-card-text>
					<v-card-actions class="layout justify-center text-xs-center mt-0 pt-0">
						<v-btn large color="green darken-1 white--text" @click="gohome()">Trang chủ</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script> 
export default {
	methods: {
		gohome() {
			this.$router.push('/')
		}
	}
}
</script>
