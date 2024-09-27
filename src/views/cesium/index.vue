<template>
  <div id="cesiumContainer" class="cesiumContainer">
    <div v-if="isShowLayerSplit" id="slider"></div>
    <img src="@/assets/images/cesium/camera.png" class="cesium_camera_icon" @click="toggleView()" />
    <img src="@/assets/images/cesium/indent-icon.svg" class="video_icon" @click="toggleShowVideo(true)" />

    <div v-if="isShowVideo" class="cesium_video_box">
      <img src="@/assets/images/cesium/close-icon.svg" class="close_icon2" @click="toggleShowVideo(false)" />

      <video
        class="cesium_video"
        autoplay
        loop
        id="video_home"
        type="video/mp4"
        width="100%"
        webkit-playsinline="false"
        x-webkit-airplay="allow"
        playsinline="false"
        x5-video-player-type="h5"
        x5-video-orientation="portrait"
        x5-video-player-fullscreen="portraint"
        src="https://belt-and-road-1256849727.cos.ap-beijing.myqcloud.com/demo/qitiaoludemo.mp4"
      ></video>
    </div>

    <img src="@/assets/images/cesium/pdf.svg" class="cesium_pdf_icon" @click="toggleShowDetail(true)" />

    <div v-if="isShowDetail" class="row_nw_center_center cesium_decontainer">
      <div class="cesium_demask" @click="toggleShowDetail(false)"> </div>

      <div class="row_nw_fs_center cesium_debox">
        <div class="row_nw_center_center cesium_deright">
          <div class="row_nw_fe_center cesium_deact">
            <img class="res_item_limg" src="@/assets/images/cesium/close-icon.svg" @click="toggleShowDetail(false)" />
          </div>

          <el-popover
            width="370px"
            popper-style="z-index:21; box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
          >
            <template #reference>
              <img src="@/assets/images/cesium/pdf.svg" class="cesium_depdf_icon" />
            </template>

            <template #default>
              <div class="col_nw_fs_center pdf_pop_box">
                <div class="pdf_titles"> 南沙全民文化体育综合体生态堤建设工程 （21 涌以北）二期报告 </div>
                <div class="row_nw_center_center pdf_labels"> 请选择报告期数 </div>
                <div class="pdf_lines"></div>

                <div class="row_nw_fs_center pdf_times">
                  <el-button text @click="setReportsUrl(pdf20240813)">2024年08月13号</el-button>
                  <el-button text @click="setReportsUrl(pdf20240624)">2024年06月24号</el-button>
                </div>
              </div>
            </template>
          </el-popover>

          <div class="row_nw_center_center cesium_deoutctx">
            <el-tabs v-model="docCurrentTab" type="card" class="rj_tab">
              <el-tab-pane v-for="item in docTabs" :key="item.key" :label="item.name" :name="item.key">
                <div class="rj_tab_pane blue_debug">
                  <component :is="item.comp" :report="reportUrl" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="layerModel == funcModel.ai"
      class="row_nw_fs_center ai_res_box"
      :class="{ ai_res_box_up: isShowCompareLayer }"
    >
      <div class="col_nw_fs_fs ai_wrap">
        <div v-for="aires in aiResData" :key="aires.name" class="row_nw_fs_center ai_res_item">
          <div class="ai_res_color" :style="{ backgroundColor: aires.color }"></div>
          <div class="ai_res_name">{{ aires.nameCh }}</div>
          <div class="ai_res_size">{{ aires.size }}</div>
        </div>
      </div>
    </div>

    <img
      v-if="!isShowCompareLayer"
      src="@/assets/images/cesium/image-comparison-icon.svg"
      class="compare_icon"
      @click="toggleShowCompare(true)"
    />
    <div
      v-if="isShowCompareLayer"
      class="col_nw_fs_fs compare_layer_box"
      @mouseenter="toggleShowCompare(true)"
      @mouseleave="toggleShowCompare(false)"
    >
      <div class="row_nw_center_center compare_layer_tbox">
        <el-radio-group v-model="layerModel">
          <el-radio-button :value="funcModel.model">模型</el-radio-button>
          <el-radio-button :value="funcModel.ai">AI 地物分类</el-radio-button>
        </el-radio-group>
      </div>

      <div class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">对比</span>
        <el-switch
          v-model="isShowLayerSplit"
          inline-prompt
          size="large"
          width="70px"
          active-text="Yes"
          inactive-text="No"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.ai" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">卫星</span>
        <el-switch
          v-model="layerAiCtl.satelliteLayer"
          inline-prompt
          size="large"
          width="70px"
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>
        <el-switch
          v-model="layerAiCtl.isShowSatelliteLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.ai" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">卫星 AI结果 </span>
        <el-switch
          v-model="layerAiCtl.satelliteLayerAi"
          inline-prompt
          size="large"
          width="70px"
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>
        <el-switch
          v-model="layerAiCtl.isShowSatelliteLayerAi"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">卫星 2023-12-15</span>
        <el-switch
          v-model="layerCtl.satelliteLayer"
          inline-prompt
          size="large"
          width="70px"
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>
        <el-switch
          v-model="layerCtl.isShowSatelliteLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">卫星 2024-06-06</span>
        <el-switch
          v-model="layerCtl.satelliteLayerNew"
          inline-prompt
          size="large"
          width="70px"
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>
        <el-switch
          v-model="layerCtl.isShowSatelliteLayerNew"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">无人机</span>
        <el-switch
          v-model="layerCtl.planeLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowPlaneLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">无人机 2024-08-26</span>
        <el-switch
          v-model="layerCtl.planeLayerNew"
          size="large"
          width="70px"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowPlaneLayerNew"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">路面</span>
        <el-switch
          v-model="layerCtl.allroadLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowAllroadLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">模型</span>
        <el-switch
          v-model="layerCtl.modelLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowModelLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model && false" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">模型Url</span>
        <el-switch
          v-model="layerCtl.modelUrlLayer"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowModelUrlLayer"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>

      <div v-if="layerModel == funcModel.model" class="row_nw_fs_center compare_layer_ibox">
        <span class="row_nw_fs_center compare_layer_label">标注</span>
        <el-switch
          v-model="layerCtl.geojsonLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Left"
          inactive-text="Right"
          disabled
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
        <div class="compare_layer_gap"></div>

        <el-switch
          v-model="layerCtl.isShowGeojsonLayer"
          size="large"
          width="70px"
          inline-prompt
          active-text="Show"
          inactive-text="Hidden"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, nextTick, watch } from "vue";

import Progress from "./Progress.vue";
// import ProgressHtml from "./ProgressHtml.vue";
import PdfView from "./PdfView.vue";
// import Yanshow from "./Yanshow.vue";

import CsMapHelper from "./cesiumHelper";

import { cesiumViewMode } from "@/utils/map/cesium/csConstant";

import {
  gaodeMap,
  googleImgUrlMap,
  googleVecUrlMap,
  googleEarthMap,
  bingMap,
  bingLightMap,
  mapboxBasic,
  mapboxAllBlue,
  osm,
  osmStamen,
  tiandituZh,
  tiandituZhUrl,
  tiandituEn,
} from "./MapConst";

const docTabs = [
  { key: "report", name: "报告", comp: PdfView },
  { key: "progress", name: "进度", comp: Progress },
  // { key: "progress", name: "进度", comp: ProgressHtml },
  // { key: "review", name: "验收", comp: Yanshow },
];

const aiResData = [
  {
    name: "water",
    nameCh: "水",
    size: "27.94%",
    color: "#0070FF",
  },
  {
    name: "plant",
    nameCh: "植被",
    size: "8.74%",
    color: "#38A800",
  },
  {
    name: "building",
    nameCh: "建筑",
    size: "4.19%",
    color: "#FF00C5",
  },
  {
    name: "road",
    nameCh: "道路",
    size: "11.29%",
    color: "#FF0000",
  },
  {
    name: "land",
    nameCh: "陆地",
    size: "6.37%",
    color: "#A98A7E",
  },
  {
    name: "cloud",
    nameCh: "云彩",
    size: "17.10%",
    color: "#FFFFFF",
  },
  {
    name: "other",
    nameCh: "其他",
    size: "24.37%",
    color: "#73FFDF",
  },
];

const docCurrentTab = ref(docTabs[0].key);

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  disposeMap();
});

const pdf20240813 =
  "https://tb-1256849727.cos.ap-beijing.myqcloud.com/pacific-data-test/report/%E5%8D%97%E6%B2%99%E5%85%A8%E6%B0%91%E6%96%87%E5%8C%96%E4%BD%93%E8%82%B2%E7%BB%BC%E5%90%88%E4%BD%93%E7%94%9F%E6%80%81%E5%A0%A4%E5%BB%BA%E8%AE%BE%E5%B7%A5%E7%A8%8B%EF%BC%8821%20%E6%B6%8C%E4%BB%A5%E5%8C%97%EF%BC%89%E4%BA%8C%E6%9C%9F%E6%8A%A5%E5%91%8A-20240813.pdf";
const pdf20240624 =
  "https://tb-1256849727.cos.ap-beijing.myqcloud.com/pacific-data-test/report/%E5%8D%97%E6%B2%99%E5%85%A8%E6%B0%91%E6%96%87%E5%8C%96%E4%BD%93%E8%82%B2%E7%BB%BC%E5%90%88%E4%BD%93%E7%94%9F%E6%80%81%E5%A0%A4%E5%BB%BA%E8%AE%BE%E5%B7%A5%E7%A8%8B%EF%BC%8821%20%E6%B6%8C%E4%BB%A5%E5%8C%97%EF%BC%89%E4%BA%8C%E6%9C%9F%E6%8A%A5%E5%91%8A-20240624.pdf";

const reportUrl = ref(pdf20240813);

const isShowVideo = ref(false);

const isShowDetail = ref(false);

const isShowCompareLayer = ref(false);

const funcModel = {
  model: "modle",
  ai: "ai",
};

const layerModel = ref(funcModel.model);
const isShowLayerSplit = ref(false);

const layerCtl = reactive({
  satelliteLayer: true,
  satelliteLayerNew: true,
  planeLayer: true,
  planeLayerNew: true,
  allroadLayer: true,
  modelLayer: true,
  modelUrlLayer: true,
  geojsonLayer: true,

  isShowSatelliteLayer: true,
  isShowSatelliteLayerNew: true,
  isShowPlaneLayer: true,
  isShowPlaneLayerNew: true,
  isShowAllroadLayer: true,
  isShowModelLayer: true,
  isShowModelUrlLayer: true,
  isShowGeojsonLayer: true,
});

const layerAiCtl = reactive({
  satelliteLayer: true,
  satelliteLayerAi: true,

  isShowSatelliteLayer: true,
  isShowSatelliteLayerAi: true,
});

const resetLayerCtl = () => {
  layerCtl.satelliteLayer = true;
  layerCtl.satelliteLayerNew = true;
  layerCtl.planeLayer = true;
  layerCtl.planeLayerNew = true;
  layerCtl.allroadLayer = true;
  layerCtl.modelLayer = true;
  layerCtl.modelUrlLayer = true;
  layerCtl.geojsonLayer = true;

  layerCtl.isShowSatelliteLayer = true;
  layerCtl.isShowSatelliteLayerNew = true;
  layerCtl.isShowPlaneLayer = true;
  layerCtl.isShowPlaneLayerNew = true;
  layerCtl.isShowAllroadLayer = true;
  layerCtl.isShowModelLayer = true;
  layerCtl.isShowModelUrlLayer = true;
  layerCtl.isShowGeojsonLayer = true;
};

const resetLayerAiCtl = () => {
  layerAiCtl.satelliteLayer = true;
  layerAiCtl.satelliteLayerAi = true;

  layerAiCtl.isShowSatelliteLayer = true;
  layerAiCtl.isShowSatelliteLayerAi = true;
};

function resAllLayers() {
  isShowLayerSplit.value = false;
  resetLayerCtl();
  resetLayerAiCtl();
  if (cesiumIns) {
    cesiumIns.resetOldLayerCtl();
    cesiumIns.resetOldLayerAiCtl();
  }
}

const toggleShowVideo = (isShow) => {
  // resAllLayers();
  isShowVideo.value = isShow;
};

const toggleShowDetail = (isShow) => {
  // resAllLayers();
  isShowDetail.value = isShow;
};

const setReportsUrl = (url: string) => {
  reportUrl.value = url;
  isShowDetail.value = true;
};

let compareTimer = null;
const toggleShowCompare = (isShow) => {
  if (compareTimer) {
    clearTimeout(compareTimer);
  }
  if (isShow) {
    isShowCompareLayer.value = isShow;
  } else {
    compareTimer = setTimeout(() => {
      isShowCompareLayer.value = isShow;
    }, 1500);
  }
};

const onlySphereOptions = {
  language: "zh_CN",
  pixelRatio: window.devicePixelRatio,
  viewMode: cesiumViewMode.scene3D,
  isShowtimeline: false,
  isShowHelper: false,
  isShowVr: false,
  isShowModePicker: false,
  isShowGeoSearch: false,
  isShowDefHome: false,
  isShowSkyAtmosphere: false,
  isShowFullScreen: false,
  isShowBaseLayerPicker: false,
  isShowSelectionIndicator: false,
  isShowinfoBox: false,
  isShowAnimation: false,
  mapProjection: null,
};

const fullSphereOptions = {
  language: "zh_CN",
  pixelRatio: window.devicePixelRatio,
  viewMode: cesiumViewMode.scene3D,
  isShowtimeline: true,
  isShowHelper: true,
  isShowVr: true,
  isShowModePicker: true,
  isShowGeoSearch: true,
  isShowDefHome: true,
  isShowSkyAtmosphere: true,
  isShowFullScreen: true,
  isShowBaseLayerPicker: true,
  isShowSelectionIndicator: true,
  isShowinfoBox: true,
  isShowAnimation: true,
  mapProjection: null,
};

let cesiumIns: CsMapHelper | null = null;

function initMap() {
  cesiumIns = new CsMapHelper("cesiumContainer", onlySphereOptions);
  cesiumIns.addBgLayer(gaodeMap);
  cesiumIns.removeDemoLayer();
  cesiumIns.removeAiDemoLayer();
  cesiumIns.addDemoLayer();
}

function disposeMap() {
  if (cesiumIns) {
    cesiumIns!.destructor();
  }
}

let viewSight = true;
function toggleView() {
  if (viewSight) {
    viewSight = false;
  } else {
    viewSight = true;
  }
  if (layerModel.value == funcModel.model) {
    cesiumIns?.toggleViewSight(viewSight);
  }
}

watch(
  layerModel,
  () => {
    resAllLayers();
    if (layerModel.value == funcModel.model) {
      cesiumIns!.removeAiDemoLayer();
      cesiumIns!.addDemoLayer();
      setTimeout(() => {
        viewSight = true;
        cesiumIns!.toggleViewSight(viewSight);
      }, 2000);
    } else if (layerModel.value == funcModel.ai) {
      cesiumIns!.removeDemoLayer();
      cesiumIns!.addAiDemoLayer();
      cesiumIns!.flyToLngLatHeight(113.63323700138265, 22.60246761156268, 20000, 2);
      setTimeout(() => {
        isShowLayerSplit.value = true;
        setTimeout(() => {
          layerAiCtl.satelliteLayerAi = false;
        }, 150);
      }, 150);
    }
  },
  {
    immediate: false,
    deep: false,
  },
);

watch(
  isShowLayerSplit,
  () => {
    if (isShowLayerSplit.value) {
      if (layerModel.value == funcModel.model) {
        cesiumIns!.setSplitLayers(layerCtl, true);
      } else if (layerModel.value == funcModel.ai) {
        cesiumIns!.setAiSplitLayers(layerAiCtl, true);
      }

      nextTick(() => {
        const slider = document.getElementById("slider");
        cesiumIns!.initSliderEvent(slider);
      });
    } else {
      cesiumIns!.destorySliderEvent();
      if (layerModel.value == funcModel.model) {
        cesiumIns!.setSplitLayers(layerCtl, false);
      } else if (layerModel.value == funcModel.ai) {
        cesiumIns!.setAiSplitLayers(layerAiCtl, false);
      }
    }
  },
  {
    immediate: false,
    deep: false,
  },
);

watch(
  layerCtl,
  () => {
    if (layerModel.value == funcModel.model) {
      if (isShowLayerSplit.value) {
        cesiumIns!.setSplitLayers(layerCtl, true);
      } else {
        cesiumIns!.toggleLayerCtl(layerAiCtl);
      }
      cesiumIns!.setShowHiddenLayer(layerCtl);
    }
  },
  {
    immediate: false,
    deep: false,
  },
);

watch(
  layerAiCtl,
  () => {
    if (layerModel.value == funcModel.ai) {
      if (isShowLayerSplit.value) {
        cesiumIns!.setAiSplitLayers(layerAiCtl, true);
      } else {
        cesiumIns!.toggleAiLayerCtl(layerAiCtl);
      }
      cesiumIns!.setShowHiddenAiLayer(layerAiCtl);
    }
  },
  {
    immediate: false,
    deep: false,
  },
);
</script>

<style scoped lang="scss">
.cesiumContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.cesium_camera_icon {
  position: absolute;
  top: 0px;
  right: 132px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1;
}

#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 2;
}

#slider:hover {
  cursor: ew-resize;
}

.video_icon {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1;
}

.cesium_video_box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cesium_video {
  width: 100%;
  height: auto;
}

.close_icon2 {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1;
}

.cesium_pdf_icon {
  position: absolute;
  top: 0px;
  right: 64px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 2;
}

.pdf_pop_box {
  width: 100%;
  height: auto;
}

.pdf_titles {
  width: 98%;
  height: 48px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.pdf_labels {
  width: 98%;
  height: 20px;
  font-size: 14px;
  color: #286eaf;
  margin-bottom: 8px;
}

.pdf_lines {
  width: 96%;
  height: 0;
  border-bottom: 1px solid var(--c-220-223-230-100);
}

.pdf_times {
  width: 98%;
  height: 42px;
}

.cesium_decontainer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: 100vh;
}

.cesium_demask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: var(--c-026-030-039-040);
}

.cesium_debox {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: var(--c-255-255-255-100);
}

.cesium_deright {
  position: relative;
  width: 100%;
  height: 100%;
}

.cesium_deact {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: 0;
  z-index: 2;
}

.cesium_depdf_icon {
  position: absolute;
  top: 0px;
  right: 64px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 2;
}

.res_item_limg {
  width: 48px;
  height: 48px;
  cursor: pointer;
}

.cesium_deoutctx {
  position: absolute;
  width: 98%;
  height: 94%;
  z-index: 0;
  margin-top: 2%;
  background: var(--c-247-248-250-100);
}

.rj_tab {
  width: 99%;
  height: 99%;
  display: flex;
  --el-border-color-light: var(--c-220-223-230-100);

  .el-tabs__item {
    font-size: var(--fsr-12px);
    height: 2.25rem;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    padding: 0 1.51vw !important;
    --el-color-primary: #286eaf;
    --el-text-color-primary: #1a202c;
  }

  .el-tabs__header {
    margin-bottom: 1.4vw;
  }

  .el-tabs__content {
    flex: 1;
    flex-grow: 1;
    overflow: hidden;

    .el-tab-pane {
      height: 100%;
      overflow: hidden;
    }
  }
}

.rj_tab_pane {
  width: 100%;
  height: 100%;
}

.compare_icon {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  z-index: 1;
  background-color: #1a202c;
  padding: 4px;
  border-radius: 8px;
}

.ai_res_box {
  position: absolute;
  bottom: 86px;
  right: 0;
  width: 220px;
  height: auto;
  z-index: 10;
  background-color: black;
  padding: 12px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.ai_res_box_up {
  bottom: 240px;
}

.ai_wrap {
  width: 100%;
  height: auto;
}

.ai_res_item {
  width: 100%;
  height: 32px;
  font-size: 18px;
  color: white;
}

.ai_res_color {
  width: 48px;
  height: 16px;
  margin-right: 12px;
}

.ai_res_name {
  width: 48px;
  height: 16px;
  margin-right: 8px;
}

.ai_res_size {
  width: 80px;
  height: 16px;
}

.compare_layer_box {
  position: absolute;
  bottom: 16px;
  right: 0;
  width: 330px;
  height: auto;
  z-index: 10;
  background-color: black;
  padding: 12px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.compare_layer_tbox {
  width: 100%;
  height: 48px;
  margin-bottom: 8px;
}

.compare_layer_ibox {
  width: 100%;
  height: 42px;
}

.compare_layer_actbox {
  width: 100%;
  height: 48px;
  margin-top: 8px;
}

.compare_layer_label {
  width: 142px;
  font-size: 16px;
  color: white;
  margin-right: 8px;
}

.compare_layer_gap {
  width: 12px;
  height: 100%;
}
</style>
