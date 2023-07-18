<template>
  <div class="main">
    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Edit" plain>新建</el-button>
    </div>
    <el-input class="my2" type="textarea" :rows="4" v-model="texts" placeholder="想说些什么..." />

    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>
    <div class="article">
      <el-text>
        简化流程： 设计简洁直观的操作流程；    清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策；    帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
      </el-text>
    </div>

  </div>
</template>
  
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import "~/styles/index.scss";

const texts = ref('')

</script>

<style lang="scss" scoped>
.article{
  margin: 0.3rem auto 0;
}
</style>
  