import React, { useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: "input", position: { x: 0, y: 0 }, data: { label: 'Primer nodo' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Segundo nodo' } },
  { id: '3', type: "output", position: { x: 0, y: 200 }, data: { label: 'Tercer Nodo' } },
];
const initialEdges = [
  { id: 'a', type: 'smoothstep', source: '1', target: '2' },
  { id: 'b', type: 'smoothstep', source: '2', target: '3' },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = params => setEdges(eds => addEdge(params, eds));

  useEffect(() => {
    console.log("Edges", edges);
  }, [edges])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}