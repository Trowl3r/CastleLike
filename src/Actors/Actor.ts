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
}
