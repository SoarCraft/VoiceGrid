import { UUID } from "./DatasetListTypes"

export interface DimensionType {
  gender: number;
  age_range: number;
  voice_character: number;
  texture: number;
  magnetism: number;
  emotion: number;
  clarity: number;
  power: number;
  breathiness: number;
  resonance: number;
  articulation: number;
  pitch_range: number;
  vibrato: number;
}

export const dimensionTitleDictionary = {
  gender: { text: "性别", width: 70 },
  age_range: { text: "年龄范围", width: 100 },
  voice_character: { text: "音色类型", width: 100 },
  texture: { text: "音质质感", width: 100 },
  magnetism: { text: "声音磁性", width: 100 },
  emotion: { text: "情感表达", width: 100 },
  clarity: { text: "清晰度", width: 100 },
  power: { text: "力度表现", width: 100 },
  breathiness: { text: "气声感", width: 100 },
  resonance: { text: "共鸣感", width: 100 },
  articulation: { text: "咬字清晰度", width: 100 },
  pitch_range: { text: "音域跨度", width: 100 },
  vibrato: { text: "颤音强度", width: 100 },
}

export const dimensionDictionary = {
  gender: ["男", "女"],
  age_range: ["儿童(4-12)", "少年(13-18)", "青年(19-35)", "中年(36-55)", "老年(56+)"],
  voice_character: ["御姐音", "萝莉音", "正太音", "大叔音", "中性音", "少年音", "温柔音", "霸气音"],
  texture: ["圆润", "清脆", "低沉", "尖锐", "柔和", "沙哑", "空灵"],
  magnetism: ["高", "中", "低"],
  emotion: ["开心", "悲伤", "愤怒", "平静", "兴奋"]
}

export interface DataItemType {
  key: number;
  name: string;
  dimension: DimensionType;
}

export type DataItemListProps = {
  name: string;
  items: DataItemType[];
}

export type DatasetType = DataItemListProps & {
  id: UUID;
}

export type DatasetDetailParams = {
  params: {
    id: string;
  }
}

const getRandomDimension = (): DimensionType => {
  const getRandomValue = (max = 3) => (Math.floor(Math.random() * max) + 1);

  return {
    gender: getRandomValue(2),
    age_range: getRandomValue(5),
    voice_character: getRandomValue(8),
    texture: getRandomValue(7),
    magnetism: getRandomValue(),
    clarity: getRandomValue(),
    emotion: getRandomValue(5),
    power: getRandomValue(),
    breathiness: getRandomValue(),
    resonance: getRandomValue(),
    articulation: getRandomValue(),
    pitch_range: getRandomValue(),
    vibrato: getRandomValue()
  }
}

const getDataItems = (datasetIndex: number): DataItemType[] => {
  const prefix = `dataset${datasetIndex}`;
  return new Array(100).fill(1).map((_, index) => {
    return {
      key: index,
      name: `${prefix} - item${index}`,
      dimension: getRandomDimension(),
    }
  })
}

export const initDataset: DatasetType[] = [
  { id: "1f2196ae-b332-4c2e-b5d2-183e491ef445", name: "dataset1", items: getDataItems(1) },
  { id: "99eb75fa-f949-4dc3-8c0c-3e39448c6ef1", name: "dataset2", items: getDataItems(2) },
  { id: "1cc187a5-a4bd-4e90-aa9a-ebe65da0cbb4", name: "dataset3", items: getDataItems(3) },
  { id: "d66c2096-1837-4bdc-8ae2-2f38f88ac293", name: "dataset4", items: getDataItems(4) },
  { id: "1f67ae7f-a31d-43ba-b0a5-6da65cdc00d6", name: "dataset5", items: getDataItems(5) },
  { id: "294f881a-7a46-4bdd-87a3-91aee8a46742", name: "dataset6", items: getDataItems(6) },
  { id: "52531e3b-6acb-4775-8436-328aa0017eae", name: "dataset7", items: getDataItems(7) },
  { id: "ec735d4d-aa51-49f6-929f-54f1493bfff7", name: "dataset8", items: getDataItems(8) },
  { id: "60100b0b-819c-4684-88b0-b94027a0f6a9", name: "dataset9", items: getDataItems(9) },
  { id: "b19cc67e-9d0e-4b0a-bbaf-ebaa73284e5e", name: "dataset10", items: getDataItems(10) },
];