"use client";

import { useRef, useState } from "react";
import type { ActionType, ParamsType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tag, message } from "antd";

interface IDatasetList {
  key: number;
  name: string;
  items: number;
  tags: string[];
}

type SearchType = ParamsType & {
  pageSize?: number;
  current?: number;
  keyword?: string;
}

const initMock: IDatasetList[] = [
  { key: 1, name: "dataset1", items: 100, tags: ["tag1", "tag2"] },
  { key: 2, name: "dataset2", items: 200, tags: ["tag1", "tag3"] },
  { key: 3, name: "dataset3", items: 150, tags: ["tag2", "tag3"] },
  { key: 4, name: "dataset4", items: 120, tags: ["tag1"] },
  { key: 5, name: "dataset5", items: 180, tags: ["tag2"] },
  { key: 6, name: "dataset6", items: 120,  tags: ["tag2", "tag3"] },
  { key: 7, name: "dataset7", items: 110,  tags: ["tag1", "tag3"] },
  { key: 8, name: "dataset8", items: 8,  tags: ["tag3"] },
  { key: 9, name: "dataset9", items: 90,  tags: ["tag2"] },
  { key: 10, name: "dataset10", items: 170,  tags: ["tag3"] },
];

const DatasetTable = () => {
  const actionRef = useRef<ActionType>(null);
  const [mock, setMock] = useState<IDatasetList[]>(initMock);
  const [messageApi, contextHolder] = message.useMessage();
  const [newRecordKey, setNewRecordKey] = useState<number | null>(null);
  const [creating, setCreating] = useState<boolean>(false);

  const handleAdd = async () => {
    const newKey = Date.now();
    const newRow: IDatasetList = {
      key: newKey,
      name: "",
      items: Math.floor(Math.random() * 21) * 10,
      tags: [],
    };

    setMock(prev => [newRow, ...prev]);
    setNewRecordKey(newKey);

    await actionRef.current?.reload();

    setCreating(true);
    actionRef.current?.startEditable(newKey, newRow);
  };

  const handleDelete = (key: number) => {
    setMock(prev => prev.filter(item => item.key !== key));
    actionRef.current?.reload();
  };

  const handleSave = (key: number, data: IDatasetList) => {
    setMock((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, ...data } : item
      )
    );
  }

  const columns: ProColumns<IDatasetList>[] = [
    {
      dataIndex: 'index',
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "名称",
      dataIndex: "name",
      ellipsis: true,
      key: "name",
    },
    {
      title: "数量",
      dataIndex: "items",
      editable: false,
      valueType: "digit",
      key: "items",
    },
    {
      title: "标签",
      dataIndex: "tags",
      search: false,
      filters: [
        { text: 'tag1', value: 'tag1' },
        { text: 'tag2', value: 'tag2' },
        { text: 'tag3', value: 'tag3' },
      ],
      onFilter: (value, record) => record.tags.includes(value as string),
      valueType: "checkbox",
      valueEnum: {
        tag1: { text: "tag1" },
        tag2: { text: "tag2" },
        tag3: { text: "tag3" },
      },
      key: "tags",
      render: (_, record) => (
        <Space>
          {record.tags.map((tag) => (
            <Tag key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "选项",
      key: "options",
      valueType: "option",
      render: (_, record, __, action) => [
        <a key="check">查看</a>,
        <a
          key="edit"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          编辑
        </a>,
      ],
    }
  ];

  const search = (params: SearchType, filter: Record<string, (string | number)[] | null>) => {
    let data = mock;

    if (params.name) {
      const searchName = params.name.trim().toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(searchName));
    }

    if (params.items) {
      const threshold = 5;
      const searchItems = params.items;
      data = data.filter(item => (
        item.items >= searchItems - threshold
        &&
        item.items <= searchItems + threshold
      ));
    }

    if (filter.tags && filter.tags.length > 0) {
      data = mock.filter(item =>
        filter.tags?.some((selectedTag: string | number) =>
          item.tags.includes(String(selectedTag))
        )
      );
    }

    return Promise.resolve({
      data,
      success: true,
    });
  }

  return (
    <>
      {contextHolder}
      <ProTable<IDatasetList>
        columns={columns}
        actionRef={actionRef}
        request={(params, _, filter) => search(params, filter)}
        cardBordered
        rowKey="key"
        editable={{
          type: "multiple",
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            if (!data.name || !data.tags.length) {
              messageApi.warning("请填写名称并至少填写一个标签");
              return Promise.reject();
            }
            handleSave(rowKey as number, data);
            setCreating(false);
            setNewRecordKey(null);
            return Promise.resolve();
          },
          onDelete: async (rowKey) => {
            handleDelete(rowKey as number);
          },
          onCancel: async (rowKey) => {
            if (rowKey === newRecordKey) {
              handleDelete(rowKey as number);
              setCreating(false);
            }
          },
        }}
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showSizeChanger: true,
        }}
        search={{
          labelWidth: "auto",
          span: 3
        }}
        toolbar={{
          title: "Voice Grid Datasets",
        }}
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            disabled={creating}
            onClick={handleAdd}
            type="primary"
          >
            新建
          </Button>
        ]}
      />
    </>
  );
}

export default DatasetTable;

export type { IDatasetList };