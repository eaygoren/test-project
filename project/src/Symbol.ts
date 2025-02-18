import * as PIXI from "pixi.js";
import { SYMBOLS } from "./Configs";
import { EventNames } from "./EventBus";

export class Symbol extends PIXI.Sprite {
    private _app: PIXI.Application; // Reference to the PIXI application
    private _index: number; // Index of the symbol
    private _reelIndex: number; // Index of the reel the symbol is on
    private _positionIndex: number; // Position index of the symbol in the reel

    constructor(app: any, index: number, reelIndex: number, symbolPositionIndex: number) {
        super();

        this._app = app;
        this._index = index;
        this._reelIndex = reelIndex;
        this._positionIndex = symbolPositionIndex;

        this.onLoad(); // Calls the onLoad method after the object is created
    }

    // Initializes the symbol, creates it and adds event listeners
    private onLoad() {
        this.create(); // Creates the symbol
        this.eventListeners(); // Adds event listeners
    }

    // Sets the symbol texture and properties
    private create() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base); // Sets the symbol's texture based on the index
        this.label = `Symbol[${this._index}]`; // Sets a label for the symbol
        this.anchor.set(0.5, 0.5); // Centers the anchor of the symbol for positioning
        this.eventMode = "static"; // The symbol is static and does not trigger events by itself
        this.cursor = "pointer"; // Sets the cursor to a pointer when hovering over the symbol
        this.addChild(this); // Adds the symbol to its parent container
    }

    // Adds event listeners for the symbol's interaction
    private eventListeners() {
        this.onpointerup = () => {
            globalThis.eventBus.emit(EventNames.SymbolClicked, {
                symbolIndex: this._index, // Sends the symbol's index
                reelIndex: this._reelIndex, // Sends the reel's index
                rowIndex: this._positionIndex // Sends the row's position index
            });
        }
    }

    // Sets the index of the symbol and updates its texture
    public setIndex(index: number) {
        this._index = index;
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base); // Updates the texture
        this.label = `Symbol[${this._index}]`; // Updates the label
    }

    // Sets the symbol's highlight texture
    public setHighlight() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].highlight); // Updates the texture to the highlight version
    }

    // Sets the symbol's base texture (the normal texture)
    public setBase() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base); // Updates the texture to the base version
    }

    // Applies a blackout effect to the symbol (gray tint)
    public setBlackout() {
        this.tint = 0x555555; // Applies a gray tint
    }

    // Restores the symbol to its default appearance
    public setDefault() {
        this.tint = 0xFFFFFF; // Removes any tint, restoring the default appearance
    }

    // Getter for the symbol's index
    public get index(): number {
        return this._index;
    }
}