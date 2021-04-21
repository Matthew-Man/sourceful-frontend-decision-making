import { useState } from "react";
import "./components.css";

export default function Attribute() {
    const [weighting, setWeighting] = useState(1);

    // const calculateSetWeighting = (value: number) => { setWeighting(value / 100) }; //Scale for 0-1

    return (
        <div className="attribute-container">
            <div className="content-container">
                <p className="title">Attribute Title Placeholder</p>
                <hr />
                <p>Weighting: {weighting}</p>
                <div className="slide-container" onMouseEnter={() => console.log("Mouse has entered")} onMouseLeave={() => console.log("Mouse has left")}>
                    <input type="range" min="0" max="100" step="1" value={weighting.toString()} className="slider" onChange={(e) => { setWeighting(parseInt(e.target.value)) }} />
                </div>
            </div>
        </div>
    )
}