import type { WebMapTileServiceImageryProvider } from 'cesium';

export interface IONTilesOptions {
  id: string;
  ionId?: number;
  url?: string;
  name?: string;
  zIndex?: number;
  extent?: Array<number>;
  minZoom?: number;
  maxZoom?: number;
  isFitView?: boolean;
  isSetPosition?: boolean;
  isSetPosture?: boolean;
  isScale?: boolean;
  longitude?: number;
  latitude?: number;
  height?: number;
  scale?: number;
  heading?: number;
  pitch?: number;
  roll?: number;
  isSplit?: boolean;
  splitDirection?: SplitDirection;
}
