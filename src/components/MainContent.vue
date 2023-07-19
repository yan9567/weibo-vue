<template>
  <div class="main">
    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Plus" plain @click="AddOrSubmit">{{ btnText }}</el-button>
    </div>
    <Transition name="fade">
      <el-input class="my2" type="textarea" :rows="4" v-model="texts" v-if="isEditing" placeholder="想说些什么..." />
    </Transition>
    <div class="ul m0 p0" v-for="(weibo, index) in weibos">
      <div class="divider" v-if="index != 0"></div>
      <WeiboView v-bind="weibo" />
    </div>
    <el-row justify="center" class="my5">
      <el-pagination class="ml-a mr-a" layout="prev, pager, next" :page-size="15" :total="50" @prev-click="prev"
        @next-click="next" @current-change="pageto"/>
    </el-row>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>
  
<script lang="ts" setup>
import { Plus, Check } from '@element-plus/icons-vue'
import { computed, onMounted, ref, shallowRef } from 'vue';
import WeiboView from "./Weibo.vue"
import Weibo from "~/store/modules/Weibo"
import { ElButton } from 'element-plus';
import { MessageFun, NotificationFun } from "~/composables/index";
import { weiboapi } from "~/api/index";

const texts = ref('');
const currentPage = ref(0);
const totalCount = ref(100);
const weibos = ref<Weibo[]>();

let isEditing = ref(false);
const btnText = computed(() => {
  return isEditing.value ? '提交' : '新建'
});

//保存
const AddOrSubmit = (event: Event) => {
  let btn = event.target as HTMLButtonElement;
  if (!btn) return;
  if (isEditing.value && texts.value.length > 0) {
    let time = new Date().toLocaleString();
    //fixme 这里处理undfined
    weibos.value.push({
      id: '1',
      auther: 'admin',
      time: time,
      content: texts.value
    });
    texts.value = '';
    setWeibo();
  }
  isEditing.value = !isEditing.value;
}

//初始化
onMounted(() => {
  console.log(`the component is now mounted.`);
  setWeibo();
})

//更新微博内容
const setWeibo = (page: number = 0) => {
  if (page < 0) page = 0;
  weiboapi.Page(page)
    .then((response: { data: Weibo[]; }) => {
      if (response.data) {
        weibos.value = response.data;
      }
    })
    .catch((error: string) => {
      console.log('error', error);
      NotificationFun(error, '请求内容失败', 'error');
    })
}

const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    setWeibo(currentPage.value);
  }
}

const next = () => {
  if (totalCount.value / 15 > currentPage.value) {
    currentPage.value++;
    setWeibo(currentPage.value);
  }
}

const pageto = (index: number) => {
  currentPage.value = index - 1;
  setWeibo(currentPage.value);
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
  