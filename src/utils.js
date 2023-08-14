import apis from "./data/apis.json";

export function fillAvailable(features = []) {
  if (typeof window === "undefined") return features;

  return features
    .map((api) => {
      api.available = api.id in window;
      return api;
    })
    .sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
}

export function getAPIRoute() {
  const { pathname } = window.location;
  const api = apis.find((api) => api.link == pathname);
  return api;
}

export async function getGitHubStars() {
  const response = await fetch(
    "https://api.github.com/repos/guilherssousa/experimental-web-apis"
  );
  const data = await response.json();

  return data.stargazers_count;
}

export function isURL(str = "") {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}
