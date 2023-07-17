<script lang="ts" setup>
import { ref } from 'vue';
const input = ref('');
</script>

<template>
  <div class="input-box">
    <el-row :gutter="20">
      <span class="ml-3  text-gray-600 ">账号</span>
      <el-input v-model="input" class="w-5 m-2" placeholder="Please input" />
    </el-row>

  </div>
  <div class="input-box">
    <el-row :gutter="20">
      <span class="ml-3 text-gray-600 inline-flex items-center">密码</span>
      <el-input v-model="input" class="w-5 m-2" placeholder="Please input" />
    </el-row>

  </div>
  <div>
    <el-row>
      <el-button>登录</el-button>
      <el-button>注册</el-button>

    </el-row>

  </div>
</template>