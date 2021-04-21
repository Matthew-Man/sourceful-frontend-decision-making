import { useState } from "react";
import "./components.css";

interface IAttribute {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>
    isDraggable: boolean
}

export default function Attribute({ setIsDraggable, isDraggable }: IAttribute) {
    const [weighting, setWeighting] = useState(0.5);

    const divide100 = (value: string): number => parseInt(value) / 100

    return (
        <div className="attribute-container">
            <div className="content-container">
                <p className="title">Attribute Title Placeholder</p>
                <hr />
                <p>Weighting: {weighting}</p>
                <div className="slide-container" onMouseEnter={() => setIsDraggable(!isDraggable)} onMouseLeave={() => setIsDraggable(!isDraggable)}>
                    <input type="range" min="0" max="100" value={(weighting * 100).toString()} className="slider" onChange={(e) => { setWeighting(divide100(e.target.value)) }} />
                </div>
            </div>
        </div>
    )
}