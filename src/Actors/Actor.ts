import GameScene from "../GameScene";

// Base class for all things seen on the canvas
export default class Actor {
  protected static scene: GameScene;
  private image: HTMLImageElement;
  protected x: number;
  protected y: number;
  private width: number;
  private height: number;

  constructor(
    src: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = `assets/images/${src}.png`;
  }

  static setGamescene(scene: GameScene) {
    this.scene = scene;
  }

  getImage() {
    return this.image;
  }

  draw(cameraX: number, cameraY: number) {
    const ctx = Actor.scene.getCtx();
    ctx?.drawImage(
      this.image,
      this.x - cameraX,
      this.y - cameraY,
      this.width,
      this.height
    );
  }

  // Default draw, can be updated by the entitys
  update(cameraX: number, cameraY: number) {
    this.draw(cameraX, cameraY);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  collidesWith(other: Actor): boolean {
    return (
      this !== other &&
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
