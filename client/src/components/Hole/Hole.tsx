import React from "react";
import "./Hole.css";

export default function Hole() {
    const style = {
        // transform: `translateX(${Math.random() * 800}px)`
        transform: `translateX(100%)`,
    };
    
    return (
        <div className="hole" style={style}>
        </div>
    );
}