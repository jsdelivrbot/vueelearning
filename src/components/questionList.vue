<template>
    <div class="questionList fillcontain">
        <el-form :inline="true" :model="gradeForm" class="question-form">
            <el-form-item label="選擇年級">
                <el-select v-model="gradeForm.grade" placeholder="請選擇年級">
                    <el-option label="國小三年級" value="3"></el-option>
                    <el-option label="國小四年級" value="4"></el-option>
                    <el-option label="國小五年級" value="5"></el-option>
                    <el-option label="國小六年級" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentRow" style="width: 100%">
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column prop="questionType" sortable label="題目類型" min-width="80">
            </el-table-column>
            <el-table-column prop="questionContent" label="題目內容" min-width="140" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="questionHashtag" label="標籤" min-width="80">
            </el-table-column>
            <el-table-column prop="questionLevel" sortable label="難易程度" min-width="80">
            </el-table-column>
            <el-table-column prop="createBy" label="出題者" min-width="80">
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="small" @click="handlePreview(scope.row)">查看</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination @current-change="handleCurrentPage" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
        <el-dialog title="题目预览" :visible.sync="dialogViewVisible" size="large">
            <el-form ref="form" :model="questionDTO" label-width="80px">
                <div class="question-area" :key="questionDTO.key">
                    <!-- <div class="question-title">題目{{index+1}} 題型:{{question.questionType}}</div> -->
                    <div class="question-area-content">
                        <p>{{questionDTO.questionContent}}</p>
                    </div>
                    <div class="question-area-question-wrapper" v-for="answer in questionDTO.answerDTOList" :key="answer.key">
                        <div class="question-area-question">
                            {{answer.title}}.
                        </div>
                        <div class="question-area-answer">
                            <p v-for="answers in answer.answerContent" :key="answers">
                                <el-radio class="radio" v-model="answer.seletvalue" :label="answers">{{answers}}</el-radio>
                            </p>
                        </div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogViewVisible = false">返回</el-button>
                <el-button type="primary" @click="handleEdit()">編輯</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改題目資料" :visible.sync="dialogFormVisible">
            <el-form ref="questionDTO" :model="questionDTO" label-width="80px">
                <el-form-item label="年級" prop="questionGrade">
                    <el-select v-model="questionDTO.questionGrade" placeholder="請選擇年級">
                        <el-option label="國小三年級" value="3"></el-option>
                        <el-option label="國小四年級" value="4"></el-option>
                        <el-option label="國小五年級" value="5"></el-option>
                        <el-option label="國小六年級" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="題型" prop="questionType">
                    <el-select v-model="questionDTO.questionType" placeholder="請選擇題目類型">
                        <el-option label="單選題" value="1"></el-option>
                        <el-option label="閱讀測驗" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="難易程度" prop="questionLevel">
                    <el-input v-model="questionDTO.questionLevel" placeholder="請輸入單字的難易程度"></el-input>
                </el-form-item>
                <el-form-item label="標籤" prop="questionHashtag">
                    <el-input v-model="questionDTO.questionHashtag" placeholder="可在此給題目一個標籤"></el-input>
                </el-form-item>
                <el-form-item label="題目" prop="questionContent">
                    <el-input type="textarea" :rows="4" placeholder="請輸入題目" v-model="questionDTO.questionContent">
                    </el-input>
                </el-form-item>
                <el-form-item v-for="(answer, index) in questionDTO.answerDTOList" :label="'答案' + (index+1)" :key="answer.key">
                  <el-input v-model="answer.correct">
                    <template slot="prepend">正確答案</template>
                  </el-input>
                  <el-input v-model="answer.answerContent[0]">
                    <template slot="prepend">錯誤答案</template>
                  </el-input>
                  <el-input v-model="answer.answerContent[1]">
                    <template slot="prepend">錯誤答案</template>
                  </el-input>
                  <el-input v-model="answer.answerContent[2]">
                    <template slot="prepend">錯誤答案</template>
                  </el-input>
                  <el-button @click.prevent="removeAnswer(answer)">删除</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateData()">確 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs';
import {
  question_list,
  question_list_url,
  question_insert_url,
  question_delete_url,
  question_findOne
} from "@/config/api";
export default {
  data() {
    return {
      tableData: [],
      answerItem: [],
      questionContent: "",
      answerDTOList: [],
      currentRow: null,
      count: 0,
      currentPage: 1,
      pageSize: 20,
      gradeForm: {
        grade: ''
      },
      dialogViewVisible: false,
      dialogFormVisible: false,
      questionDTO:{},
      formLabelWidth: "120px"
    };
  },
  created() {},
  mouted() {},
  methods: {
    removeAnswer(item) {
      var index = this.questionDTO.answerDTOList.indexOf(item)
      this.questionDTO.answerDTOList.splice(index, 1)
		},
    onSubmit() {
      this.getData();
    },
    handleCurrentRow(val) {
      //更改高亮行
      this.currentRow = val;
    },
    handleCurrentPage(val) {
      //換頁
      this.currentPage = val;
      this.getData();
    },
    handleEdit() {
      this.dialogFormVisible = true;
      this.resortAnser();
      this.dialogViewVisible = false;
    },
    handlePreview(row) {
      this.dialogViewVisible = true;
      this.getQuestion(row.questionId);
    },
    resortAnser:function(){
      this.questionDTO.answerDTOList.forEach(element=>{
        var answerContentLength = element.answerContent.length
        for (var i=0; i<answerContentLength; i++) {
          if (element.answerContent[i] == element.correct) {
            element.answerContent.splice(i,1)
            element.answerContent.push(element.correct)
          }
          break
        }
      });
    },
    databinding:function(data){
      this.questionDTO = data
      console.log(this.questionDTO)
    },
    async getQuestion(questionId) {
      const res = await question_findOne({
        params: { questionId: questionId }
      });
      if (res.data.code == 0) {
          if (res.data.data != null) {
              this.databinding(res.data.data)
          }
      }
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.deleteData(row);
    },
    deleteData(row) {
      this.$http.delete(question_delete_url,{params:{questionId: row.questionId}})
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              type: "success",
              message: "刪除成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "error",
            message: "刪除失敗"
          });
        });
      this.count -= 1;
    },
    updateData() {
      this.dialogFormVisible = false;
      this.questionDTO.updateBy = this.$route.params.user;
      var questionJson = JSON.parse(JSON.stringify(this.questionDTO));
      questionJson.answerDTOList = JSON.stringify(questionJson.answerDTOList)
      this.$http
        .post(question_insert_url,qs.stringify(questionJson))
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "error",
            message: "修改失敗"
          });
        });
    },
    async getData() {
      const res = await question_list({
        params: {
          grade: this.gradeForm.grade,
          page: this.currentPage - 1,
          size: this.pageSize
        }
      });
      if (res.data.code == 0) {
        this.tableData = res.data.data.data;
        this.count = res.data.data.count;
        this.$message({
          type: "success",
          message: "查詢成功"
        });
      } else {
        console.log(res.data);
        this.$message({
          type: "error",
          message: "查詢失敗"
        });
        this.tableData = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.question-form {
  text-align: center;
}
.questionArea {
  padding: 0px 30px;
}
.el-select {
  display: block;
}
.questionContentArea {
  padding: 10px;
  border: 1px solid #cfcfcf;
  font-size: 18px;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 25px;
}
.questionAnswerTitle {
  font-size: 18px;
  line-height: 1.5;
}
</style>
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
