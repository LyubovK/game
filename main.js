const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.buttonWrap .button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  name: 'Kitana',
  player: 1,
  hp: 100,
  changeHP(randomCount) {
    if (randomCount) this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['first', 'two', 'three'],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};

const player2 = {
  name: 'Scorpion',
  player: 2,
  hp: 100,
  changeHP(randomCount) {
    if (randomCount) this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['first', 'two', 'three'],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

const createElement = (tag, clasName) => {
  const $tag = document.createElement(tag);
  if (clasName) {
    $tag.classList.add(clasName);
  }

  return $tag;
};

const createReloadButton = () => {
  const $boxButton = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', () => window.location.reload());

  $boxButton.appendChild($reloadButton);
  $arenas.appendChild($boxButton);
};

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

const getRandom = (count) => Math.ceil(Math.random() * count);

function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
  return (this.elHP().style.width = this.hp + '%');
}
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

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));

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

const getTime = () => {
  const data = new Date();
  const timeFormat = (time) => ('' + time).padStart(2, '0');
  const $time =
    timeFormat(data.getHours()) + ':' + timeFormat(data.getMinutes());
  return $time;
};

const getTexLog = (type, pl1, pl2) => {
  let text = '';
  let time = getTime();
  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[time]', time)
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
      break;
    case 'hit':
    case 'defence':
      text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', pl1)
        .replace('[playerDefence]', pl2);
      break;
    case 'end':
      text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerWins]', pl1)
        .replace('[playerLose]', pl2);
      break;
    case 'draw':
      text = logs[type];
      break;
  }

  return text;
};

const generateLogs = (type, pl1, pl2, hp) => {
  let el = '';
  let text = getTexLog(type, pl1, pl2);
  let time = getTime();
  switch (type) {
    case 'start':
      el = `<p>${text}</p>`;
      break;
    case 'hit':
      el = `<p>${time} ${text} <br> ${pl2} - ${hp} - ${100 - hp}/100</p>`;
      break;
    case 'defence':
    case 'end':
    case 'draw':
      el = `<p>${time} ${text}</p>`;
      break;
  }

  $chat.insertAdjacentHTML('afterbegin', el);
};

generateLogs('start');

const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
    generateLogs('end', player1.name, player2.name);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
    generateLogs('end', player2.name, player1.name);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
    generateLogs('draw');
  }
};

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2.name, player1.name, enemy.value);
  } else {
    generateLogs('defence', player1.name, player2.name);
  }
  if (player.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1.name, player2.name, player.value);
  } else {
    generateLogs('defence', player2.name, player1.name);
  }

  showResult();
});
