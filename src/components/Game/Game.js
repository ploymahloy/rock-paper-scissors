import React, { useEffect, useState } from "react";

import Wall from "../Wall/Wall.js";

import useViewportDimensions from '../../hooks/useViewportDimensions';

import "./Game.css";

export default function Game(props) {
    
    const [ walls, setWalls ] = useState([]);
    const [ viewportWidth, setViewportWidth ]   = useState(0);
    const [ viewportHeight, setViewportHeight ] = useState(0);
    const [ playerX, setPlayerX ] = useState(0);
    const [ playerY, setPlayerY ] = useState(0);

    const { width, height } = useViewportDimensions();

    const viewportWidthUnit  = viewportWidth  / 10;
    const viewportHeightUnit = viewportHeight / 10;

    const gameMaxWidth  = viewportWidthUnit  * 8;
    const gameMaxHeight = viewportHeightUnit * 8;

    const playerDimension = (viewportWidth < viewportHeight) ? viewportWidthUnit : viewportHeightUnit;
    const playerWidth  = playerDimension; 
    const playerHeight = playerDimension;

    // generate walls
    useEffect(() => {
        const walls = [];

        for (let i = 0; i < 10; i++) {
            walls.push(<Wall key={`wall-${i}`}/>);
        }

        setWalls(walls);
    }, []); 

    // update relative units on resize
    useEffect(() => {
        setViewportWidth(width);
        setViewportHeight(height);
    }, [width, height]);

    // add document listeners
    useEffect(() => {
        function handleKeyup (event) {
            if (event.keyCode === 37) { // left
                if (playerX > viewportWidthUnit) {
                    setPlayerX(playerX - viewportWidthUnit);
                } else {
                    setPlayerX(0);
                }
            } else if (event.keyCode === 39) { // right
                if (playerX < gameMaxWidth - playerWidth) {
                    setPlayerX(playerX + viewportWidthUnit);
                } else {
                    setPlayerX(gameMaxWidth - playerWidth);
                }
            } else if (event.keyCode === 38) { // up
                if (playerY > viewportHeightUnit) {
                    setPlayerY(playerY - viewportHeightUnit);
                } else {
                    setPlayerY(0);
                }
            } else if (event.keyCode === 40) { // down
                if (playerY < gameMaxHeight - playerHeight) {
                    setPlayerY(playerY + viewportHeightUnit);
                } else {
                    setPlayerY(gameMaxHeight - playerHeight);
                }
            }

            event.preventDefault();
            event.stopPropagation();
        } 

        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keyup', handleKeyup);
        }
    });

    return (
        <div
            className="game"
            style={{
                width: gameMaxWidth,
                height: gameMaxHeight,
            }}
        >
            <div
                className="player"
                style={{
                    top: `${playerY}px`,
                    left: `${playerX}px`,
                    height: `${playerHeight}px`,
                    width: `${playerWidth}px`,
                }}
            />

            {walls}
        </div>
    );
}
