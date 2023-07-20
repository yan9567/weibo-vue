<template>
  <div class="main">

    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Plus" plain @click="AddOrSubmit">{{ btnText }}</el-button>
    </div>
    <Transition name="fade">
      <el-input class="my2" type="textarea" :rows="4" v-model="texts" v-if="isEditing" placeholder="想说些什么..." />
    </Transition>

    <el-skeleton style="width: auto" :loading="loading" animated :throttle="500">
      <!--鱼骨图-->
      <template #template>
        <div v-for="(item, index) in 3">
          <div class="divider my1" v-if="index != 0"></div>
          <el-skeleton-item variant="image" style="width: 48px; height: 48px; float: left; margin-top: 0.3rem;" />
          <div style="padding-left: 68px">
            <el-skeleton-item variant="p" style="width: 80%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 50%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 90%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 60%; margin: 0.3rem 0" />
          </div>
        </div>
      </template>

      <!--主内容-->
      <template #default>
        <div class="ul m0 p0" v-for="(weibo, index) in weibos">
          <div class="divider" v-if="index != 0"></div>
          <WeiboView :weibo="weibo" :Delete="Delete" />
        </div>
      </template>
    </el-skeleton>

    <!--空页面-->
    <el-empty description="说点什么吧~" v-if="!loading && (!weibos || weibos.length === 0)" />
    <!--分页-->
    <el-row justify="center" class="my5">
      <el-pagination class="ml-a mr-a" layout="prev, pager, next" :page-size="15" :total="50" @prev-click="prev"
        @next-click="next" @current-change="pageto" />
    </el-row>
  </div>
</template>
  
<script lang="ts" setup>
import { Plus, Check } from '@element-plus/icons-vue'
import { computed, onMounted, ref, shallowRef } from 'vue';
import WeiboView from "./Weibo.vue"
import Weibo from "~/store/modules/Weibo"
import { MessageFun, NotificationFun } from "~/composables/index";
import { weiboapi } from "~/api/index";
import useUserStore from '~/store/UserInfo';

const userStore = useUserStore();
const texts = ref('');
const currentPage = ref(0);
const totalCount = ref(100);
const weibos = ref<Weibo[]>();
const loading = ref(true);
let isEditing = ref(false);

const btnText = computed(() => {
  return isEditing.value ? '提交' : '新建'
});

/**
 * 保存
 * @param event 按钮事件
 */
const AddOrSubmit = (event: Event) => {
  let btn = event.target as HTMLButtonElement;
  if (!btn) return;
  if (!isEditing.value && !userStore.state) {
    MessageFun('请先登录', 'warning');
    return;
  }
  if (isEditing.value && texts.value.length > 0) {
    Add(texts.value);
  }
  isEditing.value = !isEditing.value;
}

/**初始化 */
onMounted(() => {
  Flush();
})

/**
 * 新增
 * @param content 内容
 */
const Add = async (content: string) => {
  if (!content || content.length === 0) return;
  try {
    await weiboapi.Add(content);
    texts.value = '';
    Flush();
  }
  catch (error: any) {
    NotificationFun(error.message as string, '保存内容失败', 'error');
  }
}

/**
 * 删除
 * @param id 
 */
const Delete = async (id: string) => {
  if (!id) return;
  if (!userStore.state) return;

  try {
    await weiboapi.Delete(id);
    Flush();
  }
  catch (error: any) {
    NotificationFun(error.message as string, '删除失败', 'error');
  }
}

/**
 * 更新微博内容
 * @param page 页码
 */
const Flush = (page: number = 0) => {
  if (page < 0) page = 0;
  weiboapi.Page(page)
    .then((response: { data: Weibo[]; }) => {
      if (response.data) {
        weibos.value = response.data;
      }
    })
    .catch((error: any) => {
      console.log('error', error);
      NotificationFun(error, '请求内容失败', 'error');
    })
    .finally(() => {
      if (loading.value) {
        loading.value = false;
      }
    });
}

/**
 * 上一页
 */
const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    Flush(currentPage.value);
  }
}

/**
 * 下一页
 */
const next = () => {
  if (totalCount.value / 15 > currentPage.value) {
    currentPage.value++;
    Flush(currentPage.value);
  }
}

/**
 * 跳转页码
 * @param index 页码（前台显示1始）
 */
const pageto = (index: number) => {
  currentPage.value = index - 1;
  Flush(currentPage.value);
}
</script>

<style lang="scss" scoped>
.divider {
  width: auto;
  border-top: 1px solid var(--ep-border-color);
  margin-left: calc(48px + 20px);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  // transition: opacity 0.5s ease;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
  