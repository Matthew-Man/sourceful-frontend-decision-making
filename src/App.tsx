import React, { createContext, useState } from 'react';
import './App.css';
import ReactFlow from 'react-flow-renderer';
import Attribute from './components/attributes';
import Choice from './components/choices';

//Add test <-

export interface IAttributeData {
    id: string,
    attributeName: string,
    weighting: number
}

export interface IValue {
    choiceId: string,
    attributeId: string,
    value: number
}

interface IPath {
    id: string,
    source: string,
    target: string,
    animated: boolean
}

export const ContextAttributeData = createContext<IAttributeData[]>([]);
export const ContextChoiceValues = createContext<IValue[]>([])

// const initialChoiceValues = [{ choiceId: "2", attributeId: "1", value: 50 }];
// const initialAttributeData = [{ id: "1", attributeName: "Placeholder", weighting: 1 }];


export interface IChoiceTotals {
    id: string,
    total: number
}


function App() {
    const [isDraggable, setIsDraggable] = useState(true);
    const [id, setId] = useState(4);
    const [attributeInput, setAttributeInput] = useState("");
    const [choiceInput, setChoiceInput] = useState("");
    const [choiceValues, setChoiceValues] = useState<IValue[]>([])
    const [allAttributeData, setAllAttributeData] = useState<IAttributeData[]>([]);
    const [choiceTotals, setChoiceTotals] = useState<IChoiceTotals[]>([])


    //Handle static movement after adding a few elements

    const attributeProps = {
        setIsDraggable: setIsDraggable,
        handleAttWeightingChange: handleAttWeightingChange,
    }

    const choiceProps = {
        setIsDraggable: setIsDraggable,
        setChoiceTotals: setChoiceTotals
    }


    function handleAttWeightingChange(id: string, newWeighting: number) {
        setAllAttributeData((arr) => {
            //Extract to helper function
            const copyArr = [...arr]
            for (let el of copyArr) {
                if (el.id === id) {
                    const updatedAtt = {
                        ...el,
                        weighting: newWeighting
                    }
                    copyArr[copyArr.indexOf(el)] = updatedAtt
                }
            }
            return copyArr
        })
    }

    // const initialElements = [
    //     {
    //         id: '1',
    //         type: 'input', // input node
    //         data: { label: <Attribute {...attributeProps} attributeTitle="Placeholder Title" id={"1"} /> },
    //         position: { x: 250, y: 25 },
    //         style: { "width": "200px" },
    //     },
    //     // default node
    //     {
    //         id: '2',
    //         type: 'default',
    //         // you can also pass a React component as a label
    //         data: {
    //             label:
    //                 <Choice {...choiceProps} setChoiceValue={setChoiceValues} choiceTitle="Placeholder Title" choiceId={"2"} />
    //         },
    //         position: { x: 100, y: 125 },
    //         style: { "width": "200px" },
    //     },
    //     {
    //         id: '3',
    //         type: 'output', // output node
    //         data: { label: 'Output Node' },
    //         position: { x: 250, y: 250 },
    //     },
    //     // animated edge
    //     { id: 'e1-2', source: '1', target: '2', animated: true },
    //     { id: 'e2-3', source: '2', target: '3' },
    //     // create links based on type => loop through array to create links
    // ]

    const outputNode = {
        id: '3',
        type: 'output', // output node
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    };

    const getId = () => { setId((num) => num + 1); return id };
    const genStyle = { "width": "200px" };
    const startPos = { x: 250, y: 100 };


    const [elements, setElements] = useState<any[]>([outputNode])
    // console.log(choiceTotals)


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
        createNewChoiceValues(newId)
        setAllAttributeData((arr) => arr.concat(newAttributeData))
        createAttributePaths(newId)
        setAttributeInput("")
    }


    function createNewChoiceValues(attributeId: string) {
        const arrOfChoicesId = elements.filter(obj => obj.type === 'default').map(obj => obj.id)
        for (let choiceId of arrOfChoicesId) {
            setChoiceValues((arr) => arr.concat({ choiceId: choiceId, attributeId: attributeId, value: 50 }))
        }
    }


    function createNewChoiceValuesAttribute(choiceId: string) {
        const arrOfAttributeId = elements.filter(obj => obj.type === 'input').map(obj => obj.id)
        for (let attributeId of arrOfAttributeId) {
            setChoiceValues((arr) => arr.concat({ choiceId: choiceId, attributeId: attributeId, value: 50 }))
        }
    }


    function createSinglePath(source: string, target: string, isAnimated: boolean) {
        const newPath = { id: `e${source}-${target}`, source: source, target: target, animated: isAnimated }
        return newPath
    }


    function createAttributePaths(currentId: string) {
        let newPaths: IPath[] = []
        for (let item of elements) {
            if (item.type === 'default') {
                newPaths.push(createSinglePath(currentId, item.id, true))
            }
        }
        setElements(arr => arr.concat(newPaths))
    }


    function createChoicePaths(currentId: string) {
        let newAttributeChoicePaths: IPath[] = []
        let newChoiceOutputPaths: IPath[] = []
        for (let item of elements) {
            if (item.type === 'input') {
                newAttributeChoicePaths.push(createSinglePath(item.id, currentId, true))
            }
            if (item.type === 'output') {
                newChoiceOutputPaths.push(createSinglePath(currentId, item.id, false))
            }
        }
        setElements(arr => arr.concat(newAttributeChoicePaths.concat(newChoiceOutputPaths)))
    }


    function handleAddChoice() {
        const newId = getId().toString()
        console.log(choiceInput);

        const newChoice = {
            id: newId,
            type: 'default',
            data: {
                label:
                    <Choice {...choiceProps} setChoiceValue={setChoiceValues} choiceTitle={choiceInput} choiceId={newId} />
            },
            position: startPos,
            style: genStyle
        }

        const newChoiceTotal = { id: newId, total: 50 }

        setElements((arr) => arr.concat(newChoice));
        createNewChoiceValuesAttribute(newId)
        createChoicePaths(newId)
        setChoiceTotals(arr => arr.concat(newChoiceTotal))
        setChoiceInput("");
    }


    return (
        <div className="App">
            <div className="reactflow">
                <ContextChoiceValues.Provider value={choiceValues}>
                    <ContextAttributeData.Provider value={allAttributeData}>
                        <ReactFlow elements={elements} nodesDraggable={isDraggable} />
                    </ContextAttributeData.Provider>
                </ContextChoiceValues.Provider>
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
