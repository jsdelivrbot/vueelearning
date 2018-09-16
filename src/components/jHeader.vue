<template>
	<header class="jHeader">
		<nav style="position:relative;padding-left:30px">
			<router-link to='/manage'>{{msg}}</router-link>
			<a style="float:right;padding-right:60px"><el-button type="primary" size="mini" @click="signout">登出</el-button></a>
			<a style="float:right;padding-right:40px">{{user}}</a>
			<a style="float:right;padding-right:10px"><i class="el-icon-information"></i></a>
		</nav>
	</header>
</template>
<script>
	export default{
		name: 'jHeader',
		data() {
			return {
				msg:'E-learning System',
				user:JSON.parse(window.localStorage.getItem("userInfo")).data.userAccount
			}
		},
		methods: {
			signout() {
				localStorage.clear();
				this.$router.push('/')
			}
		}
	}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/variable';
header{
	height: 80px;
	color:$white;
	top:0;
	left:0;
	width:100%;
	background-color:$color-background;
	z-index: 100;
	position: relative;
	line-height: 80px;
	a {
		color:$white;
	}
}
</style>