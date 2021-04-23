import { useState, useEffect, useContext } from "react";
import { IAttributeData, ContextAttributeData, ContextChoiceValues } from "../App";
import "./components.css";

interface IChoice {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    setChoiceValue: React.Dispatch<React.SetStateAction<{
        choiceId: string;
        attributeId: string;
        value: number;
    }[]>>,
    choiceTitle: string,
    choiceId: string
}

interface IValue {
    id: string,
    value: number
}

export default function Choice({ setIsDraggable, choiceTitle, setChoiceValue, choiceId }: IChoice) {
    const choiceValues = useContext(ContextChoiceValues)
    const allAttributeData = useContext(ContextAttributeData)
    const [totalChoiceScore, setTotalChoiceScore] = useState(0);


    function handleValueChange(id: string, newValue: number) {
        setChoiceValue((arr) => {
            const copyArr = [...arr]
            for (let el of copyArr) {
                if (el.attributeId === id && el.choiceId === choiceId) {
                    const newChoice = {
                        ...el,
                        value: newValue
                    }
                    copyArr[copyArr.indexOf(el)] = newChoice
                }
            }
            return copyArr
        })
    }


    function calculateWeightedScore(attributeId: string): number {
        const value = choiceValues[choiceValues.findIndex(obj => obj.choiceId === choiceId && obj.attributeId === attributeId)].value
        const weighting = allAttributeData[allAttributeData.findIndex(obj => obj.id === attributeId)].weighting
        return value * weighting
    }

    function calculateTotalScore() {
        let sum = 0;
        for (let att of allAttributeData) {
            sum += calculateWeightedScore(att.id)
        }
        return sum
    }


    useEffect(() => {
        setTotalChoiceScore(calculateTotalScore())
    }, [choiceValues, allAttributeData])


    function Slider(props: IAttributeData) {
        const { id, attributeName } = props;
        const indexChoice = choiceValues.findIndex(obj => obj.attributeId === id && obj.choiceId === choiceId)
        const initialAttributeValue = choiceValues[indexChoice].value
        const [sliderAttributeValue, setSliderAttributeValue] = useState(initialAttributeValue)


        function handleOnDrag(e: React.ChangeEvent<HTMLInputElement>) {
            setSliderAttributeValue(parseFloat(e.target.value))
        }

        return (
            <div>
                <p>{attributeName}: {sliderAttributeValue}</p>
                <div className="slide-container" onMouseEnter={() => { setIsDraggable((pre) => !pre); handleValueChange(id, sliderAttributeValue) }} onMouseLeave={() => { setIsDraggable((pre) => !pre); handleValueChange(id, sliderAttributeValue) }}>
                    <input type="range" min="0" max="100" step="1" value={sliderAttributeValue} onChange={handleOnDrag} className="slider" />
                </div>
            </div >
        )
    }


    return (
        <div>
            <p className="title">{choiceTitle}</p>
            <hr />
            {allAttributeData.map((data) => <Slider {...data} key={data.id} />)}
            <br />
            <h4>Total Score</h4>
            <p>{totalChoiceScore}</p>
        </div>
    )
}