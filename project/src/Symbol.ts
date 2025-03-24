import * as PIXI from "pixi.js";
import { SYMBOLS } from "./Configs";
import { EventNames } from "./EventBus";

export class Symbol extends PIXI.Sprite {
    private _app: PIXI.Application;
    private _index: number;
    private _reelIndex: number;
    private _positionIndex: number;

    constructor(app: any, index: number, reelIndex: number, symbolPositionIndex: number) {
        super();

        this._app = app;
        this._index = index;
        this._reelIndex = reelIndex;
        this._positionIndex = symbolPositionIndex;

        this.onLoad();
    }

    // Initializes the symbol, creates it and adds event listeners
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Sets the symbol texture and properties
    private create() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base);
        this.label = `Symbol[${this._index}]`;
        this.anchor.set(0.5, 0.5);
        this.eventMode = "static";
        this.cursor = "pointer";
        this.addChild(this);
    }

    // Adds event listeners for the symbol's interaction
    private eventListeners() {
        this.onpointerup = () => {
            globalThis.eventBus.emit(EventNames.SymbolClicked, {
                symbolIndex: this._index,
                reelIndex: this._reelIndex,
                rowIndex: this._positionIndex
            });
        }
    }

    // Sets the index of the symbol and updates its texture
    public setIndex(index: number) {
        this._index = index;
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base);
        this.label = `Symbol[${this._index}]`;
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
        this.tint = 0x555555;
    }

    // Restores the symbol to its default appearance
    public setDefault() {
        this.tint = 0xFFFFFF;
    }

    // Getter for the symbol's index
    public get index(): number {
        return this._index;
    }
}