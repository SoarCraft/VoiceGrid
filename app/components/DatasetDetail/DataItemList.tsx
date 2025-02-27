"use client";

import { DataItemListProps, DataItemType, DimensionType } from "@/app/types/DataItemListTypes";
import { ProTable } from "@ant-design/pro-components";
import type { ActionType, ProColumns, ProSchemaValueEnumType } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";

import { SearchType } from "@/app/types/DatasetListTypes";
import { dimensionDictionary, dimensionTitleDictionary } from "@/app/types/DataItemListTypes";
import { useScrollStyle } from "@/app/utils/style";

const DataItemList: React.FC<DataItemListProps> = ({ name, items }) => {
  const { styles } = useScrollStyle();
  // const [mock, setMock] = useState<DataItemType[]>(items);
  const mock = items;
  const [dimension, setDimension] = useState<DimensionType | null>(null);

  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<DataItemType>[] = [
    {
      title: "选项",
      key: "options",
      width: "10vw",
      minWidth: 140,
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
      fixed: "right",
    },
  ];

  const dimensionTitleList = Object.entries(dimensionTitleDictionary).filter(([, value]) => !!value);

  dimensionTitleList.map(([key, value]) => {
    const dataDict = dimensionDictionary[key as keyof typeof dimensionDictionary];
    columns.splice(columns.length - 1, 0, {
      title: value.text,
      minWidth: value.width,
      dataIndex: `dimension.${key}`,
      key: key,
      valueType: dataDict ? "select" : "digit",
      valueEnum: dataDict ?
                    dataDict.reduce((acc, item) => ({ ...acc, [item]: { text: item } }), {} as ProSchemaValueEnumType) :
                    undefined,
      fieldProps: dataDict ?
                    undefined:
                    { min: 1, max: 3, precision: 0 },
      render: (_, record) => {
        const data = record.dimension[key as keyof typeof dimension];
        return dataDict ? dataDict[data - 1] : data;
      },
    })
  });

  columns.unshift({
    title: "名称",
    dataIndex: "name",
    ellipsis: true,
    key: "name",
    width: "10vw",
    minWidth: 10,
    fixed: "left",
    render: (text) => (
      <div className="overflow-ellipsis">{ text }</div>
    ),
  })

  const search = (params: SearchType) => {
    let data = mock;

    console.log(params)

    if (params.name) {
      const searchName = params.name.trim().toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(searchName));
    }

    dimensionTitleList.map(([key]) => {
      if (params[key]) {
        console.log(params[key])
        data = data.filter(item => {
          const dataDict = dimensionDictionary[key as keyof typeof dimensionDictionary];
          const data = item.dimension[key as keyof typeof dimension];
          return dataDict ? dataDict[data - 1] === params[key] : data === params[key];
        });
      }
    })

    return Promise.resolve({
      data,
      success: true,
    });
  }

  return (
    <>
      <ProTable<DataItemType>
        className={ styles.customTable }
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
        scroll={{ x: "max-content", y: "40vh" }}
      />
    </>
  );
}

export default DataItemList;