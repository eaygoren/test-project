import * as PIXI from "pixi.js";
import { SYMBOLS } from "./Configs";

export class Symbol extends PIXI.Sprite {
    private _app: PIXI.Application;

    private _index: number;
    private _base: PIXI.Sprite;
    private _highlight: PIXI.Sprite;

    constructor(app: any, index: number) {
        super();

        this._app = app;
        this._index = index;

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
        this.addChild(this);
    }

    private eventListeners() {

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