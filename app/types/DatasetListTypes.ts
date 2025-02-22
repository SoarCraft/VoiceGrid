import type { ParamsType } from "@ant-design/pro-components";

export type UUID = string;

export interface IDatasetList {
  key: number;
  id: UUID;
  name: string;
  items: number;
  tags: string[];
}

export type TagFilterType = {
  text: string;
  value: string;
}

export type SearchType = ParamsType & {
  pageSize?: number;
  current?: number;
  keyword?: string;
}

export const initMock: IDatasetList[] = [
  { key: 1, id: "1f2196ae-b332-4c2e-b5d2-183e491ef445", name: "dataset1", items: 100, tags: ["tag1", "tag2"] },
  { key: 2, id: "99eb75fa-f949-4dc3-8c0c-3e39448c6ef1", name: "dataset2", items: 200, tags: ["tag1", "tag3"] },
  { key: 3, id: "1cc187a5-a4bd-4e90-aa9a-ebe65da0cbb4", name: "dataset3", items: 150, tags: ["tag2", "tag3"] },
  { key: 4, id: "d66c2096-1837-4bdc-8ae2-2f38f88ac293", name: "dataset4", items: 120, tags: ["tag1"] },
  { key: 5, id: "1f67ae7f-a31d-43ba-b0a5-6da65cdc00d6", name: "dataset5", items: 180, tags: ["tag2"] },
  { key: 6, id: "294f881a-7a46-4bdd-87a3-91aee8a46742", name: "dataset6", items: 120,  tags: ["tag2", "tag3"] },
  { key: 7, id: "52531e3b-6acb-4775-8436-328aa0017eae", name: "dataset7", items: 110,  tags: ["tag1", "tag3"] },
  { key: 8, id: "ec735d4d-aa51-49f6-929f-54f1493bfff7", name: "dataset8", items: 8,  tags: ["tag3"] },
  { key: 9, id: "60100b0b-819c-4684-88b0-b94027a0f6a9", name: "dataset9", items: 90,  tags: ["tag2"] },
  { key: 10, id: "b19cc67e-9d0e-4b0a-bbaf-ebaa73284e5e", name: "dataset10", items: 170,  tags: ["tag3"] },
];