function getViewportHeight () {
  if (typeof window !== "undefined" && window.document) {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  } else {
    return 0;
  }
}

function getViewportWidth () {
  if (typeof window !== "undefined" && window.document) {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  } else {
    return 0;
  }
}

const utils = {
    getViewportHeight,
    getViewportWidth,
};

export default utils;
