<script lang="ts" setup>
import useUserStore from "~/store/UserInfo";

const userStore = useUserStore();

</script>

<template>
  <h4 class="inline-block">你好，{{ userStore.state?.username }}</h4>
  <el-button class="inline-block" type="primary" link @click="userStore.Logout">[退出]</el-button>

</template>