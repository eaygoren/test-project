import * as PIXI from "pixi.js";
import { EventNames } from "./EventBus";
import gsap from "gsap";

export class WinDisplay extends PIXI.Container {
    private _app: PIXI.Application;

    private _highlight: PIXI.Sprite;
    private _winAmount: PIXI.Text;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    private onLoad() {
        this.create();
        this.eventListeners();
    }

    private create() {
        this._highlight = PIXI.Sprite.from("highlight");
        this._highlight.label = "Highlight";
        this._highlight.anchor.set(0.5, 0.5);
        this._highlight.position.set(640, 300);
        this._highlight.alpha = 0.4;
        this._highlight.blendMode = "add";
        this._highlight.visible = false;
        this.addChild(this._highlight);

        this._winAmount = new PIXI.Text();
        this._winAmount.label = "WinAmount";
        this._winAmount.anchor.set(0.5, 0.5);
        this._winAmount.position.set(640, 300);
        this._winAmount.text = "500 €";
        this._winAmount.style = {
            fontFamily: "TiltNeon",
            fontSize: 120,
            fontWeight: "700",
            align: "center",
            fill: "#F8E7F6",
            stroke: "#4B164C",
            letterSpacing: 1
        };
        this._winAmount.style._stroke.width = 5;
        this._winAmount.visible = false;
        this.addChild(this._winAmount);
    }

    private eventListeners() {

    }

    public showWin(amount: number) {
        gsap.fromTo([this._highlight.scale, this._winAmount.scale], { x: 0, y: 0 }, {
            x: 1, y: 1, duration: 0.25, ease: "back.out(1)", onStart: () => {
                this._winAmount.text = (amount + " €").toString();

                this._highlight.visible = true;
                this._winAmount.visible = true;
            }, onComplete: () => {
                gsap.to([this._highlight.scale, this._winAmount.scale], {
                    x: 0, y: 0, duration: 0.25, ease: "back.in(1)", delay: 1, onComplete: () => {
                        this._highlight.visible = false;
                        this._winAmount.visible = false;
                        this._winAmount.text = "";

                        globalThis.eventBus.emit(EventNames.WinShown, amount);
                    }
                });
            }
        });
    }
}