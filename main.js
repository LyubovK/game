const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const player1 = {
  name: "Liuba",
  player: 1,
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["first", "two", "three"],
  attack() {
    console.log(`${this.name} fight`);
  },
};

const player2 = {
  name: "Dima",
  player: 2,
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["first", "two", "three"],
  attack() {
    console.log(`${this.name} fight`);
  },
};

const createPlayer = (tag, clasName) => {
  const newElement = document.createElement(tag);
  newElement.classList.add(clasName);

  return newElement;
};

const addPlayer = (obj) => {
  const $player = createPlayer("div", "player" + obj.player);
  const $progressbar = createPlayer("div", "progressbar");
  const $life = createPlayer("div", "life");
  const $name = createPlayer("div", "name");
  const $character = createPlayer("div", "character");
  const $img = createPlayer("img", "img");

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

const changeHP = (player) => {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  const randomCount = Math.ceil(Math.random() * 20);
  player.hp -= randomCount;
  $playerLife.style.width = player.hp + "%";

  if (player.hp < 0) {
    $playerLife.style.width = 0;
    $randomButton.disabled = true;
    if (player.name === "player1") {
      $arenas.appendChild(playerWin(player2.name));
    } else {
      $arenas.appendChild(playerWin(player2.name));
    }
  }
};

const playerWin = (name) => {
  const $loseTitle = document.createElement("div");
  $loseTitle.classList.add("loseTitle");
  $loseTitle.innerText = name + " win";

  return $loseTitle;
};

$randomButton.addEventListener("click", () => {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));
