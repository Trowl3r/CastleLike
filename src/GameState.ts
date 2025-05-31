import Actor from "./Actors/Actor.js";
import CollisionManager from "./Actors/CollisionManager.js";
import Zombie from "./Actors/Enemys/Zombie.js";
import PlayerActor from "./Actors/Players/PlayerActor.js";
import Wizard from "./Actors/Players/Wizard.js";
import { AttackScheduler } from "./Attack/AttackScheduler.js";
import Camera from "./Camera.js";
import { ActorClass } from "./helpers/types.js";
import Timer from "./Timer.js";
import { CardManager } from "./UI/CardManager.js";

// TODO: Think about making the store better accesible,
// instead of always using this.store. etc.
// TODO: Think about changing the size of the sprites
export class GameState {
  private actors: Set<Actor>;
  private player: PlayerActor;
  private camera: Camera;
  private timer: Timer;
  private attackScheduler: AttackScheduler;
  private cardManager: CardManager;

  constructor() {
    this.actors = new Set();
    this.player = new Wizard(2500, 2500, 100, 100);
    this.actors.add(this.player);
    // TODO: Remove 
    this.actors.add(new Zombie(2300, 2300, 100, 100))
    


    this.camera = new Camera(this.player.getX(), this.player.getX());
    this.timer = new Timer();
    this.attackScheduler = new AttackScheduler();
    this.cardManager = new CardManager();
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
    // console.log(this.actors);
    for (const actor of this.actors) {
      actor.update(this.camera.getX(), this.camera.getY());
    }
    CollisionManager.checkCollisions(this.actors);
  }

  getCamera() {
    return this.camera;
  }

  getTimer() {
    return this.timer;
  }

  getCardmanager() {
    return this.cardManager;
  }

  // The functions are contained in the Game State, so they don't need to be 
  // Accessed from outside
  containsActor<T extends Actor>(ActorType: ActorClass<T>) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) {
        return true;
      }
    }

    return false;
  }

  getActorByClass<T extends Actor>(ActorType: ActorClass<T>) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) {
        return actor;
      }
    }
    return null; 
  }

  removeActorByClass<T extends Actor>(ActorType: ActorClass<T>) {
    for (const actor of this.actors) {
      if (actor instanceof ActorType) this.actors.delete(actor);
    }
  }

}

// Trying to export one premade gamestate
export default new GameState();
