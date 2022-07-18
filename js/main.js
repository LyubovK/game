import { PLAYER1, PLAYER2, ATTACK, HIT } from './constants/index.js';

import Game from './Game/index.js';

export const game = new Game({ PLAYER1, PLAYER2, ATTACK, HIT });
game.start();
