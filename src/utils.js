let timeout;
export const debounce =  fn => (...args) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    clearTimeout(timeout);
    fn(...args);
  }, 300);
};