<template>
	<v-container>
    <v-layout
      wrap
			justify-center
    >
      <v-flex xs12 md6>
				<h2 class="text-xs-center font-weight-bold pt-1 mb-2 success white--text rounded">ĐĂNG KÝ GHI DANH</h2>
				<v-card class="rounded-card">
				<v-card-text class="pt-2">
				<div>

				<v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Họ tên"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

					<v-layout row>
					<v-flex xs12 lg6 class="mr-3">
						<v-menu
						ref="menu1"
						v-model="menu1"
						:close-on-content-click="false"
						:nudge-right="40"
						lazy
						transition="scale-transition"
						offset-y
						full-width
						max-width="290px"
						min-width="290px">
							<template v-slot:activator="{ on }">
								<v-text-field 
									v-model="dateFormatted" 
									label="Ngày sinh" 
									persistent-hint 
									prepend-icon="event" 
									@blur="date = parseDate(dateFormatted)" 
									v-on="on" 
									readonly 
									:rules="[v => !!v || 'Nhập ngày sinh']">
								</v-text-field>
							</template>
							<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
						</v-menu>
					</v-flex>
					
					<v-select
            v-model="select"
            :items="gender"
            :rules="[v => !!v || 'Chọn giới tính']"
            label="Giới tính"
            required
					></v-select>
					</v-layout>

					<v-text-field
            v-model="address"
            :rules="addressRules"
            label="Địa chỉ"
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
					
					<v-text-field
						label="Nhập lại mật khẩu"
						v-model="re_password"
						min="8"
						:type="!e1 ? 'password' : 'text'"
						:rules="rePasswordRules"
						counter
						required
					></v-text-field>
          
					<v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'Ngươi phải đồng ý để tiếp tục!']"
            required
          >
						<div slot='label' style='font-size: 1em'>
							<span>Thảo dân đã đọc và đồng ý với </span>
							<router-link
								to='/rules'
								tag='span'
								style='cursor: pointer'>
								<span color="primary"><strong><u>thể lệ</u></strong></span>
							</router-link>
							<span> của cuộc thi</span>
						</div>
					</v-checkbox>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Ghi danh 
          </v-btn>
          <v-btn
            color="error"
            @click="reset"
          >
            Huỷ
          </v-btn>
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
    data: vm => ({
      valid: false,
			e1: false,
      name: '',
      nameRules: [
        v => !!v || 'Họ tên không được để trống'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail không được để trống',
        v => /.+@.+/.test(v) || 'Địa chỉ E-mail phải hợp lệ'
      ],
			address: '',
			addressRules: [
				v => !!v || 'Địa chỉ không được để trống'
			],
			password: '',
			passwordRules: [
				v => !!v || 'Mật khẩu không được để trống'	
			],
			re_password: '',
			rePasswordRules: [
				v => !!v || 'Nhập lại mật khẩu',
				v => !this.password.match(v) || 'Nhập lại mật khẩu không khớp'
			],
      select: null,
      gender: [
        'Nam',
        'Nữ'
      ],
      checkbox: false,
			date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
    }),

		computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
					this.$router.push('/')
        }
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
			},
			formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>
<style>
.rounded-card{
    border-radius:10px;
}
</style>
