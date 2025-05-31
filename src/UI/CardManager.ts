import { Card } from "../Entitys/Card.js";
import gameState from "../GameState.js";

export class CardManager {
    private container: HTMLElement;

    constructor() {
        this.container = document.getElementById("card-container") as HTMLElement;
    }

    showCards(cards: Array<Card>) {
      gameState.getTimer().freeze();
        cards.forEach(card => {
            const cardEl: HTMLDivElement = document.createElement("div"); 
            cardEl.className = "card";
            cardEl.innerHTML = card.getLabel(); 

            // TODO: Write the logic for that
            cardEl.addEventListener("click", () => {
                this.clearCards();
                gameState.getTimer().unfreeze();
            })

            this.container.appendChild(cardEl);
        })
    }

    clearCards() {
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);        
    }
}