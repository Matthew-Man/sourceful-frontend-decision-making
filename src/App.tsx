import React, { useState } from 'react';
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

export interface IAttributeData {
    id: string,
    attributeName: string,
    weighting: number
}

// interface IChoice {
//     id: string,
//     choiceName: string,
//     totalScore: number
// }

function App() {
    const [isDraggable, setIsDraggable] = useState(true);
    const [id, setId] = useState(4);
    const [attributeInput, setAttributeInput] = useState("");
    const [choiceInput, setChoiceInput] = useState("");
    const [allAttributeData, setAllAttributeData] = useState<IAttributeData[]>([{ id: "1", attributeName: "Placeholder", weighting: 1 }]);

    const attributeProps = {
        setIsDraggable: setIsDraggable,
        handleAttWeightingChange: handleAttWeightingChange,
    }

    const choiceProps = {
        setIsDraggable: setIsDraggable,
        allAttributeData: allAttributeData
    }

    console.log(allAttributeData)

    function handleAttWeightingChange(id: string, newWeighting: number) {
        setAllAttributeData((arr) => {
            for (let el of arr) {
                if (el.id === id) {
                    el.weighting = newWeighting
                }
            }
            return arr
        })
    }

    // function handleAttValueChange(id: string, newValue: number) {

    // }

    const getId = () => { setId((num) => num + 1); return id };
    const genStyle = { "width": "200px" };
    const startPos = { x: 250, y: 100 };

    const initialElements = [
        {
            id: '1',
            type: 'input', // input node
            data: { label: <Attribute {...attributeProps} attributeTitle="Placeholder Title" id={"1"} /> },
            position: { x: 250, y: 25 },
            style: { "width": "200px" },
        },
        // default node
        {
            id: '2',
            type: 'default',
            // you can also pass a React component as a label
            data: { label: <Choice {...choiceProps} choiceTitle="Placeholder Title" /> },
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
        const newId = getId().toString();

        const newAttributeData = {
            id: newId,
            attributeName: attributeInput,
            weighting: 1
        }

        const newElement = {
            id: newId,
            type: 'input',
            data: { label: <Attribute {...attributeProps} attributeTitle={attributeInput} id={newId} /> },
            position: startPos,
            style: genStyle,
        }
        setElements((arr) => arr.concat(newElement));
        setAllAttributeData((arr) => arr.concat(newAttributeData))
        setAttributeInput("")
    }


    function handleAddChoice() {
        const newId = getId()
        console.log(choiceInput);

        const newChoice = {
            id: newId,
            type: 'default',
            data: { label: <Choice {...choiceProps} choiceTitle={choiceInput} /> },
            position: startPos,
            style: genStyle
        }
        setElements((arr) => arr.concat(newChoice));
        setChoiceInput("");
    }


    return (
        <div className="App">
            <div className="reactflow">
                <ReactFlow elements={elements} nodesDraggable={isDraggable} />
            </div>
            <div className="sidebar">
                <p>Add a new attribute</p>
                <input type="text" value={attributeInput} onChange={(e) => setAttributeInput(e.target.value)} placeholder="Attribute name..." />
                <button onClick={() => handleAddAttribute()}>Add +</button>
                <br />
                <br />
                <p>Add a new choice</p>
                <input type="text" value={choiceInput} onChange={(e) => setChoiceInput(e.target.value)} placeholder="Choice name..." />
                <button onClick={() => handleAddChoice()}>Add +</button>
            </div>
        </div>
    );
}

export default App;
