export const searchAction = {
  dataset: "dataset",
  general: "general",
  professional: "professional",
  analysis: "analysis",
};

export const searchForWhat = {
  mainEnter: "onlySearch",
  dataset: "dataset",
  ai: "ai",
};

export const searchStatus = {
  idle: "idle",
  search: "search",
  result: "result",
};

export const searchFrom = {
  donotknow: "donotknow",
  dataset: "dataset",
  search: "search",
};

export const searchTabs = [
  {
    id: searchAction.dataset,
    name: "search.dataset",
    label: "数据集",
    action: searchAction.dataset,
    isEnable: true,
  },
  {
    id: searchAction.general,
    name: "search.gene",
    label: "通用查询",
    action: searchAction.general,
    isEnable: true,
  },
  {
    id: searchAction.professional,
    name: "search.prof",
    label: "专业查询",
    action: searchAction.professional,
    isEnable: true,
  },
  {
    id: searchAction.analysis,
    name: "search.analysis",
    label: "应用分析",
    action: searchAction.analysis,
    isEnable: true,
  },
];
