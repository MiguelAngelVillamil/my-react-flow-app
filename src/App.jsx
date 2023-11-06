import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useOnSelectionChange
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Primer nodo" },
  },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Segundo nodo" } },
  {
    id: "3",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "Tercer Nodo" },
  },
];
const initialEdges = [
  { id: "a", type: "smoothstep", source: "1", target: "2" },
  { id: "b", type: "smoothstep", source: "2", target: "3" },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodeId, setNewNodeId] = useState(4);
  const [editedNodeId, setEditedNodeId] = useState(null);
  const [editedNodeLabel, setEditedNodeLabel] = useState("");


    const [selectedNode, setSelectedNode] = useState([]);



  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

 
    

  
  const handleAddNode = () => {
    // Crear un nuevo nodo y agregarlo a la lista de nodos
    const newNode = {
      id: newNodeId.toString(),
      type: "default",
      position: { x: 100, y: 100 }, // Cambia la posición según tus necesidades
      data: { label: "Nuevo Nodo" },
    };
    setNodes([...nodes, newNode]);
    setNewNodeId(newNodeId + 1);
  };

  const onConnectStart = (_, { nodeId, handleType }) =>
    console.log("on connect start", { nodeId, handleType });
  const onConnectEnd = (event) => console.log("on connect end", event);

  const handleEditNode = (nodeId) => {
    setEditedNodeId(selectedNode)
    const editedNode = nodes.find((node) => node.id === selectedNode);
    console.log(editedNode)
    if (editedNode) {
      setEditedNodeLabel(editedNode.data.label);
    }
  };

  const saveEditedNode = () => {
    if (selectedNode) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode) {
            return {
              ...node,
              data: {
                ...node.data,
                label: editedNodeLabel,
              },
            };
          }
          return node;
        })
      );
      setEditedNodeId(null);
    }
  };

  const handleSelectionChange = (event) => {
if(event.nodes[0]){
    
    setSelectedNode(event.nodes[0].id)
    console.log(selectedNode)
  }
}

  useEffect(() => {
    console.log("Edges", edges);
  }, [edges]);


  
  return (
    <div style={{ width: "100vw", height: "60vh" }}>
      <button onClick={saveEditedNode}>Guardar Cambios</button>
      <button onClick={handleAddNode}>Agregar Nodo</button>
     
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        onSelectionChange={handleSelectionChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      
      >
        <Controls />
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
      {editedNodeId && (
        <div>
          <input
            type="text"
            value={editedNodeLabel}
            onChange={(e) => setEditedNodeLabel(e.target.value)}
          />
        </div>
      )}

      {selectedNode && 

          <button onClick={() => handleEditNode(selectedNode)}>Editar</button>
        
      }
    </div>
  );
}
