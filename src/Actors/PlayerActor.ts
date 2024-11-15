import Actor from "./Actor.js";

export class PlayerActor extends Actor {
  private speedX: number = 0;
  private speedY: number = 0;
  private moveSpeed: number = 5;

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(src, x, y, width, height);
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
}
