import { useState } from "react";
import "./components.css";

interface IAttribute {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>
    isDraggable: boolean
}

export default function Attribute({ setIsDraggable, isDraggable }: IAttribute) {
    const [weighting, setWeighting] = useState("1");

    return (
        <div className="attribute-container">
            <div className="content-container">
                <p className="title">Attribute Title Placeholder</p>
                <hr />
                <p>Weighting: {weighting}</p>
                <div className="slide-container" onMouseEnter={() => setIsDraggable(!isDraggable)} onMouseLeave={() => setIsDraggable(!isDraggable)}>
                    <input type="range" min="0" max="1" step="0.01" value={weighting} onChange={(e) => setWeighting(e.target.value)} className="slider" />
                </div>
            </div>
        </div>
    )
}