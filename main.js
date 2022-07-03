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

const createElement = (tag, clasName) => {
  const $tag = document.createElement(tag);
  $tag.classList.add(clasName);

  return $tag;
};

const addPlayer = (obj) => {
  const $player = createElement("div", "player" + obj.player);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $character = createElement("div", "character");
  const $img = createElement("img", "img");

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
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  const randomCount = Math.ceil(Math.random() * 20);
  player.hp -= randomCount;
  $playerLife.style.width = player.hp + "%";

  if (player.hp < 0) {
    player.hp = 0;
    $playerLife.style.width = 0;
    // $arenas.appendChild(playerWin(player.name));
    if (player.name == "Liuba") {
      $arenas.appendChild(playerWin("Dima"));
    } else {
      $arenas.appendChild(playerWin("Liuba"));
    }
  }
};

const playerWin = (name) => {
  if (player1.hp > player2.hp) {
  }
  const $loseTitle = document.createElement("div");
  $loseTitle.classList.add("loseTitle");
  $loseTitle.innerText = name + " win";
  $randomButton.disabled = true;
  return $loseTitle;
};

$randomButton.addEventListener("click", () => {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(addPlayer(player1));
$arenas.appendChild(addPlayer(player2));
