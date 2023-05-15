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
          inline: place
        });
      }
      this.disconnect();
    }).observe(this);
  };
}
