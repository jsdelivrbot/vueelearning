import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userInfo: {
		avatar: 'default.jpg'
	},
}
//改變state的方法
const mutations = {
	saveAdminInfo(state, userInfo){
		state.userInfo = userInfo;
		window.localStorage.setItem('userInfo',JSON.stringify(userInfo));
		console.log("save userInfo success")
	}
}

const actions = {
	getAdminData({commit},res) {
		commit('saveAdminInfo', res);
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})