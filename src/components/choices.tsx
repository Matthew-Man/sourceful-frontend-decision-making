import { useState } from "react";
import { IAttributeData } from "../App";
import "./components.css";

interface IChoice {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    allAttributeData: IAttributeData[]
}

export default function Choice({ setIsDraggable, allAttributeData }: IChoice) {
    const [attribute, setAttribute] = useState("1")

    function Slider(props: IAttributeData) {
        const { attributeName } = props;
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
            <p className="title">Choice Placeholder Title</p>
            <hr />
            {/* {allAttributeData.map((data) => <Slider {...data} />)} */}
            <Slider {...allAttributeData[0]} />
        </div>
    )
}