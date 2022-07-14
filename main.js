import { createElement, getRandom } from './js/utils/helpful.js';
import { player1, player2 } from './js/player.js';
import generateLogs from './js/generateLog.js';
import showResult from './js/showResult.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const addPlayer = (obj) => {
  const { name, hp, img, player } = obj;
  const $player = createElement('div', `player${player}`);
  const $progressbar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $name.innerText = name;
  $life.style.width = `${hp}%`;
  $img.src = img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
};

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = () => {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }
  return attack;
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
