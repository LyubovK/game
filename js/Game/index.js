import { createElement, getRandom } from '../utils/index.js';
import {
  createReloadButton,
  $randomButton,
  $arenas,
} from '../constants/domConstants.js';

import Player from '../Player/index.js';
import generateLogs from '../chat/generateLog.js';

const $formFight = document.querySelector('.control');

class Game {
  constructor(props) {
    this.player1 = new Player(props.PLAYER1);
    this.player2 = new Player(props.PLAYER2);
    this.attack = props.ATTACK;
    this.hit = props.HIT;
  }

  enemyAttack = () => {
    const hit = this.attack[getRandom(3) - 1];
    const defence = this.attack[getRandom(3) - 1];

    return {
      value: getRandom(this.hit[hit]),
      hit,
      defence,
    };
  };

  playerAttack = (formElement) => {
    const attack = {};
    for (let item of formElement) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(this.hit[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }

      item.checked = false;
    }
    return attack;
  };

  showResult = () => {
    const player1 = this.player1;
    const player2 = this.player2;

    let gameResult;

    if (player1.hp === 0 && player1.hp < player2.hp) {
      gameResult = `${player2.name} wins`;
      generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      gameResult = `${player1.name} wins`;
      generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      gameResult = 'draw';

      generateLogs('draw');
    }

    const $gameTitle = document.querySelector('.loseTitle');

    if ($gameTitle) {
      $gameTitle.innerText = gameResult;
    } else {
      const $newGameTitle = createElement('div', 'loseTitle');
      $newGameTitle.innerText = gameResult;
      $arenas.appendChild($newGameTitle);
    }
  };

  start = () => {
    $formFight.addEventListener('submit', (e) => {
      e.preventDefault();
      const playerAttack = this.playerAttack($formFight);
      const enemyAttack = this.enemyAttack();

      this.player1.attack(playerAttack, enemyAttack);
      this.player2.attack(enemyAttack, playerAttack);

      if (this.player1.hp === 0 || this.player2.hp === 0) {
        $randomButton.disabled = true;
        this.showResult();
        createReloadButton();
      }
    });
    this.player1.createPlayer();
    this.player2.createPlayer();
    generateLogs('start');
  };
}
export default Game;
