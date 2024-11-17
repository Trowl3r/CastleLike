import Attack from "./Attack.js";
import AttackActor from "./AttackActor.js";
import gameState from "../GameState.js";
import collisionManager from "../Actors/CollisionManager.js";
import EnemyActor from "../Actors/Enemys/EnemyActor.js";
import Actor from "../Actors/Actor.js";
import { castRightActor } from "../helpers/functions.js";

export default class Fireball extends Attack {
  constructor() {
    super("Fireball", "fire", 10, 1000);
  }

  createAttackActor(): AttackActor {
    return new FireballActor(this, this.getImageSrc());
  }

  getActorClass(): new (...args: any[]) => FireballActor {
    return FireballActor;
  }
}

class FireballActor extends AttackActor {
  constructor(identifier: Attack, src: string) {
    super(
      identifier,
      src,
      gameState.getPlayer().getX(),
      gameState.getPlayer().getY(),
      30,
      30,
      10
    );

    this.registerEnemyCollision();
  }

  private registerEnemyCollision() {
    collisionManager.registerCollisionCallback(
      FireballActor,
      EnemyActor,
      (actorA: Actor, actorB: Actor) => {
        const fireball = castRightActor(actorA, actorB, FireballActor);
        const enemy = castRightActor(actorA, actorB, EnemyActor);

        enemy!.takeDamage(fireball!.getIdentifier().getDamage());
        gameState.removeActor(this);
      }
    );
  }
}
