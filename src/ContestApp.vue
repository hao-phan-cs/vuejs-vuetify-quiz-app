<template>
  <v-app class="grey lighten-4">
		<div v-if="isMobile()">
			<MobileNavbar/>
		</div>
		<div v-else>
			<DesktopNavbar/>
		</div>
    <v-content class='mx-4'>
			<router-view></router-view>	   
    </v-content>
    <v-footer dark height="auto">
			<v-card class="flex" flat tile>
				<v-card-actions class="grey darken-3 justify-center mb-0 pb-0">
					Webdev Hackathon 2019
				</v-card-actions>
				<v-card-actions class="grey darken-3 justify-center mt-0 pt-0">
					&copy;<strong>hao-phan-cs</strong>—18520216@gm.uit.edu.vn
				</v-card-actions>
			</v-card>
		</v-footer>
  </v-app>
</template>

<script>

import MobileNavbar from '@/components/MobileNavbar'
import DesktopNavbar from '@/components/DesktopNavbar'
export default {
  components: {
		MobileNavbar,
		DesktopNavbar
  },
  data () {
    return {
    }
  },
	methods: {
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
	}
}
</script>
