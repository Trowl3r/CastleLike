import Actor from "../Actors/Actor.js";
import gameState from "../GameState.js";

export default class AttackActor extends Actor {
  private speed: number;

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number
  ) {
    super(src, x, y, width, height);

    this.speed = speed;
  }

  // TODO: Maybe let this really just be a dummy class
  update(cameraX: number, cameraY: number): void {
    this.x += this.speed;
    this.draw(cameraX, cameraY);
  }
}
