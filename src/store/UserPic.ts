import { defineStore } from 'pinia'
import UserInfo from "./modules/User"
import { ref } from 'vue';
import { userapi } from '~/api';

const usePicsStore = defineStore('pics', () => {

  const pics = ref<Map<string, string | undefined>>(new Map<string, string | undefined> );

  const initPics = () => {
    pics.value.clear();
    userapi.all().then((infos: { data: UserInfo[] }) => {
      infos.data.forEach(item => {
        if(item.username){
          pics.value.set(item.username, item.headUrl);
        }
      });
    })
  }

  return { initPics, pics }
});

export default usePicsStore;