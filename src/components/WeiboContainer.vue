<template>
  <div class="main">

    <div class="flex justify-between flex-items-center">
      <p class="m0">记录你的生活吧</p>
      <el-button type="" :icon="Plus" plain @click="AddOrSubmit" size="small">{{ btnText }}</el-button>
    </div>

    <Transition name="fade">
      <el-input class="my2" type="textarea" :rows="4" v-model="texts" v-if="isEditing" placeholder="想说些什么..." />
    </Transition>

    <el-skeleton style="width: auto" :loading="loading" animated :throttle="500">
      <!--鱼骨图-->
      <template #template>
        <div v-for="(item, index) in 3">
          <div class="divider my1" v-if="index != 0"></div>
          <el-skeleton-item variant="image" style="width: 48px; height: 48px; float: left; margin-top: 0.3rem;" />
          <div style="padding-left: 68px">
            <el-skeleton-item variant="p" style="width: 80%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 50%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 90%; margin: 0.3rem 0" />
            <el-skeleton-item variant="p" style="width: 60%; margin: 0.3rem 0" />
          </div>
        </div>
      </template>

      <!--主内容-->
      <template #default>
        <div class="ul m0 p0" v-for="(weibo, index) in weibos">
          <div class="divider" v-if="index != 0"></div>
          <WeiboView :weibo="weibo" :Delete="Delete" />
        </div>
      </template>
    </el-skeleton>

    <!--空页面-->
    <el-empty description="说点什么吧~" v-if="!loading && (!weibos || weibos.length === 0)" />
    <!--分页-->
    <el-row justify="center" class="my5">
      <el-pagination class="ml-a mr-a" layout="prev, pager, next" :page-size="15" :total="totalCount" @prev-click="prev"
        @next-click="next" @current-change="pageto" />
    </el-row>
    <el-row justify="space-around" class="my3 items-center">
      <el-text size="default" style="color: var(--ep-color-info);">power with hair by 果酱 @ 2022</el-text>
      <el-text size="default" style="color: var(--ep-color-info);">{{ livelong }}</el-text>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Check } from '@element-plus/icons-vue'
import { computed, onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import WeiboView from "./Weibo.vue"
import Weibo from "~/store/modules/Weibo"
import { MessageFun, NotificationFun } from "~/composables/index";
import { weiboapi } from "~/api/index";
import useUserStore from '~/store/UserInfo';
import usePicsStore from '~/store/UserPic';
import { getCurrentInstance } from 'vue'

// 在setup函数中获取实例对象并定义bus
const instance = getCurrentInstance()
const bus = instance?.appContext.config.globalProperties.$bus

const picStore = usePicsStore();
const userStore = useUserStore();
const texts = ref('');
const currentPage = ref(0);
const totalCount = ref(100);
const weibos = ref<Weibo[]>();
const loading = ref(true);
let isEditing = ref(false);
let nIntervId: number;
const livelong = ref('');

const btnText = computed(() => {
  return isEditing.value ? '提交' : '新建'
});

/**
 * 保存
 * @param event 按钮事件
 */
const AddOrSubmit = (event: Event) => {
  let btn = event.target as HTMLButtonElement;
  if (!btn) return;
  if (!isEditing.value && !userStore.state) {
    MessageFun('请先登录', 'warning');
    return;
  }
  if (isEditing.value && texts.value.length > 0) {
    Add(texts.value);
  }
  isEditing.value = !isEditing.value;
}

/**初始化 */
onMounted(() => {
  //请求首页内容
  Flush();
  //加载头像
  picStore.initPics();
  // 在mounted 函数中声明监听对象
  bus.on('search', (querystr: any) => {
    // console.log('获取其它组建传给我的值' + querystr)
    if (!querystr || querystr == '') {
      Flush();
    }else{
      Search(querystr, 0);
    }
  })
  //计算存活时长
  nIntervId = window.setInterval(weblivelong, 1000)
})
/**析构 */
onBeforeUnmount(() => {
  clearInterval(nIntervId);
});

/**
 * 计算网站存活时长
 */
const weblivelong = () => {
  //2022/3/23 14:19:31
  let birthday = import.meta.env.VITE_BRITHDAY ? import.meta.env.VITE_BRITHDAY : "2022/3/23 14:19:31";
  let start = new Date(birthday);    //开始时间
  let now = new Date();    //结束时间
  let alive = now.getTime() - start.getTime(); //时间差秒]

  //年
  let years = Math.floor(alive / (365 * 24 * 3600 * 1000));

  //计算出相差天数
  let days = Math.floor(alive / (24 * 3600 * 1000) - years * 365);

  //计算出小时数
  let leave1 = alive % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000));

  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数
  let leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000);
  livelong.value = "本站存活：" + years + "年" + days + "天" + hours.toString().padStart(2, '0') + "时" + minutes.toString().padStart(2, '0') + "分" + seconds.toString().padStart(2, '0') + "秒";
}
/**
 * 新增
 * @param content 内容
 */
const Add = async (content: string) => {
  if (!content || content.length === 0) return;
  try {
    await weiboapi.Add(content);
    texts.value = '';
    Flush();
  }
  catch (error: any) {
    MessageFun(error, 'error');
  }
}

/**
 * 删除
 * @param id 
 */
const Delete = async (id: string) => {
  if (!id) return;
  if (!userStore.state) return;

  try {
    await weiboapi.Delete(id);
    Flush();
  }
  catch (error: any) {
    MessageFun(error, 'error');
  }
}

/**
 * 搜索
 * @param query 
 * @param page 
 */
const Search = (query: string, page: number = 0) => {
  if (!query || query == '') return;
  if (page < 0) page = 0;
  weiboapi.Search(query, page)
    .then((response: { data: { total: string, list: Weibo[] } }) => {
      if (response.data) {
        weibos.value = response.data.list;
        totalCount.value = parseInt(response.data.total);
      }
    })
    .catch((error: any) => {
      MessageFun(error, 'error');
    })
    .finally(() => {
      if (loading.value) {
        loading.value = false;
      }
    });
}

/**
 * 更新微博内容
 * @param page 页码
 */
const Flush = (page: number = 0) => {
  if (page < 0) page = 0;
  weiboapi.Page(page)
    .then((response: { data: { total: string, list: Weibo[] } }) => {
      if (response.data) {
        weibos.value = response.data.list;
        totalCount.value = parseInt(response.data.total);
      }
    })
    .catch((error: any) => {
      MessageFun(error, 'error');
    })
    .finally(() => {
      if (loading.value) {
        loading.value = false;
      }
    });
}

/**
 * 上一页
 */
const prev = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    Flush(currentPage.value);
  }
}

/**
 * 下一页
 */
const next = () => {
  if (totalCount.value / 15 > currentPage.value) {
    currentPage.value++;
    Flush(currentPage.value);
  }
}

/**
 * 跳转页码
 * @param index 页码（前台显示1始）
 */
const pageto = (index: number) => {
  currentPage.value = index - 1;
  Flush(currentPage.value);
}

defineExpose({ Search })
</script>

<style lang="scss" scoped>
.divider {
  width: auto;
  border-top: 1px solid var(--ep-border-color);
  margin-left: calc(48px + 20px);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  // transition: opacity 0.5s ease;
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>