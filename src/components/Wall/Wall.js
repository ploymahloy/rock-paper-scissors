import React from "react";
import Hole from "../Hole/Hole.js";
import "./Wall.css";

export default function Wall(props) {
    return (
        <div className="wall">
            <Hole />
        </div>
    );
}