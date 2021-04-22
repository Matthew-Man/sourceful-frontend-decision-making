import { useState, useEffect, useContext } from "react";
import { IAttributeData, ContextAttributeData } from "../App";
import "./components.css";

interface IChoice {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    // allAttributeData: IAttributeData[],
    choiceTitle: string
}

interface IValue {
    id: string,
    value: number
}

export default function Choice({ setIsDraggable, choiceTitle }: IChoice) {
    const allAttributeData = useContext(ContextAttributeData)
    const initialAttributeValues = [...allAttributeData].map((attribute) => ({ id: attribute.id, value: 50 }));
    const [choiceValues, setChoiceValues] = useState<IValue[]>(initialAttributeValues);
    const [totalChoiceScore, setTotalChoiceScore] = useState(0);

    console.log(allAttributeData)
    // allAttributeData not updating after change state in parent component - this doesn't log 

    useEffect(() => {
        const arrCurrentAttributeId = choiceValues.map(item => item.id);
        for (let item of allAttributeData) {
            if (arrCurrentAttributeId.includes(item.id)) {
                continue;
            } else {
                setChoiceValues(arr => arr.concat({ id: item.id, value: 50 }))
            }
        }
    }, [allAttributeData])

    function handleValueChange(id: string, newValue: number) {
        setChoiceValues((arr) => {
            // const arr = [...array]
            for (let el of arr) {
                if (el.id === id) {
                    el.value = newValue
                }
                console.log(el)
            }
            return arr
        })
    }


    function calculateWeightedScore(attributeId: string): number {
        const weighting = allAttributeData.find((attribute) => attributeId === attribute.id)!.weighting;
        const value = choiceValues.find((attribute) => attribute.id === attributeId)!.value;
        return weighting * value
    }

    function calculateTotalScore() {
        let sum = 0;
        for (let att of allAttributeData) {
            sum += calculateWeightedScore(att.id)
        }
        setTotalChoiceScore(sum)
    }


    // console.log(totalChoiceScore);
    // useEffect(() => {
    //     setTotalChoiceScore(calculateWeightedScore("1"))
    // }, [choiceValues])


    function Slider(props: IAttributeData) {
        const { id, attributeName } = props;
        const [attribute, setAttribute] = useState("50")

        useEffect(() => handleValueChange(id, parseFloat(attribute)), [attribute])

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
            <p>{totalChoiceScore}</p>
        </div>
    )
}