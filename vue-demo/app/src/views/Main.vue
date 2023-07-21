<template>
    <div>
        <el-container class="operation-wrapper">
            <el-aside width="auto">
                <common-aside/>
            </el-aside>
            <el-container class="main">
                <el-header>
                    <common-header></common-header>
                </el-header>
                    <common-tag></common-tag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>


<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>

<style lang="less" scoped>
.operation-wrapper {
  width: 100% !important;
  .el-header {
    // height: 100px;
    padding: 0;
  }
  .el-aside {
    
    height: 100vh;
    overflow-y: auto;
  }
  main {
    padding: 0px 16px !important;
    height: calc(100vh - 200px); 
    overflow-y: auto;
  }
}
</style>