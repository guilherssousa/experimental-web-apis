export function fillAvailable(features = []) {
  return features
    .map((api) => {
      api.available = api.id in window;
      return api;
    })
    .sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
}
