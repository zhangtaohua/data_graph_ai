export const aiListAction = {
  aiModel: "aiModel",
  aiProject: "aiProject",
};

export const aiListTabs = [
  {
    id: aiListAction.aiProject,
    name: "ai.proj",
    label: "我的项目",
    action: aiListAction.aiProject,
    isEnable: true,
  },
  {
    id: aiListAction.aiModel,
    name: "ai.model",
    label: "模型管理",
    action: aiListAction.aiModel,
    isEnable: true,
  },
];

export const aiResultAction = {
  aisModel: "aiModel",
  aiResult: "aiResult",
};

export const aiResultTabs = [
  {
    id: aiResultAction.aisModel,
    name: "ai.sModel",
    label: "模型选择",
    action: aiResultAction.aisModel,
    isEnable: true,
  },
  {
    id: aiResultAction.aiResult,
    name: "ai.sRes",
    label: "分析结果",
    action: aiResultAction.aiResult,
    isEnable: true,
  },
];
