import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import ReactFlow from 'react-flow-renderer';
import Attribute from './components/attributes';
import Choice from './components/choices';
import Output from './components/output';


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
export const ContextChoiceValues = createContext<IValue[]>([]);
export const ContextWinner = createContext("");

// const initialChoiceValues = [{ choiceId: "2", attributeId: "1", value: 50 }];
// const initialAttributeData = [{ id: "1", attributeName: "Placeholder", weighting: 1 }];


export interface IChoiceTotals {
    id: string,
    title: string,
    total: number
}


function App() {
    const [isDraggable, setIsDraggable] = useState(true);
    const [id, setId] = useState(4);
    const [attributeInput, setAttributeInput] = useState("");
    const [choiceInput, setChoiceInput] = useState("");
    const [choiceValues, setChoiceValues] = useState<IValue[]>([]);
    const [allAttributeData, setAllAttributeData] = useState<IAttributeData[]>([]);
    const [choiceTotals, setChoiceTotals] = useState<IChoiceTotals[]>([]);
    const [winner, setWinner] = useState("");


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


    const getId = () => { setId((num) => num + 1); return id };
    const genStyle = { "width": "200px" };
    const startPos = { x: 250, y: 100 };

    useEffect(() => {
        if (choiceTotals.length > 0) {
            const winnerObject = choiceTotals.reduce((max, choice) => max.total > choice.total ? max : choice);
            setWinner(winnerObject.title)
        }
    }, [choiceTotals])

    const outputNode = {
        id: '3',
        type: 'output', // output node
        data: { label: <Output /> },
        position: { x: 250, y: 250 },
    };

    const [elements, setElements] = useState<any[]>([outputNode])


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

        const newChoiceTotal = { id: newId, title: choiceInput, total: 50 }

        setElements((arr) => arr.concat(newChoice));
        createNewChoiceValuesAttribute(newId)
        createChoicePaths(newId)
        setChoiceTotals(arr => arr.concat(newChoiceTotal))
        setChoiceInput("");
    }


    return (
        <div className="App">
            <div className="reactflow">
                <ContextWinner.Provider value={winner}>
                    <ContextChoiceValues.Provider value={choiceValues}>
                        <ContextAttributeData.Provider value={allAttributeData}>
                            <ReactFlow elements={elements} nodesDraggable={isDraggable} />
                        </ContextAttributeData.Provider>
                    </ContextChoiceValues.Provider>
                </ContextWinner.Provider>
            </div>
            <div className="sidebar">
                <h4>Created by Matthew Man for the Sourceful Frontend Task</h4>
                <p>Access to source code available at the bottom through link to github</p>
                <hr />
                <p>Add a new attribute</p>
                <input type="text" value={attributeInput} onChange={(e) => setAttributeInput(e.target.value)} placeholder="Attribute name..." />
                <button onClick={() => handleAddAttribute()}>Add +</button>
                <br />
                <br />
                <p>Add a new choice</p>
                <input type="text" value={choiceInput} onChange={(e) => setChoiceInput(e.target.value)} placeholder="Choice name..." />
                <button onClick={() => handleAddChoice()}>Add +</button>
                <br />
                <br />
                <hr />
                <a href="https://github.com/Matthew-Man/sourceful-frontend-decision-making">Go to sourcecode</a>
            </div>
        </div>
    );
}

export default App;
