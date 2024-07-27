import { Empty, Segmented, Table, TableProps } from "antd";
import { useState } from "react";
import Income from "./Income";
import Pay from "./Pay";

export default () => {
    const [value, setValue] = useState<string>('Income');
    return <div>
        <Segmented<string>
            options={['Income', 'Expenses']}
            value={value}
            onChange={setValue}
        />
        {value === 'Income' ? <Income /> : <Pay />}
    </div>
}