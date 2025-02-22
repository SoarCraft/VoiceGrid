"use client";

import { DataItemListProps, DataItemType, DimensionType } from "@/app/types/DataItemListTypes";
import { type ActionType, type ProColumns, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";

import Drawer from "@/app/components/DatasetDetail/Drawer";
import { SearchType } from "@/app/types/DatasetListTypes";

const DataItemList: React.FC<DataItemListProps> = ({ name, items }) => {
  // const [mock, setMock] = useState<DataItemType[]>(items);
  const mock = items;
  const [dimension, setDimension] = useState<DimensionType | null>(null);
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>(null);

  const onDrawerOpen = (dimension: DimensionType, name: string) => {
    setDimension(dimension);
    setItemName(name);
    setOpen(true);
  }

  const onDrawerClose = () => {
    setOpen(false);
  }

  const columns: ProColumns<DataItemType>[] = [
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
      title: "维度",
      dataIndex: "dimension",
      search: false,
      render: (_, record) => (
        <a
          key="check"
          onClick={() => onDrawerOpen(record.dimension, record.name)}
        >
          查看
        </a>
      ),
    },
    {
      title: "选项",
      key: "options",
      valueType: "option",
      render: (_, record, __, action) => [
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

  const search = (params: SearchType) => {
    let data = mock;

    if (params.name) {
      const searchName = params.name.trim().toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(searchName));
    }

    return Promise.resolve({
      data,
      success: true,
    });
  }

  return (
    <>
      <ProTable<DataItemType>
        columns={columns}
        actionRef={actionRef}
        request={(params) => search(params)}
        cardBordered
        rowKey="key"
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
          title: `Voice Grid Dataset - ${name}`,
        }}
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            type="primary"
          >
            新建
          </Button>
        ]}
      />
      <Drawer
        dimension={dimension}
        title={itemName}
        open={open}
        onClose={onDrawerClose}
      />
    </>
  );
}

export default DataItemList;