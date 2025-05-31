import { ActorClass } from "../helpers/types.js";
import Actor from "./Actor.js";

type CollisionCallback = (actorA: Actor, actorB: Actor) => void;

export class CollisionManager {
  private collisionCallbacks: Map<string, CollisionCallback>;

  constructor() {
    this.collisionCallbacks = new Map();
  }

  // Registers a collision, by generating the key, and setting the callback into the map
  registerCollisionCallback<T extends Actor, U extends Actor>(
    classA: ActorClass<T>,
    classB: ActorClass<U>,
    callback: CollisionCallback
  ) {
    const key = this.getCollisionKey(classA, classB);
    this.collisionCallbacks.set(key, callback);
  }

  // Gets the collision key identifier: classA:classB
  private getCollisionKey<T extends Actor, U extends Actor>(
    classA: ActorClass<T>,
    classB: ActorClass<U>
  ) {
    return [classA.name, classB.name].sort().join(":");
  }

  // Gets the actors of the array, and runs through them
  // if they collide they get the callback of the collision map and exeute the callback
  checkCollisions(actors: Set<Actor>) {
    const actorsArray = Array.from(actors);

    for (let i = 0; i < actorsArray.length; i++) {
      for (let j = 0; j < actorsArray.length; j++) {
        const actorA = actorsArray[i];
        const actorB = actorsArray[j];

        if (actorA.collidesWith(actorB) && actorA !== actorB) {
          const callback = this.getCallbackForCollision(actorA, actorB);
          // TODO: Fix a bug, that clustered enemys hit by single attacks still
          // all recieve the damage. return can't be used because auf aoe attacks
          // and when multiple enemys attack the player, he should recieve damage
          // of all enemys
          if (callback) callback(actorA, actorB);
        }
      }
    }
  }

  private getCallbackForCollision(
    actorA: Actor,
    actorB: Actor
  ): CollisionCallback | null {
    for (const [key, callback] of this.collisionCallbacks) {
      const [classNameA, classNameB] = key.split(":");

      if (
        this.isClassInHierarchy(actorA, classNameA) &&
        this.isClassInHierarchy(actorB, classNameB)
      ) {
        return callback;
      }
    }

    return null;
  }

  private isClassInHierarchy(actor: Actor, className: string): boolean {
    let prototype = Object.getPrototypeOf(actor);
    while (prototype !== null) {
      if (prototype.constructor.name === className) return true;

      prototype = Object.getPrototypeOf(prototype);
    }

    return false;
  }
}

export default new CollisionManager();
