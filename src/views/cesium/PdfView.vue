<template>
  <div class="pdf_container">
    <iframe :src="pdfurl" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";

const props = defineProps({
  report: {
    type: String,
    default: "",
  },
});
const pdfurl = ref("");

const fileUrl = "/pdf/web/viewer.html";
// const pathTest = "/doc/test.pdf";

onMounted(() => {
  initShow();
});

watch(
  () => props.report,
  () => {
    initShow();
  },
  {
    immediate: false,
    deep: false,
  },
);

function initShow() {
  if (props.report) {
    const path = `${props.report}`;
    // const path = `/doc/${props.report}`;
    pdfurl.value = fileUrl + "?file=" + encodeURIComponent(path);
  }
}
</script>

<style scoped lang="scss">
.pdf_container {
  width: 100%;
  height: 100%;
}
</style>
