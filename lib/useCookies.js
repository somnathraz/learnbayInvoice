import jsCookie from "js-cookie";
const CARD = "CARD";
export function getCookie(key) {
  let result = [];
  if (key) {
    const localData = jsCookie.get(key);
    if (localData && localData.length > 0) {
      result = JSON.parse(localData);
    }
  }

  return result;
}

export function setCookie(key, value) {
  jsCookie.set(key, JSON.stringify(value), {
    expires: 1,
  });
}
export function clearCookie() {
  jsCookie.remove(CARD);
}
