import React from "react";
import rock from "../../img/rock.svg";
import paper from "../../img/paper.svg";
import scissors from "../../img/scissors.svg";

import './Player.css';

type PlayerProps = {
  weapon: string;
}

function Player (props: PlayerProps) {
    const { weapon } = props;

    function renderImage () {
      if (weapon === 'rock') {
        return rock;
      } else if (weapon === 'paper') {
        return paper;
      } else {
        return scissors;
      }
    }

    return (
      <div className="Player">
      <img
        src={renderImage()}
        alt="Rock Paper Scissors"
      />
      </div>
    );
}

export default Player;
