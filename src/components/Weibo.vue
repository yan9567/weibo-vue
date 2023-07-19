<script lang="ts" setup>
import { computed } from "vue";
import Weibo from "~/store/modules/Weibo"

const weibo = defineProps<Weibo>()

const date = computed(() => {
  return new Date(weibo.time).toLocaleString('zh-cn');
});

</script>

<template>
  <div class="li">
    <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" :src="weibo.userHead">
      <!-- 兜底：文字、图片 -->
      <!-- {{ weibo.auther }} -->
      <!--https://images.nowcoder.com/head/1000t.png-->
      <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
    </el-avatar>
    <div class="article">
      <div class="header">
        <div class="mr-2 inline-block">{{ weibo.auther }}</div>
        <span>{{ date }}</span>
      </div>
      <el-text class="post">
        {{ weibo.content }}
      </el-text>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.li {

  padding: 10px 0;
  position: relative;

  // &::before {
  //   position: absolute;
  //   background-color: var(--ep-border-color);
  //   content: "";
  //   height: 1px;
  //   left: calc(48px + 20px);
  //   top: 0px;
  //   width: calc(100% - 48px - 20px);
  // }
}

.article {
  font-size: large;
  margin: 0;
  overflow: hidden; //保证不会环绕图片

  .header {
    color: var(--ep-text-light);
    font-size: small;
    margin-bottom: 5px;
  }

  .post {
    white-space: pre-wrap;
    word-wrap: normal;
  }
}
</style>