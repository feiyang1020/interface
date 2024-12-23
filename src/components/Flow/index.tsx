import React, { useCallback, useEffect, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    MarkerType
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
        type: "default",

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
    {
        id: 'hidden-e1-0', source: 'hidden-0', target: 'hidden-2', style: { stroke: '#8565f2' }, animated: true, label: '50%', markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#8565f2',
        },
    },
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
        const contentWidth = 180;
        const gap = 70;
        const { child_list, parent_list, id: currentID, name: currentName } = data;
        const childLen = child_list ? child_list.list.length : 0;
        const parentLen = parent_list ? parent_list.list.length : 0;
        const isChildGreater = childLen > parentLen;
        const max = Math.max(childLen, parentLen);
        console.log(max);
        const maxW = 250 * max - 70;
        const _nodes = [{
            id: String(currentID),
            type: "default",
            data: { label: currentName },
            position: { x: maxW / 2 - 90 + 250, y: 100 },
            style: {
                background: '#FF66E7',
                color: '#fff',
                border: '1px solid #FF66E7',
                width: 180,
            },
        },];
        const _edges = [];
        if (child_list && child_list.list.length > 0) {
            for (let i = 0; i < child_list.list.length; i++) {
                const { id, name } = child_list.list[i];
                _nodes.push({
                    id: String(id),
                    type: 'input',
                    data: { label: name },
                    position: { x: 250 * (i + 1), y: 5 },
                    style: {
                        background: '#607DE4',
                        color: '#fff',
                        border: '1px solid #607DE4',
                        width: 180,
                    },
                })
                _edges.push({
                    id: `e-${id}-${currentID}`, source: String(id), target: String(currentID), style: { stroke: '#8565f2' }, animated: true, markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: '#8565f2',
                    },
                },)
            }

        }
        if (parent_list && parent_list.list.length > 0) {
            for (let i = 0; i < parent_list.list.length; i++) {
                const { id, name } = parent_list.list[i];
                _nodes.push({
                    id: String(id),
                    type: 'output',
                    data: { label: name },
                    position: { x: 250 * (i + 1), y: 200 },
                    style: {
                        background: '#60E4DE',
                        color: '#fff',
                        border: '1px solid #60E4DE',
                        width: 180,
                    },
                })
                _edges.push({
                    id: `e-${currentID}-${id}`, source: String(currentID), target: String(id), style: { stroke: '#8565f2' }, animated: true, markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: '#8565f2',
                    },
                },)
            }
        }
        console.log(_nodes, _edges);
        setNodes(_nodes)
        setEdges(_edges)
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
