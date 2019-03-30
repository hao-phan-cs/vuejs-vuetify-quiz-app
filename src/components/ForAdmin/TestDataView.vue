<template>
	<v-container class="my-5">
		<v-dialog v-model="sorryDialog" max-width="290">
			<v-card>
				<v-card-title class="headline">Tính năng chưa kịp làm</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="sorryDialog = false">
            Cancel
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-fab-transition>
			<v-btn dark fixed bottom center fab large class="teal lighten-1 white--text" @click="sorryDialog=true">
					Thêm đề
			</v-btn>
		</v-fab-transition>

		<v-layout row wrap>
			<v-flex class="text-xs-center">
				<h3 class="headline align-center font-weight-bold pt-1 mb-2 green white--text rounded">QUẢN LÝ ĐỀ THI</h3>
			</v-flex>
		</v-layout>
		<v-flex v-for="(test, index) in testlist" :key="index" xs12>
			<v-card class="rounded-card mb-2" tile height="100%">
				<v-card-title primary-title clas="mb-0 pb-0">
					<h3 class="headline primary--text font-weight-bold">Đề {{testlist[index].id}}:</h3>
				</v-card-title>
				<v-card-text class="font-weight-regular mt-0 pt-0" style="font-size:18px">
					Số câu hỏi: {{testlist[index].quizlist.length}}
					<v-divider></v-divider>
					Thời gian: {{getTimeStr(testlist[index].timeLimit)}}
					<v-divider></v-divider>
				</v-card-text>
				<v-layout row wrap class="justify-center">
					<v-btn flat class="success" @click="loadTest(test.id)">Xem</v-btn>
					<v-btn flat class="warning" @click="editTest(index)">Chỉnh sửa</v-btn>
					<v-btn flat class="error" @click="deleteTest(index)">Xoá</v-btn>
				</v-layout>
			</v-card>
		</v-flex>

		<v-dialog v-model="editDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar class="primary--text">
          <v-btn icon @click="closeEdit()">
            <v-icon class="primary--text">close</v-icon>
          </v-btn>
					<v-toolbar-title>Chỉnh sửa đề {{onChangingTest.id}}</v-toolbar-title>
					<v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat class="primary--text" @click="editDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
				
				<v-layout wrap justify-center class="mt-3 pt-3">
					<v-flex xs6 class="ml-3 mr-3">
						<v-text-field 
							label="Thời gian (giây)" 
							v-model="onChangingTest.timeLimit" 
							required>
						</v-text-field>
					</v-flex>

					<v-flex v-for="(quiz, index) in onChangingTest.quizlist" :key="index" xs12 md6 class="ma-2 pa-2"> 
						<v-card class="rounded-card" tile height="100%">				
							<v-card-title primary-title>
								<h2 class="teal--text">Câu {{index + 1}}</h2>
							</v-card-title>
							<v-text-field class="ml-3 mr-3" 
								v-model="quiz.question" 
								label="Câu hỏi" 
								required>
							</v-text-field>
							<v-layout row wrap class="ml-3 mr-3">
								<v-flex xs4 md3> 
								<v-select 
									v-model="newType[index]" 
									:items="typeItems"
									label="Loaị dữ liệu thêm"
									:required="!(newType[index]=='none')">
								</v-select>
								</v-flex>
								<v-text-field
									label="URL (nếu có)"
									v-model="(getType(quiz)=='sound')?quiz.sound:(getType(quiz)=='video')?quiz.video:quiz.image" 
									required>
								</v-text-field>
							</v-layout>
							<v-layout row wrap>
								<v-flex xs12 pt-0 mt-0 tile class="ml-3 mr-3">
									<h3 class="warning--text">Đáp án A.</h3>
									<v-text-field
						 				class="mb-0 pb-0"
						 				v-model="quiz.A.text"
										label="Tiêu đề">
									</v-text-field>
									<v-layout row>
									<v-flex xs3><v-select class="mt-0 pt-0 mb-0 pb-0" label="Loaị dữ liệu thêm" :items="typeItems" v-model=newTypeAns.A[index]>
									</v-select></v-flex>
									<v-text-field
										class="pt-0 mt-0"
										v-model="(getType(quiz.A)=='sound')?quiz.A.sound:(getType(quiz.A)=='video')?quiz.A.video:quiz.A.image"
										label="URL (nếu có)">
									</v-text-field>
									</v-layout>
								</v-flex>
							</v-layout>
							<v-layout row wrap>
								<v-flex xs12 pt-0 mt-0 tile class="ml-3 mr-3">
									<h3 class="warning--text">Đáp án B.</h3>
									<v-text-field
						 				class="mb-0 pb-0"
						 				v-model="quiz.B.text"
										label="Tiêu đề">
									</v-text-field>
									<v-layout row>
									<v-flex xs3><v-select class="mt-0 pt-0 mb-0 pb-0" label="Loaị dữ liệu thêm" :items="typeItems" v-model=newTypeAns.B[index]>
									</v-select></v-flex>
									<v-text-field
										class="pt-0 mt-0"
										v-model="(getType(quiz.B)=='sound')?quiz.B.sound:(getType(quiz.B)=='video')?quiz.B.video:quiz.B.image"
										label="URL (nếu có)">
									</v-text-field>
									</v-layout>
								</v-flex>
							</v-layout>
							<v-layout row wrap>
								<v-flex xs12 pt-0 mt-0 tile class="ml-3 mr-3">
									<h3 class="warning--text">Đáp án C.</h3>
									<v-text-field
						 				class="mb-0 pb-0"
						 				v-model="quiz.C.text"
										label="Tiêu đề">
									</v-text-field>
									<v-layout row>
									<v-flex xs3><v-select class="mt-0 pt-0 mb-0 pb-0" label="Loaị dữ liệu thêm" :items="typeItems" v-model=newTypeAns.C[index]>
									</v-select></v-flex>
									<v-text-field
										class="pt-0 mt-0"
										v-model="(getType(quiz.C)=='sound')?quiz.C.sound:(getType(quiz.C)=='video')?quiz.C.video:quiz.C.image"
										label="URL (nếu có)">
									</v-text-field>
									</v-layout>
								</v-flex>
							</v-layout>
							<v-layout row wrap>
								<v-flex xs12 pt-0 mt-0 tile class="ml-3 mr-3">
									<h3 class="warning--text">Đáp án D.</h3>
									<v-text-field
						 				class="mb-0 pb-0"
						 				v-model="quiz.D.text"
										label="Tiêu đề">
									</v-text-field>
									<v-layout row>
									<v-flex xs3><v-select class="mt-0 pt-0 mb-0 pb-0" label="Loaị dữ liệu thêm" :items="typeItems" v-model=newTypeAns.D[index]>
									</v-select></v-flex>
									<v-text-field
										class="pt-0 mt-0"
										v-model="(getType(quiz.D)=='sound')?quiz.D.sound:(getType(quiz.D)=='video')?quiz.D.video:quiz.D.image"
										label="URL (nếu có)">
									</v-text-field>
									</v-layout>
								</v-flex>
							</v-layout>

						</v-card>
						<v-divider></v-divider>
					</v-flex>
				</v-layout>
				<v-layout row class="justify-center align-center text-xs-center">
					<v-btn large class="orange white--text " @click=addNewQuiz()>
						Thêm câu hỏi
					</v-btn>
				</v-layout>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import test1 from '../../data/test1.js'
import test2 from '../../data/test2.js'
import test3 from '../../data/test3.js'
import test4 from '../../data/test4.js'
export default {

	data: () => ({
		editDialog: false,
		sorryDialog: false,
		editOnId: -1,
		onChangingTest: '',
		newType: [],
		newTypeAns: {
			A: [],
			B: [],
			C: [],
			D: [],
		},
		typeItems: [
			'sound',
			'image',
			'video',
			'none'
		],
		testlist: [
			test1, test2, test3, test4
		]	
	}),
	methods: {
		getType(quiz) {
			if (quiz.sound != '') return 'sound'
			if (quiz.video != '') return 'video'
			if (quiz.image != '') return 'image'
			return 'none'
		},
		move_route(route) {
			this.$router.push(route)
		},
		addNewQuiz() {
			var newQuiz	= {
		question: '',
		image: '',
		video: '',
		sound: '',
		selected: '',
		correct:'A',
		A: {
			text: '',
			class: 'primary',
			image: '',
			video: '',
			sound: '',
		},
		B: {
			text: '',
			class: 'primary',
			image: '',
			video: '',
			sound: '',
		},
		C: {
			text: '',
			class: 'primary',
			image: '',
			video: '',
			sound: '',
		},
		D: {
			text: '',
			class: 'primary',
			image: '',
			video: '',
			sound: '',
		},
		description: '',
	}
			this.onChangingTest.quizlist.push(newQuiz)
			this.testlistp[editOnId].quizlist.push(newQuiz)
			var elem = this.$el
			elem.scrollBottom = elem.clientHeight;
		},
		deleteTest(index) {
			this.testlist.splice(index, 1)
		},
		closeEdit() {
			this.editDialog = false
			this.editOnId = -1
			this.onChangingTest = ''
			this.newType.clear()
			this.newTypeAns.A.clear()
			this.newTypeAns.B.clear()
			this.newTypeAns.C.clear()
			this.newTypeAns.D.clear()
		},
		editTest(index) {
			this.onChangingTest = this.testlist[index]
			this.editDialog = true
			this.editOnId = index
			for (var i = 0; i < this.onChangingTest.quizlist.length; i++) {
				this.newType[i] = this.getType(this.onChangingTest.quizlist[i])
				this.newTypeAns.A[i] = this.getType(this.onChangingTest.quizlist[i].A)
				this.newTypeAns.B[i] = this.getType(this.onChangingTest.quizlist[i].B)
				this.newTypeAns.C[i] = this.getType(this.onChangingTest.quizlist[i].C)
				this.newTypeAns.D[i] = this.getType(this.onChangingTest.quizlist[i].D)
			}
		},
		loadTest(id) {
			var route = '/contest/'+id
			this.$router.push(route)
		},
		str_pad_left(string, pad, length) {
			return (new Array(length+1).join(pad)+string).slice(-length)
		},
		getTimeStr(time){
			var minutes = Math.floor(time / 60)
			var seconds = time - minutes * 60
			return this.str_pad_left(minutes,'0',2)+'m'+this.str_pad_left(seconds,'0',2)+'s'
		},
	}
}
</script>
