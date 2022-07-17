import { createElement } from './utils/index.js';
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
  const $loseTitle = createElement('div', 'loseTitle');
  if (name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
};

const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
    generateLogs('end', player1, player2);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
    generateLogs('end', player2, player1);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
    generateLogs('draw');
  }
};

export default showResult;
