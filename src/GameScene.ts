import Actor from "./Actors/Actor.js";
import PlayerActor from "./Actors/Players/PlayerActor.js";
import gameState, { GameState } from "./GameState.js";
import Hud from "./UI/Hud.js";

// TODO: Think about moving the camera to a different place
// TODO: Also to see how it works, implement Attack adding here, but think about 
// putting it somewhere else.
export default class GameScene {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mapWidth = 5000;
  private mapHeight = 5000;
  private player: PlayerActor;
  private hud: Hud;

  constructor() {
    this.canvas = document.getElementById("GameScene") as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d")!;
    this.player = gameState.getPlayer();
    this.hud = new Hud(this.ctx);

    Actor.setGamescene(this);

    this.setupEventListeners();
  }

  start() {
    gameState.getTimer().start();
    const loop = () => {
      this.update();
      requestAnimationFrame(loop);
    };

    loop();
  }

  update() {
    this.ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.drawBackground();
    this.hud.drawHud();

    this.updateCamera();
    gameState.update();
  }

  getCtx() {
    return this.ctx;
  }

  drawBackground() {
    const { cameraX, cameraY } = gameState.getCamera().getLocation();
    this.ctx.fillStyle = "#87CEEB";
    this.ctx?.fillRect(-cameraX, -cameraY, this.mapWidth, this.mapHeight);
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

    gameState
      .getCamera()
      .setX(
        Math.min(
          Math.max(this.player.getX() - halfCanvasWidth, 0),
          this.mapWidth - this.canvas.width
        )
      );

    gameState
      .getCamera()
      .setY(
        Math.min(
          Math.max(this.player.getY() - halfCanvasHeight, 0),
          this.mapHeight - this.canvas.height
        )
      );
  }
}
