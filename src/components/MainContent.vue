<template>
  <div class="main">
    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Edit" plain>新建</el-button>
    </div>
    <el-input class="my2" type="textarea" :rows="4" v-model="texts" placeholder="想说些什么..." />

    <!--https://images.nowcoder.com/head/1000t.png-->
    <div class="ul">
      <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      <div class="article">
        <div class="header">
          <div class="mr-2 inline-block">作者</div>
          <span>2023-07-19</span>
        </div>
        <el-text>
          简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </el-text>
      </div>
    </div>
    <div class="ul">
      <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      <div class="article">
        <div class="header">
          <div class="mr-2 inline-block">作者</div>
          <span>2023-07-19</span>
        </div>
        <el-text>
          简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </el-text>
      </div>
    </div>
    <div class="ul">
      <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      <div class="article">
        <div class="header">
          <div class="mr-2 inline-block">作者</div>
          <span>2023-07-19</span>
        </div>
        <el-text>
          简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </el-text>
      </div>
    </div>
    <div class="ul">
      <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      <div class="article">
        <div class="header">
          <div class="mr-2 inline-block">作者</div>
          <span>2023-07-19</span>
        </div>
        <el-text>
          简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </el-text>
      </div>
    </div>
    <div class="ul">
      <el-avatar class="float-left mr-20px" fit="cover" shape="square" :size="48" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      <div class="article">
        <div class="header">
          <div class="mr-2 inline-block">作者</div>
          <span>2023-07-19</span>
        </div>
        <el-text>
          简化流程： 设计简洁直观的操作流程； 清晰明确： 语言表达清晰且表意明确，让用户快速理解进而作出决策； 帮助用户识别： 界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </el-text>
      </div>
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
.ul{
  margin-bottom: 18px;
}
.article {
  font-size: large;
  margin: 0.3rem 0 0 1rem;
  overflow: hidden; //保证不会环绕图片
  .header{
    color: #666;
    font-size: small;
    margin-bottom: 5px;
  }
}
</style>
  