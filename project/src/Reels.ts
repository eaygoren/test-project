import * as PIXI from "pixi.js";
import gsap from "gsap";
import { DATA_RECEIVED, SPIN_STARTED, SPIN_STOPPED, SYMBOLS } from "./Configs";

const END_POINT: number = 208;
const BACK_POINT: number = -55;
const SYMBOL_OFFSET_Y: number = -418;

export class Reels extends PIXI.Container {
    private _app: PIXI.Application;
    private _reelContainers: PIXI.Container[] = [];
    private _reels: PIXI.Sprite[] = [];
    private _masks: PIXI.Graphics[] = [];
    private _symbols: PIXI.Sprite[][] = [];
    private _excess: number = 2;
    private _isSpinning: boolean = false;
    private _isDataReceived: boolean = false;

    constructor(app: any, col: number, row: number) {
        super();

        this._app = app;

        this.onLoad(col, row);
    }

    private onLoad(col: number, row: number) {
        this.createReel(col, row);
        this.eventListeners();
    }

    private createReel(col: number, row: number) {
        for (let cIndex = 0; cIndex < col; cIndex++) {
            this._masks[cIndex] = new PIXI.Graphics();
            this._masks[cIndex].beginPath().rect(200 + (cIndex * 180), 65, 155, 468).fill(0xFAFAFA, 0).closePath();

            this._reels[cIndex] = PIXI.Sprite.from("reel");
            this._reels[cIndex].label = "Reel[" + cIndex + "]";
            this._reels[cIndex].anchor.set(0.5, 0.5);
            this._reels[cIndex].scale.set(0.75, 0.75);
            this._reels[cIndex].position.set(277 + (cIndex * (this._reels[cIndex].width - 10)), 300);
            this.addChild(this._reels[cIndex]);

            this._reelContainers[cIndex] = new PIXI.Container({ label: "Reel[" + cIndex + "]Container" });
            this._reels[cIndex].addChild(this._reelContainers[cIndex]);
            this._reelContainers[cIndex].mask = this._masks[cIndex];

            this._symbols[cIndex] = [];

            for (let rIndex = 0; rIndex < row + this._excess; rIndex++) {
                const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

                this._symbols[cIndex][rIndex] = PIXI.Sprite.from(randomSymbol.base);
                this._symbols[cIndex][rIndex].label = "Symbol[" + cIndex + "]" + "[" + rIndex + "]";
                this._symbols[cIndex][rIndex].anchor.set(0.5, 0.5);
                this._symbols[cIndex][rIndex].scale.set(1, 1);
                this._symbols[cIndex][rIndex].position.set(0, SYMBOL_OFFSET_Y + (rIndex * (this._symbols[cIndex][rIndex].height + 8)));

                this._reelContainers[cIndex].addChild(this._symbols[cIndex][rIndex]);
            }
        }
    }

    private eventListeners() {
        globalThis.eventBus.on(DATA_RECEIVED, () => { this._isDataReceived = true; });
    }

    public startSpin(delay: number = 0.5) {
        if (this._isSpinning) return;

        this._isSpinning = true;
        this._isDataReceived = false;

        globalThis.eventBus.emit(SPIN_STARTED);

        // the spin will be stop after 3 secs like a backend response
        setTimeout(() => {
            globalThis.eventBus.emit(DATA_RECEIVED);
        }, 3000);

        for (let cIndex = 0; cIndex < this._reels.length; cIndex++) {
            this.relocateReel(this._reelContainers[cIndex], BACK_POINT, END_POINT, (delay * cIndex), cIndex);
        }
    }

    private relocateReel(reel: PIXI.Container, backPoint: number, endPoint: number, delay: number, reelIndex: number) {
        const startPoint: number = reel.position.y;
        let startTween = gsap.to(reel.position, {
            y: backPoint, duration: 0.5, ease: "back.in", delay: delay, onComplete: () => {
                let loopTween = gsap.fromTo(reel.position, { y: startPoint }, {
                    y: endPoint, duration: 0.1, ease: "none", onComplete: () => {
                        this.replaceSymbols(reelIndex);

                        if (this._isDataReceived) {
                            reel.position.y = 0;
                            this._isSpinning = false;
                            globalThis.eventBus.emit(SPIN_STOPPED);
                        } else {
                            loopTween.restart();
                        }
                    }
                });
            }
        });
    }

    private replaceSymbols(reelIndex: number) {
        let previousSymbols = this._symbols[reelIndex].map(symbol => symbol.texture);

        for (let sIndex = 0; sIndex < this._symbols[reelIndex].length; sIndex++) {
            if (sIndex == 0) {
                const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                this._symbols[reelIndex][0].texture = PIXI.Texture.from(randomSymbol.texture);
                continue;
            } else if (sIndex == this._symbols[reelIndex].length - 1) {
                return;
            }

            this._symbols[reelIndex][sIndex].texture = previousSymbols[sIndex - 1];
        }
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

    public get isDataReceived(): boolean {
        return this._isDataReceived;
    }
}