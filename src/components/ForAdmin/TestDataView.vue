<template>
	<v-container class="my-5">
		<v-fab-transition>
			<v-btn dark fixed bottom right fab large class="teal lighten-1 white--text">
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
					<v-btn flat class="success" @click="loadTest(test.id)">Xem giao diện thi</v-btn>
					<v-btn flat class="warning" @click="editTest(index)">Chỉnh sửa</v-btn>
					<v-btn flat class="error" @click="deleteTest(index)">Xoá</v-btn>
				</v-layout>
			</v-card>
		</v-flex>

		<v-dialog v-model="editDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar fixed class="grey--text">
          <v-btn icon @click="editDialog = false">
            <v-icon class="grey--text">close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="editDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
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
		onChangingTest: '',
		testlist: [
			test1, test2, test3, test4
		]	
	}),
	methods: {
		move_route(route) {
			this.$router.push(route)
		},
		deleteTest(index) {
			this.testlist.splice(index, 1)
		},
		editTest(index) {
			this.onChangingTest = this.testlist[index]
			this.editDialog = true
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
