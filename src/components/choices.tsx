import { useEffect, useState } from "react";
import { IAttributeData } from "../App";
import "./components.css";

interface IChoice {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    allAttributeData: IAttributeData[],
    choiceTitle: string
}

interface IValue {
    id: string,
    value: number
}

export default function Choice({ setIsDraggable, allAttributeData, choiceTitle }: IChoice) {
    const [choiceValues, setChoiceValues] = useState<IValue[]>([]);

    useEffect(() => {
        const initialAttributeValues = allAttributeData.map((attribute) => ({ id: attribute.id, value: 50 }));
        setChoiceValues(initialAttributeValues)
    }, [])

    // useEffect(() => {
    //     const arrCurrentAttributeId = choiceValues.map(item => item.id);
    //     for (let item of allAttributeData) {
    //         if (arrCurrentAttributeId.includes(item.id)) {
    //             continue;
    //         } else {
    //             setChoiceValues(arr => arr.concat({ id: item.id, value: 50 }))
    //         }
    //     }
    // }, [allAttributeData])

    function handleValueChange(id: string, newValue: number) {
        setChoiceValues((arr) => {
            for (let el of arr) {
                console.log(el)
                if (el.id === id) {
                    el.value = newValue
                }
            }
            return arr
        })
    }


    function Slider(props: IAttributeData) {
        const { id, attributeName } = props;
        const [attribute, setAttribute] = useState("50")

        handleValueChange(id, parseFloat(attribute))

        return (
            <div>
                <p>{attributeName}: {attribute}</p>
                <div className="slide-container" onMouseEnter={() => setIsDraggable((pre) => !pre)} onMouseLeave={() => setIsDraggable((pre) => !pre)}>
                    <input type="range" min="0" max="100" step="1" value={attribute} onChange={(e) => setAttribute(e.target.value)} className="slider" />
                </div>
            </div >
        )
    }


    return (
        <div>
            <p className="title">{choiceTitle}</p>
            <hr />
            {allAttributeData.map((data) => <Slider {...data} key={data.id} />)}
            {/* <Slider {...allAttributeData[0]} /> */}
            <br />
            <h4>Total Score</h4>
            <p>Some Value</p>
        </div>
    )
}