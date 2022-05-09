export default (str) => {
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', str.trim());

  return element.firstChild;
};
