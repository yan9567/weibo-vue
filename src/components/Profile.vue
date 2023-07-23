<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";
import { updateHeadPic } from "~/api/user";
import { MessageFun } from "~/composables";
import useUserStore from "~/store/UserInfo";

const userStore = useUserStore();
const display = ref(true);
const displayName = ref('');
const lastlogin = computed(() => {
  if (userStore.state && userStore.state.lastlogin) {
    let time = new Date(userStore.state.lastlogin);
    return time.toLocaleString();
  }
  return '';
})

const headUrl = ref(userStore.state?.headUrl)

const showDialog = ref(false);

const upload = async () => {
  if (headUrl.value) {
    try {
      await updateHeadPic(headUrl.value);
      if (userStore.state) {
        userStore.state.headUrl = headUrl.value;
        showDialog.value = false;
      }

    }
    catch (error) {
      MessageFun('上传头像失败', 'error');
    }
  }
}
</script>

<template>
  <el-row>
    <h4 class="inline-block">你好，{{ userStore.state?.username }}</h4>
    <el-button class="inline-block" type="primary" link @click="userStore.Logout">[退出]</el-button>
    <el-text class="ml-1">，上次登录：{{ lastlogin }}</el-text>
  </el-row>

  <div class="flex justify-around items-center m-2">
    <div @click="showDialog = true" class="hover-cursor-pointer">
      <el-avatar shape="square" :src="userStore.state?.headUrl">
        <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      </el-avatar>
    </div>
    <el-divider direction="vertical" style="height: 5rem;" />

    <div class="inline-block">
      <span class="px-1rem">昵称</span>
      <el-link v-if="display" @click="display = !display" type="info" style="width: 10rem;">{{ displayName === '' ?
        'undeinfed' : displayName }}</el-link>
      <el-input v-if="!display" type="text" maxlength clearable autofocus style="width: 10rem;"
        @blur="display = !display"></el-input>
    </div>
  </div>

  <el-dialog v-model="showDialog" title="修改头像" width="30rem">
    <el-row justify="center" class="mb-5">
      <el-avatar shape="square" :src="headUrl" style="margin-left: var(50%);">
        <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
      </el-avatar>
    </el-row>

    <el-form>
      <el-form-item label="Url" label-width="auto">
        <el-input v-model="headUrl" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="upload">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>