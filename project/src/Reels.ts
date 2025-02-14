import * as PIXI from "pixi.js";
import gsap from "gsap";
import { REEL_SET, SYMBOLS, WINNING_REEL_INDICES } from "./Configs";
import { EventNames } from "./EventBus";
import { Symbol } from "./Symbol";

export class Reels extends PIXI.Container {
    private _app: PIXI.Application;

    private _reelContainers: PIXI.Container[] = [];
    private _reels: PIXI.Sprite[] = [];
    private _masks: PIXI.Graphics[] = [];
    private _symbols: Symbol[][] = [];
    private _excess: number = 2;
    private _data: number;
    private _col: number;
    private _row: number;
    private _isSpinning: boolean = false;
    private _isDataReceived: boolean = false;

    private readonly END_POINT: number = 208;
    private readonly BACK_POINT: number = -55;
    private readonly SYMBOL_OFFSET_Y: number = -402;
    private readonly REEL_GAP: number = -10;
    private readonly SYMBOL_GAP: number = 0;

    constructor(app: any, col: number, row: number) {
        super();

        this._app = app;
        this._col = col;
        this._row = row;

        this.onLoad();
    }

    private onLoad() {
        this.create();
        this.eventListeners();
    }

    private create() {
        let randomSymbolIndex = Math.floor(Math.random() * (REEL_SET[0].length - (this._row + this._excess)));

        for (let cIndex = 0; cIndex < this._col; cIndex++) {
            this._masks[cIndex] = new PIXI.Graphics();
            this._masks[cIndex].beginPath().rect(200 + (cIndex * 181), 74, 155, 450).fill({ color: 0xFAFAFA, alpha: 0 }).closePath();

            this._reels[cIndex] = PIXI.Sprite.from("reel");
            this._reels[cIndex].label = "Reel[" + cIndex + "]";
            this._reels[cIndex].anchor.set(0.5, 0.5);
            this._reels[cIndex].scale.set(0.75, 0.75);
            this._reels[cIndex].position.set(277 + (cIndex * (this._reels[cIndex].width + this.REEL_GAP)), 300);
            this.addChild(this._reels[cIndex]);

            this._reelContainers[cIndex] = new PIXI.Container({ label: `Reel[${cIndex}]Container` });
            this._reels[cIndex].addChild(this._reelContainers[cIndex]);
            this._reelContainers[cIndex].mask = this._masks[cIndex];

            this._symbols[cIndex] = [];
            for (let rIndex = 0; rIndex < this._row + this._excess; rIndex++) {
                this._symbols[cIndex][rIndex] = new Symbol(this._app, (REEL_SET[cIndex][randomSymbolIndex + rIndex]), cIndex, rIndex - 1);
                this._symbols[cIndex][rIndex].position.set(0, this.SYMBOL_OFFSET_Y + (rIndex * (this._symbols[cIndex][rIndex].height + this.SYMBOL_GAP)));

                this._reelContainers[cIndex].addChild(this._symbols[cIndex][rIndex]);
            }
        }
    }

    private eventListeners() {
        globalThis.eventBus.on(EventNames.AllReelsStopped, this.onSpinStopped.bind(this));
        globalThis.eventBus.on(EventNames.DataRecieved, this.onDataReceived.bind(this));
        globalThis.eventBus.on(EventNames.ReelStopped, this.onReelStopped.bind(this));
        globalThis.eventBus.on(EventNames.WinShown, this.onWinDisplayOver.bind(this));
        globalThis.eventBus.on(EventNames.SymbolClicked, this.onSymbolClicked.bind(this));
    }

    public startSpin(delay: number = 0.5) {
        if (this._isSpinning) return;

        this._isSpinning = true;
        this._isDataReceived = false;

        globalThis.eventBus.emit(EventNames.SpinStarted);

        // the spin will stop after 3 secs like a backend response
        setTimeout(() => {
            globalThis.eventBus.emit(EventNames.DataRecieved, Math.floor(Math.random() * (REEL_SET[0].length - (this._row + this._excess))));
        }, 3000);

        for (let cIndex = 0; cIndex < this._reels.length; cIndex++) {
            this.relocateReel(this._reelContainers[cIndex], this.BACK_POINT, this.END_POINT, (delay * cIndex), cIndex);
        }
    }

    private relocateReel(reel: PIXI.Container, backPoint: number, endPoint: number, delay: number, reelIndex: number) {
        const startPoint: number = reel.position.y;
        let startTween = gsap.to(reel.position, {
            y: backPoint, duration: 0.25, ease: "none", delay: delay, onComplete: () => {
                let loopTween = gsap.fromTo(reel.position, { y: startPoint }, {
                    y: endPoint, duration: 0.025, ease: "none", onComplete: () => {
                        if (this._isDataReceived) {
                            this.replaceDataSymbols(reelIndex);

                            reel.position.y = 0;

                            globalThis.eventBus.emit(EventNames.ReelStopped, reelIndex);
                        } else {
                            this.replaceFakeSymbols(reelIndex);
                            loopTween.restart();
                        }
                    }
                });
            }
        });
    }

    private replaceFakeSymbols(reelIndex: number) {
        let previousSymbols = this._symbols[reelIndex].map(element => element.index);

        for (let sIndex = 0; sIndex < this._symbols[reelIndex].length; sIndex++) {
            if (sIndex == 0) {
                const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                this._symbols[reelIndex][0].setIndex(randomSymbol.index);
                continue;
            } else if (sIndex == this._symbols[reelIndex].length - 1) {
                return;
            }

            this._symbols[reelIndex][sIndex].setIndex(previousSymbols[sIndex - 1]);
        }
    }

    private replaceDataSymbols(reelIndex: number) {
        for (let sIndex = 0; sIndex < (this._row + this._excess); sIndex++) {
            this._symbols[reelIndex][sIndex].setIndex((REEL_SET[reelIndex][this._data + sIndex]));
        }
    }

    private onReelStopped(reelIndex: number) {
        if (reelIndex == this._col - 1) {
            globalThis.eventBus.emit(EventNames.AllReelsStopped);
        }
    }

    private onDataReceived(data: number) {
        this._data = data;
        this._isDataReceived = true;
    }

    private onSpinStopped() {
        globalThis.eventBus.emit(EventNames.SpinStopped);
        this._isSpinning = false;

        this.checkWin();
    }

    private checkWin() {
        let winFound = false;

        for (let index = 0; index < WINNING_REEL_INDICES.length; index++) {
            if (winFound) break;

            switch (WINNING_REEL_INDICES[index].index) {
                case this._data + 1:
                case this._data + 2:
                case this._data + 3:
                    if (this._data + 2 === WINNING_REEL_INDICES[index].index) {
                        switch (WINNING_REEL_INDICES[index].pattern) {
                            case "line":
                            case "w":
                            case "u":
                                break;
                            default:
                                continue;
                        }
                    } else if (this._data + 3 === WINNING_REEL_INDICES[index].index) {
                        if (WINNING_REEL_INDICES[index].pattern !== "line") {
                            continue;
                        }
                    }

                    setTimeout(() => {
                        for (let rIndex = 0; rIndex < this._symbols.length; rIndex++) {
                            for (let sIndex = 1; sIndex < this._symbols[rIndex].length - 1; sIndex++) {
                                if (this._symbols[rIndex][sIndex].index == WINNING_REEL_INDICES[index].smyIndex) {
                                    this._symbols[rIndex][sIndex].setHighlight();
                                } else {
                                    this._symbols[rIndex][sIndex].setBlackout();
                                }
                            }
                        }
                    }, 100);

                    let payout = SYMBOLS[WINNING_REEL_INDICES[index].smyIndex].payout[WINNING_REEL_INDICES[index].count];
                    globalThis.eventBus.emit(EventNames.MoneyEarned, payout);

                    winFound = true;
                    break;
            }
        }

        if (!winFound) {
            globalThis.eventBus.emit(EventNames.MoneyEarned, -1);
        }
    }

    private onWinDisplayOver() {
        for (let rIndex = 0; rIndex < this._symbols.length; rIndex++) {
            for (let sIndex = 1; sIndex < this._symbols[rIndex].length - 1; sIndex++) {
                this._symbols[rIndex][sIndex].setBase();
                this._symbols[rIndex][sIndex].setDefault();
            }
        }
    }

    private onSymbolClicked(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        globalThis.eventBus.emit(EventNames.SymbolClickedFromReels, data);
    }

    public get reel(): Array<PIXI.Sprite> {
        return this._reels;
    }

    public get symbols(): Array<Array<Symbol>> {
        return this._symbols;
    }

    public get isSpinning(): boolean {
        return this._isSpinning;
    }

    public get isDataReceived(): boolean {
        return this._isDataReceived;
    }
}