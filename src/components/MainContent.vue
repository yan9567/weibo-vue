<template>
  <div class="main">
    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Edit" plain>新建</el-button>
    </div>
    <el-input class="my2" type="textarea" :rows="4" v-model="texts" placeholder="想说些什么..." />

    <!--https://images.nowcoder.com/head/1000t.png-->
    <div class="ul m0 p0" v-for="(weibo, index) in weibos">
      <div class="divider" v-if="index != 0"></div>
      <WeiboView v-bind="weibo"/>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import "~/styles/index.scss";
import WeiboView from "./Weibo.vue"
import Weibo from "~/store/modules/Weibo"

const texts = ref('')

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
)



</script>

<style lang="scss" scoped>
.divider {
  width: auto;
  border-top: 1px solid var(--ep-border-color);
  margin-left: calc(48px + 20px);
}
</style>
  