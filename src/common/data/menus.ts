export const headerMenuKey = "headerMenuKey";

export const menuName = {
  MapHome: "MapHome",
  ProductSearch: "ProductSearch",
  DataSet: "DataSet",
  AI: "AI",
  DataMining: "DataMining",
  SpecialReport: "SpecialReport",
};

export const SpecialMenusList = [
  menuName.MapHome,
  menuName.ProductSearch,
  menuName.DataSet,
  menuName.AI,
  menuName.DataMining,
  menuName.SpecialReport,
];

export const menus = [
  {
    id: menuName.MapHome,
    image: "",
    name: "header.home",
    label: "数据标注",
    action: menuName.MapHome,
    hotKey: "",
    path: "",
    isEnable: true,
  },
  {
    id: menuName.ProductSearch,
    image: "",
    name: "header.ps",
    label: "数据查询",
    action: menuName.ProductSearch,
    hotKey: "",
    path: "",
    isEnable: true,
  },
  {
    id: menuName.DataSet,
    image: "",
    name: "header.ds",
    label: "数据集管理",
    action: menuName.DataSet,
    hotKey: "",
    path: "",
    isEnable: true,
  },
  {
    id: menuName.AI,
    image: "",
    name: "header.ai",
    label: "应用分析",
    action: menuName.AI,
    hotKey: "",
    path: "",
    isEnable: true,
  },
  {
    id: menuName.DataMining,
    image: "",
    name: "header.dm",
    label: "数据挖掘",
    action: menuName.DataMining,
    hotKey: "",
    path: "",
    isEnable: true,
  },
  {
    id: menuName.SpecialReport,
    image: "",
    name: "header.sr",
    label: "专题报告",
    action: menuName.SpecialReport,
    hotKey: "",
    path: "",
    isEnable: true,
  },
];

export const pathNameMenu = {
  [menuName.MapHome]: 0,
  [menuName.ProductSearch]: 1,
  [menuName.DataSet]: 2,
  datasetCreate: 2,
  aiHome: 3,
  [menuName.AI]: 3,
  [menuName.DataMining]: 4,
  [menuName.SpecialReport]: 5,
};
