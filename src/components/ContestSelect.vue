<template>
  <v-container grid-list-md>
		
		<v-layout row wrap align-center>
			<v-flex class="text-xs-center">
				<h3 class="headline align-center font-weight-bold mt-3 primary--text">Chọn đề thi</h3>
			</v-flex>
		</v-layout>

    <v-layout row wrap class="text-xs-center">
			<v-flex xs12 md6 v-for="test in testlist" :key="test.id">
				<v-card class="green lighten-1 rounded-card" tile>
					<v-btn 
						block 
						flat 
						primary 
						class="title white--text"
						@click="loadTest(test.id)">
						Đề {{ test.id }}
					</v-btn>
        </v-card>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
import test1 from '../data/test1.js'
import test2 from '../data/test2.js'
import test3 from '../data/test3.js'
import test4 from '../data/test4.js'
export default {

	data: ()=> ({
		testlist: [
			test1,
			test2,
			test3,
			test4,
		]
	}),
	methods: {
		loadTest(id) {
			this.$router.push('/contest/'+id)
		}
	}
}
</script>

<style>
.rounded-card{
    border-radius:7px;
}
</style>
