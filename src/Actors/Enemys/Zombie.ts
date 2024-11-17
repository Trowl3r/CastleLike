import EnemyActor from "./EnemyActor"


export default class Zombie extends EnemyActor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super("zombie", x, y, width, height);
  }
}