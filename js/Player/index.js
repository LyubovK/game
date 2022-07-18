import { createElement } from '../utils/index.js';
import generateLogs from '../chat/generateLog.js';
import { PLAYER1, PLAYER2 } from '../constants/index.js';
import { game } from '../main.js';

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

  elHP = () => document.querySelector(`.${this.selector} .life`);

  renderHP = () => (this.elHP().style.width = `${this.hp}%`);

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

  attack = ({ value, hit }, { defence }) => {
    const player = this.player === 1 ? game.player1 : game.player2;
    const enemy = this.player === 1 ? game.player2 : game.player1;

    if (defence !== hit) {
      this.changeHP(value);
      this.renderHP();
      generateLogs('hit', player, enemy, value);
    } else {
      generateLogs('defence', player, enemy);
    }
  };
}

export default Player;
