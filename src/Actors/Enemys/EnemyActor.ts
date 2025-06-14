import Actor from "../Actor.js";
import gameState from "../../GameState.js";
import BaseXpPoints from "../XpPoints/BaseXpPoints.js";

export default class EnemyActor extends Actor {
  private name: string;
  private life: number;
  private speed: number;
  private damage: number;

  constructor(
    name: string,
    life: number,
    damage: number,
    speed: number,
    src: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(src, x, y, width, height);
    this.name = name;
    this.life = life;
    this.damage = damage;
    this.speed = speed;

    console.log(this.speed);
  }

  getName() {
    return this.name;
  }

  getLife() {
    return this.life;
  }

  getDamage() {
    return this.damage;
  }

  getSpeed() {
    return this.speed;
  }

  // Basic movement for most enemys
  // TODO: Remove the weird shaking if x or y is equal to the player
  update(cameraX: number, cameraY: number): void {
    const playerX = gameState.getPlayer().getX();
    const playerY = gameState.getPlayer().getY();

    this.x = this.x >= playerX ? this.x - this.speed : this.x + this.speed;
    this.y = this.y >= playerY ? this.y - this.speed : this.y + this.speed;

    this.draw(cameraX, cameraY);
  }

  // Base kill class, Removes simple XP Point,
  // Because most enemys will only have base XP as a return.
  // Override by boss or special enemys
  takeDamage(damage: number) {
    this.life -= damage;

    if (this.life <= 0) {
      gameState.removeActor(this);

      const x = this.x + this.getWidth() / 2;
      const y = this.y + this.getHeight() / 2;
      gameState.addActor(new BaseXpPoints(x, y));
    }
  }
}
