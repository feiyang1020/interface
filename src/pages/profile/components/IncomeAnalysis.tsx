import { Empty, Segmented, Table, TableProps } from "antd";
const columns: TableProps['columns'] = [
    {
        title: 'Time',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Model',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Amount',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Status',
        dataIndex: 'age',
        key: 'age',
    },]
export default () => {
    return <div>
        <Segmented<string>
            options={['Income', 'Expenses']}
            onChange={(value) => {
                console.log(value); // string
            }}
        />
        <Table style={{ marginTop: 20 }} columns={columns} dataSource={[]} locale={{ emptyText: <Empty />}}  />
    </div>
}