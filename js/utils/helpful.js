export const createElement = (tag, clasName) => {
  const $tag = document.createElement(tag);
  if (clasName) {
    $tag.classList.add(clasName);
  }

  return $tag;
};

export const getTime = () => {
  const date = new Date();
  const timeFormat = (time) => ('' + time).padStart(2, '0');
  const $time =
    timeFormat(date.getHours()) + ':' + timeFormat(date.getMinutes());
  return $time;
};

export const getRandom = (count) => Math.ceil(Math.random() * count);
