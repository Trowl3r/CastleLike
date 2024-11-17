import Actor from "../Actor.js";
import Attack from "../../Attack/Attack.js";


export default class PlayerActor extends Actor {
  private speedX: number = 0;
  private speedY: number = 0;
  private moveSpeed: number = 5;

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
}
