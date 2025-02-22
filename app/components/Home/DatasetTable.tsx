"use client";

import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tag, message } from "antd";
import { v4 as uuid } from "uuid";

import TagList from "@/app/components/Home/TagList";
import { initMock } from "@/app/types/DatasetListTypes";
import type { IDatasetList, TagFilterType, SearchType } from "@/app/types/DatasetListTypes";

const DatasetTable = () => {
  const [mock, setMock] = useState<IDatasetList[]>(initMock);
  const [newRecordKey, setNewRecordKey] = useState<number | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [tagsFilter, setTagsFilter] = useState<TagFilterType[]>([
    { text: 'tag1', value: 'tag1' },
    { text: 'tag2', value: 'tag2' },
    { text: 'tag3', value: 'tag3' },
  ]);

  const [messageApi, contextHolder] = message.useMessage();

  const actionRef = useRef<ActionType>(null);

  const handleAdd = async () => {
    const newKey = Date.now();
    const newRow: IDatasetList = {
      key: newKey,
      id: uuid(),
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

    const newTags = data.tags;
    const prevTags = tagsFilter.map(tag => tag.value);
    const newTagsFilter: TagFilterType[] = [];
    newTags.map(tag => {
      if (!prevTags.includes(tag)) {
        newTagsFilter.push({
          value: tag,
          text: tag,
        })
      }
    });
    setTagsFilter([...tagsFilter, ...newTagsFilter]);
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
      filters: tagsFilter,
      onFilter: (value, record) => record.tags.includes(value as string),
      key: "tags",
      renderFormItem: (_, { value, onChange }) => (
        <TagList
          value={value}
          onChange={onChange as (value: string[]) => void}
        />
      ),
      render: (_, record) => (
        <Space>
          {record.tags.map((tag) => (
            <Tag key={record.key}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "标签",
      hideInTable: true,
      dataIndex: "tags",
    },
    {
      title: "选项",
      key: "options",
      valueType: "option",
      render: (_, record, __, action) => [
        <a key="check" href={`/dataset/${record.id}`}>查看</a>,
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
      const threshold = 10;
      const searchItems = params.items;
      data = data.filter(item => (
        item.items >= searchItems - threshold
        &&
        item.items <= searchItems + threshold
      ));
    }

    if (params.tags) {
      const searchTag = params.tags;
      data = mock.filter(item => item.tags.includes(searchTag));
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
              messageApi.warning("请填写名称并至少添加一个标签");
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