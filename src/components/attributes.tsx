import { useEffect, useState } from "react";
import "./components.css";

interface IAttribute {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    handleAttWeightingChange: (id: string, newWeighting: number) => void,
}

export default function Attribute({ setIsDraggable, handleAttWeightingChange }: IAttribute) {
    const [weighting, setWeighting] = useState("1");

    useEffect(() => {
        handleAttWeightingChange("1", parseFloat(weighting))
    }, [weighting])

    return (
        <div className="attribute-container">
            <div className="content-container">
                <p className="title">Attribute Title Placeholder</p>
                <hr />
                <p>Weighting: {weighting}</p>
                <div className="slide-container" onMouseEnter={() => setIsDraggable((pre) => !pre)} onMouseLeave={() => setIsDraggable((pre) => !pre)}>
                    <input type="range" min="0" max="1" step="0.01" value={weighting} onChange={(e) => setWeighting(e.target.value)} className="slider" />
                </div>
            </div>
        </div>
    )
}