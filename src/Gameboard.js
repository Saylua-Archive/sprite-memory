import React from 'react';

import SpriteImage from './SpriteImage';

export default function Gameboard(props) {
  const images = props.spriteList.map((sprite, i) => <SpriteImage
      key={i}
      sprite={sprite}
      sideLength={props.sideLength}
      onClick={sprite.visible ? null : () => props.onClick(i)}
    />);
  return(
    <div className="game-board">
      {images}
    </div>
  );
}
