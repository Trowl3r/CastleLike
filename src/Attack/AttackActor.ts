import Actor from "../Actors/Actor.js";
import CollisionManager from "../Actors/CollisionManager.js";
import EnemyActor from "../Actors/Enemys/EnemyActor.js";
import gameState from "../GameState.js";
import { castRightActor } from "../helpers/functions.js";
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

    CollisionManager.registerCollisionCallback(
      AttackActor,
      EnemyActor,
      (actorA: Actor, actorB: Actor) => {
        const attack = castRightActor(actorA, actorB, AttackActor);
        const enemy = castRightActor(actorA, actorB, EnemyActor);

        enemy!.takeDamage(attack!.getIdentifier().getDamage());
        gameState.removeActor(this);
      }
    )
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
