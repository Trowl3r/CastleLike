import Actor from "../Actors/Actor.js";

export default class Attack extends Actor {

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(src, x, y, width, height);
  }


}