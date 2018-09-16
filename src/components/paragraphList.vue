<template>
    <div class="paragraphList fillcontain">
        <el-form :inline="true" :model="gradeForm" class="paragraphList-form">
            <el-form-item label="選擇年級">
                <el-select v-model="gradeForm.grade" placeholder="請選擇年級">
                    <el-option label="課外教材" value="0"></el-option>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="完整內容">
                            <span>{{ props.row.paragraphContent }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column prop="paragraphContent" label="教材內容" min-width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="paragraphHashtag" label="標籤" min-width="80">
            </el-table-column>
            <el-table-column prop="paragraphLevel" sortable label="難易程度" width="140">
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
        <el-dialog title="修改教材信息" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="教材" prop="paragraphContent">
                    <el-input type="textarea" :rows="4" placeholder="請輸入教材" v-model="form.paragraphContent">
                    </el-input>
                </el-form-item>
                <el-form-item label="教材類別" prop="paragraphGrade">
                    <el-select v-model="form.paragraphGrade" placeholder="請選擇教材類別">
                        <el-option label="課外教材" value="0"></el-option>
                        <el-option label="國小三年級教材" value="3"></el-option>
                        <el-option label="國小四年級教材" value="4"></el-option>
                        <el-option label="國小五年級教材" value="5"></el-option>
                        <el-option label="國小六年級教材" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教材來源" prop="paragraphSource">
                    <el-input v-model="form.paragraphSource" placeholder="請輸入教材來自第幾單元(例如:第一單元請輸入1)，課外文章輸入該文章的網址"></el-input>
                </el-form-item>
                <el-form-item label="標籤" prop="paragraphHashtag">
                    <el-input v-model="form.paragraphHashtag" placeholder="可在此給這段教材一個標籤"></el-input>
                </el-form-item>
                <el-form-item label="難易程度" prop="paragraphLevel" :rules="[{ required: true, message: '難易度不能為空'},{ type: 'number', message: '難易度必須為數字'}]">
                    <el-input v-model.number="form.paragraphLevel" placeholder="請輸入單字的難易程度"></el-input>
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
import {paragraph_delete_url,paragraph_insert_url,paragraph_list_url} from '@/config/api'
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
                paragraphId: '',
                paragraphContent: '',
                paragraphHashtag: '',
                paragraphSource: '',
                paragraphGrade: '',
                paragraphLevel: '',
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
            this.$http.delete(paragraph_delete_url, { params: { paragraphId: row.paragraphId } })
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
                    this.$http.post(paragraph_insert_url, qs.stringify(this.form))
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
            this.$http.get(paragraph_list_url, {
                params: {
                    grade: this.gradeForm.grade,
                    page: this.currentPage - 1,
                    size: this.pageSize,
                }
            }).then(response => {
                this.tableData = response.data.data.paragraphList
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
                    message: '查詢失敗,請選擇后年級重試'
                });
                this.tableData = null
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.paragraphList-form {
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
</style>
