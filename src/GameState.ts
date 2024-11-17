import Actor from "./Actors/Actor.js";
import PlayerActor from "./Actors/Players/PlayerActor.js";
import Wizard from "./Actors/Players/Wizard.js";
import { AttackScheduler } from "./Attack/AttackScheduler.js";
import Camera from "./Camera.js";
import Timer from "./Timer.js";

// TODO: Think about making the store better accesible,
// instead of always using this.store. etc.
export class GameState {
  private actors: Set<Actor>;
  private player: PlayerActor;
  private camera: Camera;
  private timer: Timer;
  private attackScheduler: AttackScheduler;

  constructor() {
    this.actors = new Set();
    this.player = new Wizard(2500, 2500, 100, 100);
    this.actors.add(this.player);

    this.camera = new Camera(this.player.getX(), this.player.getX());
    this.timer = new Timer();
    this.attackScheduler = new AttackScheduler();
  }

  getPlayer() {
    return this.player;
  }

  addActor(actor: Actor) {
    this.actors.add(actor);
  }

  removeActor(actor: Actor) {
    this.actors.delete(actor);
  }

  update() {
    this.attackScheduler.emmitAttacks();
    console.log(this.actors);
    for (const actor of this.actors) {
      actor.update(this.camera.getX(), this.camera.getY());
    }
  }

  getCamera() {
    return this.camera;
  }

  getTimer() {
    return this.timer;
  }

  // The functions are contained in the Game State, so they don't need to be 
  // Accessed from outside
  containsActor<T extends Actor>(ActorType: new (...args: any[]) => T) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) {
        return true;
      }
    }

    return false;
  }

  getActorByClass<T extends Actor>(ActorType: new (...args: any[]) => T) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) {
        return actor;
      }
    }
    return null; 
  }

  removeActorByClass<T extends Actor>(ActorType: new (...args: any) => T) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) this.actors.delete(actor);
    }
  }

}

// Trying to export one premade gamestate
export default new GameState();
