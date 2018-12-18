import React, { Component } from 'react';
import './App.css';

import { shuffle } from './helpers/utils';
import { randomSprite } from './helpers/spriteHelper';
import Gameboard from './Gameboard';

class App extends Component {
  constructor(props) {
    super(props);
    const spriteList = [];
    const SIDE_LENGTH = 2;
    let sprite = null;
    for (let i = 0; i < (SIDE_LENGTH * SIDE_LENGTH) / 2; i++) {
      sprite = randomSprite();
      sprite.visible = false;
      spriteList.push(sprite);
      const duplicate = Object.assign({}, sprite);
      spriteList.push(duplicate);
    }
    this.state = {
      spriteList: shuffle(spriteList),
      matched: 0,
      candidate: -1,
      sideLength: SIDE_LENGTH,
    }
    this.showSprite = this.showSprite.bind(this);
    this.hideSprite = this.hideSprite.bind(this);
    this.trySprite = this.trySprite.bind(this);
    this.nextSideLength = this.nextSideLength.bind(this);
  }

  showSprite(index) {
    const newSpriteList = this.state.spriteList;
    const newSprite = newSpriteList[index];
    newSprite.visible = true;
    newSpriteList[index] = newSprite;
    this.setState({
      spriteList: newSpriteList,
    });
  }

  hideSprite(index) {
    const newSpriteList = this.state.spriteList;
    const newSprite = newSpriteList[index];
    newSprite.visible = false;
    newSpriteList[index] = newSprite;
    this.setState({
      spriteList: newSpriteList,
    });
  }

  nextSideLength(length) {
    const next = length + 1;
    if ((next * next) % 2 !== 0) {
      return this.nextSideLength(next);
    } else {
      return next;
    }
  }

  trySprite(index) {
    this.showSprite(index);
    const list = this.state.spriteList;
    const candidate = this.state.candidate;
    if (candidate === -1) {
      this.setState({candidate: index});
    } else if (list[candidate].species === list[index].species &&
      list[candidate].variant === list[index].variant && index !== candidate) {
        this.setState({
          matched: this.state.matched + 2,
          candidate: -1,
        });
      if(this.state.matched >= (this.state.sideLength * this.state.sideLength) - 2) {
        setTimeout(() => {
          alert('Level Clear!');
          const nextSide = this.nextSideLength(this.state.sideLength);
          let sprite = null;
          let nextSpriteList = [];
          for (let i = 0; i < (nextSide * nextSide) / 2; i++) {
            sprite = randomSprite();
            sprite.visible = false;
            nextSpriteList.push(sprite);
            const duplicate = Object.assign({}, sprite);
            nextSpriteList.push(duplicate);
          }
          this.setState({
            spriteList: shuffle(nextSpriteList),
            matched: 0,
            candidate: -1,
            sideLength: nextSide,
          });
        }, 200);
      }
    } else {
      this.setState({candidate: -1});
      setTimeout(() => {
      this.hideSprite(index);
      this.hideSprite(candidate);
      }, 200);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Sprite Memory</h1>
        <Gameboard
          spriteList={this.state.spriteList}
          sideLength={this.state.sideLength}
          showSprite={this.showSprite}
          hideSprite={this.hideSprite}
          onClick={this.trySprite}
        />
      </div>
    );
  }
}

export default App;
