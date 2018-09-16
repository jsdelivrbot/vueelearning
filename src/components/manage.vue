<template>
    <div class="manage fillcontain">
        <el-row>
            <j-header></j-header>
        </el-row>
        <el-row class="jHeight">
            <el-col :sm="6"  :lg="4" style="height:100%">
                <j-aside></j-aside>
            </el-col>
            <el-col :sm="18"  :lg="20" style="height:100%">
                <div class="content">
                    <transition mode="out-in">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import jHeader from '@/components/jHeader'
import jAside from '@/components/jAside'
export default {
    name: 'manage',
    components: {
        jHeader,
        jAside
    },
    computed: {
        // defaultActive: function() {
        //     return this.$route.path.replace('/', '');
        // }
    },
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/variable';
.jHeight {
    height: -moz-calc(100% - 80px); 
    height: -webkit-calc(100% - 80px); 
    height: calc(100% - 80px);
}
.content {
    width:100%;
    height:100%;
    padding: 24px 32px 24px 32px;
    box-sizing: border-box;
    background-color: $gray;
    overflow-y: scroll;
}

</style>


