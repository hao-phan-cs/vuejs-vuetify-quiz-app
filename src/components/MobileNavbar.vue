<template>
	<nav>
    <v-toolbar fixed app>
      <v-toolbar-side-icon
				@click="drawer=!drawer"
				color="grey--text">
			</v-toolbar-side-icon>
			
			<v-toolbar-title class="grey--text">
				<router-link to='/' style='cursor: pointer' tag='span'>
					<span>THI HƯƠNG </span>
					<span class='font-weight-bold'>ONLINE</span>
				</router-link>
			</v-toolbar-title>
    </v-toolbar>
		
		<v-navigation-drawer 
			app 
			v-model='drawer' 
			class=''
			temporary
			pernament
      hide-overlay
			>
			<v-img
				:src="require('../assets/trongdong.jpg')"
				contain
				sm4
			>
      </v-img>
			
			<v-divider></v-divider>

			<v-dialog
				v-model="dialog"
				max-width="400">
				<Login/>
			</v-dialog>

			<v-btn flat color='success' @click='dialog=true'>
				<v-icon>account_box</v-icon>
				<span class='text-uppercase'>Đăng Nhập</span>
			</v-btn>
			<v-btn flat color='warning' @click='signup'>
				<v-icon>create</v-icon>
				<span class='text-uppercase'>Ghi danh</span>
			</v-btn>
			
			<v-divider></v-divider>

			<v-list>
				<v-list-tile v-for='link in links' :key='link.text' @click="move_route(link.route)">
					<v-list-tile-action>
						<v-icon class='grey-darken-1--text'>{{ link.icon }}</v-icon>	
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class='grey-darken-1--text'>{{ link.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-divider></v-divider>
				<v-list-group prepend-icon="account_circle" value="false">
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-title>
								<span>Admin</span>
							</v-list-tile-title>
						</v-list-tile>
					</template>
					<v-list-tile @click="move_route('/admin/board')">
						<v-list-tile-title>Xem danh sách thí sinh</v-list-tile-title>
					</v-list-tile>
					<v-list-tile @click="move_route('/admin/test-data')">
						<v-list-tile-title>Quản lí đề thi</v-list-tile-title>
					</v-list-tile>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>
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
			links: [
				{ icon: 'home', text: 'Trang chủ', route: '/' },
				{ icon: 'check', text: 'Vào thi', route: '/contest' },
				{ icon: 'import_contacts', text: 'Thể lệ', route: '/rules'},
			]
		}
	},
	watch:{
    $route (){ // jshint ignore:line
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
