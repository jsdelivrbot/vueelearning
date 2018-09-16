<template>
	<div class="login_page fillcontain">
		<transition name="form-fade" mode="in-out">
			<section class="form_contianer" v-show="showLogin">
				<div class="manage_tip">
					<p>ESOE E-learning</p>
					<p>後台管理系統</p>
				</div>
				<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用戶名">
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" @keyup.enter.native="submitForm('loginForm')" placeholder="密碼" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登入</el-button>
					</el-form-item>
				</el-form>
				<!-- <p class="tip">温馨提示：</p>
												<p class="tip">未登录过的新用户，自动注册</p>
												<p class="tip">注册过的用户可凭账号密码登录</p> -->
			</section>
		</transition>
	</div>
</template>
<script>
import { login } from '@/config/api'
import { mapActions, mapState } from 'vuex'
export default {
	data() {
		return {
			loginForm: {
				username: '',
				password: '',
			},
			rules: {
				username: [
					{ required: true, message: '請輸入用戶名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '請輸入密碼', trigger: 'blur' }
				],
			},
			showLogin: false,
		}
	},
	mounted() {
		this.showLogin = true;
		if (JSON.parse(window.localStorage.getItem('userInfo'))!=null) {
			this.getAdminData(JSON.parse(window.localStorage.getItem('userInfo')));
		}
	},
	computed: {
		...mapState(['userInfo']),
	},
	methods: {
		...mapActions(['getAdminData']),
		async submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const res = await login({ username: this.loginForm.username, password: this.loginForm.password })
					if (res.data.code == 0) {
						await this.getAdminData(res.data)
						this.$message({
							type: 'success',
							message: '登入成功'
						});
						this.$router.push('manage') //路由至首頁
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg
						});
					}
				} else {
					this.$notify.error({
						title: '錯誤',
						message: '請輸入正確的用戶名密碼',
						offset: 100
					});
					return false;
				}
			});
		},
	},
	watch: {
		userInfo: function(newVal) {
			if (newVal.code == 0) {
				this.$message({
					type: 'success',
					message: '檢測到您之前登入過，將自動登錄'
				});
				setTimeout( () => { this.$router.push('manage') },1000) //路由至首頁			
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/base';
@import '~@/common/scss/mixin';
@import '~@/common/scss/variable';
.login_page {
	background-color: $color-background;
}

.manage_tip {
	position: absolute;
	width: 100%;
	top: -100px;
	left: 0;
	p {
		font-size: $font-size-large-x;
		color: #fff;
	}
}

.form_contianer {
	@include size(320px, 210px);
	@include ctp(320px, 210px);
	padding: 25px;
	border-radius: 5px;
	text-align: center;
	background-color: #fff;
	.submit_btn {
		width: 100%;
		font-size: $font-size-medium;
	}
}

.tip {
	font-size: $font-size-small-s;
	color: $danger-red;
}

.form-fade-enter-active,
.form-fade-leave-active {
	transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
	transform: translate3d(0, -50px, 0);
	opacity: 0;
}
</style>
