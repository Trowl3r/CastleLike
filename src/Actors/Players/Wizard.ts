import Fireball from "../../Attack/Fireball.js";
import PlayerActor from "./PlayerActor.js";

// The wizard class for now. Can be changed later
export default class Wizard extends PlayerActor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const startAttack = new Fireball();

    super("wizard", x, y, width, height, startAttack);
  }
}
