import generateLogs from './generateLog.js';
import createElement from './createElement.js';
import showResult from './showResult.js';
import { enemyAttack, playerAttack } from './playersAttacks.js';
import { player1, player2 } from './player.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const addPlayer = (obj) => {
  const $player = createElement('div', 'player' + obj.player);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $name.innerText = obj.name;
  $life.style.width = obj.hp + '%';
  $img.src = obj.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
};

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value);
  } else {
    generateLogs('defence', player1, player2);
  }
  if (player.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2, player.value);
  } else {
    generateLogs('defence', player2, player1);
  }

  showResult();
});

generateLogs('start');

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));
