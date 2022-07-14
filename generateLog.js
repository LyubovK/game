import getTime from './getTime.js';
import getRandom from './getRandom.js';
import { player1, player2 } from './player.js';
import { logs } from './textLog.js';

const $chat = document.querySelector('.chat');

const getTexLog = (type, pl1, pl2) => {
  switch (type) {
    case 'start':
      return logs[type]
        .replace('[time]', getTime())
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
    case 'hit':
    case 'defence':
      return logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', pl1)
        .replace('[playerDefence]', pl2);
    case 'end':
      return logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerWins]', pl1)
        .replace('[playerLose]', pl2);
    case 'draw':
      return logs[type];
  }
};

const generateLogs = (type, player1 = {}, player2 = {}, valueAttack) => {
  let text = getTexLog(type, player1.name, player2.name);
  switch (type) {
    case 'start':
      text = `${text}`;
      break;
    case 'hit':
      if (valueAttack) {
        text = `${getTime()} ${text} <br> ${player2.name} - ${valueAttack} - [${
          player2.hp
        }/100]`;
      }
      break;
    case 'defence':
    case 'end':
    case 'draw':
      text = `${getTime()} ${text}`;
      break;
  }
  $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
};

export default generateLogs;
