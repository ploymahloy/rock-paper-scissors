import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
import Scroller from "../Scroller/Scroller.js";
import Player from "../Player/Player.js";
import "./Game.css";
// import "./Player.css";

export default function Game() {
    useEffect(() => {
        document.addEventListener("keydown", keyClick);
    }, [])
    function keyClick(e) {
        console.log('click');
        e.preventDefault();
    }
    return (
        <div className="game">
            <Scroller />
            <Player />
        </div>
    );
}