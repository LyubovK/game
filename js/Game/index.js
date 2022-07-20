import { createElement, getRandom } from '../utils/index.js';
import {
  createReloadButton,
  $randomButton,
  $arenas,
} from '../constants/domConstants.js';

import Player from '../Player/index.js';
import generateLogs from '../chat/generateLog.js';

const $formFight = document.querySelector('.control');

let player1;
let player2;

class Game {
  getPlayer = async () => {
    const body = await fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/players'
    ).then((res) => res.json());
    console.log(body);
    return body;
  };

  start = () => {
    const players = this.getPlayer();
    console.log(players);
    const p1 = players[getRandom(players.length) - 1];
    const p2 = players[getRandom(players.length) - 1];
    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });
    // player1.createPlayer();
    // player2.createPlayer();
    generateLogs('start');
  };

  // constructor(props) {
  //   this.attack = props.ATTACK;
  //   this.hit = props.HIT;
  // }

  // enemyAttack = () => {
  //   const hit = this.attack[getRandom(3) - 1];
  //   const defence = this.attack[getRandom(3) - 1];

  //   return {
  //     value: getRandom(this.hit[hit]),
  //     hit,
  //     defence,
  //   };
  // };

  // playerAttack = (formElement) => {
  //   const attack = {};
  //   for (let item of formElement) {
  //     if (item.checked && item.name === 'hit') {
  //       attack.value = getRandom(this.hit[item.value]);
  //       attack.hit = item.value;
  //     }

  //     if (item.checked && item.name === 'defence') {
  //       attack.defence = item.value;
  //     }

  //     item.checked = false;
  //   }
  //   return attack;
  // };

  // showResult = () => {
  //   // const player1 = this.player1;
  //   // const player2 = this.player2;

  //   let gameResult;

  //   if (player1.hp === 0 && player1.hp < player2.hp) {
  //     gameResult = `${player2.name} wins`;
  //     generateLogs('end', player2, player1);
  //   } else if (player2.hp === 0 && player2.hp < player1.hp) {
  //     gameResult = `${player1.name} wins`;
  //     generateLogs('end', player1, player2);
  //   } else if (player1.hp === 0 && player2.hp === 0) {
  //     gameResult = 'draw';

  //     generateLogs('draw');
  //   }

  //   const $gameTitle = document.querySelector('.loseTitle');

  //   if ($gameTitle) {
  //     $gameTitle.innerText = gameResult;
  //   } else {
  //     const $newGameTitle = createElement('div', 'loseTitle');
  //     $newGameTitle.innerText = gameResult;
  //     $arenas.appendChild($newGameTitle);
  //   }
  // };

  // start = () => {
  //   this.getPlayer();
  //   console.log(player1);
  //   $formFight.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const playerAttack = this.playerAttack($formFight);
  //     const enemyAttack = this.enemyAttack();

  //     player1.attack(playerAttack, enemyAttack);
  //     player2.attack(enemyAttack, playerAttack);

  //     if (player1.hp === 0 || player2.hp === 0) {
  //       $randomButton.disabled = true;
  //       this.showResult();
  //       createReloadButton();
  //     }
  //   });
  //   player1.createPlayer();
  //   player2.createPlayer();
  //   generateLogs('start');
  // };
}

export default Game;
