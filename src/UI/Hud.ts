import {
  HUD_ABILITY_Y,
  HUD_DEFAULT_PADDING,
  HUD_IMAGE_SIZE,
  HUD_RECT_SIZE,
  HUD_TIMER_Y,
} from "../constants.js";
import gameState from "../GameState.js";

// TODO: Put most static values into a constants folder
export default class Hud {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  // TODO
  private drawTimer() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `Time: ${gameState.getTimer().getFormattedTime()}`,
      HUD_DEFAULT_PADDING,
      HUD_TIMER_Y
    );
  }

  private drawHudElement(element: HTMLImageElement, i: number, y: number) {
    // Calculates the base x value * i and 5 padding
    const x = HUD_DEFAULT_PADDING + i * (HUD_RECT_SIZE + 5);
    this.ctx.strokeRect(x, y, HUD_RECT_SIZE, HUD_RECT_SIZE);
    // Draws the image in the middle
    this.ctx.drawImage(
      element,
      x + 2.5,
      y + 2.5,
      HUD_IMAGE_SIZE,
      HUD_IMAGE_SIZE
    );
  }

  private drawAttacks() {
    const attacks = gameState.getPlayer().getAttacks();

    // TODO: Fix this
    attacks.forEach((attack, i) => {
      const img = new Image();
      img.src = `assets/images/${attack.getImageSrc()}.png`;
      this.drawHudElement(img, i, HUD_ABILITY_Y);
    });

    // TODO: Change that with the stats.
    // attacks.forEach((attack, i) => {
    //   const img = new Image();
    //   img.src = `assets/images/${attack.getImageSrc()}.png`;
    //   this.drawHudElement(img, i, HUD_ABILITY_Y * 2);
    // });
  }

  drawHud() {
    this.drawTimer();
    this.drawAttacks();
  }
}
