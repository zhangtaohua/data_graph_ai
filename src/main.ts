import { createApp } from "vue";
import ElementPlus from "element-plus";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "element-plus/dist/index.css";
import "@/assets/style/font.scss";
import "@/assets/style/normalize.css";
import "@/assets/style/base.scss";
import "@/assets/style/flex.scss";
import "@/assets/style/general.scss";
import "@/assets/style/size.scss";
import "@/assets/style/mpgap.scss";
import "@/assets/style/csCustom.scss";

import App from "./App.vue";
import router from "@/router/index";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus).mount("#app");
