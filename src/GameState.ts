import Actor from "./Actors/Actor.js";
import Camera from "./Camera.js";
import Timer from "./Timer.js";

export class GameState {
  private actors: Set<Actor>;
  private camera: Camera;
  private timer: Timer;

  constructor(playerX: number, playerY: number) {
    this.actors = new Set();
    this.camera = new Camera(playerX, playerY);
    this.timer = new Timer();
  }

  addActor(actor: Actor) {
    this.actors.add(actor);
  }

  removeActor(actor: Actor) {
    this.actors.delete(actor);
  }

  update() {
    this.actors.forEach((actor) =>
      actor.update(this.camera.getX(), this.camera.getY())
    );
  }

  getCamera() {
    return this.camera;
  }

  getTimer() {
    return this.timer;
  }
}
