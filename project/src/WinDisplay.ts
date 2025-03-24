import * as PIXI from "pixi.js";
import { EventNames } from "./EventBus";
import gsap from "gsap";

export class WinDisplay extends PIXI.Container {
    private _app: PIXI.Application;
    private _highlight: PIXI.Sprite;
    private _winAmount: PIXI.Text;
    private _isWinDisplaying: boolean = false;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    // Initializes the win display, creates the highlight and win amount elements
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Creates the highlight sprite and win amount text
    private create() {
        // Create the highlight sprite
        this._highlight = PIXI.Sprite.from("highlight");
        this._highlight.label = "Highlight";
        this._highlight.anchor.set(0.5, 0.5);
        this._highlight.position.set(640, 300);
        this._highlight.alpha = 0.3;
        this._highlight.visible = false;
        this.addChild(this._highlight);

        // Create the win amount text
        this._winAmount = new PIXI.Text();
        this._winAmount.label = "WinAmount";
        this._winAmount.anchor.set(0.5, 0.5);
        this._winAmount.position.set(640, 300);
        this._winAmount.text = "";
        this._winAmount.style = {
            fontFamily: "TiltNeon",
            fontSize: 120,
            fontWeight: "900",
            align: "center",
            fill: "#F8E7F6",
            stroke: "#4B164C",
            letterSpacing: 1
        };
        this._winAmount.style._stroke.width = 5;
        this._winAmount.visible = false;
        this.addChild(this._winAmount);
    }

    // Placeholder for event listeners (none used currently)
    private eventListeners() {
    }

    // Displays the win amount with animation
    public showWin(amount: number) {
        this._isWinDisplaying = true;

        // Animate the scale of the highlight and win amount
        gsap.fromTo([this._highlight.scale, this._winAmount.scale], { x: 0, y: 0 }, {
            x: 1, y: 1, duration: 0.25, ease: "back.out(1)", onStart: () => {
                this._winAmount.text = (amount + " €").toString(); // Sets the win amount text
                this._highlight.visible = true;
                this._winAmount.visible = true;
            }, onComplete: () => {
                // After the animation completes, animate the elements shrinking and hiding
                gsap.to([this._highlight.scale, this._winAmount.scale], {
                    x: 0, y: 0, duration: 0.25, ease: "back.in(1)", delay: 2, onComplete: () => {
                        this._highlight.visible = false;
                        this._winAmount.visible = false;
                        this._winAmount.text = ""; // Resets the win amount text

                        globalThis.eventBus.emit(EventNames.WinShown, amount); // Emit event that the win is shown
                        this._isWinDisplaying = false;
                    }
                });
            }
        });
    }

    // Getter to check if the win is currently being displayed
    public get isWinDisplaying(): boolean {
        return this._isWinDisplaying;
    }
}