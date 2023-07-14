<script lang="ts" setup>
import { toggleDark, gotoUrl, openUrl } from "~/composables"; //composables组合式函数，类似uitls
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis=false>
    <div class="flex-grow" />
    <el-menu-item index="1">LOG</el-menu-item>
    <div class="flex-grow" />

    <el-menu-item index="2" @click="gotoUrl('https://blog.ppos.top')">Blog</el-menu-item>
    <el-sub-menu index="3">
      <template #title>Others</template>
      <el-menu-item index="3-1" @click="gotoUrl('https://cn.vuejs.org/guide/introduction.html')">Vue</el-menu-item>
      <el-menu-item index="3-2" @click="gotoUrl('https://element-plus.gitee.io/zh-CN/component/button.html')">Element-plus</el-menu-item>
    </el-sub-menu>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div class="flex-grow" />
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
