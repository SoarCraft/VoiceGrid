import DataItemList from "@/app/components/DatasetDetail/DataItemList";
import { notFound } from 'next/navigation';
import { initDataset } from "@/app/types/DataItemListTypes";
import type { DatasetDetailParams } from "@/app/types/DataItemListTypes";

const getDataset = async (id: string) => {
    return Promise.resolve(initDataset.filter((item) => item.id === id))
}

const DatasetDetail = async ({ params }: DatasetDetailParams) => {
    const dataset = await getDataset(params.id);
    if (!dataset || dataset.length === 0) notFound();

    const { name, items } = dataset[0];

    return <DataItemList name={name} items={items} />
}

export default DatasetDetail;
