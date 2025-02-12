import * as PIXI from "pixi.js";

const END_POINT: number = 414;

export class Reels extends PIXI.Container {
    private _app: PIXI.Application;
    private _reels: PIXI.Sprite[] = [];
    private _symbols: PIXI.Sprite[][] = [];
    private _excess: number = 2;
    private _isSpinning: boolean = false;

    constructor(app: any, col: number, row: number) {
        super();

        this._app = app;

        this.onLoad(col, row);
    }

    public onLoad(col: number, row: number) {
        this.createReel(col, row);
    }

    private createReel(col: number, row: number) {
        for (let cIndex = 0; cIndex < col; cIndex++) {
            let mask = new PIXI.Graphics();
            mask.beginPath().rect(199 + (cIndex * 181), 65, 155, 468).fill(0xFAFAFA, 0).closePath();

            this._reels[cIndex] = PIXI.Sprite.from("reel");
            this._reels[cIndex].label = "Reel[" + cIndex + "]";
            this._reels[cIndex].anchor.set(0.5, 0.5);
            this._reels[cIndex].scale.set(0.75, 0.75);
            this._reels[cIndex].position.set(277 + (cIndex * (this._reels[cIndex].width - 10)), 300);

            this.addChild(this._reels[cIndex]);

            this._symbols[cIndex] = [];
            
            for (let rIndex = 0; rIndex < row + this._excess; rIndex++) {
                this._symbols[cIndex][rIndex] = PIXI.Sprite.from("BONUS");
                this._symbols[cIndex][rIndex].label = "Symbol[" + cIndex + "]" + "[" + rIndex + "]";
                this._symbols[cIndex][rIndex].anchor.set(0.5, 0.5);
                this._symbols[cIndex][rIndex].scale.set(1, 1);
                this._symbols[cIndex][rIndex].position.set(0, -418 + (rIndex * (this._symbols[cIndex][rIndex].width + 8)));
                this._symbols[cIndex][rIndex].mask = mask;

                this._reels[cIndex].addChild(this._symbols[cIndex][rIndex]);
            }
        }
    }

    private startSpin() {

    }

    private relocateSymbols() {
        
    }

    public get reels(): Array<PIXI.Sprite> {
        return this._reels;
    }

    public get symbols(): Array<Array<PIXI.Sprite>> {
        return this._symbols;
    }

    public get isSpinning(): boolean {
        return this._isSpinning;
    }
}