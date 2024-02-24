const RandomNumber = () => {
  return Math.floor(Math.random() * Date.now()).toString(10);
};

const RandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};

const generateCustomId = () => {
  return RandomNumber() + RandomString();
};

const customPlaceId = (likeData: any) => {
  const { place_id } = likeData;
  return 'bp_' + place_id;
};

export { RandomNumber, RandomString, generateCustomId, customPlaceId };
