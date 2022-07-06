const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".buttonWrap .button");
const $formFight = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const player1 = {
  name: "Kitana",
  player: 1,
  hp: 100,
  changeHP(randomCount) {
    this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["first", "two", "three"],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};

const player2 = {
  name: "Scorpion",
  player: 2,
  hp: 100,
  changeHP(randomCount) {
    this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["first", "two", "three"],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};
const createElement = (tag, clasName) => {
  const $tag = document.createElement(tag);
  if (clasName) {
    $tag.classList.add(clasName);
  }

  return $tag;
};

const createReloadButton = () => {
  const $boxButton = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "Restart";

  $reloadButton.addEventListener("click", () => window.location.reload());

  $boxButton.appendChild($reloadButton);
  $arenas.appendChild($boxButton);
};

const addPlayer = (obj) => {
  const $player = createElement("div", "player" + obj.player);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $character = createElement("div", "character");
  const $img = createElement("img");

  $name.innerText = obj.name;
  $life.style.width = obj.hp + "%";
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
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  return (this.elHP().style.width = this.hp + "%");
}
const playerWin = (name) => {
  const $loseTitle = document.createElement("div");
  $loseTitle.classList.add("loseTitle");
  if (name) {
    $loseTitle.innerText = name + " wins";
  } else {
    $loseTitle.innerText = "draw";
  }

  return $loseTitle;
};

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));

enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const checkAttack = (attack, defence, player) => {
  if (attack.hit === defence.defence) {
    player.changeHP(0);
  } else {
    player.changeHP(attack.value);
  }
};

$formFight.addEventListener("submit", (e) => {
  e.preventDefault();
  const attack = {};
  const enemy = enemyAttack();

  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  checkAttack(attack, enemy, player2);
  checkAttack(enemy, attack, player1);
  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWin(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWin(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWin());
  }

  console.log("attack", attack);
  console.log("attack hp", player1.hp);
  console.log("enemy", enemy);
  console.log("enemy hp", player2.hp);
});
