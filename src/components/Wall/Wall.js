import React, { Component } from "react";
import Hole from "../Hole/Hole.js";
import "./Wall.css";

export default function Wall() {
    return (
        <div className="wall">
            <Hole />
        </div>
    );
}