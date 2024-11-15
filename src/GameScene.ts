import Actor from "./Actors/Actor.js";
import { PlayerActor } from "./Actors/PlayerActor.js";
import Camera from "./Camera.js";
import { GameState } from "./GameState.js";

// TODO: Think about moving the camera to a different place
export default class GameScene {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: PlayerActor;
  private gameState: GameState;
  private mapWidth = 5000;
  private mapHeight = 5000;

  constructor() {
    this.canvas = document.getElementById("GameScene") as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d")!;

    Actor.setGamescene(this);
    this.player = new PlayerActor("wizard", 2500, 2500, 100, 100);

    this.gameState = new GameState(this.player.getX(), this.player.getY());
    this.gameState.addActor(this.player);

    this.setupEventListeners();
  }

  start() {
    this.gameState.getTimer().start();
    const loop = () => {
      this.update();
      requestAnimationFrame(loop);
    };

    loop();
  }

  update() {
    this.ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.drawBackground();
    this.drawTimer();

    this.updateCamera();
    this.gameState.update();
  }

  getCtx() {
    return this.ctx;
  }

  drawBackground() {
    const { cameraX, cameraY } = this.gameState.getCamera().getLocation();
    this.ctx.fillStyle = "#87CEEB";
    this.ctx?.fillRect(-cameraX, -cameraY, this.mapWidth, this.mapHeight);
  }

  private drawTimer() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `Time: ${this.gameState.getTimer().getFormattedTime()}`,
      10,
      30
    );
  }

  private setupEventListeners() {
    window.addEventListener("keydown", (event) => {
      this.player.handleKeyDown(event);
    });

    window.addEventListener("keyup", (event) => {
      this.player.handleKeyUp(event);
    });
  }

  updateCamera() {
    const halfCanvasWidth = this.canvas.width / 2 - 50;
    const halfCanvasHeight = this.canvas.height / 2 - 50;

    this.gameState
      .getCamera()
      .setX(
        Math.min(
          Math.max(this.player.getX() - halfCanvasWidth, 0),
          this.mapWidth - this.canvas.width
        )
      );

    this.gameState
      .getCamera()
      .setY(
        Math.min(
          Math.max(this.player.getY() - halfCanvasHeight, 0),
          this.mapHeight - this.canvas.height
        )
      );
  }
}
