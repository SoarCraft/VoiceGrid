import { Drawer as AntDrawer, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import React from "react";
import {
  DimensionType,
  dimensionTitleDictionary,
  dimensionDictionary,
} from "@/app/types/DataItemListTypes";

type DrawerProps = {
  dimension?: DimensionType | null;
  title?: string;
  open: boolean;
  onClose: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ dimension, title, open, onClose }) => {
  if (!dimension || !title) return null;

  const items: DescriptionsProps["items"] = [];
  const dimensionList = Object.entries(dimension).filter(([, value]) => !!value);

  dimensionList.map(([key, value]) => {
    console.log(key, value);
    const dataDict = dimensionDictionary[key as keyof typeof dimensionDictionary];
    const data = dataDict ? dataDict[value - 1] : value;
    const label = dimensionTitleDictionary[key as keyof typeof dimensionTitleDictionary];
    items.push({ label, children: data ? data : value });
  });

  return (
    <AntDrawer
      forceRender
      destroyOnClose
      size="large"
      title={title}
      open={open}
      onClose={onClose}
    >
      <Descriptions
        items={items}
        layout='vertical'
      />
    </AntDrawer>
  );
}

export default Drawer;