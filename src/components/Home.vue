<template>
	<v-container>
		
		<v-dialog
			v-model="loginDialog"
			max-width="400">
			<Login/>
		</v-dialog>
		<v-card class="card--flex-toolbar pt-0 mt-0 mb-3" flat>
			<v-img height="200" :src="require('../assets/thihuong.jpg')"></v-img>	
			<v-layout justify-center>
				<v-btn 
					flat			
					round			
					color="success"			
					dark			
					large	 		
					class="justify-center"			
					@click="loginDialog = !loginDialog">
					<span class="font-weight-bold title" primary>Vào thi</span>
				</v-btn>
			</v-layout>
		</v-card>

		<v-divider></v-divider>

		<ViewStandings/>
		
		<v-divider></v-divider>
		
		<v-layout row wrap align-center class="pt-2">
			<v-flex class="text-xs-center">
				<h2 class="align-center font-weight-bold grey--text">Timeline</h2>
			</v-flex>
		</v-layout>

		<v-timeline>
			<v-timeline-item color="orange" small>
				<template v-slot:opposite>
					<span
						class="headline font-weight-bold orange--text"
						v-text="'30/03/2019'">
					</span>
				</template>
				<v-card class="rounded-card">
					<div class="pa-2">
					<h2 class="headline font-weight-regular mb-2 orange--text">Thi Hương</h2>
					<div class="pt-0">Các thí sinh tham dự kì thi Hương online tại website: <a href="/">wwww.thihuong.vn</a></div>
					</div>
				</v-card>
			</v-timeline-item>
			
			<v-timeline-item color="green" small>
				<template v-slot:opposite>
					<span class="headline font-weight-bold green--text">06/04/2019</span>
				</template>
				<v-card class="rounded-card">
					<div class="pa-2">
					<h2 class="headline font-weight-regular mb-2 green--text">Thi Hội</h2>
					<div class="pt-0">Kì thi Hội diễn ra tại kinh thành Thăng Long dành cho các thi sinh đã đỗ kì thi Hương</div>
					</div>
				</v-card>
			</v-timeline-item>
			
			<v-timeline-item color="amber" small>
				<template v-slot:opposite>
					<span class="headline font-weight-bold amber--text">02/05/2019</span>
				</template>
				<v-card class="rounded-card">
					<div class="pa-2">
					<h2 class="headline font-weight-regular mb-3 amber--text">Thi Đình</h2>
					<div class="pt-0">Kì thi Hội diễn ra tại kinh thành Thăng Long dành cho các thi sinh đã đỗ kì thi Hội</div>
					</div>
				</v-card>
			</v-timeline-item>

		</v-timeline>
	</v-container>
</template>

<script>
import Login from '@/components/Login'
import ViewStandings from '@/components/ViewStandings'
export default {

	components: {
		Login,
		ViewStandings
	},
	data() {
		return {
			loginDialog: false,
		}
	},
	methods: {
		
	}
}
</script>

<style>
.rounded-card{
    border-radius:10px;
}
</style>
