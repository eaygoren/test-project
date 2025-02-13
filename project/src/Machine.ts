import * as PIXI from "pixi.js";
import { Reels } from "./Reels";
import gsap from "gsap";
import { DATA_RECEIVED, SPIN_STARTED, SPIN_STOPPED } from "./Configs";

export class Machine extends PIXI.Container {
    private _app: PIXI.Application;

    private _reels!: Reels;
    private _spinButton!: PIXI.Sprite;
    private _buttonText!: PIXI.Text;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad(5, 3);
    }

    private onLoad(col: number, row: number) {
        this.createMachine(col, row);
        this.eventListeners();
    }

    private createMachine(col: number, row: number) {
        this._reels = new Reels(this._app, col, row);
        this.addChild(this._reels);

        this._spinButton = PIXI.Sprite.from("button");
        this._spinButton.label = "SpinButton";
        this._spinButton.anchor.set(0.5, 0.5);
        this._spinButton.scale.set(0.75, 0.75);
        this._spinButton.position.set(640, 640);
        this._spinButton.eventMode = "static";
        this._spinButton.cursor = "pointer";
        this.addChild(this._spinButton);

        this._buttonText = new PIXI.Text();
        this._buttonText.label = "ButtonText";
        this._buttonText.anchor.set(0.5, 0.5);
        this._buttonText.text = "SPIN";
        this._buttonText.style = {
            fontSize: 90,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "blue"
        };
        this._buttonText.style._stroke.width = 6;
        this._spinButton.addChild(this._buttonText);
    }

    private eventListeners() {
        this._spinButton.onpointerenter = () => { gsap.to(this._spinButton.scale, { x: 1, y: 1, duration: 0.25, ease: "expo.out" }); }
        this._spinButton.onpointerout = () => { gsap.to(this._spinButton.scale, { x: 0.75, y: 0.75, duration: 0.25, ease: "expo.in" }); }
        this._spinButton.onpointerup = () => {
            if (!this._reels.isSpinning) {
                gsap.to(this._spinButton.scale, { x: 0.75, y: 0.75, duration: 0.25, ease: "expo.in" });
                this._spinButton.eventMode = "none";
                this._spinButton.cursor = "default";
                this._spinButton.alpha = 0.5;
                this.startSpin();
            }
        }

        globalThis.eventBus.on(SPIN_STOPPED, () => {
            this._spinButton.eventMode = "static";
            this._spinButton.cursor = "pointer";
            this._spinButton.alpha = 1;
        });
    }

    private startSpin() {
        this._reels.startSpin(0.15);
    }
}