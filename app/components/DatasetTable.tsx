"use client";

import { Table, Tag } from "antd";
import type { TableProps } from 'antd';

interface IDatasetList {
  key: number;
  name: string;
  items: number;
  tags: string[];
}

interface DatasetListProps {
  mock: IDatasetList[];
}

const columns: TableProps<IDatasetList>['columns'] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  }
];

const DatasetTable = ({ mock }:  DatasetListProps) => (
  <Table<IDatasetList> columns={columns} dataSource={mock} />
);

export default DatasetTable;

export type { IDatasetList };