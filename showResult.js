import createElement from './createElement.js';
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
  const { hp: hpPlayer1, name: namePlayer1 } = player1;
  const { hp: hpPlayer2, name: namePlayer2 } = player2;

  if (hpPlayer1 === 0 || hpPlayer2 === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (hpPlayer1 === 0 && hpPlayer1 < hpPlayer2) {
    $arenas.appendChild(playerWin(namePlayer2));
    generateLogs('end', player1, player2);
  } else if (hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
    $arenas.appendChild(playerWin(namePlayer1));
    generateLogs('end', player2, player1);
  } else if (hpPlayer1 === 0 && hpPlayer2 === 0) {
    $arenas.appendChild(playerWin());
    generateLogs('draw');
  }
};

export default showResult;
