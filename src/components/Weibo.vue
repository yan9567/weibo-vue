<script lang="ts" setup>
import { computed, ref } from "vue";
import Weibo from "~/store/modules/Weibo"
import useUserStore from "~/store/UserInfo";
import usePicsStore from "~/store/UserPic";

const picStore = usePicsStore();
const userStore = useUserStore();
const props = defineProps<{
  weibo: Weibo,
  Delete: (id: string) => Promise<void>,
}>();

const date = computed(() => {
  return new Date(props.weibo.time).toLocaleString('zh-cn');
});

const pic = computed(() => {
  return picStore.pics.get(props.weibo.auther);
})

/**
 * 删除权限
 * style里用v-bind(visibility)绑定，测试string绑定有效，bool无效
 */
const visibility = computed(() => {
  if (!userStore.state) return 'collapse';
  return props.weibo.auther === userStore.state.username ? 'visible' : 'collapse';
});

</script>

<template>
  <div class="li">
    <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" :src="pic">
      <!-- 兜底：文字、图片 -->
      <!-- {{ weibo.auther }} -->
      <!--https://images.nowcoder.com/head/1000t.png-->
      <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
    </el-avatar>
    <div class="article">
      <div class="header">
        <div class="mr-2 inline-block">{{ props.weibo.auther }}</div>
        <span>{{ date }}</span>
        
        <!--删除按钮-->
        <el-popconfirm title="是否删除?" @confirm="Delete(props.weibo.id)">
          <template #reference>
            <el-button class="btn" link type="info" size="small">
              删除
            </el-button>
          </template>
        </el-popconfirm>

      </div>
      <el-text class="post">
        {{ props.weibo.content }}
      </el-text>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.li {
  padding: 10px 0;
  position: relative;

  .btn{
    float: right;
    visibility: collapse;
  }
  &:hover {
    .btn {
      visibility: v-bind(visibility);
    }
  }

  // 生成分隔线，此处改外部生成，方便控制是否生成
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