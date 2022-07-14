import { createElement } from './utils/helpful.js';
import generateLogs from './generateLog.js';
import { player1, player2 } from './player.js';

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.buttonWrap .button');

const createReloadButton = () => {
  const $boxButton = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', () => window.location.reload());

  $boxButton.appendChild($reloadButton);
  $arenas.appendChild($boxButton);
};

const playerWin = (name) => {
  const $loseTitle = document.createElement('div');
  $loseTitle.classList.add('loseTitle');
  if (name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
};

const showResult = () => {
  const { hp: playerOneHp, name: playerOneName } = player1;
  const { hp: playerTwoHp, name: playerTwoName } = player2;

  if (playerOneHp === 0 || playerTwoHp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (playerOneHp === 0 && playerOneHp < playerTwoHp) {
    $arenas.appendChild(playerWin(playerTwoName));
    generateLogs('end', player1, player2);
  } else if (playerTwoHp === 0 && playerTwoHp < playerOneHp) {
    $arenas.appendChild(playerWin(playerOneName));
    generateLogs('end', player2, player1);
  } else if (playerOneHp === 0 && playerTwoHp === 0) {
    $arenas.appendChild(playerWin());
    generateLogs('draw');
  }
};

export default showResult;
