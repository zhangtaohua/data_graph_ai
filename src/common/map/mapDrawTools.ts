import {
  MAP_DRAW_TEXT,
  MAP_DRAW_POINT,
  MAP_DRAW_SQUARE,
  MAP_DRAW_RECTANGLE,
  MAP_DRAW_POLYGON,
  MAP_DRAW_LINE,
  MAP_DRAW_CURVE,
  MAP_DRAW_CIRCLE,
  MAP_DRAW_GEODESIC_CIRCLE,
  MAP_DRAW_CLEAR,
  MAP_MEASURE_DISTANCE,
  MAP_MEASURE_AREA,
} from "@/utils/map/geoConstant.ts";

import textSvg from "@/assets/images/map/text.svg";
import pointSvg from "@/assets/images/map/point.svg";
import lineSvg from "@/assets/images/map/line.svg";
import curveSvg from "@/assets/images/map/curve.svg";
import squareSvg from "@/assets/images/map/square.svg";
import orthogonSvg from "@/assets/images/map/orthogon.svg";
import polygonSvg from "@/assets/images/map/polygon.svg";
import roundSvg from "@/assets/images/map/round.svg";
import round2Svg from "@/assets/images/map/round2.svg";
import inputSvg from "@/assets/images/map/input.svg";
import uploadSvg from "@/assets/images/map/upload.svg";
import downloadSvg from "@/assets/images/map/download.svg";
import cropSvg from "@/assets/images/map/crop.svg";

import clearSvg from "@/assets/images/map/clear.svg";

export const MAP_DRAW_ONLY_GEO = "onlygeojson";
export const MAP_DRAW_CUS_LABEL = "drawlabel";

export const mapDrawAction = {
  text: MAP_DRAW_TEXT,
  point: MAP_DRAW_POINT,
  line: MAP_DRAW_LINE,
  curve: MAP_DRAW_CURVE,
  square: MAP_DRAW_SQUARE,
  rect: MAP_DRAW_RECTANGLE,
  polygon: MAP_DRAW_POLYGON,
  circle: MAP_DRAW_CIRCLE,
  geoCircle: MAP_DRAW_GEODESIC_CIRCLE,
  clear: MAP_DRAW_CLEAR,

  input: "cusinput",
  uploadFile: "uploadFile",
  exportGeojson: "exportGeojson",
  region: "regionData",
  uploadImage: "uploadFileImage",
  crop: "crop",
};

export const mapHeaderDrawTools = [
  {
    id: mapDrawAction.text + "_h",
    image: textSvg,
    name: "common.mapText",
    label: "文本",
    action: mapDrawAction.text,
  },
  {
    id: mapDrawAction.point + "_h",
    image: pointSvg,
    name: "common.mapPoint",
    label: "点",
    action: mapDrawAction.point,
  },
  {
    id: mapDrawAction.line + "_h",
    image: lineSvg,
    name: "common.mapLine",
    label: "线",
    action: mapDrawAction.line,
  },
  {
    id: mapDrawAction.curve + "_h",
    image: curveSvg,
    name: "common.mapCurve",
    label: "曲线",
    action: mapDrawAction.curve,
  },
  {
    id: mapDrawAction.square + "_h",
    image: squareSvg,
    name: "common.mapSquare",
    label: "正方形",
    action: mapDrawAction.square,
  },
  {
    id: mapDrawAction.rect + "_h",
    image: orthogonSvg,
    name: "common.mapRect",
    label: "矩形",
    action: mapDrawAction.rect,
  },
  {
    id: mapDrawAction.polygon + "_h",
    image: polygonSvg,
    name: "common.mapPolygon",
    label: "多边形",
    action: mapDrawAction.polygon,
  },
  {
    id: mapDrawAction.circle + "_h",
    image: roundSvg,
    name: "common.mapCircle",
    label: "圆",
    action: mapDrawAction.circle,
  },
  {
    id: mapDrawAction.geoCircle + "_h",
    image: round2Svg,
    name: "common.mapGeoCircle",
    label: "测地圆",
    action: mapDrawAction.geoCircle,
  },
  {
    id: mapDrawAction.uploadFile + "_h",
    image: uploadSvg,
    name: "common.mapUpload",
    label: "文件上传",
    action: mapDrawAction.uploadFile,
  },
  {
    id: mapDrawAction.exportGeojson + "_h",
    image: downloadSvg,
    name: "common.mapDown",
    label: "导出矢量",
    action: mapDrawAction.exportGeojson,
  },
  {
    id: mapDrawAction.crop + "_h",
    image: cropSvg,
    name: "common.mapcrop",
    label: "裁剪",
    action: mapDrawAction.crop,
  },
  {
    id: mapDrawAction.clear + "_h",
    image: clearSvg,
    name: "common.mapClear",
    label: "清除",
    action: mapDrawAction.clear,
  },
];

export const mapSearchDrawTools = [
  {
    id: mapDrawAction.point,
    image: pointSvg,
    name: "common.mapPoint",
    label: "点",
    action: mapDrawAction.point,
  },
  {
    id: mapDrawAction.line,
    image: lineSvg,
    name: "common.mapLine",
    label: "线",
    action: mapDrawAction.line,
  },
  {
    id: mapDrawAction.curve,
    image: curveSvg,
    name: "common.mapCurve",
    label: "曲线",
    action: mapDrawAction.curve,
  },
  {
    id: mapDrawAction.square,
    image: squareSvg,
    name: "common.mapSquare",
    label: "正方形",
    action: mapDrawAction.square,
  },
  {
    id: mapDrawAction.rect,
    image: orthogonSvg,
    name: "common.mapRect",
    label: "矩形",
    action: mapDrawAction.rect,
  },
  {
    id: mapDrawAction.polygon,
    image: polygonSvg,
    name: "common.mapPolygon",
    label: "多边形",
    action: mapDrawAction.polygon,
  },
  {
    id: mapDrawAction.circle,
    image: roundSvg,
    name: "common.mapCircle",
    label: "圆",
    action: mapDrawAction.circle,
  },
  {
    id: mapDrawAction.geoCircle,
    image: round2Svg,
    name: "common.mapGeoCircle",
    label: "测地圆",
    action: mapDrawAction.geoCircle,
  },
  {
    id: mapDrawAction.input,
    image: inputSvg,
    name: "common.mapGeoEdit",
    label: "输入坐标",
    action: mapDrawAction.input,
  },
  {
    id: mapDrawAction.uploadFile,
    image: uploadSvg,
    name: "common.mapUpload",
    label: "文件上传",
    action: mapDrawAction.uploadFile,
  },
  {
    id: mapDrawAction.exportGeojson,
    image: downloadSvg,
    name: "common.mapDown",
    label: "导出矢量",
    action: mapDrawAction.exportGeojson,
  },
  {
    id: mapDrawAction.clear,
    image: clearSvg,
    name: "common.mapClear",
    label: "清除",
    action: mapDrawAction.clear,
  },
];

export const mapViewMode = {
  normal: "normal",
  swipe: "swipe",
  dual: "dual",
  udSwipe: "udSwipe",
  udDual: "udDual",
};
