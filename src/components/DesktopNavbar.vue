<template>
	<nav>
    <v-toolbar fixed app>
			<v-toolbar-title class="grey--text">
				<router-link to='/' style='cursor: pointer' tag='span'>
					<span>THI HƯƠNG </span>
					<span class='font-weight-bold'>ONLINE</span>
				</router-link>
			</v-toolbar-title>
			
			<v-spacer></v-spacer>
                                                     
			<v-btn flat @click='dialog=true' color='grey darken-1'>
				<v-icon right style="font-size: 20px">account_box</v-icon>
				<span class='text-uppercase' title>Đăng Nhập</span>
			</v-btn>
			<v-btn flat @click='signup' color='grey darken-1'>
				<v-icon right style="font-size: 20px">create</v-icon>
				<span class='text-uppercase' title>Ghi danh</span>
			</v-btn>
			<v-btn flat @click="dialog=!dialog" color='grey darken-1'>
				<v-icon right style="font-size: 20px">check</v-icon>
				<span class='text-uppercase' title>Vào thi</span>
			</v-btn>
			<v-btn flat @click="move_route('/rules')" color='grey darken-1'>
				<v-icon right style="font-size: 20px">import_contacts</v-icon>
				<span class='text-uppercase' title>Thể lệ</span>
			</v-btn>
			
			<v-menu offset-y>
				<template v-slot:activator="{ on }">
					<v-btn flat color="grey darken-1" v-on="on">
						<v-icon right style="font-size: 20px">account_circle</v-icon>
						<span class='text-uppercase' title>Admin</span>
					</v-btn>
				</template>
				<v-list>
					<v-list-tile @click="move_route('/admin/board')">
						<v-list-tile-title>Xem danh sách thí sinh</v-list-tile-title>
					</v-list-tile>
					<v-list-tile @click="move_route('/admin/test-data')">
						<v-list-tile-title>Quản lí đề thi</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>	
		</v-toolbar>
		
		<v-dialog
			v-model="dialog"
			max-width="400">
			<Login/>
		</v-dialog> 
	</nav>
</template>

<script>

import Login from '@/components/Login'
export default {

	components: {
		Login,	
	},

	data() {
		return {
			dialog: false,
			drawer: false,
		}
	},
	watch:{
    $route (to, from){
			location.reload()
    }
	}, 
	methods: {
		signup() {
			this.$router.push('/signup')
		},
		move_route(route) {
			this.$router.push(route)
		}
	}
}
</script>
