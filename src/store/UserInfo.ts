import { defineStore } from 'pinia';
import UserInfo from "./modules/User"
import { ref } from 'vue';
import router from '~/routers';

const useUserStore = defineStore('user', () => {
  const state = ref<UserInfo>();

  const Login = (user: UserInfo) => {
    if(!user) return;
    state.value = user;
    window.localStorage.setItem('user', JSON.stringify(state.value));
    router.push('/');
  }

  const Logout = () =>{
    state.value = undefined;
    window.localStorage.removeItem('user');
    router.push('/login');
  }

  return { state, Login, Logout }

});

export default useUserStore;