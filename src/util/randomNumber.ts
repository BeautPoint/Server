export const RandomNumber = () => {
  return Math.floor(Math.random() * Date.now()).toString(10);
};
