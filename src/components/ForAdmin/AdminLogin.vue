<template>
	<v-container>
		<v-layout wrap justify-center>
			<v-flex xs12 md5>
        <v-card v-if="authenticated" class="orange lighten-1 rounded-card" tile>
					<v-btn 
						block 
						flat
						class="title white--text"
						@click="loadCompetitorBoard()">
						Xem danh sách thí sinh
					</v-btn>
        </v-card>
				<v-card v-if="authenticated" class="green rounded-card" tile>
					<v-btn 
						block 
						flat 
						primary 
						class="title white--text"
						@click="loadTestDataView()">
						Quản lí đề thi
					</v-btn>
        </v-card>
			<v-card class="rounded-card">
				<v-card-text v-if="!authenticated" class="pt-4">
					<div>
						<v-form v-model="valid" ref="form">
							<v-text-field
								label="Tên đăng nhập (tài khoản quản trị viên)"
                v-model="adminUserName"
								:rules="adminUserNameRules"
								required
							></v-text-field>
							
							<v-text-field
								label="Mật khẩu"
								v-model="password"
								min="8"
								:append-icon="e1 ? 'visibility' : 'visibility_off'"
								:append-icon-cb="() => (e1 = !e1)"
								:type="!e1 ? 'password' : 'text'"
								:rules="passwordRules"
								counter
								required
							></v-text-field>
				
							<v-layout justify-space-between>
								<v-btn 
									flat 
									@click="authenticated=true" 
									color="success"
									:disabled="!valid">
										Đăng nhập
								</v-btn>
								<a class="mt-3 mr-3" href="">Quên mật khẩu </a>
							</v-layout>
						</v-form>
					</div>
				</v-card-text>
			</v-card>
		</v-flex>
		</v-layout>
	</v-container>	
</template>

<script>
  export default {
    data: () => ({
			authenticated: false,
      valid: true,
			e1: false,
      adminUserName: '',
      adminUserNameRules: [
        v => !!v || 'Tên đăng nhập không được để trống',
      ],
			password: '',
			passwordRules: [
				v => !!v || 'Mật khẩu không được để trống'
			]
    }),

    methods: {
			loadCompetitorBoard() {
				this.$router.push('/admin/board')
			},
			loadTestDataView() {
			},
			isMobile() {
				if( navigator.userAgent.match(/Android/i)
					|| navigator.userAgent.match(/webOS/i)
					|| navigator.userAgent.match(/iPhone/i)
					|| navigator.userAgent.match(/iPad/i)
					|| navigator.userAgent.match(/iPod/i)
					|| navigator.userAgent.match(/BlackBerry/i)
					|| navigator.userAgent.match(/Windows Phone/i)
				){
					return true;
				}
				else {
					return false;
				}
			}
		},
  }
</script>
<style>
.rounded-card{
    border-radius:10px;
}
</style>
