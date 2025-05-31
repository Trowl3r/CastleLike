import XpPoints from "./XpPoints.js";

export default class BaseXpPoints extends XpPoints {
  constructor(x: number, y: number) {
    super("base-xp", x, y, 20, 20, 10);
  }
}
