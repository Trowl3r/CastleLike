import Actor from "../Actor.js";
import Attack from "../../Attack/Attack.js";
import collisionManager from "../CollisionManager.js";
import EnemyActor from "../Enemys/EnemyActor.js";
import { castRightActor } from "../../helpers/functions.js";
import gameState from "../../GameState.js";
import { Card } from "../../Entitys/Card.js";

// TODO: Set all of the start values in constant file
export default class PlayerActor extends Actor {
  private speedX: number = 0;
  private speedY: number = 0;
  private moveSpeed: number = 5;
  private life: number = 10;
  private xpPoints: number = 0;
  private level = 1;
  private pointsUntilLevelUp = 1;

  // TODO: Create an Array with exactly 5 fields that are null,
  // and get replaced on attack add
  private attacks: Array<Attack>;

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number,
    attack: Attack
  ) {
    super(src, x, y, width, height);

    // Adds the first Attack for every character
    this.attacks = [attack];
    // this.registerEnemyCollision();
  }

  // GETTERS
  getAttacks() {
    return this.attacks;
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
        this.speedY = -this.moveSpeed;
        break;
      case "s":
        this.speedY = this.moveSpeed;
        break;
      case "a":
        this.speedX = -this.moveSpeed;
        break;
      case "d":
        this.speedX = this.moveSpeed;
        break;
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
      case "s":
        this.speedY = 0;
        break;
      case "a":
      case "d":
        this.speedX = 0;
        break;
    }
  }

  update(cameraX: number, cameraY: number) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.draw(cameraX, cameraY);
  }

  addAttack(attack: Attack) {
    if (this.attacks.length <= 5) this.attacks.push(attack);
  }

  // TODO: Think about adding the function itself into the constructor
  private registerEnemyCollision() {
    collisionManager.registerCollisionCallback(
      PlayerActor,
      EnemyActor,
      (actorA: Actor, actorB: Actor) => {
        const enemy = castRightActor(actorA, actorB, EnemyActor);

        this.life -= enemy!.getDamage();
        if (this.life <= 0) gameState.removeActor(this);
      }
    );
  }

  addXpPoints(xpPoints: number) {
    this.xpPoints += xpPoints;
    this.checkLevelUp();
  }

  // TODO: Think about where to add the cards
  private checkLevelUp() {
    const cards = [
      new Card("Test 1", "", "Test"),
      new Card("Test 2", "", "Test"),
      new Card("Test 3", "", "Test"),
    ];
    
    // TODO: Playtest, and check how if this is sustainable / the level up is a good calculation
    // If levelup is reached 
    if (this.xpPoints >= this.pointsUntilLevelUp) {
      this.level++;
      gameState.getCardmanager().showCards(cards);
      this.pointsUntilLevelUp = 20 * this.level;
      this.xpPoints = 0;
    }

  } 
}
