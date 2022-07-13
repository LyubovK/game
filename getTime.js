const getTime = () => {
  const date = new Date();
  const timeFormat = (time) => ('' + time).padStart(2, '0');
  const $time =
    timeFormat(date.getHours()) + ':' + timeFormat(date.getMinutes());
  return $time;
};

export default getTime;
