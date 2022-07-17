import generateLogs from '../generateLog.js';
import Player from '../Player/index.js';

import { getRandom } from '../utils/index.js';
import { HIT, ATTACK, LOGS } from '../constants/index.js';

const $formFight = document.querySelector('.control');

class Game {
  enemyAttack = () => {
    this.hit = ATTACK[getRandom(3) - 1];
    this.defence = ATTACK[getRandom(3) - 1];
    this.value = getRandom(HIT[this.hit]);

    return {
      value: this.value,
      hit: this.hit,
      defence: this.defence,
    };
  };

  playerAttack = () => {
    for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
        this.value = getRandom(HIT[item.value]);
        this.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        this.defence = item.value;
      }

      item.checked = false;
    }
    return {
      value: this.value,
      hit: this.hit,
      defence: this.defence,
    };
  };
}
export default Game;
