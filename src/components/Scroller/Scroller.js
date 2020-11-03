import React, { useEffect, useState } from "react";
import "./Scroller.css";
import Wall from "../Wall/Wall.js";

export default function Game() {
    const [ array, setArray ] = useState([
        <Wall />,
        <Wall />,
    ])
    useEffect(() => {
        const timer = setTimeout(() => {
            setArray([...array, <Wall />]);
            console.log(array);
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [array]);
    return (
        <div className="scroller">
            {array}
        </div>
    );
}