
export class Card {
    private label: string;
    private src: string;
    private text: string;


    constructor(label: string, src: string, text: string) {
        this.label = label;
        this.src = src;
        this.text = text;
    }

    getLabel() {
        return this.label; 
    }

    getSrc() {
        return this.src; 
    }

    getText() {
        return this.text; 
    }
}