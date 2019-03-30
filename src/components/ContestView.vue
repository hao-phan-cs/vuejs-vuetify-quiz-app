<template>
	<v-container grid-list-xl>	
		<v-layout wrap row justify-center>
			<v-fab-transition>
				<v-btn 
					:color="(timeLimit - elapsedTime <= 15)? 'error': 'warning'" 
					style="pointer-events: none; text-transform: none !important;" 
					dark fixed bottom right fab large>
					{{leftTimeStr}}
				</v-btn>
			</v-fab-transition>
			
			<v-dialog v-model="waiting" fullscreen hide-overlay transition="dialog-bottom-transition">
				<v-card>
					<v-card-title primary-title class="layout justify-center mb-0 pb-0">
						<h2>Thông tin bài thi</h2>
					</v-card-title>

					<v-card-text class="text-xs-center font-weight-regular mb-0 pb-0" style="font-size:16px">
						Số câu hỏi: {{quizlist.length}}
						<v-divider></v-divider>
						Thời gian: {{leftTimeStr}}
						<v-divider></v-divider>
					</v-card-text>
					
					<v-card-actions class="layout justify-center text-xs-center">
						<v-btn large color="green darken-1" flat @click="waiting = false">Làm bài</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-dialog v-model="dialog" persistent max-width="290">
				<v-card>
					<v-card-title primary-title class="layout justify-center">
						<h2>Kết quả: {{correctCount}} / {{quizlist.length}}</h2>
					</v-card-title>
					<v-card-title class="font-weight-regular layout justify-center">
						<h3>Thời gian: {{elapsedTimeStr}}</h3>
					</v-card-title>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" flat @click="dialog = false">Xem chi tiết</v-btn>
						<v-btn color="green darken-1" flat @click="gohome()">Về trang chủ</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-flex v-for="(quiz, index) in quizlist" :key="index" xs12 md8> 
				<v-card class="rounded-card" tile height="100%">				
				<v-card-text class="pt-2">
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">
								<v-icon style="font-size: 26x">create</v-icon>
								Câu {{ index + 1 }}:   
								<v-icon 
									v-if="quiz.correct==quiz.selected && submitted" 
									style="font-size: 30px" 
									class="s.font-weight-bold.font-italic success--text">
									done
								</v-icon>
								<v-icon
									v-if="!(quiz.correct==quiz.selected) && submitted" 
									style="font-size: 30px" 
									class="s.font-weight-bold.font-italic error--text">
									clear
								</v-icon>
							</h3>
							<div mb-0>
								<span style="font-size: 16px">{{ quiz.question }}</span>
								<v-divider></v-divider>
								<vuetify-audio
									v-if="quiz.sound!=''"
									:file="quiz.sound">
								</vuetify-audio>
								<d-player v-if="quiz.video!=''" :options="getVideoOption(quiz.video)"></d-player>
								<v-img contain class="rounded-card" v-bind:src="quiz.image"></v-img>
							</div>
						</div>
					</v-card-title>
					
					<v-layout row wrap style="vertical-align: bottom;">
						<v-flex xs6 pt-0 mt-0 tile>
							<v-img 
								v-if="quiz.A.image!=''"
								outline 
								aspect-ratio="1.7778" 
								v-bind:src="quiz.A.image">
							</v-img>
							<vuetify-audio
								v-if="quiz.A.sound!=''"
								:file="quiz.A.sound">
							</vuetify-audio>
							<d-player container v-if="quiz.A.video!=''" :options="getVideoOption(quiz.A.video)"></d-player>
							<v-btn
								block
								:style="submitted? 'pointer-events: none' : ''"
								:outline="!((quiz.selected==='A'))"
								:class="quiz.A.class"
								@click="select(index, 'A')"> 
								<span>A. {{ quiz.A.text }}</span>
							</v-btn>
						</v-flex>
						<v-flex xs6 pt-0 mt-0>
							<v-img 
								v-if="quiz.B.image!=''"
								outline 
								aspect-ratio="1.7778" 
								v-bind:src="quiz.B.image">
							</v-img>
							<vuetify-audio
								v-if="quiz.B.sound!=''"
								:file="quiz.B.sound">
							</vuetify-audio>
							<d-player v-if="quiz.B.video!=''" :options="getVideoOption(quiz.B.video)"></d-player>
							<v-btn 
								block
								:style="submitted? 'pointer-events: none' : ''"
								:outline="!(quiz.selected==='B')"
								:class="quiz.B.class"
								@click="select(index, 'B')"> 
								<span>B. {{ quiz.B.text }}</span>
							</v-btn>
						</v-flex>
					</v-layout>
					<v-layout row wrap style="vertical-align: bottom;">
						<v-flex xs6 pt-0 mt-0 mb-0 pb-0>
							<v-img 
								v-if="quiz.C.image!=''"
								outline 
								aspect-ratio="1.7778" 
								v-bind:src="quiz.C.image">
							</v-img>
							<vuetify-audio
								v-if="quiz.C.sound!=''"
								:file="quiz.C.sound">
							</vuetify-audio>
							<d-player v-if="quiz.C.video!=''" :options="getVideoOption(quiz.C.video)"></d-player>
							<v-btn 
								block 
								:style="submitted? 'pointer-events: none' : ''"
								:class="quiz.C.class"
								:outline="!(quiz.selected==='C')"
								@click="select(index, 'C')">
								<span>C. {{ quiz.C.text }}</span>
							</v-btn>
						</v-flex>
							
						<v-flex xs6 pt-0 mt-0 mb-0 pb-0>
							<v-img 
								v-if="quiz.D.image!=''"
								outline 
								aspect-ratio="1.7778" 
								v-bind:src="quiz.D.image">
							</v-img>
							<vuetify-audio
								v-if="quiz.D.sound!=''"
								:file="quiz.D.sound">
							</vuetify-audio>
							<d-player v-if="quiz.D.video!=''" :options="getVideoOption(quiz.D.video)"></d-player>
							<v-btn 
								block 
								:style="submitted? 'pointer-events: none' : ''"
								:class="quiz.D.class"
								:outline="!(quiz.selected==='D')"
								@click="select(index, 'D')">
								<span>D. {{ quiz.D.text }}</span>
							</v-btn>
						</v-flex>
					</v-layout>
					<v-flex xs12> <v-divider v-if="submitted" class="grey-darken-1"></v-divider> </v-flex>
					<div v-if="submitted" style="text-align: justify" class="brown--text">
						<span><strong>Đáp án {{quiz.correct}}: </strong>{{ quiz.description }}</span>
					</div>
				</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout row wrap align-center>
			<v-flex class="text-xs-center">
				<v-btn
					:style="submitted? 'pointer-events: none' : ''"
					:class="submitted? 'teal white--text':'success'" 
					:flat="submitted"
					large 
					@click="submit()">
					{{btnSubmitStr}}
				</v-btn>
				<v-btn v-if="submitted" class="primary" large @click="gohome()">
					Trang chủ
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import test1 from '../data/test1.js'
import test2 from '../data/test2.js'
import test3 from '../data/test3.js'
import test4 from '../data/test4.js'
import VuetifyAudio from 'vuetify-audio'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
	props: ['id'],
	data: () => ({
		quizlist: [],
		waiting: true,
		testlist: [
			test1,
			test2,
			test3,
			test4,
		],
		correction: [],
		submitted: false,
		btnSubmitStr: 'Nộp bài',
		dialog: false,
		correctCount: 0,
		elapsedTime: 0,
		timeLimit: 0,
		leftTimeStr: '',
		elapsedTimeStr:'',
	}),
	components: {
		'vuetify-audio': VuetifyAudio,
    'd-player': VueDPlayer
	},
	created() {
		this.countdown()
		switch(this.id) {
			case 'A1':
				this.quizlist = this.testlist[0].quizlist
				this.timeLimit = this.testlist[0].timeLimit
				break
			case 'A2':
				this.quizlist = this.testlist[2].quizlist
				this.timeLimit = this.testlist[2].timeLimit
				break
			case 'A3':
				this.quizlist = this.testlist[3].quizlist
				this.timeLimit = this.testlist[3].timeLimit
				break
			case 'A4':
				this.quizlist = this.testlist[3].quizlist
				this.timeLimit = this.testlist[3].timeLimit
				break
			default:
				break
		}
		this.leftTimeStr = this.getTimeStr(this.timeLimit - this.elapsedTime)
		this.elapsedTimeStr = this.getTimeStr(this.elapsedTime)
	},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	methods: {
		stopAll() {
			for (var i = 0; i < this.quizlist.length; i++) {
				this.quizlist[i].A.class = 'normal'
				this.quizlist[i].B.class = 'normal'
				this.quizlist[i].C.class = 'normal'
				this.quizlist[i].D.class = 'normal'
			}
		},
		reset(index) {
			this.quizlist[index].A.class = 'primary'
			this.quizlist[index].B.class = 'primary'
			this.quizlist[index].C.class = 'primary'
			this.quizlist[index].D.class = 'primary'
		},
		submit() {
			this.stopAll()
			this.submitted = true
			for (var i = 0; i < this.quizlist.length; i++) {
				if (this.quizlist[i].selected == this.quizlist[i].correct) {
					this.correctCount++
					switch (this.quizlist[i].selected) {
						case 'A':
							this.quizlist[i].A.class = 'success'
							break
						case 'B':
							this.quizlist[i].B.class = 'success'
							break
						case 'C':
							this.quizlist[i].C.class = 'success'
							break
						case 'D':
							this.quizlist[i].D.class = 'success'
							break
					}
				}
				else {
					switch (this.quizlist[i].selected) {
						case 'A':
							this.quizlist[i].A.class = 'error'
							break
						case 'B':
							this.quizlist[i].B.class = 'error'
							break
						case 'C':
							this.quizlist[i].C.class = 'error'
							break
						case 'D':
							this.quizlist[i].D.class = 'error'
							break
					}
					switch (this.quizlist[i].correct) {
						case 'A':
							this.quizlist[i].A.class = 'success success--text font-weight-bold'
							break
						case 'B':
							this.quizlist[i].B.class = 'success success--text font-weight-bold'
							break
						case 'C':
							this.quizlist[i].C.class = 'success success--text font-weight-bold'
							break
						case 'D':
							this.quizlist[i].D.class = 'success success--text font-weight-bold'
							break
					}	
				}
			}
			this.dialog = true
			this.btnSubmitStr = "Kết quả: "+this.correctCount+"/"+this.quizlist.length
		},
		select(index, answer) {
			this.reset(index)
			if (this.quizlist[index].selected === answer)
				this.quizlist[index].selected = ''
			else 
				this.quizlist[index].selected = answer
			
			switch (this.quizlist[index].selected) {
				case 'A':
					this.quizlist[index].A.class = 'warning'
					break
				case 'B':
					this.quizlist[index].B.class = 'warning'
					break
				case 'C':
					this.quizlist[index].C.class = 'warning'
					break
				case 'D':
					this.quizlist[index].D.class = 'warning'
					break
			}
		},
		gohome() {
			this.$router.push('/')
		},
		str_pad_left(string, pad, length) {
			return (new Array(length+1).join(pad)+string).slice(-length)
		},
		getTimeStr(time){
			var minutes = Math.floor(time / 60)
			var seconds = time - minutes * 60
			return this.str_pad_left(minutes,'0',2)+'m'+this.str_pad_left(seconds,'0',2)+'s'
		},
		countdown (){  
				
			this.timer = setInterval(() => {
				if ((this.elapsedTime < this.timeLimit) && !this.submitted) {
					if (!this.waiting) this.elapsedTime++
					this.leftTimeStr = this.getTimeStr(this.timeLimit - this.elapsedTime)
					this.elapsedTimeStr = this.getTimeStr(this.elapsedTime)
				}
				else if (!this.submitted) {
					this.submit()	
					clearInterval(this.timer);
				}
			}, 1000)
		},
		getVideoOption(new_url){
		
			return {
				video: {
					url: new_url,
					pic: ''
				},
				autoplay: false,
				contextmenu: [
				{
					text: '',
					link: ''
				}]
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
