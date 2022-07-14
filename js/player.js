export const player1 = {
  name: 'Kitana',
  player: 1,
  hp: 100,
  changeHP,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['first', 'two', 'three'],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};

export const player2 = {
  name: 'Scorpion',
  player: 2,
  hp: 100,
  changeHP,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['first', 'two', 'three'],
  attack() {
    console.log(`${this.name} fight`);
  },
  renderHP,
  elHP,
};

function changeHP(randomCount) {
  if (randomCount) this.hp -= randomCount;
  if (this.hp <= 0) this.hp = 0;

  return this.hp;
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  return (this.elHP().style.width = `${this.hp}%`);
}
