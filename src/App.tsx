import React, { useEffect, useState } from 'react';
import './App.css';
import ReactFlow from 'react-flow-renderer';
import Attribute from './components/attributes';
import Choice from './components/choices';

// interface IElements {
//     id: string,
//     type: string,
//     data: { label: any },
//     position: { x: number, y: number },
//     style?: { "width": string }
// }

// interface IConnections {
//     id: string,
//     source: string,
//     target: string,
//     animated?: boolean
// }

function App() {
    const [isDraggable, setIsDraggable] = useState(true);
    const [id, setId] = useState(4)
    const [attributeInput, setAttributeInput] = useState("");

    const props = {
        setIsDraggable: setIsDraggable,
    }

    const getId = () => { setId((num) => num + 1); return id }

    const initialElements = [
        {
            id: '1',
            type: 'input', // input node
            data: { label: <Attribute {...props} /> },
            position: { x: 250, y: 25 },
            style: { "width": "200px" },
        },
        // default node
        {
            id: '2',
            type: 'default',
            // you can also pass a React component as a label
            data: { label: <Choice {...props} /> },
            position: { x: 100, y: 125 },
            style: { "width": "200px" },
        },
        {
            id: '3',
            type: 'output', // output node
            data: { label: 'Output Node' },
            position: { x: 250, y: 250 },
        },
        // animated edge
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        // create links based on type => loop through array to create links
    ]

    const [elements, setElements] = useState<any[]>(initialElements)


    function handleAddAttribute() {
        const newElement = {
            id: getId().toString(),
            type: 'input',
            data: { label: <Attribute {...props} /> },
            position: { x: 200, y: 125 },
            style: { "width": "200px" },
        }
        setElements((arr) => arr.concat(newElement));
    }


    return (
        <div className="App">
            <div className="reactflow">
                <ReactFlow elements={elements} nodesDraggable={isDraggable} />
            </div>
            <div className="sidebar">
                <p>Add a new attribute</p>
                <input type="text" value={attributeInput} onChange={(e) => setAttributeInput(e.target.value)} />
                <button onClick={() => { console.log(attributeInput); handleAddAttribute() }}>Add +</button>
            </div>
        </div>
    );
}

export default App;
