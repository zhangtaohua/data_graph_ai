<template>
  <div class="pdf_container">
    <iframe :src="fileUrl" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup>
// import { ref } from "vue";

// const fileUrl = "https://belt-and-road-1256849727.cos.ap-beijing.myqcloud.com/demo/yanshow.mht";
// const fileUrl = "http://192.168.3.93:5173/doc/yanshow.html";
const fileUrl = "/doc/yanshow.html";
</script>

<style scoped lang="scss">
.pdf_container {
  width: 100%;
  height: 100%;
}
</style>
