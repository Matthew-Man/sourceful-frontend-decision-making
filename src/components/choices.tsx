import { useState } from "react";
import "./components.css";

interface IChoice {
    setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Choice({ setIsDraggable }: IChoice) {
    const [attribute, setAttribute] = useState("1")

    function slider() {
        return (
            <div>
                <p>Attribute placeholder: {attribute}</p>
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
            {slider()}
        </div>
    )
}