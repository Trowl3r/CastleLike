import AttackActor from "./AttackActor.js";

export default class Attack {
  private name: string;
  private damage: number;
  private src: string; // Src is stored here aswell, to render the icons
  private interval: number;
  private lastExecution: number;

  constructor(name: string, src: string, damage: number, interval: number) {
    this.name = name;
    this.src = src;
    this.damage = damage;
    this.interval = interval;
    this.lastExecution = 0;
  }

  // Base function, doesnt work properly when not overwritten by child class
  createAttackActor(): AttackActor {
    // Default attack, because multiple constructors arent allowed
    return new AttackActor(this.src, 0, 0, 0, 0, 0);
  }

  getActorClass(): new (...args: any[]) => AttackActor {
    return AttackActor;
  }

  getImageSrc() {
    return this.src;
  }

  getName() {
    return this.name;
  }

  getInterval() {
    return this.interval;
  }

  getLastExecution() {
    return this.lastExecution;
  }

  setLastExecution(lastExecution: number) {
    this.lastExecution = lastExecution; 
  }

}
