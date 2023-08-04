<script lang="ts" setup>
import { computed, ref } from "vue";
import Weibo from "~/store/modules/Weibo"
import useUserStore from "~/store/UserInfo";
import usePicsStore from "~/store/UserPic";
import { MoreFilled } from "@element-plus/icons-vue";
import { weiboapi } from "~/api";
import { MessageFun } from "~/composables";

const edit = ref(false);
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

/**
 * 更新微博
 */
const Update = async () => {
  try {
    let data: any = await weiboapi.Update(props.weibo.id, props.weibo.content);
    if (data.code == 1000) {
      edit.value = false;
    }
  }
  catch (error: any) {
    MessageFun(error.data.msg as string, 'error');
  }

}


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

        <el-dropdown class="btn" :hide-on-click="true">
          <el-icon class="el-dropdown-link">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="edit = !edit">更新</el-dropdown-item>
              <!--删除按钮-->
              <el-dropdown-item>
                <el-popconfirm title="是否删除?" @confirm="Delete(props.weibo.id)">
                  <template #reference>
                    删除
                  </template>
                </el-popconfirm>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>


      </div>
      <el-text v-if="!edit" class="post">
        {{ props.weibo.content }}
      </el-text>
      <div v-else>
        <el-input class="my-2" type="textarea" :rows="4" v-model="props.weibo.content" />
        <el-button type="primary" @click="Update">更新</el-button>
        <el-button @click="edit = false">取消</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.li {
  padding: 10px 0;
  position: relative;

  .btn {
    float: right;
    visibility: collapse;
  }

  &:hover {
    .btn {
      visibility: v-bind(visibility);
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
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