import { defineStore } from 'pinia';
import UserInfo from "./modules/User"
import { computed, ref } from 'vue';
import router from '~/routers';

const useUserStore = defineStore('user', () => {
  const state = ref<UserInfo>();

  const Login = (user: UserInfo) => {
    if (!user) return;
    state.value = user;
    window.localStorage.setItem('user', JSON.stringify(state.value));
    router.push('/');
  }

  const Logout = () => {
    state.value = undefined;
    window.localStorage.removeItem('user');
    router.push('/login');
  }

  const updateHeadpic = (headurl: string) => {
    if (state.value) {
      state.value.headUrl = headurl;
    }
  }

  const getToken = computed(() => {
    return 'bearer ' + state.value?.token;
  })


  return { state, Login, Logout, updateHeadpic, getToken}

});

export default useUserStore;