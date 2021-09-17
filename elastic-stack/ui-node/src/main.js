import Vue from "vue";
import App from "./App.vue";
import { ApmVuePlugin } from "@elastic/apm-rum-vue";

Vue.config.productionTip = false;

Vue.use(ApmVuePlugin, {
  config: {
    serviceName: "elastic-rum",
    serverUrl: "http://localhost:8200",
    pageLoadTraceId: "${transaction.traceId}",
    pageLoadSpanId: "${transaction.ensureParentId()}",
    pageLoadSampled: "${transaction.sampled}",
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
