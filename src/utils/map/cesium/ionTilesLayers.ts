import * as Cesium from "cesium";
import type { IONTilesOptions } from "./ionTilesLayersTypes";
import CesiumBase from "./base";
import { earthExtent } from "../geoConstant";
import { nanoid } from "nanoid";

export default class CsIonTilesLayers {
  public csBaseHandle: CesiumBase | null = null;
  public imageryLayers: any = null;
  public viewer: Cesium.Viewer | null = null;

  private __layers: any = null;
  private __layerIdPrefix = "WMTS_";

  constructor(mapBaseIns: CesiumBase) {
    this.csBaseHandle = mapBaseIns;
    this.imageryLayers = mapBaseIns.imageryLayers;
    this.viewer = mapBaseIns.viewer;
    this.__layers = new Map();
  }

  public destructor() {
    this.clearLayer();
    this.csBaseHandle = null;
    this.imageryLayers = null;
    this.viewer = null;
    this.__layers = null;
  }

  private __Id(id: string) {
    return `${this.__layerIdPrefix}${id}`;
  }

  private __Name(name: string) {
    return `${this.__layerIdPrefix}${name}`;
  }

  public setHeight(tileset, height) {
    height = Number(height);

    if (isNaN(height) || !Cesium.defined(tileset)) {
      return;
    }

    var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      cartographic.height, // 0.0
    );
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  }

  public setPosition(tileset, longitude, latitude, height) {
    //平移 修改经纬度
    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    var transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    //赋值给tileset
    tileset._root.transform = transform;
  }

  public setOffset(tileset, longitude, latitude, height) {
    //3dtile模型的边界球体
    var boundingSphere = tileset.boundingSphere;
    //迪卡尔空间直角坐标=>地理坐标（弧度制）
    var cartographic_original = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    //设置新的经度、纬度、高度
    var cartographic_offset = Cesium.Cartographic.fromDegrees(longitude, latitude, height);
    //地理坐标（弧度制）=>迪卡尔空间直角坐标
    var Cartesian3_original = Cesium.Cartesian3.fromRadians(
      cartographic_original.longitude,
      cartographic_original.latitude,
      cartographic_original.height,
    );
    var Cartesian3_offset = Cesium.Cartesian3.fromRadians(
      cartographic_offset.longitude,
      cartographic_offset.latitude,
      cartographic_offset.height,
    );
    //获得地面和offset的转换
    var translation = Cesium.Cartesian3.subtract(Cartesian3_offset, Cartesian3_original, new Cesium.Cartesian3());
    //修改模型矩阵
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  }

  public setScale(tileset, scale) {
    const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    let transform = Cesium.Transforms.eastNorthUpToFixedFrame(surface);

    var scaleM = Cesium.Matrix4.fromUniformScale(scale);
    Cesium.Matrix4.multiply(transform, scaleM, transform);
    //赋值给tileset
    tileset._root.transform = transform;
  }

  public setPosture(tileset, rotateX, rotateY, rotateZ) {
    const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    let transform = Cesium.Transforms.eastNorthUpToFixedFrame(surface);

    var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(rotateX));
    var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(rotateY));
    var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotateZ));
    var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
    var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
    var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);

    Cesium.Matrix4.multiply(transform, rotationX, transform);
    Cesium.Matrix4.multiply(transform, rotationY, transform);
    Cesium.Matrix4.multiply(transform, rotationZ, transform);

    //赋值给tileset
    tileset._root.transform = transform;
  }

  public setPSP(tileset, longitude, latitude, height, scale, rotateX, rotateY, rotateZ) {
    //旋转角度设置
    var mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(rotateX));
    var my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(rotateY));
    var mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotateZ));
    var rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
    var rotationY = Cesium.Matrix4.fromRotationTranslation(my);
    var rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
    //平移 修改经纬度
    var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
    var transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    //旋转、平移矩阵相乘
    Cesium.Matrix4.multiply(transform, rotationX, transform);
    Cesium.Matrix4.multiply(transform, rotationY, transform);
    Cesium.Matrix4.multiply(transform, rotationZ, transform);
    //缩放 修改缩放比例
    var scale1 = Cesium.Matrix4.fromUniformScale(scale);
    Cesium.Matrix4.multiply(transform, scale1, transform);
    //赋值给tileset
    tileset._root.transform = transform;
  }

  public async createLayer(
    options: IONTilesOptions = {
      ionId: 0,
      id: "",
      name: "",
      extent: [],
      minZoom: 0,
      maxZoom: 21,
      isSetPosition: false,
      isSetPosture: false,
      isScale: false,
      longitude: 0,
      latitude: 0,
      height: 0,
      scale: 0,
      heading: 0,
      pitch: 0,
      roll: 0,
    },
  ) {
    if (!options.id) {
      return null;
    }
    // if (!options.ionId || !options.url) {
    //   return null;
    // }
    const id = this.__Id(options.id);
    let name = options.name ? options.name : nanoid(10);
    name = this.__Name(name);

    let extent = earthExtent;
    if (options.extent && options.extent.length && options.extent.length === 4) {
      extent = options.extent;
    }

    const minZoom = options.minZoom ? options.minZoom : 0;
    const maxZoom = options.maxZoom ? options.maxZoom : 21;

    const zIndex = this.csBaseHandle!.getCurrentzIndex(options.zIndex);

    let tileset = null;

    if (options.ionId) {
      tileset = await Cesium.Cesium3DTileset.fromIonAssetId(options.ionId);
    }
    if (options.url) {
      tileset = await Cesium.Cesium3DTileset.fromUrl(options.url);
    }

    // tileset.style = new Cesium.Cesium3DTileStyle({
    //   color: `color("purple")`,
    //   show: true,
    // });

    // tileset.style = new Cesium.Cesium3DTileStyle({
    //   color: {
    //     conditions: [
    //       ['${height} >= 10', "color('purple')"],
    //       ['${height} >= 6', "color('red')"],
    //       ['${height} >= 5', "color('orange')"],
    //       ['true', "color('blue')"],
    //     ],
    //   },
    // });

    // tileset.ready .then((tileset) => {
    // });

    if (options.isSetPosition && options.isSetPosture && options.isScale) {
      this.setPSP(
        tileset,
        options.longitude,
        options.latitude,
        options.height,
        options.scale,
        options.heading,
        options.pitch,
        options.roll,
      );
    } else {
      if (options.isSetPosition) {
        this.setPosition(tileset, options.longitude, options.latitude, options.height);
      }
      if (options.isSetPosture) {
        this.setPosture(tileset, options.heading, options.pitch, options.roll);
      }
      if (options.isScale) {
        this.setScale(tileset, options.scale);
      }
    }

    // Apply the default style if it exists
    const extras = tileset.asset.extras;
    if (Cesium.defined(extras) && Cesium.defined(extras.ion) && Cesium.defined(extras.ion.defaultStyle)) {
      console.log("extras.ion.defaultStyle", extras.ion.defaultStyle);
      tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }

    // tileset.tileLoad.addEventListener(function (tile) {
    //   const content = tile.content;
    //   let featuresLength = content.featuresLength;
    //   console.log("要素数量为：");
    //   console.log(featuresLength);
    //   console.log("第一个要素属性为：");
    //   let feature = content.getFeature(0).getProperty("name");
    //   console.log(feature);
    // });

    const layerObj = {
      options,
      tileset,
      zIndex,
    };
    return layerObj;
  }

  public async addLayer(options: IONTilesOptions) {
    if (this.csBaseHandle) {
      try {
        const layerObj = await this.createLayer(options);
        if (layerObj) {
          const primitives = this.viewer.scene.primitives.add(layerObj.tileset);
          layerObj.primitives = primitives;
          this.viewer.scene.globe.depthTestAgainstTerrain = true;

          if (options.isFitView) {
            await this.viewer.zoomTo(layerObj.tileset);
          } else {
            if (options.longitude && options.latitude) {
              const longitude = options.longitude ?? 0;
              const latitude = options.latitude ?? 0;
              this.csBaseHandle.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 2000),
                duration: 2,
                orientation: {
                  heading: Cesium.Math.toRadians(0.0),
                  pitch: Cesium.Math.toRadians(-35.0),
                  roll: 0.0,
                },
              });
            }
          }
          this.__layers.set(this.__Id(options.id), layerObj);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  }

  public flyToView(options: IONTilesOptions) {
    if (this.csBaseHandle) {
      if (options.extent) {
        this.csBaseHandle.fitToExtent(options.extent);
        return true;
      } else {
        const layerObj = this.__layers.get(this.__Id(options.id));
        if (layerObj) {
          this.viewer!.zoomTo(layerObj.tileset);
        }
      }
    } else {
      return false;
    }
  }

  public hasLayer(options: IONTilesOptions) {
    if (this.csBaseHandle && this.__layers.size) {
      return this.__layers.has(this.__Id(options.id));
    }
    return false;
  }

  public hasLayerByID(id: string) {
    if (this.csBaseHandle && this.__layers.size) {
      return this.__layers.has(this.__Id(id));
    }
    return false;
  }

  public removeLayer(options: IONTilesOptions, destroy = true) {
    return this.removeLayerByID(options.id, destroy);
  }

  public async removeLayerByID(id: string, destroy: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        console.log("removeLayerByID 1");
        if (layerObj.primitives) {
          await this.viewer!.scene.primitives.remove(layerObj.primitives);
          try {
            await layerObj.primitives.destroy();
            layerObj.primitives = null;
          } catch (error) {
            console.log("removeLayerByID 11", layerObj);
          }
        }

        console.log("removeLayerByID 2", layerObj);
        if (destroy && layerObj.tileset) {
          try {
            await layerObj.tileset.destroy();
            layerObj.tileset = null;
          } catch (error) {
            console.log("removeLayerByID 21", layerObj);
          }
        }

        console.log("removeLayerByID 4");

        this.__layers.delete(this.__Id(id));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public clearLayer(destroy = true) {
    if (this.csBaseHandle && this.__layers.size) {
      this.__layers.forEach((layerObj: any) => {
        this.viewer!.scene.primitives.remove(layerObj.primitives);
        destroy && layerObj.tileset.destroy();
      });
      this.__layers.clear();
      return true;
    } else {
      return false;
    }
  }

  public setLayerOpacity(options: IONTilesOptions, opacity: number) {
    return this.setLayerOpacityByID(options.id, opacity);
  }

  public setLayerOpacityByID(id: string, opacity: number) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.tileset.style = new Cesium.Cesium3DTileStyle({
          color: `color("purple", ${opacity})`,
          show: true,
        });
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public showHiddenLayer(options: IONTilesOptions, isShow: boolean) {
    return this.showHiddenLayerByID(options.id, isShow);
  }

  public showHiddenLayerByID(id: string, isShow: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.tileset.show = isShow;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public setSplitLayer(options: IONTilesOptions, direction: string | null = null) {
    return this.setSplitLayerByID(options.id, direction);
  }

  public setSplitLayerByID(id: string, direction: string | null = null) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        if (direction) {
          if (direction.toUpperCase().includes("L")) {
            layerObj.tileset.splitDirection = Cesium.SplitDirection.LEFT;
          } else {
            layerObj.tileset.splitDirection = Cesium.SplitDirection.RIGHT;
          }
        } else {
          layerObj.tileset.splitDirection = Cesium.SplitDirection.NONE;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // end class
}
