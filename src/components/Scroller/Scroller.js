import React from "react";
import "./Scroller.css";
import Wall from "../Wall/Wall.js";

export default function Game() {
    return (
        <div className="scroller">
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
        </div>
    );
}