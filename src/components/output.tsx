import { useContext } from "react";
import { ContextWinner } from "../App";
import "./components.css";

export default function Output() {
    const winner = useContext(ContextWinner)
    return (
        <div>
            <h3>Winner</h3>
            <p className="scoring">{winner}</p>
        </div>
    )
}