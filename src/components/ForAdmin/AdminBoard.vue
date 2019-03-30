<template>
	<div class="standings">
		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex class="text-xs-center">
					<h3 class="headline align-center font-weight-bold pt-1 mb-2 primary white--text rounded">DANH SÁCH THÍ SINH</h3>
				</v-flex>
			</v-layout>

			<v-layout row wrap>
				<v-btn small flat color="grey" @click="sortBy('score')">
					<v-icon left small>equalizer</v-icon>
					<h4 class="caption font-weight-bold">Xếp theo điểm (hạng)</h4>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn small flat color="grey" @click="sortBy('time')">
					<v-icon left small>timer</v-icon>
					<h4 class="caption font-weight-bold">Xếp theo thời gian</h4>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn small flat color="grey" @click="sortBy('id')">
					<v-icon left small>filter_1</v-icon>
					<h4 class="caption font-weight-bold">Xếp theo SBD</h4>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn small flat color="grey" @click="sortBy('name')">
					<v-icon left small>format_color_text</v-icon>
					<h4 class="caption font-weight-bold">Xếp theo họ tên</h4>
				</v-btn>
			</v-layout>

			<v-card flat class="pa-3" style="font-size:1em;" v-for="(competitor, index) in topCompetitors" :key="index">
				<v-layout row wrap :class="getClass(index)">
					<v-flex xs6 md4 class="pl-2">
						<div class="caption grey--text">Họ tên</div>
						<div>
							<span class="font-weight-regular">{{competitor.name}}</span>
							<v-spacer v-if="index < 3"></v-spacer>
							<span v-if="sortMode=='score'" :class="getTextColor(index)">{{getPrize(index)}}</span></div>
					</v-flex>
					<v-flex xs3 sm3 md2 class="pr-2">
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
	</div>
</template>

<script>
  export default {
    data: () => ({
			sortMode: 'score',
			topCompetitors: [
			
				{ id: '18520102', gender: 'female', name: 'Phan Thị B', score: 7, time: 20, submitDate: '30/03/2019' },
				{ id: '18520001', gender: 'male', name: 'Nguyễn Văn A', score: 7, time: 30, submitDate: '30/03/2019' },
				{ id: '18520013', gender: 'male', name: 'Trần Văn C', score: 6, time: 40, submitDate: '30/03/2019' },
				{ id: '18520304', gender: 'male', name: 'Lê Phước D', score: 6, time: 10, submitDate: '30/03/2019' },
				{ id: '18524005', gender: 'male', name: 'Lê Hoàng E', score: 5, time: 25, submitDate: '30/03/2019' },
				{ id: '18520206', gender: 'female', name: 'Lê Thị F', score: 5, time: 30, submitDate: '30/03/2019' },
				{ id: '18520007', gender: 'male', name: 'Nguyễn Văn G', score: 4, time: 15, submitDate: '30/03/2019' },
				{ id: '18520008', gender: 'male', name: 'Nguyễn Văn H', score: 4, time: 25, submitDate: '30/03/2019' },
				{ id: '18520009', gender: 'male', name: 'Nguyễn Văn I', score: 4, time: 30, submitDate: '30/03/2019' },
				{ id: '18520010', gender: 'male', name: 'Nguyễn Văn J', score: 4, time: 32, submitDate: '30/03/2019' },
				{ id: '18520011', gender: 'male', name: 'Nguyễn Văn K', score: 4, time: 40, submitDate: '30/03/2019' },
				{ id: '18520042', gender: 'male', name: 'Nguyễn Văn L', score: 4, time: 42, submitDate: '30/03/2019' },
				{ id: '18521013', gender: 'male', name: 'Nguyễn Văn M', score: 4, time: 45, submitDate: '30/03/2019' },
				{ id: '18520214', gender: 'female', name: 'Trần Thị N', score: 4, time: 67, submitDate: '30/03/2019' },
				{ id: '18522015', gender: 'male', name: 'Nguyễn Văn O', score: 4, time: 72, submitDate: '30/03/2019' },
				{ id: '18523016', gender: 'male', name: 'Nguyễn Văn Ô', score: 3, time: 15, submitDate: '30/03/2019' },
				{ id: '18520017', gender: 'male', name: 'Nguyễn Văn Ơ', score: 3, time: 15, submitDate: '30/03/2019' },
				{ id: '18520018', gender: 'male', name: 'Nguyễn Văn P', score: 3, time: 15, submitDate: '30/03/2019' },
				{ id: '18522019', gender: 'male', name: 'Nguyễn Văn R', score: 2, time: 15, submitDate: '30/03/2019' },
				{ id: '18520020', gender: 'male', name: 'Nguyễn Văn S', score: 2, time: 20, submitDate: '30/03/2019' },
				{ id: '18520121', gender: 'male', name: 'Nguyễn Văn T', score: 2, time: 22, submitDate: '30/03/2019' },
				{ id: '18520022', gender: 'male', name: 'Nguyễn Văn U', score: 2, time: 25, submitDate: '30/03/2019' },
				{ id: '18520323', gender: 'male', name: 'Nguyễn Văn V', score: 1, time: 25, submitDate: '30/03/2019' },
				{ id: '18520124', gender: 'male', name: 'Nguyễn Văn W', score: 1, time: 35, submitDate: '30/03/2019' },
				{ id: '18520225', gender: 'female', name: 'Nguyễn Thị Z', score: 0, time: 15, submitDate: '30/03/2019' },
			]
    }),
		mounted() {
			this.sortBy(this.sortMode)
		},
		methods: {
			sortBy(prop) {
				this.sortMode = prop
				if (prop =='score')
					this.topCompetitors.sort((a, b) => b['score'] - a['score'] || a['time'] - b['time'])
				else if (prop == 'time')
					this.topCompetitors.sort((a, b) => a['time'] - b['time'] || b['score'] - a['score'])
				else if (prop=='name')
					this.topCompetitors.sort((a, b) => {
						var res1 = a.name.split(" ").pop()
						var res2 = b.name.split(" ").pop()
						return (res1 < res2)? -1 : 1
					})
				else
					this.topCompetitors.sort((a, b) => (a[prop] < b[prop])? -1 : 1)
			},	
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
