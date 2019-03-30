<template>
		<v-container class="ma-0 pa-0"> 
			<v-layout row wrap align-center>
				<v-flex class="text-xs-center">
					<h3 class="headline align-center font-weight-bold pt-1 mb-1 amber white--text rounded">BẢNG VÀNG</h3>
				</v-flex>
			</v-layout>

			<v-card flat class="pa-3" style="font-size:1em;" v-for="(competitor, index) in topCompetitors" :key="index">
				<v-layout row wrap :class="getClass(index)">
					<v-flex xs6 md4 class="pl-2">
						<div class="caption grey--text">Họ tên</div>
						<div>
							<span class="font-weight-regular">{{competitor.name}}</span>
							<v-spacer v-if="index < 3"></v-spacer>
							<span :class="getTextColor(index)">{{getPrize(index)}}</span></div>
					</v-flex>
					<v-flex xs3 sm3 md2>
						<div class="caption grey--text">Số báo danh</div>
						<v-chip :color="getColor(index)" class="white--text">{{competitor.id}}</v-chip>
					</v-flex>
					<v-flex xs3 sm3 md2>
						<div class="caption grey--text">Điểm</div>
						<v-chip :color="getColor(index)" class="white--text">{{competitor.score}}</v-chip>
					</v-flex>
					<v-flex xs6 sm3 md2 class='pl-2'>
						<div class="caption grey--text">Thời gian</div>
						<v-chip :color="getColor(index)" class="white--text">{{getTimeStr(competitor.time)}}</v-chip>
					</v-flex>
					<v-flex xs3 sm3 md2 class='pl2'>
						<div class="caption grey--text">Ngày thi</div>
						<v-chip :color="getColor(index)" class="white--text">{{competitor.submitDate}}</v-chip>
					</v-flex>
				</v-layout>
			</v-card>
		</v-container>
</template>

<script>
  export default {
    data: () => ({

			topCompetitors: [
				{ id: '18520102', gender: 'female', name: 'Phan Thị B', score: 7, time: 20, submitDate: '30/03/2019' },
				{ id: '18520001', gender: 'male', name: 'Nguyễn Văn A', score: 7, time: 30, submitDate: '30/03/2019' },
				{ id: '18520013', gender: 'male', name: 'Trần Văn C', score: 6, time: 40, submitDate: '30/03/2019' },
				{ id: '18520304', gender: 'male', name: 'Lê Phước D', score: 6, time: 10, submitDate: '30/03/2019' },
				{ id: '18524005', gender: 'male', name: 'Lê Hoàng E', score: 5, time: 25, submitDate: '30/03/2019' },
				{ id: '18520206', gender: 'female', name: 'Lê Thị F', score: 5, time: 30, submitDate: '30/03/2019' },
				{ id: '18520007', gender: 'male', name: 'Nguyễn Văn G', score: 4, time: 15, submitDate: '30/03/2019' },
			]
    }),
		methods: {
		
			getClass(index) {
				return ((index==0)? 'trang-nguyen' : ((index==1)? 'bang-nhan' : ((index==2)? 'tham-hoa' : 'normie'))) + ' font-weight-bold'
			},
			getPrize(index) {
				return (index==0)? 'Trạng nguyên' : ((index==1)? 'Bảng nhãn' : ((index==2)? 'Thám hoa' : ''))
			},
			getColor(index) {
				return (index==0)? 'orange' : ((index==1)? 'red' : ((index==2)? 'teal' : 'grey'))
			},
			getTextColor(index) {
				return (index==0)? 'orange--text' : ((index==1)? 'red--text' : ((index==2)? 'teal--text' : 'grey'))
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

<style>
.trang-nguyen {
	border-left: 4px solid orange; 
}
.bang-nhan {
	border-left: 4px solid tomato;
}
.tham-hoa {
	border-left: 4px solid #3cd1c2; 
}
.normie {
	border-left: 4px solid grey;
}
.rounded {
	border-radius: 10px;
}
</style>
