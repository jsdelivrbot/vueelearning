<template>
	<div class="insertLessonPlan">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="年級" prop="planGrade">
				<el-select v-model="form.planGrade" placeholder="請選擇年級">
					<el-option label="國小三年級教材" value="3"></el-option>
					<el-option label="國小四年級教材" value="4"></el-option>
					<el-option label="國小五年級教材" value="5"></el-option>
					<el-option label="國小六年級教材" value="6"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="單元" prop="planLesson">
				<el-input v-model="form.planLesson" placeholder="請輸入教案屬於第幾單元(例如:第一單元請輸入1)"></el-input>
			</el-form-item>
			<el-form-item label="標籤" prop="planHashtag">
				<el-input v-model="form.planHashtag" placeholder="可在此給教案一個標籤"></el-input>
			</el-form-item>
			<el-form-item label="檔案">
				<el-upload ref="upload" drag :action="lessonPlan_url" multiple :auto-upload="false" :before-upload="handleUpload" :data="form" :on-success="success" :on-error="resError">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">將文件拖曳到此處，或
						<em>點擊上傳</em>
					</div>
					<div class="el-upload__tip" slot="tip">文件大小不能超过5MB</div>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即創建</el-button>
				<el-button @click="trigger">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import {lessonPlan_url} from '@/config/api'	 
export default {
	name: 'insertLessonPlan',
	data() {
		return {
			lessonPlan_url: lessonPlan_url,
			labelPosition: 'right',
			form: {
				planLesson: '',
				planGrade: '',
				planHashtag: '',
				createBy: this.$route.params.user,
			}
		}
	},
	methods: {
		trigger() {
			this.$refs.form.resetFields()
			setTimeout(() => {
				this.$refs.upload.clearFiles()
			}, 1000);
		},
		handleUpload: function(file) {
			// console.log(file)
		},
		success(response, file) {
			if (response.code == 0) {
				this.$message({
					type: 'success',
					message: '上傳成功'
				});
				this.trigger()
			}
		},
		resError(response, file) {
			this.$message({
				type: 'error',
				message: '上傳失敗'
			});
			console.log(response)
		},
		onSubmit() {
			this.$refs.upload.submit();
		}
	}
}
</script>
<style lang="scss" scoped>
.insertLessonPlan {
	position: relative;
	padding: 32px 32px 24px 32px;
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: 2px 3px 4px rgba(0, 0, 0, .2);
}

.el-select {
	display: block;
}
</style>