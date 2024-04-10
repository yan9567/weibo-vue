import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import { createPinia } from 'pinia'
import mitt from 'mitt'
// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line
//  import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/notification.scss";

const bus = mitt()
const pinia = createPinia();
const app = createApp(App);
// 再注册全局事件总线
app.config.globalProperties.$bus = bus
app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
