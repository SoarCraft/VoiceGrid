import { Card } from "antd";

import DatasetTable from "@/app/components/DatasetTable";
import type { IDatasetList } from "@/app/components/DatasetTable";

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

const Home = () => (
  <>
    <Card>
      123
    </Card>
    <DatasetTable mock={mock} />
  </>
);

export default Home;
