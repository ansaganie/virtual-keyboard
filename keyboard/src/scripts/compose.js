export default (array) => (...args) => {
  array.forEach((func) => {
    func(...args);
  });
};
