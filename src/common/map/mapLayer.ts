import selfStreetW from "@/assets/images/map/self-street-W@2x.png";
import selfStreetB from "@/assets/images/map/self-street-B@2x.png";
import selfStreetG from "@/assets/images/map/self-street-G@2x.png";
import selfStreetBL from "@/assets/images/map/self-street-L@2x.png";

import bingStreetW from "@/assets/images/map/bing-street-W@2x.png";
import bingStreetB from "@/assets/images/map/bing-street-B@2x.png";
import bingStreetG from "@/assets/images/map/bing-street-G@2x.png";
import bingSatelliteBG from "@/assets/images/map/bing-satellite@2x.png";

import tiandiStreet from "@/assets/images/map/tiandi-street.png";
import tiandiSatellite from "@/assets/images/map/tiandi-satellite.png";
import tiandiLandform from "@/assets/images/map/tiandi-landform.png";

import gaodeStreet from "@/assets/images/map/gaode-street.png";
import gaodeSatellite from "@/assets/images/map/gaode-satellite.png";

import googleStreet from "@/assets/images/map/google-street.png";
import googleSatellite from "@/assets/images/map/google-satellite.png";

export const MAP_LAYER_KEY = "maplayer";

export const mapboxBasic = "mapboxBasic";
export const mapboxDark = "mapboxDark";
export const mapboxGray = "mapboxGray";
export const mapboxAllBlue = "mapboxAllBlue";

export const tiandituVec = "tiandituVec";
export const tiandituVecZhLabel = "tiandituVecZhLabel";
export const tiandituVecEnLabel = "tiandituVecEnLabel";

export const tiandituImg = "tiandituImg";
export const tiandituImgZhLabel = "tiandituImgZhLabel";
export const tiandituImgEnLable = "tiandituImgEnLable";

export const tiandituTer = "tiandituTer";
export const tiandituTerLabel = "tiandituTerLabel";

export const bingBasic = "CanvasLight";
export const bingDark = "CanvasDark";
export const bingGray = "CanvasGray";
export const bingSatellite = "AerialWithLabels";

export const gaodeMap = "aMap";
export const gaodeSatMap = "aMapSat";

export const googleMap = "googleMap";
export const googleSatMap = "googleSatMap";

export const mayLayers = [
  {
    id: "selfbuild",
    image: "",
    name: "common.mapSb",
    label: "自建地图",
    children: [
      {
        id: mapboxBasic,
        image: selfStreetW,
        name: "common.mapLight",
        label: "街道白",
        layer: mapboxBasic,
        hotKey: "",
      },
      {
        id: mapboxDark,
        image: selfStreetB,
        name: "common.mapDark",
        label: "街道黑",
        layer: mapboxDark,
        hotKey: "",
      },
      {
        id: mapboxGray,
        image: selfStreetG,
        name: "common.mapGray",
        label: "街道灰",
        layer: mapboxGray,
        hotKey: "",
      },
      {
        id: mapboxAllBlue,
        image: selfStreetBL,
        name: "common.mapBlue",
        label: "街道蓝",
        layer: mapboxAllBlue,
        hotKey: "",
      },
    ],
  },
  // 天地图
  {
    id: "tianditu",
    image: "",
    name: "common.mapTd",
    label: "天地图",
    children: [
      {
        id: tiandituVec,
        image: tiandiStreet,
        name: "common.mapRoad",
        label: "街道图",
        layer: tiandituVec,
        hotKey: "",
      },
      {
        id: tiandituImg,
        image: tiandiSatellite,
        name: "common.mapSat",
        label: "卫星图",
        layer: tiandituImg,
        hotKey: "",
      },
      {
        id: tiandituTer,
        image: tiandiLandform,
        name: "common.mapTer",
        label: "地形图",
        layer: tiandituTer,
        hotKey: "",
      },
    ],
  },
  // Bing 地图
  {
    id: "bing",
    image: "",
    name: "common.mapBing",
    label: "bing 地图",
    children: [
      {
        id: bingBasic,
        image: bingStreetW,
        name: "common.mapLight",
        label: "街道白",
        layer: bingBasic,
        hotKey: "",
      },
      {
        id: bingDark,
        image: bingStreetB,
        name: "common.mapDark",
        label: "街道黑",
        layer: bingDark,
        hotKey: "",
      },
      {
        id: bingGray,
        image: bingStreetG,
        name: "common.mapGray",
        label: "街道灰",
        layer: bingGray,
        hotKey: "",
      },
      {
        id: bingSatellite,
        image: bingSatelliteBG,
        name: "common.mapSat",
        label: "卫星图",
        layer: bingSatellite,
        hotKey: "",
      },
    ],
  },
  // 高德地图
  {
    id: "amap",
    image: "",
    name: "common.mapA",
    label: "高德地图",
    children: [
      {
        id: gaodeMap,
        image: gaodeStreet,
        name: "common.mapRoad",
        label: "街道图",
        layer: gaodeMap,
        hotKey: "",
      },
      {
        id: gaodeSatMap,
        image: gaodeSatellite,
        name: "common.mapSat",
        label: "卫星图",
        layer: gaodeSatMap,
        hotKey: "",
      },
    ],
  },
  // google 地图
  {
    id: "googleMap",
    image: "",
    name: "common.mapG",
    label: "高德地图",
    children: [
      {
        id: googleMap,
        image: googleStreet,
        name: "common.mapRoad",
        label: "街道图",
        layer: googleMap,
        hotKey: "",
      },
      {
        id: googleSatMap,
        image: googleSatellite,
        name: "common.mapSat",
        label: "卫星图",
        layer: googleSatMap,
        hotKey: "",
      },
    ],
  },
];
