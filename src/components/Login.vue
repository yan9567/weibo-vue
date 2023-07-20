<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { type FormInstance, type FormRules } from 'element-plus'
import { loginapi } from "~/api/index"
import { MessageFun, NotificationFun } from "~/composables/notify"
import useUserStore from "~/store/UserInfo";
import UserInfo from '~/store/modules/User';

const userStore = useUserStore();
interface User {
  username: string
  password: string
}
const formRef = ref<FormInstance>()
const user = reactive<User>({
  username: '',
  password: ''
})
const rules = reactive<FormRules<User>>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }, //blur 失去聚点触发
    { min: 2, max: 10, message: '用户名为2~10个字符', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
  ]
});


/**
 * 登录
 * @param formEl 表格DOM
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      try {
        let ret = await loginapi.login(user.username, user.password);
        let userinfo: UserInfo = {
          username: user.username,
          token: ret.data.token,
          role: "admin",
          // lastlogin: new Date()
        }
        userStore.Login(userinfo);
      }
      catch (error: any) {
        MessageFun('登录失败', 'error');
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
/**
 * 清空
 * @param formEl 
 */
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const regist = async () => {
  try {
    await loginapi.regist(user.username, user.password);
    MessageFun('注册成功', 'success');
  }
  catch (error: any) {
    NotificationFun(error.message as string, '注册失败', 'error');
  }
}

</script>

<template>
  <el-form :inline="false" :rules="rules" ref="formRef" :model="user" label-width="auto" class="login-form-inline">

    <el-form-item label="账号" prop="username">
      <el-input v-model="user.username" maxlength="10" class="el-input" placeholder="请输入用户名" clearable />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="user.password" maxlength="10" class="el-input" placeholder="请输入密码" clearable show-password />
    </el-form-item>

    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      <el-button @click="regist">注册</el-button>
    </el-form-item>

  </el-form>
</template>

<style lang="scss" scoped>
// .el-input {
//   width: auto;
// }
</style>