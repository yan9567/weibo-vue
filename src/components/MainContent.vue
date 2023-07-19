<template>
  <div class="main">
    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Plus" plain @click="AddOrSubmit">{{ btnText }}</el-button>
    </div>
    <Transition name="fade">
      <el-input class="my2" type="textarea" :rows="4" v-model="texts" v-if="isEditing" placeholder="想说些什么..." />
    </Transition>
    <!--https://images.nowcoder.com/head/1000t.png-->
    <div class="ul m0 p0" v-for="(weibo, index) in weibos">
      <div class="divider" v-if="index != 0"></div>
      <WeiboView v-bind="weibo" />
    </div>
    <el-row justify="center" class="my5">
      <el-pagination class="ml-a mr-a" layout="prev, pager, next" :total="50" @prev-click="MessageFun('hello', 'info')" />
    </el-row>
  </div>
</template>
  
<script lang="ts" setup>
import { Plus, Check } from '@element-plus/icons-vue'
import { computed, onMounted, ref, shallowRef } from 'vue';
import WeiboView from "./Weibo.vue"
import Weibo from "~/store/modules/Weibo"
import { ElButton } from 'element-plus';
import { MessageFun } from "~/composables/index";
import { weiboapi } from "~/api/index";

const texts = ref('');

const weibos = ref<Weibo[]>(
  [
    {
      ID: '0',
      Auther: 'Auther',
      Date: '2023-07-19 10:51:05',
      Context: 'helloworld\r\n简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。'
    },
    {
      ID: '1',
      Auther: 'Auther',
      Date: '2023-07-19 10:51:05',
      Context: 'helloworld\n简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。'
    },
    {
      ID: '2',
      Auther: 'Auther',
      Date: '2023-07-19 10:51:05',
      Context: 'helloworld\n简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。'
    },
    {
      ID: '3',
      Auther: 'Auther',
      Date: '2023-07-19 10:51:05',
      Context: 'helloworld\n简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。'
    }
  ]
);

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
    weibos.value.push({
      ID: '1',
      Auther: 'admin',
      Date: time,
      Context: texts.value
    });
    texts.value = '';
  }
  isEditing.value = !isEditing.value;
}

//初始化
onMounted(() => {
  console.log(`the component is now mounted.`);
  weiboapi.Page(0)
  .then(response => {
    console.log('success', response.data);
  })
  .catch(error => {
    console.log('error', error);
  })

})

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
  