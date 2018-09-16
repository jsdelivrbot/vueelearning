<template>
  <div class="hello">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="單字" prop="wordContent">
        <el-input v-model="form.wordContent" placeholder="請輸入單字"></el-input>
      </el-form-item>
      <el-form-item label="翻譯結果" prop="wordTranslate">
        <el-input v-model="form.wordTranslate" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即翻譯</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import {word_pie_url,translate_url} from '@/config/api'	 

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        wordContent: '',
        wordTranslate: '',
      },
      pieData: {

      }
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('visitorpie'));
    this.$http.get(word_pie_url)
      .then(response => {
        this.pieData = response.data.data
      })
    this.initData();
  },
  methods: {
    initData() {
      const option = {
        title: {
          text: '系統當前單字量分佈',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['國小三年級', '國小四年級', '國小五年級', '國小六年級']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.pieData.grade3, name: '國小三年級' },
              { value: this.pieData.grade4, name: '國小四年級' },
              { value: this.pieData.grade5, name: '國小五年級' },
              { value: this.pieData.grade6, name: '國小六年級' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }, onSubmit() {
      console.log(this.form.wordContent)
      this.$http.get(translate_url + this.form.wordContent)
        .then(response => {
          console.log(response)
          this.form.wordTranslate = response.data.text[0]
        })
    }
  },
  watch: {
    pieData: function() {
      this.initData()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
