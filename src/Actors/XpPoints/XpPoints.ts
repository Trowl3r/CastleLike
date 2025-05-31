import GameState from "../../GameState.js";
import { castRightActor } from "../../helpers/functions.js";
import Actor from "../Actor.js";
import collisionManager from "../CollisionManager.js";
import PlayerActor from "../Players/PlayerActor.js";

export default class XpPoints extends Actor {
  private points: number;

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number,
    points: number
  ) {
    super(src, x, y, width, height);

    this.points = points;
    this.registerXPPointCollision();
  }

  getPoints() {
    return this.points;
  }

  // TODO: Think about adding the function itself into the constructor
  private registerXPPointCollision() {
    collisionManager.registerCollisionCallback(
      XpPoints,
      PlayerActor,
      (actorA: Actor, actorB: Actor) => {
        const playerActor = castRightActor(actorA, actorB, PlayerActor);
        const xpPoints = castRightActor(actorA, actorB, XpPoints);

        GameState.removeActor(xpPoints!);
        playerActor!.addXpPoints(xpPoints!.getPoints());
      }
    );
  }
}
