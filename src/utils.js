export function checkAvailable(features = []) {
  return features.reduce((object, value) => {
    object[value] = value in window;
    return object;
  }, {});
}
