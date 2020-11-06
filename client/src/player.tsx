import React from "react";
import rock from "./img/rock.png";
import paper from "./img/paper.png";
import scissors from "./img/scissors.png";

type PlayerProps = {weapon: string}

function Player (props: PlayerProps) {

    const { weapon } = props;

    return (
      <div className="player">
      <img
        className="player-image"
        src={
          weapon === "rock" ? rock : weapon === "paper" ? paper : scissors        
        }
        alt="Rock Paper Scissors"
      />
      </div>
    );
}

export default Player;                                                                                                                                                                              