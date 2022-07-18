import { createElement } from '../utils/index.js';

export const $arenas = document.querySelector('.arenas');
export const $randomButton = document.querySelector('.buttonWrap .button');
export const $formFight = document.querySelector('.control');

export const createReloadButton = () => {
  const $boxButton = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', () => window.location.reload());

  $boxButton.appendChild($reloadButton);
  $arenas.appendChild($boxButton);
};
