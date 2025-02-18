import { DatasetDetail } from "@/components/DatasetDetail";

interface IDatasetList {
  key: number;
  name: string;
  items: number;
  tags: string[];
}

export default function Home() {
  return <DatasetDetail />;
}
