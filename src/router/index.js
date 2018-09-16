import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import insertLessonPlan from '@/components/insertLessonPlan'
import insertParagraph from '@/components/insertParagraph'
import insertQuestion from '@/components/insertQuestion'
import insertWord from '@/components/insertWord'
import login from '@/components/login'
import manage from '@/components/manage'
import home from '@/components/Home'
import wordList from '@/components/wordList'
import lessonPlanList from '@/components/lessonPlanList'
import paragraphList from '@/components/paragraphList'
import questionList from '@/components/questionList'
import insertExam from '@/components/insertExam'
import errorpage from '@/components/404'
import dynamic from '@/components/dynamic'
import exam from '@/components/exam'
import recommend from '@/components/recommend'


Vue.use(Router)

export default new Router({
    // 严格模式会深度监测状态树来检测不合规的状态变更
    strict: process.env.NODE_ENV !== 'production',
    routes: [{
        path: '/',
        name: 'login',
        component: login
    }, {
        path: '/manage',
        component: manage,
        children: [{
            path: '',
            name: 'home',
            component: home,   
        },{
            path: '/insertLessonPlan/:user',
            name: 'insertLessonPlan',
            component: insertLessonPlan,
            meta: {requiresAuth: true}
        }, {
            path: '/insertParagraph/:user',
            name: 'insertParagraph',
            component: insertParagraph
        }, {
            path: '/insertQuestion/:user',
            name: 'insertQuestion',
            component: insertQuestion
        }, {
            path: '/insertWord/:user',
            name: 'insertWord',
            component: insertWord
        }, {
            path: '/wordList/:user',
            name: 'wordList',
            component: wordList
        }, {
            path: '/lessonPlanList/:user',
            name: 'lessonPlanList',
            component: lessonPlanList
        }, {
            path: '/paragraphList/:user',
            name: 'paragraphList',
            component: paragraphList
        }, {
            path: '/insertExam/:user',
            name: 'insertExam',
            component: insertExam
        }, {
            path: '/questionList',
            name: 'questionList',
            component: questionList
        }, {
            path: '/dynamic/:user',
            name: 'dynamic',
            component: dynamic
        }, {
            path: '/exam/:user',
            name: 'exam',
            component: exam
        }, {
            path: '/recommend/:user',
            name: 'recommend',
            component: recommend
        }]
    },{
        path: '*',
        name: 'errorpage',
        component:errorpage

    }]    
})

