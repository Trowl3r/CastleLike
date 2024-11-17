import EnemyActor from "./EnemyActor.js";

export default class Zombie extends EnemyActor {
  constructor(x: number, y: number, width: number, height: number) {
    super("Zombie", 20, 10, 2, "zombie", x, y, width, height);
  }
}