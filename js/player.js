import Player from './Player/index.js';

export const player1 = new Player({
  name: 'Kitana',
  player: 1,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  rootSelector: '.arenas',
});

export const player2 = new Player({
  name: 'Scorpion',
  player: 2,
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  rootSelector: '.arenas',
});
