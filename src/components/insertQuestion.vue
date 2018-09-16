<template>
    <div class="insertQuestion fillcontain">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="自動產生題目" name="first">
                <el-form ref="autoform" :model="autoform" label-width="80px">
                    <el-form-item label="年級" prop="questionGrade">
                        <el-select v-model="autoform.questionGrade" placeholder="請選擇所屬題目年級">
                            <el-option label="國小三年級教材" value="3"></el-option>
                            <el-option label="國小四年級教材" value="4"></el-option>
                            <el-option label="國小五年級教材" value="5"></el-option>
                            <el-option label="國小六年級教材" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="題目類別" prop="questionType">
                        <el-select v-model="autoform.questionType" placeholder="請選擇欲產生之題目的類別">
                            <el-option label="單選題" value="1"></el-option>
                            <el-option label="閱讀測驗" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完整教材" prop="questionContent">
                        <el-input type="textarea" :rows="4" placeholder="請輸入欲產生題目之教材" v-model="autoform.questionContent">
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="手動輸入題目" name="second">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="年級" prop="questionGrade">
                        <el-select v-model="form.questionGrade" placeholder="請選擇年級">
                            <el-option label="國小三年級" value="3"></el-option>
                            <el-option label="國小四年級" value="4"></el-option>
                            <el-option label="國小五年級" value="5"></el-option>
                            <el-option label="國小六年級" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="題型" prop="questionType">
                        <el-select v-model="form.questionType" placeholder="請選擇題目類型">
                            <el-option label="單選題" value="1"></el-option>
                            <el-option label="閱讀測驗" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="標籤" prop="questionHashtag">
                        <el-input v-model="form.questionHashtag" placeholder="可在此給題目一個標籤"></el-input>
                    </el-form-item>
                    <el-form-item label="題目" prop="questionContent">
                        <el-input type="textarea" :rows="4" placeholder="請輸入題目" v-model="form.questionContent">
                        </el-input>
                    </el-form-item>

                    <el-form-item v-for="(answer, index) in form.answers" :label="'答案' + (index+1)" :key="answer.key" :prop="'answers.' + index + '.rightvalue'" :rules="{required: true, message: '答案不能为空', trigger: 'blur'}">
                        <el-input v-model="answer.rightvalue">
                            <template slot="prepend">正確答案</template>
                        </el-input>
                        <el-input v-model="answer.wrongvalue1">
                            <template slot="prepend">錯誤答案</template>
                        </el-input>
                        <el-input v-model="answer.wrongvalue2">
                            <template slot="prepend">錯誤答案</template>
                        </el-input>
                        <el-input v-model="answer.wrongvalue3">
                            <template slot="prepend">錯誤答案</template>
                        </el-input>
                        <el-button @click.prevent="removeAnswer(answer)">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即創建</el-button>
                        <el-button @click="addAnswer">新增答案</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="爬蟲產生題目" name="third">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import qs from 'qs'
import {question_insert_url} from '@/config/api'
export default {
    name: 'insertQuestion',
    data() {
        return {
            activeName2: 'first',
            form: {
                questionGrade: '',
                questionType: '',
                questionHashtag: '',
                questionContent: '',
                answers: [{
                    rightvalue: '',
                    wrongvalue1: '',
                    wrongvalue2: '',
                    wrongvalue3: '',
                }],
                ans: ''
            },
            autoform: {
                questionGrade: '',
                questionType: '',
                questionContent: '',
            }
        }
    },
    methods: {
        onSubmit() {
            var ans = this.form.answers
            this.form.ans = JSON.stringify(ans)
            this.$http.post(question_insert_url,qs.stringify(this.form))
        },
        addAnswer() {
            this.form.answers.push({
                rightvalue: '',
                wrongvalue1: '',
                wrongvalue2: '',
                wrongvalue3: '',
                key: Date.now()
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.form.answers = [{
                rightvalue: '',
                wrongvalue1: '',
                wrongvalue2: '',
                wrongvalue3: '',
            }]
        },
        removeAnswer(item) {
            var index = this.form.answers.indexOf(item)
            if (index !== 0) {
                this.form.answers.splice(index, 1)
            }
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }

}
</script>
<style lang="scss" scoped>
.insertQuestion {
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