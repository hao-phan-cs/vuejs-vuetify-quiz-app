import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ContestView from '@/components/ContestView'
import ContestSelect from '@/components/ContestSelect'
import RuleView from '@/components/RuleView'

import AdminLogin from '@/components/ForAdmin/AdminLogin'
import AdminBoard from '@/components/ForAdmin/AdminBoard'
import TestDataView from '@/components/ForAdmin/TestDataView'
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/signup',
			name: 'Sign Up',
			component: SignUp
		},
		{
			path: '/login',
			name: 'Log in',
			component: Login
		},
		{
			path: '/rules',
			name: 'Contest Rules',
			component: RuleView
		},
		{
			path: '/contest',
			name: 'ContestSelect',
			component: ContestSelect 
		},
		{
			path: '/contest/:id',
			name: 'Contest',
			props: true,
			component: ContestView
		},
		{
			path: '/admin',
			name: 'Admin Login',
			component: AdminLogin
		},
		{
			path: '/admin/board',
			name: 'Admin Board',
			component: AdminBoard
		},
		{
			path: '/admin/test-data',
			name: 'Test Data',
			component: TestDataView
		}
	],
	mode: 'history'
})
export default router
