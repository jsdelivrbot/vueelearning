<template>
    <aside class="jAside">
        <el-menu default-active="5" class="el-menu-customize" theme="dark" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-edit"></i>添加資料
                </template>
                <router-link :to="{name:'insertWord',params:{user:user}}">
                    <el-menu-item index="1-1">
                        新增單字
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'insertParagraph',params:{user:user}}">
                    <el-menu-item index="1-2">
                        新增教材
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'insertLessonPlan',params:{user:user}}">
                    <el-menu-item index="1-3">
                        新增教案
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'insertQuestion',params:{user:user}}">
                    <el-menu-item index="1-4">
                        新增題目
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>資料管理
                </template>

                <router-link :to="{name:'wordList',params:{user:user}}">
                    <el-menu-item index="2-1">
                        查詢單字
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'paragraphList',params:{user:user}}">
                    <el-menu-item index="2-2">
                        查詢教材
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'lessonPlanList',params:{user:user}}">
                    <el-menu-item index="2-3">
                        查詢教案
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'questionList'}">
                    <el-menu-item index="2-4">
                        查詢題目
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'questionList',params:{user:user}}">
                    <el-menu-item index="2-5">
                        查詢考卷
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>測驗專區
                </template>
                <router-link :to="{name:'dynamic',params:{user:user}}">
                    <el-menu-item index="3-1">
                        互動式測驗
                    </el-menu-item>
                </router-link>
                <router-link :to="{name:'exam',params:{user:user}}">
                    <el-menu-item index="3-2">
                        一般式測驗
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-star-off"></i>小工具
                </template>
                <router-link :to="{name:'insertExam',params:{user:user}}">
                    <el-menu-item index="4-1">
                        自動產生考卷
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <router-link to='/manage'>
                <el-menu-item index="5">
                    <i class="el-icon-information"></i>
                    Home
                </el-menu-item>
            </router-link>
        </el-menu>
    </aside>
</template>
<script>
export default {
  name: "jAside",
  data() {
    return {
      msg: "hello",
      user: JSON.parse(window.localStorage.getItem("userInfo")).data.userAccount
    };
  },
  mounted() {
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/common/scss/variable";
aside {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: $color-background;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
