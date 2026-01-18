// scrollIntoViewIfNeeded
const isSupported = "scrollIntoViewIfNeeded" in Element.prototype;
if (!isSupported) {
  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded = true) {
    const el = this;
    new IntersectionObserver(function ([entry]) {
      const ratio = entry.intersectionRatio;
      if (ratio < 1) {
        let place = ratio <= 0 && centerIfNeeded ? "center" : "nearest";
        el.scrollIntoView({
          block: place,
          inline: place,
        });
      }
      this.disconnect();
    }).observe(this);
  };
}
// hasown API
"hasOwn" in Object || (Object.hasOwn = Object.call.bind(Object.hasOwnProperty));

// Array.prototype.at() and String.prototype.at() polyfill
if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    const len = this.length;
    const relativeIndex = index >= 0 ? index : len + index;
    if (relativeIndex < 0 || relativeIndex >= len) {
      return undefined;
    }
    return this[relativeIndex];
  };
}

if (!String.prototype.at) {
  String.prototype.at = function (index) {
    const len = this.length;
    const relativeIndex = index >= 0 ? index : len + index;
    if (relativeIndex < 0 || relativeIndex >= len) {
      return undefined;
    }
    return this[relativeIndex];
  };
}
