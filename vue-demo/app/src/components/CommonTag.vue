<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState ,mapMutations} from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMenu(item){
      if(item.name !== this.$route.name){
        this.$router.push({ name: item.name })
      }
    },
    //点击tag删除标签
    handleClose(item, index){
      //调用store中的mutation
      this.closeTag(item)
      const length = this.tags.length
      //删除之后的跳转逻辑
      if(item.name !== this.$route.name){
        return
      }
      //删除的是跳转的最后一项
      else if(index === length){
        //跳转到前一项路由
        this.$router.push({name: this.tags[index-1].name})
      }
      //删除的是中间的页面且是当前显示的页面
      else{
        //跳转到后一项路由
        this.$router.push({name: this.tags[index].name})
      }


    }
  },
};
</script>

<style lang="less" scoped>
  .tags{
    padding: 20px;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>