export const RandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};
