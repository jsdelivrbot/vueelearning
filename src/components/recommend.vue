<template>
    <div class="insertExam fillcontain">
        <el-form :inline="true" :model="gradeForm" class="exam-form" v-loading.fullscreen.lock="fullscreenLoading">
            <el-form-item label="選擇測驗年級">
                <el-select v-model="gradeForm.grade" placeholder="請選擇年級">
                    <el-option label="課外教材" value="0"></el-option>
                    <el-option label="國小三年級" value="3"></el-option>
                    <el-option label="國小四年級" value="4"></el-option>
                    <el-option label="國小五年級" value="5"></el-option>
                    <el-option label="國小六年級" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">開始考試</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="推薦閱讀" :visible.sync="dialogFormVisible" size="large">
            <el-form ref="form" :model="form" label-width="80px">

                <div class="question-area" v-for="(question, index) in exam.questionDTOList" :key="question.key">
                    <div class="question-title">題目{{index+1}} 題型:{{question.questionType}}</div>
                    <div class="question-area-content">
                        <p>{{question.questionContent}}</p>
                    </div>
                    <div class="question-area-question-wrapper" v-for="answer in question.answerDTOList" :key="answer.key">
                        <div class="question-area-question">
                            {{answer.title}}.
                        </div>
                        <div class="question-area-answer">
                            <p>
                                <el-radio class="radio" v-model="answer.seletvalue" :label="answer.rightvalue">{{answer.rightvalue}}</el-radio>
                            </p>
                            <p>
                                <el-radio class="radio" v-model="answer.seletvalue" :label="answer.wrongvalue1">{{answer.wrongvalue1}}</el-radio>
                            </p>
                            <p>
                                <el-radio class="radio" v-model="answer.seletvalue" :label="answer.wrongvalue2">{{answer.wrongvalue2}}</el-radio>
                            </p>
                            <p>
                                <el-radio class="radio" v-model="answer.seletvalue" :label="answer.wrongvalue3">{{answer.wrongvalue3}}</el-radio>
                            </p>
                        </div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">我看懂啦</el-button>
                <el-button type="primary" @click="saveExam()">太多生詞啦</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
import {exam_insert_url,exam_autoGenerate_url} from '@/config/api'
export default {
    data() {
        return {
            gradeForm: {
                grade: '',
            },
            form: {},
            dialogFormVisible: false,
            exam: {},
            questionList: {},
            answerList: [],
            answerselect:{},
            fullscreenLoading: false,
            formLabelWidth: '120px',
            radio: '1',

        }
    },
    methods: {
        onSubmit() {
            this.fullscreenLoading = true;
            this.getData()
        },
        saveExam() {
            // delete this.exam.questionDTOList
            // self = this
            // this.exam.questionDTOList.forEach(function(question) {
            //     delete question.answerDTOList
            // });
            this.exam.questionDTOList = JSON.stringify(this.exam.questionDTOList)
            this.$http.post(exam_insert_url,qs.stringify(this.exam))
                .then(response => {
                    if (response.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '修改失敗'
                    });
                });
        },
        databinding(data) {
            this.exam = data
            this.questionList = data.questionDTOList
            self = this
            this.questionList.forEach(function(question) {
                self.answerList.push(question.answerDTOList)
            });
            // this.answerList.forEach(function(answers) {
            //     answers.forEach(function(answer) {
            //         self.answer.push(answer.rightvalue)
            //         self.answer.push(answer.wrongvalue1)
            //         self.answer.push(answer.wrongvalue2)
            //         self.answer.push(answer.wrongvalue3)
            //     });
            // });
            // console.log(this.answer)
        },
        getData() {
            this.$http.get(exam_autoGenerate_url, {
                params: {
                    grade: this.gradeForm.grade,
                    examNumber: 1,
                }
            }).then(response => {
                this.fullscreenLoading = false;
                if (response.data.code == 0) {
                    console.log(response.data.data)
                    this.databinding(response.data.data)
                    this.$message({
                        type: 'success',
                        message: '自動出卷成功'
                    });
                    this.dialogFormVisible = true;
                }
            }).catch(error => {
                this.fullscreenLoading = false;
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '自動出卷失敗,請選擇后年級重試'
                });
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.exam-form {
    text-align: center;
}

.el-select {
    display: block;
}

.table-expand {
    font-size: 0;
    .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        color: #99a9bf;
        label {
            width: 90px;
            color: #99a9bf;
        }
    }
}

.question-area {
    background-color: #fff;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .1), 1px 1px 1px rgba(0, 0, 0, .1);
    padding: 30px 50px;
    margin-bottom: 20px;
    border-radius: 3px;
}

.question-area-content {
    font-size: 1.6em;
    line-height: 1.5;
    text-align: justify;
    margin-bottom: 25px;
    padding: 10px;
    border: 1px solid #cfcfcf;
}

.question-area-question-wrapper {
    margin-bottom: 25px;
}

.question-area-question {
    line-height: 1.5;
}

.question-area-answer {
    p {
        margin: 10px 0;
        line-height: 1.2;
    }
}
</style>
