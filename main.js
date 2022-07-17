import { player1, player2 } from './js/player.js';

import generateLogs from './js/generateLog.js';
import showResult from './js/showResult.js';
import Game from './js/Game/index.js';

const $formFight = document.querySelector('.control');

const game = new Game();

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const {
    value: enemuValue,
    hit: enemyHit,
    defence: enemyDefence,
  } = game.enemyAttack();
  const {
    value: playerValue,
    hit: playerHit,
    defence: playerDefence,
  } = game.playerAttack();

  if (playerDefence !== enemyHit) {
    player1.changeHP(enemuValue);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemuValue);
  } else {
    generateLogs('defence', player1, player2);
  }
  if (enemyDefence !== playerHit) {
    player2.changeHP(playerValue);
    player2.renderHP();
    generateLogs('hit', player1, player2, playerValue);
  } else {
    generateLogs('defence', player2, player1);
  }

  showResult();
});

const init = () => {
  player1.createPlayer();
  player2.createPlayer();
  generateLogs('start');
};

init();
