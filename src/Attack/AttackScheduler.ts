import gameState from "../GameState.js";

// TODO: Try to find a way, to not always access by gamestate. to make code more readable
export class AttackScheduler {
  emmitAttacks() {
    const elapsedTime = gameState.getTimer().getElapsedTime();
    const attacks = gameState.getPlayer().getAttacks();

    for (const attack of attacks) {
      const attackClass = attack.getActorClass();

      if (gameState.containsActor(attackClass)) {
        const actor = gameState.getActorByClass(attackClass);

        // TODO: Get the height / width of window relative to canvas
        // to delete actor on screen exit
        if (actor!.getX() > 3000) gameState.removeActorByClass(attackClass);
      }

      if (elapsedTime - attack.getLastExecution() > attack.getInterval()) {
        gameState.addActor(attack.createAttackActor());
        attack.setLastExecution(elapsedTime);
      }
    }
  }
}
