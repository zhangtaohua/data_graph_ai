export const datasetAction = {
  dataset: "dataset",
  dataLabel: "dataLabel",
};

export const datasetTabs = [
  {
    id: datasetAction.dataset,
    name: "dataset.ds",
    label: "数据集",
    action: datasetAction.dataset,
    isEnable: true,
  },
  {
    id: datasetAction.dataLabel,
    name: "dataset.dl",
    label: "数据标签",
    action: datasetAction.dataLabel,
    isEnable: true,
  },
];
