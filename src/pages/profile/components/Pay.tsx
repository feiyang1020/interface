import { getPayList } from "@/services/api";
import { Empty, Table, TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";

export default () => {
    const columns: TableProps<API.PayItem>['columns'] = [
        {
            title: 'Time',
            dataIndex: 'updateAt',
            key: 'updateAt',
        },
        {
            title: 'Model',
            dataIndex: 'model_name',
            key: 'model_name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
       ]
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<API.PayItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const fetchList = useCallback(async () => {
        setLoading(true);
        const { code, data } = await getPayList({
            page,
            page_size: size,
        });
        setLoading(false);
        if (code !== 0 || !data.list) {
            return;
        }
        setTotal(data.total)
        setList(data.list)
    }, [page, size]);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return <Table
        style={{ marginTop: 20 }}
        columns={columns}
        locale={{ emptyText: <Empty /> }}
        dataSource={list}
        loading={loading}
        pagination={{
            current: page,
            pageSize: size,
            total,
            onChange: (page, size) => {
                setPage(page);
                setSize(size);
            }
        }}
    />
}