import Actor from "../Actor";

export default class EnemyActor extends Actor {
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
