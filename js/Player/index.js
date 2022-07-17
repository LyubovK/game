import { createElement } from '../utils/index.js';

class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.player = props.player;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector;
  }

  changeHP = (randomCount) => {
    if (randomCount) this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  };

  elHP = () => {
    return document.querySelector(`.${this.selector} .life`);
  };

  renderHP = () => {
    console.log(this.elHP());
    console.log(this.selector);
    return (this.elHP().style.width = `${this.hp}%`);
  };

  createPlayer = () => {
    const $player = createElement('div', this.selector);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $name.innerText = this.name;
    $life.style.width = `${this.hp}%`;
    $img.src = this.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    const $root = document.querySelector(this.rootSelector);
    $root.appendChild($player);

    return $player;
  };
}

export default Player;
