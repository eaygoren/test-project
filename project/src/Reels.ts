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
    private _excess: number = 2; // Extra symbols that appear above and below the reel area
    private _data: number; // Data representing the starting symbol index
    private _col: number; // Number of columns (reels)
    private _row: number; // Number of rows (symbols per reel)
    private _isSpinning: boolean = false; // State of the spin
    private _isDataReceived: boolean = false; // Whether data has been received for the reels

    private readonly END_POINT: number = 208; // Final position of the reel after spin
    private readonly BACK_POINT: number = -55; // Starting position for the reel to spin from
    private readonly SYMBOL_OFFSET_Y: number = -402; // Y offset for symbol positioning
    private readonly REEL_GAP: number = -10; // Gap between reels
    private readonly SYMBOL_GAP: number = 0; // Gap between symbols
    private readonly TWEEN_START_DURATION: number = 0.25; // Duration for initial reel movement
    private readonly TWEEN_LOOP_DURATION: number = 0.025; // Duration for reel loop

    constructor(app: any, col: number, row: number) {
        super();

        this._app = app;
        this._col = col;
        this._row = row;

        this.onLoad();
    }

    // Initialize the component by creating the reels and adding event listeners
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Create the reels, symbols, and set their positions
    private create() {
        let randomSymbolIndex = Math.floor(Math.random() * (REEL_SET[0].length - (this._row + this._excess)));

        for (let cIndex = 0; cIndex < this._col; cIndex++) {
            // Create mask for the reel to limit symbol display area
            this._masks[cIndex] = new PIXI.Graphics();
            this._masks[cIndex].beginPath().rect(200 + (cIndex * 181), 74, 155, 450).fill({ color: 0xFAFAFA, alpha: 0 }).closePath();

            // Create the reel sprite
            this._reels[cIndex] = PIXI.Sprite.from("reel");
            this._reels[cIndex].label = "Reel[" + cIndex + "]";
            this._reels[cIndex].anchor.set(0.5, 0.5);
            this._reels[cIndex].scale.set(0.75, 0.75);
            this._reels[cIndex].position.set(277 + (cIndex * (this._reels[cIndex].width + this.REEL_GAP)), 300);
            this.addChild(this._reels[cIndex]);

            // Create a container for symbols in the reel
            this._reelContainers[cIndex] = new PIXI.Container({ label: `Reel[${cIndex}]Container` });
            this._reels[cIndex].addChild(this._reelContainers[cIndex]);
            this._reelContainers[cIndex].mask = this._masks[cIndex]; // Mask the container to limit symbol visibility

            this._symbols[cIndex] = [];
            // Add symbols to the reel container
            for (let rIndex = 0; rIndex < this._row + this._excess; rIndex++) {
                this._symbols[cIndex][rIndex] = new Symbol(this._app, (REEL_SET[cIndex][randomSymbolIndex + rIndex]), cIndex, rIndex - 1);
                this._symbols[cIndex][rIndex].position.set(0, this.SYMBOL_OFFSET_Y + (rIndex * (this._symbols[cIndex][rIndex].height + this.SYMBOL_GAP)));

                this._reelContainers[cIndex].addChild(this._symbols[cIndex][rIndex]);
            }
        }
    }

    //#region EVENT LISTENERS
    // Set up event listeners for various events such as reel stopping and data receiving
    private eventListeners() {
        globalThis.eventBus.on(EventNames.AllReelsStopped, this.onSpinStopped.bind(this));
        globalThis.eventBus.on(EventNames.DataRecieved, this.onDataReceived.bind(this));
        globalThis.eventBus.on(EventNames.ReelStopped, this.onReelStopped.bind(this));
        globalThis.eventBus.on(EventNames.WinShown, this.onWinDisplayOver.bind(this));
        globalThis.eventBus.on(EventNames.SymbolClicked, this.onSymbolClicked.bind(this));
    }
    //#endregion

    // Start the spinning of the reels, with a delay to stagger the start
    public startSpin(delay: number = 0.5) {
        if (this._isSpinning) return; // Prevent starting a new spin if one is already in progress

        this._isSpinning = true;
        this._isDataReceived = false;

        globalThis.eventBus.emit(EventNames.SpinStarted);

        // Simulate backend data response after 3 seconds
        setTimeout(() => {
            globalThis.eventBus.emit(EventNames.DataRecieved, Math.floor(Math.random() * (REEL_SET[0].length - (this._row + this._excess))));
        }, 3000);

        // Relocate each reel by animating its position
        for (let cIndex = 0; cIndex < this._reels.length; cIndex++) {
            this.relocateReel(this._reelContainers[cIndex], this.BACK_POINT, this.END_POINT, (delay * cIndex), cIndex);
        }
    }

    //#region REEL MOVEMENT
    // Animate the reel's movement by relocating it
    private relocateReel(reel: PIXI.Container, backPoint: number, endPoint: number, delay: number, reelIndex: number) {
        const startPoint: number = reel.position.y;
        let startTween = gsap.to(reel.position, {
            y: backPoint, duration: this.TWEEN_START_DURATION, ease: "none", delay: delay, onComplete: () => {
                let loopTween = gsap.fromTo(reel.position, { y: startPoint }, {
                    y: endPoint, duration: this.TWEEN_LOOP_DURATION, ease: "none", onComplete: () => {
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
    //#endregion 

    // Replace the fake symbols during the animation loop with new random symbols
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

    // Replace the symbols with data received from the backend
    private replaceDataSymbols(reelIndex: number) {
        for (let sIndex = 0; sIndex < (this._row + this._excess); sIndex++) {
            this._symbols[reelIndex][sIndex].setIndex((REEL_SET[reelIndex][this._data + sIndex]));
        }
    }

    // Event handler for when a reel stops spinning
    private onReelStopped(reelIndex: number) {
        if (reelIndex == this._col - 1) {
            globalThis.eventBus.emit(EventNames.AllReelsStopped);
        }
    }

    // Event handler for when data has been received
    private onDataReceived(data: number) {
        this._data = data;
        this._isDataReceived = true;
    }

    // Event handler for when the spin is stopped
    private onSpinStopped() {
        globalThis.eventBus.emit(EventNames.SpinStopped);
        this._isSpinning = false;

        this.checkWin();
    }

    // Check if there is a win by comparing the current symbols with winning patterns
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

    // Event handler for when the win display animation is over
    private onWinDisplayOver() {
        for (let rIndex = 0; rIndex < this._symbols.length; rIndex++) {
            for (let sIndex = 1; sIndex < this._symbols[rIndex].length - 1; sIndex++) {
                this._symbols[rIndex][sIndex].setBase();
                this._symbols[rIndex][sIndex].setDefault();
            }
        }
    }

    // Event handler for symbol click events
    private onSymbolClicked(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        globalThis.eventBus.emit(EventNames.SymbolClickedFromReels, data);
    }

    //#region GETS & SETS
    // Getters for various properties
    get reelContainers() {
        return this._reelContainers;
    }
    get symbols() {
        return this._symbols;
    }
    get reels() {
        return this._reels;
    }
    get isSpinning() {
        return this._isSpinning;
    }
    get masks() {
        return this._masks;
    }
    //#endregion
}