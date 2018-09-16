<template>
    <div class="wordList fillcontain">
        <el-form :inline="true" :model="gradeForm" class="wordList-form">
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
            <el-table-column prop="wordContent" label="單詞" min-width="120">
            </el-table-column>
            <el-table-column prop="wordPartofspeech" label="詞性" min-width="120">
            </el-table-column>
            <el-table-column prop="wordInterpretation" label="解釋" min-width="120">
            </el-table-column>
            <el-table-column prop="wordLevel" sortable label="難易程度" min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination @current-change="handleCurrentPage" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
        <el-dialog title="修改單字信息" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="單字" prop="wordContent">
                    <el-input v-model="form.wordContent" placeholder="請輸入單字"></el-input>
                </el-form-item>
                <el-form-item label="中文意思" prop="wordInterpretation">
                    <el-input v-model="form.wordInterpretation" placeholder="請輸入單字的中文意思"></el-input>
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
                    </el-select>
                </el-form-item>
                <el-form-item label="難易程度" prop="wordLevel" :rules="[{ required: true, message: '難易度不能為空'},{ type: 'number', message: '難易度必須為數字'}]">
                    <el-input v-model.number="form.wordLevel" placeholder="請輸入單字的難易程度"></el-input>
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
import qs from 'qs'
import {word_list_url,word_delete_url,word_insert_url} from '@/config/api'
export default {
    data() {
        return {
            tableData: [],
            currentRow: null,
            count: 0,
            currentPage: 1,
            pageSize: 20,
            gradeForm: {
                grade: '',
            },
            dialogFormVisible: false,
            form: {
                wordId: '',
                wordContent: '',
                wordInterpretation: '',
                wordPartofspeech: '',
                wordGrade: '',
                wordLevel: '',
                updateBy: 'unknow',
            },
            formLabelWidth: '120px'
        }
    },
    created() {
    },
    methods: {
        onSubmit() {
            this.getData()
        },
        handleCurrentRow(val) {   //更改高亮行
            this.currentRow = val;
        },
        handleCurrentPage(val) {  //換頁
            this.currentPage = val;
            this.getData()
        },
        handleEdit(row) {
            this.dialogFormVisible = true;
            this.form = row;
        },
        handleDelete(index, row) {
            this.tableData.splice(index, 1)
            this.deleteData(row)
        },
        deleteData(row) {
            this.$http.delete(word_delete_url, { params: { wordId: row.wordId } })
                .then(response => {
                    if (response.data.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '刪除成功'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '刪除失敗'
                    });
                });
            this.count -= 1
        },
        updateData() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = false
                    this.form.updateBy = this.$route.params.user
                    this.$http.post(word_insert_url, qs.stringify(this.form))
                        .then(response => {
                            if (response.data.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
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

                } else {
                    return false;
                }
            });
        },
        getData() {
            this.$http.get(word_list_url, {
                params: {
                    grade: this.gradeForm.grade,
                    page: this.currentPage - 1,
                    size: this.pageSize,
                }
            }).then(response => {
                console.log(response)
                this.tableData = response.data.data.wordList
                this.count = response.data.data.count
                if (response.data.code == 0) {
                    this.$message({
                        type: 'success',
                        message: '查詢成功'
                    });
                }
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '查詢失敗'
                });
                this.tableData = null
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.wordList-form {
    text-align: center;
}

.el-select {
    display: block;
}
</style>
