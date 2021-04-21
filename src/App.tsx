import React, { useState } from 'react';
import './App.css';
import ReactFlow from 'react-flow-renderer';
import Attribute from './components/attributes';
import Choice from './components/choices';

function App() {
    const [isDraggable, setIsDraggable] = useState(true);

    const props = {
        setIsDraggable: setIsDraggable,
        isDraggable: isDraggable
    }

    const elements = [
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
            // you can also pass a React component as a label
            data: { label: <Choice /> },
            position: { x: 100, y: 125 },
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
    ];

    return (
        <div className="App">
            <div style={{ height: 700 }}>
                <ReactFlow elements={elements} nodesDraggable={isDraggable} />
            </div>
        </div>
    );
}

export default App;
