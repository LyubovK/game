export function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
  return (this.elHP().style.width = this.hp + '%');
}
