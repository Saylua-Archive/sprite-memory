import React from 'react';

export default function SpriteImage(props) {
  const angle = props.sprite.visible ? 0 : 90;
  const visible = props.sprite.visible ? ' visible' : '';
  const image = <img
    src={`/img/sprites/${props.sprite.species}/${props.sprite.variant}.png`}
    alt={`${props.sprite.name} the ${props.sprite.variant} ${props.sprite.species}`}
    title={`${props.sprite.name} the ${props.sprite.variant} ${props.sprite.species}`}
    style={{
      transform: `rotate3d(0, 1, 0, ${angle}deg)`,
    }}
    />;

  return (
    <div
      style={{
        width: `${100 / props.sideLength}%`,
      }}
      className={`portrait${visible}`}
      onClick={props.onClick}
    >
      {image}
    </div>
  );
}
