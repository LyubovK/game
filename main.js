const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
  name: "Liuba",
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
  name: "Dima",
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

$randomButton.addEventListener("click", () => {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
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
});

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));
