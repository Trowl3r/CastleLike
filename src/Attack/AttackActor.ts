import Actor from "../Actors/Actor.js";
import gameState from "../GameState.js";
import Attack from "./Attack.js";

export default class AttackActor extends Actor {
  private speed: number;
  private identifier: Attack;

  constructor(
    identifier: Attack,
    src: string,
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number
  ) {
    super(src, x, y, width, height);

    this.identifier = identifier;
    this.speed = speed;
  }

  getIdentifier() {
    return this.identifier;
  }

  // TODO: Maybe let this really just be a dummy class
  update(cameraX: number, cameraY: number): void {
    this.x += this.speed;
    this.draw(cameraX, cameraY);
  }
}
