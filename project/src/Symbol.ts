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

    private onLoad() {
        this.create();
        this.eventListeners();
    }

    private create() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base);
        this.label = `Symbol[${this._index}]`;
        this.anchor.set(0.5, 0.5);
        this.eventMode = "static";
        this.cursor = "pointer";
        this.addChild(this);
    }

    private eventListeners() {
        this.onpointerup = () => {
            globalThis.eventBus.emit(EventNames.SymbolClicked, {
                symbolIndex: this._index,
                reelIndex: this._reelIndex,
                rowIndex: this._positionIndex
            });
        }
    }

    public setIndex(index: number) {
        this._index = index;
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base);
        this.label = `Symbol[${this._index}]`;
    }

    public setHighlight() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].highlight);
    }

    public setBase() {
        this.texture = PIXI.Texture.from(SYMBOLS[this._index].base);
    }

    public setBlackout() {
        this.tint = 0x555555;
    }

    public setDefault() {
        this.tint = 0xFFFFFF;
    }

    public get index(): number {
        return this._index;
    }
}