import Actor from "../Actors/Actor.js";
import { ActorClass } from "./types";

// A helper function, to detemine 
// which of the given actors is from given type 
export function castRightActor<T extends Actor>(
  actorA: Actor,
  actorB: Actor,
  type: ActorClass<T>
): T | null {
  if (actorA instanceof type) {
    return actorA as T;
  } else if (actorB instanceof type) {
    return actorB as T;
  }
  return null;
}
