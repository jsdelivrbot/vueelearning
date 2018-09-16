<template>
  <div class="insertWord fillcontain">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="單字" prop="wordContent">
        <el-input v-model="form.wordContent" placeholder="請輸入單字"></el-input>
      </el-form-item>
      <el-form-item label="中文意思" prop="wordInterpretation">
        <el-input v-model="form.wordInterpretation" placeholder="請輸入單字的中文意思,多個意思用‘;’隔開"></el-input>
      </el-form-item>
      <el-form-item label="詞性" prop="wordPartofspeech">
        <el-select v-model="form.wordPartofspeech" placeholder="請選擇詞性">
          <el-option label="名詞(noun)" value="noun"></el-option>
          <el-option label="動詞(verb)" value="verb"></el-option>
          <el-option label="形容詞(adjective)" value="adjective"></el-option>
          <el-option label="副詞(adverb)" value="adverb"></el-option>
          <el-option label="縮寫(abbreviation)" value="abbreviation"></el-option>
          <el-option label="冠詞(article)" value="article"></el-option>
          <el-option label="連接詞(conjunction)" value="conjunction"></el-option>
          <el-option label="介繫詞(preposition)" value="preposition"></el-option>
          <el-option label="代名詞(pronoun)" value="pronoun"></el-option>
          <el-option label="助動詞(auxiliary-verb)" value="auxiliary-verb"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年級" prop="wordGrade">
        <el-select v-model="form.wordGrade" placeholder="請選擇年級">
          <el-option label="國小三年級" value="3"></el-option>
          <el-option label="國小四年級" value="4"></el-option>
          <el-option label="國小五年級" value="5"></el-option>
          <el-option label="國小六年級" value="6"></el-option>
          <el-option label="課外單字" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="來源" prop="wordSource">
        <el-input v-model="form.wordSource" placeholder="請輸入單字來自第幾單元(例如:第一單元請輸入1)" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即創建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import qs from 'qs'
import { word_insert_url } from '@/config/api'
export default {
  name: 'insertWord',
  data() {
    return {
      labelPosition: 'right',
      form: {
        wordContent: '',
        wordInterpretation: '',
        wordPartofspeech: '',
        wordGrade: '',
        wordSource: '',
        createBy: this.$route.params.user
      },
      rules: {
        wordContent: [
          { required: true, message: '請輸入單字', trigger: 'blur' },
        ],
        wordPartofspeech: [
          { required: true, message: '請選擇詞性', trigger: 'change' }
        ],
        wordGrade: [
          { required: true, message: '請選擇年級', trigger: 'change' }
        ],

      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    insertWord() {
      this.$http.post(word_insert_url, qs.stringify(this.form))
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.resetForm('form')
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: 'error',
            message: '新增失敗'
          });
        });

    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.insertWord()
        } else {
          return false
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.insertWord {
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
