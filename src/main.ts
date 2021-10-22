import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/it";

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });
app.mount("#app");
