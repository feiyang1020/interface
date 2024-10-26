import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getDependTree } from '@/services/api';

const initialNodes = [
    {
        id: 'hidden-0',
        type: 'input',
        data: { label: 'C1' },
        position: { x: 250, y: 5 },
        style: {
            background: '#607DE4',
            color: '#fff',
            border: '1px solid #607DE4',
            width: 180,
        },
    },
    {
        id: 'hidden-1',
        type: 'input',
        data: { label: 'C2' },
        position: { x: 500, y: 5 },
        style: {
            background: '#607DE4',
            color: '#fff',
            border: '1px solid #607DE4',
            width: 180,
        },
    },
    {
        id: 'hidden-2',
        type: "selectorNode",

        data: { label: 'Currnet Node' },
        position: { x: 380, y: 100 }, style: {
            background: '#FF66E7',
            color: '#fff',
            border: '1px solid #FF66E7',
            width: 180,
        },
    },
    {
        id: 'hidden-3', data: { label: 'P1' }, type: 'output', position: { x: 250, y: 200 },
        style: {
            background: '#60E4DE',
            color: '#fff',
            border: '1px solid #60E4DE',
            width: 180,
        },
    },
    {
        id: 'hidden-4', data: { label: 'P2' }, type: 'output', position: { x: 500, y: 200 },
        style: {
            background: '#60E4DE',
            color: '#fff',
            border: '1px solid #60E4DE',
            width: 180,
        },
    },

];

const initialEdges = [
    { id: 'hidden-e1-0', source: 'hidden-0', target: 'hidden-2', style: { stroke: '#8565f2' }, animated: true, },
    { id: 'hidden-e1-1', source: 'hidden-1', target: 'hidden-2', style: { stroke: '#8565f2' }, animated: true, },
    { id: 'hidden-e1-3', source: 'hidden-2', target: 'hidden-3', style: { stroke: '#8565f2' }, animated: true, },
    { id: 'hidden-e3-4', source: 'hidden-2', target: 'hidden-4', style: { stroke: '#8565f2' }, animated: true, },
];

const hide = (hidden) => (nodeOrEdge) => {
    return {
        ...nodeOrEdge,
        hidden,
    };
};
const connectionLineStyle = { stroke: '#fff' };

type Props = {
    model_id: number;
}

const Flow: React.FC<Props> = ({ model_id }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [hidden, setHidden] = useState(false);

    const onConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        [],
    );

    const _getDepend = useCallback(async () => {
        const { data } = await getDependTree({
            model_id,
            deep: 2
        });
        console.log(data);
        setNodes(initialNodes)
        setEdges(initialEdges)
    }, [model_id]);

    useEffect(() => {
        _getDepend();
    }, [_getDepend])


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            connectionLineStyle={connectionLineStyle}
        >
            <MiniMap />
            <Controls />
        </ReactFlow>
    );
};

export default Flow;
