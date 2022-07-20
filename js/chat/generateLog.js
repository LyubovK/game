import { getTime, getRandom } from '../utils/index.js';
import { PLAYER1, PLAYER2 } from '../constants/index.js';
import { LOGS } from '../constants/index.js';

const $chat = document.querySelector('.chat');

const getTexLog = (type, pl1, pl2) => {
  switch (type) {
    case 'start':
      return LOGS[type]
        .replace('[time]', getTime())
        .replace('[player1]', PLAYER1.name)
        .replace('[player2]', PLAYER2.name);
    case 'hit':
    case 'defence':
      return LOGS[type][getRandom(LOGS[type].length) - 1]
        .replace('[playerKick]', pl1)
        .replace('[playerDefence]', pl2);
    case 'end':
      return LOGS[type][getRandom(LOGS[type].length) - 1]
        .replace('[playerWins]', pl1)
        .replace('[playerLose]', pl2);
    case 'draw':
      return LOGS[type];
  }
};

const generateLogs = (
  type,
  { name: playerOneName } = {},
  { name: playerTwoName, hp: playerTwoHp } = {},
  valueAttack
) => {
  let text = getTexLog(type, playerOneName, playerTwoName);
  switch (type) {
    case 'start':
      text = `${text}`;
      break;
    case 'hit':
      if (valueAttack) {
        text = `${getTime()} ${text} <br> ${playerTwoName} - ${valueAttack} - [${playerTwoHp}/100]`;
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
