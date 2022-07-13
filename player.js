import { renderHP, elHP } from './generateHP.js';

export const player1 = {
  name: 'Kitana',
  player: 1,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['first', 'two', 'three'],
  renderHP,
  elHP,
  changeHP(randomCount) {
    if (randomCount) this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
};

export const player2 = {
  name: 'Scorpion',
  player: 2,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['first', 'two', 'three'],
  renderHP,
  elHP,
  changeHP(randomCount) {
    if (randomCount) this.hp -= randomCount;
    if (this.hp <= 0) this.hp = 0;

    return this.hp;
  },
};
