import { Card, Table, Tag } from "antd";

const { Column } = Table;

interface IDatasetList {
  key: number;
  name: string;
  items: number;
  tags: string[];
}

const mock: IDatasetList[] = [
  {
    key: 1,
    name: "dataset1",
    items: 100,
    tags: ["tag1", "tag2"],
  },
  {
    key: 2,
    name: "dataset2",
    items: 200,
    tags: ["tag1", "tag3"],
  },
];

export default function Home() {
  return <>
    <Card>
      123
    </Card>

    <Table<IDatasetList> dataSource={mock}>
      <Column title="Id" dataIndex="key" key="key" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Items" dataIndex="items" key="items" />

      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => <>
          {tags.map((tag) => (
            <Tag key={tag}>
              {tag}
            </Tag>
          ))}
        </>}
      />
    </Table>
  </>;
}
