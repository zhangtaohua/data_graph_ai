<template>
  <div :id="id" class="row_nw_fs_center panel_container">
    <div class="row_nw_fs_center tag_icon"></div>
    <div class="row_nw_fs_center close_icon" @click="colseHandle"> X </div>
    <div class="col_nw_sb_fs info_box">
      <div class="row_nw_fs_center info_label"> {{ `名称： ${vNodeData.name}` }} </div>
      <div class="row_nw_fs_center info_label"> {{ `ID： ${vNodeData.id}` }} </div>
      <div class="row_nw_fs_center info_label"> {{ `经度： ${vNodeData.longitude}` }} </div>
      <div class="row_nw_fs_center info_label"> {{ `纬度： ${vNodeData.latitude}` }} </div>
      <div class="row_nw_fs_center info_label"> {{ `高度： ${vNodeData.height}` }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted } from "vue";

export default defineComponent({
  name: "StaticImagePopup",
  props: {
    id: {
      type: String,
      default: "001",
    },
    customT: {
      type: Function,
      default: (name: string) => name,
    },
    destory: {
      type: Function,
      default: () => {},
    },
    vNodeData: {
      type: Object,
      default() {
        return {
          name: "我是VueNode标题",
          longitude: "149.757575E",
          latitude: "30.435657N",
          satellite: "888",
          time: "2023-07-16 12:00:00",
          x: 180,
          y: 1620,
        };
      },
    },
  },
  setup(props, _) {
    const colseHandle = () => {
      props && props!.destory();
    };

    return {
      colseHandle,
    };
  },
});
</script>

<style scoped lang="scss">
.row_nw_fs_center {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

.col_nw_sb_fs {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: space-between;
}

.panel_container {
  position: absolute;
  z-index: 2;
  width: auto;
  min-width: 225px;
  height: auto;
  background: rgb(0 13 33 / 75%);
  border: 1px solid #f70;
  border-radius: 0.25rem;
}

.tag_icon {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 0.375rem;
  height: 0.375rem;
  background: #fff;
  border: 1px solid #f70;
  border-radius: 50%;
  cursor: pointer;
}

.close_icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  color: rgb(255 255 255 / 30%);
  font-size: 0.375rem;
  cursor: pointer;
}

.close_icon_show {
  width: 0.875rem;
  height: 0.875rem;
}

.info_box {
  width: max-content;
  height: auto;
  margin: 0.875rem 1.375rem;
}

.info_label {
  width: max-content;
  height: 1.25rem;
  color: rgb(255 255 255 / 100%);
  font-weight: 300;
  font-size: 0.64rem;
  font-family: "Source Han Sans CN";
}
</style>
