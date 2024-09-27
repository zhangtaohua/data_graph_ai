<template>
  <div class="wh_100vw_100vh app_container">
    <router-view v-if="refreshRouter" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, provide, onMounted } from "vue";

const refreshRouter = ref(true);

const reloadApp = () => {
  refreshRouter.value = false;
  nextTick(() => {
    refreshRouter.value = true;
  });
};

onMounted(() => {
  provide("reloadApp", reloadApp);
});
</script>

<style scoped>
.app_container {
  margin: 0;
  padding: 0;
  overflow: scroll;
  scroll-behavior: smooth;
}

.app_container::-webkit-scrollbar {
  display: none;
  width: 0;
}
</style>
