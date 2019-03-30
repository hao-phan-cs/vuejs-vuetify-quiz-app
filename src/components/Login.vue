<template>
			<v-card class="rounded-card">
				<v-card-text class="pt-4">
					<div>
						<v-form v-model="valid" ref="form">
							<v-text-field
								label="E-mail"
                v-model="email"
								:rules="emailRules"
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
									@click="submit" 
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
</template>

<script>
  export default {
    data: () => ({
      valid: true,
			e1: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail không được để trống',
        v => /.+@.+/.test(v) || 'Địa chỉ E-mail phải hợp lệ'
      ],
			password: '',
			passwordRules: [
				v => !!v || 'Mật khẩu không được để trống'
			]
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
			submit() {
				this.$router.push('/contest')
			},
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
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
