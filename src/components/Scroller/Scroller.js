import React from "react";
import "./Scroller.css";
import "./Player.css";
import Wall from "../Wall/Wall.js";
import Player from "../Player/Player.js";

export default function Game() {
    return (
        <div className="scroller">
            <Player />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
            <Wall />
        </div>
    );
}