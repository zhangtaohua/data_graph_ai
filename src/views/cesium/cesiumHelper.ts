import * as Cesium from "cesium";

import CsBase from "@/utils/map/cesium/base";
import type { CesiumBasicOptions } from "@/utils/map/cesium/baseTypes";

import CsUrlTemplateLayers from "@/utils/map/cesium/urlTemplateLayers";
import type { UrlTemplateOptions } from "@/utils/map/cesium/urlTemplateLayersTypes";

import CsBingMapsLayers from "@/utils/map/cesium/bingmapsLayers";
import type { BingMapsOptions } from "@/utils/map/cesium/bingmapsLayersTypes";

import CsGoogleEarthLayers from "@/utils/map/cesium/googleEarthLayers";
import type { GoogleEarthOptions } from "@/utils/map/cesium/googleEarthLayersTypes";

import CsOsmMapsLayers from "@/utils/map/cesium/osmLayers";
import type { OsmOptions } from "@/utils/map/cesium/osmLayersTypes";

import CsWmtsLayers from "@/utils/map/cesium/wmtsLayers";
import type { WMTSOptions } from "@/utils/map/cesium/wmtsLayersTypes";

import CsIonTilesLayers from "@/utils/map/cesium/ionTilesLayers";
import type { IONTilesOptions } from "@/utils/map/cesium/ionTilesLayersTypes";

import CsGeojsonLayers from "@/utils/map/cesium/geojsonLayers";
import type { GeojsonTopoJSONOptions } from "@/utils/map/cesium/geojsonLayersTypes";

import CsVueNodePopup from "@/utils/map/cesium/vueNodePopupLayers";
import type { VueNodeOptions } from "@/utils/map/cesium/vueNodePopupLayersTypes";

import { screenEventType } from "@/utils/map/cesium/csConstant";

import { roadData } from "@/assets/json/road.js";

import BuildInfos from "./BuildInfos.vue";

import {
  mapXYZUrl,
  bingmapImagerySet,
  bingMapCsBaseUrl,
  mapWMTSUrl,
  googleEarthCsBaseUrl,
  OsmCsBaseUrl,
  OsmStamenMapsCsBaseUrl,
} from "@/utils/map/sourceUrl";

import { defaultMapOptions, mapKeys } from "@/utils/map/geoConstant";

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
  tianditu,
  tiandituZh,
  tiandituZhUrl,
  tiandituEn,
} from "./MapConst";

import { nanoid } from "nanoid";
import { lte } from "lodash";

export default class CsMapHelper extends CsBase {
  private __bgLayers: any = null; // 底图
  private __funcLayers: any = null; // 功能图层
  public csUrlIns: CsUrlTemplateLayers | null = null;
  public csBingmapIns: CsBingMapsLayers | null = null;
  public csGoogleEarthIns: CsGoogleEarthLayers | null = null;
  public csOsmIns: CsOsmMapsLayers | null = null;
  public csWmtsIns: CsWmtsLayers | null = null;
  public csIonIns: CsIonTilesLayers | null = null;
  public csGeojsonIns: CsGeojsonLayers | null = null;
  public vuePopupIns: CsVueNodePopup | null = null;

  private __gaodeUrlOptions: UrlTemplateOptions = {
    id: gaodeMap,
    name: gaodeMap,
    url: mapXYZUrl.aMap_vec_single,
  };

  private __googleImgUrlOptions: UrlTemplateOptions = {
    id: googleImgUrlMap,
    name: googleImgUrlMap,
    url: mapXYZUrl.google_img,
  };

  private __googleVecUrlOptions: UrlTemplateOptions = {
    id: googleVecUrlMap,
    name: googleVecUrlMap,
    url: mapXYZUrl.google_vec,
  };

  private __mapboxBasicUrlOptions: UrlTemplateOptions = {
    id: mapboxBasic,
    name: mapboxBasic,
    url: mapXYZUrl.mapbox_local_basic,
  };

  private __mapboxAllBlueUrlOptions: UrlTemplateOptions = {
    id: mapboxAllBlue,
    name: mapboxAllBlue,
    url: mapXYZUrl.mapbox_local_allblue,
  };

  private __tiandituUrlOptions: UrlTemplateOptions = {
    id: `${tianditu}_zhurl`,
    name: `${tianditu}_zhurl`,
    url: mapXYZUrl.tiandi_cs_spm_vec,
    subdomains: mapXYZUrl.tiandi_subdomains,
    // tilingScheme : new Cesium.WebMercatorTilingScheme(),
  };

  private __tiandituZhUrlLabelOptions: UrlTemplateOptions = {
    id: `${tianditu}_zhurl_label`,
    name: `${tianditu}_zhurl_label`,
    url: mapXYZUrl.tiandi_cs_spm_vec_zh_label,
    subdomains: mapXYZUrl.tiandi_subdomains,
    // tilingScheme : new Cesium.WebMercatorTilingScheme(),
  };

  private __bingMapAerialOptions: BingMapsOptions = {
    id: bingMap,
    name: bingMap,
    url: bingMapCsBaseUrl,
    mapStyle: bingmapImagerySet.Aerial,
    key: mapKeys.bingmapKey,
    useDefault: true,
  };

  private __bingMapLightOptions: BingMapsOptions = {
    id: bingLightMap,
    name: bingLightMap,
    url: bingMapCsBaseUrl,
    mapStyle: bingmapImagerySet.CanvasLight,
    key: mapKeys.bingmapKey,
    // useDefault: true,
  };

  private __googleEarthOptions: GoogleEarthOptions = {
    id: googleEarthMap,
    name: googleEarthMap,
    url: googleEarthCsBaseUrl,
  };

  private __osmOptions: OsmOptions = {
    id: osm,
    name: osm,
    // url: OsmCsBaseUrl,
  };

  private __osmStamenOptions: OsmOptions = {
    id: osmStamen,
    name: osmStamen,
    url: OsmStamenMapsCsBaseUrl,
  };

  private __tiandituImgOptions: WMTSOptions = {
    id: `${tianditu}_img`,
    name: `${tianditu}_img`,
    url: mapWMTSUrl.tiandi_sp_img_full,
  };

  private __tiandituZhLabelOptions: WMTSOptions = {
    id: `${tianditu}_zh_label`,
    name: `${tianditu}_zh_label`,
    url: mapWMTSUrl.tiandi_sp_img_zh_label_full,
  };

  private __tiandituEnLabelOptions: WMTSOptions = {
    id: `${tianditu}_en_label`,
    name: `${tianditu}_en_label`,
    url: mapWMTSUrl.tiandi_sp_img_en_label_full,
  };

  constructor(target: string, csBasicOptions: CesiumBasicOptions) {
    super(target, csBasicOptions);
    this.__bgLayers = new Map();
    this.__funcLayers = new Map();

    this.csUrlIns = new CsUrlTemplateLayers(this);
    this.csBingmapIns = new CsBingMapsLayers(this);
    this.csGoogleEarthIns = new CsGoogleEarthLayers(this);
    this.csOsmIns = new CsOsmMapsLayers(this);
    this.csWmtsIns = new CsWmtsLayers(this);

    this.csIonIns = new CsIonTilesLayers(this);
    this.csGeojsonIns = new CsGeojsonLayers(this);

    this.vuePopupIns = new CsVueNodePopup(this);
  }

  public destructor() {
    this.csUrlIns!.destructor();
    this.csBingmapIns!.destructor();
    this.csGoogleEarthIns!.destructor();
    this.csOsmIns!.destructor();
    this.csWmtsIns!.destructor();
    this.csIonIns!.destructor();
    this.csGeojsonIns!.destructor();
    this.vuePopupIns?.destructor();

    this.__bgLayers = null;
    this.__funcLayers = null;
    super.destructor();
  }

  public __addBgLayer(ins: any, options: any) {
    if (this.__bgLayers.has(options.id)) {
      ins!.showHiddenLayerByID(options.id, true);
    } else {
      const isAdded = ins!.addLayer(options);
      if (isAdded) {
        this.__bgLayers.set(options, ins);
      }
    }
  }

  public __hiddenBgLayer(options: any) {
    if (this.__bgLayers.has(options.id)) {
      const ins = this.__bgLayers.get(options.id);
      ins!.showHiddenLayerByID(options.id, false);
    }
  }

  public hiddenAllBgLayers() {
    if (this.__bgLayers && this.__bgLayers.size) {
      for (const [optionsKey, valueHandle] of this.__bgLayers.entries()) {
        valueHandle.showHiddenLayerByID(optionsKey.id, false);
      }
      return true;
    } else {
      return false;
    }
  }

  public addBgLayer(id: string) {
    // 先隐藏map
    this.hiddenAllBgLayers();
    switch (id) {
      case gaodeMap: {
        this.__addBgLayer(this.csUrlIns, this.__gaodeUrlOptions);
        break;
      }
      case googleImgUrlMap: {
        this.__addBgLayer(this.csUrlIns, this.__googleImgUrlOptions);
        break;
      }
      case googleVecUrlMap: {
        this.__addBgLayer(this.csUrlIns, this.__googleVecUrlOptions);
        break;
      }
      // case googleEarthMap: {
      //   this.__addBgLayer(this.csGoogleEarthIns, this.__googleEarthOptions);
      //   break;
      // }
      case bingMap: {
        this.__addBgLayer(this.csBingmapIns, this.__bingMapAerialOptions);
        break;
      }
      case bingLightMap: {
        this.__addBgLayer(this.csBingmapIns, this.__bingMapLightOptions);
        break;
      }
      case mapboxBasic: {
        this.__addBgLayer(this.csUrlIns, this.__mapboxBasicUrlOptions);
        break;
      }
      case mapboxAllBlue: {
        this.__addBgLayer(this.csUrlIns, this.__mapboxAllBlueUrlOptions);
        break;
      }
      case osm: {
        this.__addBgLayer(this.csOsmIns, this.__osmOptions);

        break;
      }
      case osmStamen: {
        this.__addBgLayer(this.csOsmIns, this.__osmStamenOptions);
        break;
      }
      case tiandituZh: {
        this.__addBgLayer(this.csWmtsIns, this.__tiandituImgOptions);
        setTimeout(() => {
          this.__addBgLayer(this.csWmtsIns, this.__tiandituZhLabelOptions);
        }, 1000);
        break;
      }
      case tiandituZhUrl: {
        this.__addBgLayer(this.csUrlIns, this.__tiandituUrlOptions);
        this.__addBgLayer(this.csUrlIns, this.__tiandituZhUrlLabelOptions);
        break;
      }
      case tiandituEn: {
        this.__addBgLayer(this.csWmtsIns, this.__tiandituImgOptions);
        this.__addBgLayer(this.csWmtsIns, this.__tiandituEnLabelOptions);
        break;
      }
      default: {
        break;
      }
    }
  }

  getDebugLngLatHt() {
    const scene = this.viewer.scene;
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

    // 添加鼠标移动事件监听器
    handler.setInputAction((movement) => {
      // 获取鼠标移动到的屏幕坐标
      const cartesian = this.viewer.scene.pickPosition(movement.endPosition);

      if (Cesium.defined(cartesian)) {
        // 将 Cartesian3 转换为经纬度
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const height = cartographic.height;

        // 打印经纬度和高度信息
        console.log("Longitude: " + longitude + ", Latitude: " + latitude + ", Height: " + height);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  selectedFeature = undefined;

  vuePopupOptions = {
    id: "cesium_vue_node_test_id",
    name: "cesium_vue_node_test_name",
    vNode: BuildInfos,
    position: [0, 0, 0],
    vNodeData: {},
  };

  getDebugFeatures() {
    const scene = this.viewer.scene;
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction((clickEvent: any) => {
      // const feature = scene.drillPick(clickEvent.position);
      // const feature = scene.pick(clickEvent.endPosition);
      const feature = scene.pick(clickEvent.position);
      if (!Cesium.defined(feature)) {
        this.vuePopupIns?.hiddenPopupByID(this.vuePopupOptions.id);
        return null;
      }
      const content = feature.content;
      if (feature instanceof Cesium.Cesium3DTileFeature) {
        const name = feature.getProperty("name");
        const id = feature.getProperty("id");
        const element = feature.getProperty("element");

        console.log(
          "getDebugFeatures",
          feature,
          feature.properties,
          feature._properties,
          feature._property,
          name,
          id,
          element,
        );

        // if (!name) {
        //   const content = feature.content;
        //   if (content && content instanceof Cesium.Model3DTileContent) {
        //     console.log("content0", content);
        //     if (content.featuresLength > 0) {
        //       for (let i = 0; i < content.featuresLength; i++) {
        //         const featureIN = content.getFeature(i);
        //         console.log("Feature ID: ", featureIN, featureIN.getProperty("id"), featureIN.getProperty("name")); // 获取特性ID
        //         if (i > 5) {
        //           break;
        //         }
        //       }
        //     }
        //   }
        // }

        const cartesian = this.viewer.scene.pickPosition(clickEvent.position);
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const height = cartographic.height;
        this.vuePopupOptions.position = [longitude, latitude, height];

        this.vuePopupOptions.vNodeData = {
          id: id,
          name: name,
          longitude: longitude,
          latitude: latitude,
          height: height,
        };

        this.vuePopupIns?.updateLayer(this.vuePopupOptions as VueNodeOptions);
        this.vuePopupIns?.showPopupByID(this.vuePopupOptions.id);
      } else if (content && content instanceof Cesium.Model3DTileContent) {
        const featureDetail = feature.detail;
        if (featureDetail) {
          const node = featureDetail.node;
          if (node) {
            // console.log("conten", feature, node);
            let name = node._name;
            const id = node._id;

            if (name) {
              name = name.replace(/[_\-.]?\d+/g, "");
            }

            const cartesian = this.viewer.scene.pickPosition(clickEvent.position);
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            const longitude = Cesium.Math.toDegrees(cartographic.longitude);
            const latitude = Cesium.Math.toDegrees(cartographic.latitude);
            const height = cartographic.height;
            this.vuePopupOptions.position = [longitude, latitude, height];

            this.vuePopupOptions.vNodeData = {
              id: id,
              name: name,
              longitude: longitude,
              latitude: latitude,
              height: height,
            };

            this.vuePopupIns?.updateLayer(this.vuePopupOptions as VueNodeOptions);
            this.vuePopupIns?.showPopupByID(this.vuePopupOptions.id);
          }
        }
        // if (content.featuresLength > 0) {
        //   for (let i = 0; i < content.featuresLength; i++) {
        //     const featureIN = content.getFeature(i);
        //     console.log("Feature ID: ", featureIN, featureIN.getProperty("id")); // 获取特性ID
        //     if (i > 5) {
        //       break;
        //     }
        //   }
        // }
      } else {
        this.vuePopupIns?.hiddenPopupByID(this.vuePopupOptions.id);
      }
      // this.unselectFeature(this.selectedFeature);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  satelliteUrl =
    "http://ns.starwiz.cn:8080/titiler/services/e84e909b-4eea-4593-8470-04ff6805f0ee_2023-12-15/tiles/{z}/{x}/{y}.png";

  satelliteUrlNew =
    "http://ns.starwiz.cn:8080/titiler/services/e84e909b-4eea-4593-8470-04ff6805f0ee_2024-06-24/tiles/{z}/{x}/{y}.png";

  planeUrl = "http://ns.starwiz.cn:8080/titiler/services/drones_5km2_2d/tiles/{z}/{x}/{y}.png";

  planeUrlNew = "http://ns.starwiz.cn:8080/titiler/services/drone_nansha_20240829/tiles/{z}/{x}/{y}.png";

  allroadUrl = "http://ns.starwiz.cn:8080/services/all_road/tiles/{z}/{x}/{y}.png";

  satelliteUrlAiRes = "http://ns.starwiz.cn:8080/titiler/services/sensing_classified_20240624/tiles/{z}/{x}/{y}.png";

  satelliteOptions = {
    id: "test_sate_xyz_id",
    url: this.satelliteUrl,
    minZoom: 0,
    maxZoom: 18,
  };

  satelliteOptionsNew = {
    id: "test_sate_xyz_new_id",
    url: this.satelliteUrlNew,
    minZoom: 0,
    maxZoom: 18,
  };

  satelliteOptionsAi = {
    id: "ai_sate_xyz_id",
    url: this.satelliteUrlNew,
    minZoom: 0,
    maxZoom: 18,
  };

  satelliteOptionsAiResult = {
    id: "aires_sate_xyz_new_id",
    url: this.satelliteUrlAiRes,
    minZoom: 0,
    maxZoom: 18,
  };

  planeOptions = {
    id: "test_plane_xyz_id",
    url: this.planeUrl,
  };

  planeOptionsNew = {
    id: "test_plane_xyz_new_id",
    url: this.planeUrlNew,
  };

  allroadOptions = {
    id: "test_allroad_xyz_id",
    url: this.allroadUrl,
    minZoom: 0,
    maxZoom: 18,
  };

  modelOptions = {
    id: "ion_3dtiles_test",
    // ionId: 2698026, // 2698026  2695677  2711584
    // url: "http://ns.starwiz.cn:8080/api/v1/resource/nansha/tileset.json",
    url: "/api/v1/resource/all_road/tileset.json",
    // url: "/tiles2/tileset.json",
    isFitView: false,
    isSetPosition: true,
    isSetPosture: false,
    isScale: false,
    longitude: 113.633828980542,
    latitude: 22.571906386877,
    height: -2,
    scale: 0,
    heading: 0, // rotateX
    pitch: 0, // rotateY
    roll: 0, // rotateZ
  };

  modelUrlOptions = {
    id: "ion_3dtiles_url_test",
    url: "http://ns.starwiz.cn:8080/api/v1/resource/ifc_tileset/tileset.json",
    isFitView: true,
    isSetPosition: true,
    isSetPosture: false,
    isScale: false,
    longitude: 113.633828980542,
    latitude: 22.571906386877,
    height: -2,
    scale: 0,
    heading: 0, // rotateX
    pitch: 0, // rotateY
    roll: 0, // rotateZ
  };

  geojsonurl = "https://tb-1256849727.cos.ap-beijing.myqcloud.com/pacific-data-test/geojson/road.geojson";

  geojsonOptions = {
    id: "geojson_test_1",
    name: "geojson_test_1",
    geojson: {
      data: roadData,
      // sourceUri:
      //   'https://tb-1256849727.cos.ap-beijing.myqcloud.com/pacific-data-test/geojson/road.geojson',
    },
    label: {
      show: true,
      pixelOffset: [0, 0],
      heightReference: Cesium.HeightReference.NONE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      font: "22px MicroSoft YaHei",
    },
    // popup: {
    //   isPopup: false,
    //   popupType: 'vueNodes',
    //   hasClose: true,
    //   vNode: null,
    //   vNodeData: {
    //     name: '我是target_test_1',
    //     longitude: '149.757575E',
    //     latitude: '30.435657N',
    //     satellite: 'QL_*',
    //     time: '2023-07-28 12:00:00',
    //     x: 180,
    //     y: 1620,
    //   },
    //   customT: (name) => `$t_${name}`,
    // },
    // event: {
    //   eventType: screenEventType.LEFT_CLICK,
    // },
  };

  public addGeojson(geojsonOpt: GeojsonTopoJSONOptions) {
    if (this.csGeojsonIns) {
      this.csGeojsonIns.addLayer(geojsonOpt);
    }
  }

  public removeGeojson(geojsonOpt: GeojsonTopoJSONOptions) {
    if (this.csGeojsonIns) {
      this.csGeojsonIns.removeLayer(geojsonOpt);
    }
  }

  public clearGeojson() {
    if (this.csGeojsonIns) {
      this.csGeojsonIns.clearLayer();
    }
  }

  public addDemoLayer() {
    this.csUrlIns?.addLayer(this.satelliteOptions);

    this.csUrlIns?.addLayer(this.satelliteOptionsNew);

    this.csUrlIns?.addLayer(this.planeOptions);

    this.csUrlIns?.addLayer(this.planeOptionsNew);

    this.csUrlIns?.addLayer(this.allroadOptions);

    this.csIonIns?.addLayer(this.modelOptions);
    // this.csIonIns?.showHiddenLayer(this.modelOptions, false);

    // this.csIonIns?.addLayer(this.modelUrlOptions);
    // this.csIonIns?.showHiddenLayer(this.modelUrlOptions, true);

    this.addGeojson(this.geojsonOptions);

    // this.getDebugLngLatHt();
    this.getDebugFeatures();
  }

  public removeDemoLayer() {
    this.csUrlIns?.removeLayer(this.satelliteOptions);
    this.csUrlIns?.removeLayer(this.satelliteOptionsNew);
    this.csUrlIns?.removeLayer(this.planeOptions);
    this.csUrlIns?.removeLayer(this.planeOptionsNew);
    this.csUrlIns?.removeLayer(this.allroadOptions);

    this.csIonIns?.removeLayer(this.modelOptions);

    this.csIonIns?.removeLayer(this.modelUrlOptions);

    this.removeGeojson(this.geojsonOptions);
  }

  public addAiDemoLayer() {
    this.csUrlIns?.addLayer(this.satelliteOptionsAi);
    this.csUrlIns?.addLayer(this.satelliteOptionsAiResult);
  }

  public removeAiDemoLayer() {
    this.csUrlIns?.removeLayer(this.satelliteOptionsAi);
    this.csUrlIns?.removeLayer(this.satelliteOptionsAiResult);
  }

  public toggleViewSight(isModel = true) {
    if (isModel) {
      this.csIonIns!.flyToView(this.modelOptions);
    } else {
      this.flyToLngLatHeight(113.633369213284, 22.570192958259, 2000, 2);
    }
  }

  sliderHandler: any = null;

  initSliderEvent(slider: any) {
    if (this.viewer && slider) {
      // Sync the position of the slider with the split position
      this.viewer.scene.splitPosition = slider.offsetLeft / slider.parentElement.offsetWidth;

      this.sliderHandler = new Cesium.ScreenSpaceEventHandler(slider);
      let moveActive = false;

      const moveCb = (movement) => {
        if (!moveActive) {
          return;
        }

        const relativeOffset = movement.endPosition.x;
        const splitPosition = (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
        slider.style.left = `${100.0 * splitPosition}%`;
        this.viewer.scene.splitPosition = splitPosition;
      };

      this.sliderHandler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      this.sliderHandler.setInputAction(function () {
        moveActive = true;
      }, Cesium.ScreenSpaceEventType.PINCH_START);

      this.sliderHandler.setInputAction(moveCb, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.sliderHandler.setInputAction(moveCb, Cesium.ScreenSpaceEventType.PINCH_MOVE);

      this.sliderHandler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.LEFT_UP);
      this.sliderHandler.setInputAction(function () {
        moveActive = false;
      }, Cesium.ScreenSpaceEventType.PINCH_END);
    }
  }

  destorySliderEvent() {
    if (this.sliderHandler) {
      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_MOVE);

      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);

      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_START);
      this.sliderHandler.removeInputAction(Cesium.ScreenSpaceEventType.PINCH_END);
      this.sliderHandler.destroy();
      this.sliderHandler = null;
    }
  }

  oldLayerCtl = {
    satelliteLayer: false,
    satelliteLayerNew: false,
    planeLayer: false,
    planeLayerNew: false,
    allroadLayer: false,
    modelLayer: false,
    modelUrlLayer: false,
    geojsonLayer: false,

    isShowSatelliteLayer: false,
    isShowSatelliteLayerNew: false,
    isShowPlaneLayer: false,
    isShowPlaneLayerNew: false,
    isShowAllroadLayer: false,
    isShowModelLayer: false,
    isShowModelUrlLayer: false,
    isShowGeojsonLayer: false,
  };

  public resetOldLayerCtl() {
    this.oldLayerCtl.satelliteLayer = false;
    this.oldLayerCtl.satelliteLayerNew = false;
    this.oldLayerCtl.planeLayer = false;
    this.oldLayerCtl.planeLayerNew = false;
    this.oldLayerCtl.allroadLayer = false;
    this.oldLayerCtl.modelLayer = false;
    this.oldLayerCtl.modelUrlLayer = false;
    this.oldLayerCtl.geojsonLayer = false;

    this.oldLayerCtl.isShowSatelliteLayer = false;
    this.oldLayerCtl.isShowSatelliteLayerNew = false;
    this.oldLayerCtl.isShowPlaneLayer = false;
    this.oldLayerCtl.isShowPlaneLayerNew = false;
    this.oldLayerCtl.isShowAllroadLayer = false;
    this.oldLayerCtl.isShowModelLayer = false;
    this.oldLayerCtl.isShowModelUrlLayer = false;
    this.oldLayerCtl.isShowGeojsonLayer = false;
  }

  public setSplitLayers(layerCtl: any, isShowSplit = true) {
    if (isShowSplit) {
      // console.log("fuck", layerCtl, this.oldLayerCtl);
      if (this.oldLayerCtl.satelliteLayer != layerCtl.satelliteLayer) {
        this.csUrlIns?.setSplitLayer(this.satelliteOptions, layerCtl.satelliteLayer ? "LEFT" : "RIGHT");
        this.oldLayerCtl.satelliteLayer = layerCtl.satelliteLayer;
      }

      if (this.oldLayerCtl.satelliteLayerNew != layerCtl.satelliteLayerNew) {
        this.csUrlIns?.setSplitLayer(this.satelliteOptionsNew, layerCtl.satelliteLayerNew ? "LEFT" : "RIGHT");
        this.oldLayerCtl.satelliteLayerNew = layerCtl.satelliteLayerNew;
      }

      if (this.oldLayerCtl.planeLayer != layerCtl.planeLayer) {
        this.csUrlIns?.setSplitLayer(this.planeOptions, layerCtl.planeLayer ? "LEFT" : "RIGHT");
        this.oldLayerCtl.planeLayer = layerCtl.planeLayer;
      }

      if (this.oldLayerCtl.planeLayerNew != layerCtl.planeLayerNew) {
        this.csUrlIns?.setSplitLayer(this.planeOptionsNew, layerCtl.planeLayerNew ? "LEFT" : "RIGHT");
        this.oldLayerCtl.planeLayerNew = layerCtl.planeLayerNew;
      }

      if (this.oldLayerCtl.allroadLayer != layerCtl.allroadLayer) {
        this.csUrlIns?.setSplitLayer(this.allroadOptions, layerCtl.allroadLayer ? "LEFT" : "RIGHT");
        this.oldLayerCtl.allroadLayer = layerCtl.allroadLayer;
      }

      if (this.oldLayerCtl.modelLayer != layerCtl.modelLayer) {
        this.csIonIns?.setSplitLayer(this.modelOptions, layerCtl.modelLayer ? "LEFT" : "RIGHT");
        this.oldLayerCtl.modelLayer = layerCtl.modelLayer;
      }

      if (this.oldLayerCtl.modelUrlLayer != layerCtl.modelUrlLayer) {
        this.csIonIns?.setSplitLayer(this.modelUrlOptions, layerCtl.modelUrlLayer ? "LEFT" : "RIGHT");
        this.oldLayerCtl.modelUrlLayer = layerCtl.modelUrlLayer;
      }

      // if (this.oldLayerCtl.geojsonLayer != layerCtl.geojsonLayer) {
      //   this.csGeojsonIns?.setSplitLayer(this.geojsonOptions, layerCtl.geojsonLayer ? "LEFT" : "RIGHT");
      //   this.oldLayerCtl.geojsonLayer = layerCtl.geojsonLayer;
      // }
    } else {
      this.csUrlIns?.setSplitLayer(this.satelliteOptions, null);
      this.csUrlIns?.setSplitLayer(this.satelliteOptionsNew, null);

      this.csUrlIns?.setSplitLayer(this.planeOptions, null);
      this.csUrlIns?.setSplitLayer(this.planeOptionsNew, null);

      this.csUrlIns?.setSplitLayer(this.allroadOptions, null);

      this.csIonIns?.setSplitLayer(this.modelOptions, null);

      this.csIonIns?.setSplitLayer(this.modelUrlOptions, null);

      // this.csGeojsonIns?.setSplitLayer(this.geojsonOptions, null);
    }
  }

  public toggleLayerCtl(layerCtl: any) {
    this.oldLayerCtl.satelliteLayer = !layerCtl.satelliteLayer;
    this.oldLayerCtl.satelliteLayerNew = !layerCtl.satelliteLayerNew;

    this.oldLayerCtl.planeLayer = !layerCtl.planeLayer;
    this.oldLayerCtl.planeLayerNew = !layerCtl.planeLayerNew;

    this.oldLayerCtl.allroadLayer = !layerCtl.allroadLayer;
    this.oldLayerCtl.modelLayer = !layerCtl.modelLayer;
    this.oldLayerCtl.modelUrlLayer = !layerCtl.modelUrlLayer;
  }

  public setShowHiddenLayer(layerCtl: any) {
    if (this.oldLayerCtl.isShowSatelliteLayer != layerCtl.isShowSatelliteLayer) {
      this.csUrlIns?.showHiddenLayer(this.satelliteOptions, layerCtl.isShowSatelliteLayer);
      this.oldLayerCtl.isShowSatelliteLayer = layerCtl.isShowSatelliteLayer;
    }

    if (this.oldLayerCtl.isShowSatelliteLayerNew != layerCtl.isShowSatelliteLayerNew) {
      this.csUrlIns?.showHiddenLayer(this.satelliteOptionsNew, layerCtl.isShowSatelliteLayerNew);
      this.oldLayerCtl.isShowSatelliteLayerNew = layerCtl.isShowSatelliteLayerNew;
    }

    if (this.oldLayerCtl.isShowPlaneLayer != layerCtl.isShowPlaneLayer) {
      this.csUrlIns?.showHiddenLayer(this.planeOptions, layerCtl.isShowPlaneLayer);
      this.oldLayerCtl.isShowPlaneLayer = layerCtl.isShowPlaneLayer;
    }

    if (this.oldLayerCtl.isShowPlaneLayerNew != layerCtl.isShowPlaneLayerNew) {
      this.csUrlIns?.showHiddenLayer(this.planeOptionsNew, layerCtl.isShowPlaneLayerNew);
      this.oldLayerCtl.isShowPlaneLayerNew = layerCtl.isShowPlaneLayerNew;
    }

    if (this.oldLayerCtl.isShowAllroadLayer != layerCtl.isShowAllroadLayer) {
      this.csUrlIns?.showHiddenLayer(this.allroadOptions, layerCtl.isShowAllroadLayer);
      this.oldLayerCtl.isShowAllroadLayer = layerCtl.isShowAllroadLayer;
    }

    if (this.oldLayerCtl.isShowModelLayer != layerCtl.isShowModelLayer) {
      this.csIonIns?.showHiddenLayer(this.modelOptions, layerCtl.isShowModelLayer);
      this.oldLayerCtl.isShowModelLayer = layerCtl.isShowModelLayer;
    }

    if (this.oldLayerCtl.isShowModelUrlLayer != layerCtl.isShowModelUrlLayer) {
      this.csIonIns?.showHiddenLayer(this.modelUrlOptions, layerCtl.isShowModelUrlLayer);
      this.oldLayerCtl.isShowModelUrlLayer = layerCtl.isShowModelUrlLayer;
    }

    if (this.oldLayerCtl.isShowGeojsonLayer != layerCtl.isShowGeojsonLayer) {
      this.csGeojsonIns?.showHiddenLayer(this.geojsonOptions, layerCtl.isShowGeojsonLayer);
      this.oldLayerCtl.isShowGeojsonLayer = layerCtl.isShowGeojsonLayer;
    }
  }

  oldLayerAiCtl = {
    satelliteLayer: false,
    satelliteLayerAi: false,

    isShowSatelliteLayer: false,
    isShowSatelliteLayerAi: false,
  };

  public resetOldLayerAiCtl() {
    this.oldLayerAiCtl.satelliteLayer = false;
    this.oldLayerAiCtl.satelliteLayerAi = false;

    this.oldLayerAiCtl.isShowSatelliteLayer = false;
    this.oldLayerAiCtl.isShowSatelliteLayerAi = false;
  }

  public setAiSplitLayers(layerCtl: any, isShowSplit = true) {
    if (isShowSplit) {
      if (this.oldLayerAiCtl.satelliteLayer != layerCtl.satelliteLayer) {
        this.csUrlIns?.setSplitLayer(this.satelliteOptionsAi, layerCtl.satelliteLayer ? "LEFT" : "RIGHT");
        this.oldLayerAiCtl.satelliteLayer = layerCtl.satelliteLayer;
      }

      if (this.oldLayerAiCtl.satelliteLayerAi != layerCtl.satelliteLayerAi) {
        this.csUrlIns?.setSplitLayer(this.satelliteOptionsAiResult, layerCtl.satelliteLayerAi ? "LEFT" : "RIGHT");
        this.oldLayerAiCtl.satelliteLayerAi = layerCtl.satelliteLayerAi;
      }
    } else {
      this.csUrlIns?.setSplitLayer(this.satelliteOptionsAi, null);
      this.csUrlIns?.setSplitLayer(this.satelliteOptionsAiResult, null);
    }
  }

  public toggleAiLayerCtl(layerCtl: any) {
    this.oldLayerAiCtl.satelliteLayer = !layerCtl.satelliteLayer;
    this.oldLayerAiCtl.satelliteLayerAi = !layerCtl.satelliteLayerAi;
  }

  public setShowHiddenAiLayer(layerCtl: any) {
    if (this.oldLayerAiCtl.isShowSatelliteLayer != layerCtl.isShowSatelliteLayer) {
      this.csUrlIns?.showHiddenLayer(this.satelliteOptionsAi, layerCtl.isShowSatelliteLayer);
      this.oldLayerAiCtl.isShowSatelliteLayer = layerCtl.isShowSatelliteLayer;
    }

    if (this.oldLayerAiCtl.isShowSatelliteLayerAi != layerCtl.isShowSatelliteLayerAi) {
      this.csUrlIns?.showHiddenLayer(this.satelliteOptionsAiResult, layerCtl.isShowSatelliteLayerAi);
      this.oldLayerAiCtl.isShowSatelliteLayerAi = layerCtl.isShowSatelliteLayerAi;
    }
  }

  // end class
}
