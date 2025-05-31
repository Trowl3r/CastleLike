import Attack from "./Attack.js";
import AttackActor from "./AttackActor.js";
import gameState from "../GameState.js";

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
  }
}
